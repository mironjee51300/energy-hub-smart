import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

interface SensorReading {
    timestamp: Date;
    voltage: number;
    current: number;
    power: number;
    temperature: number;
    humidity: number;
    deviceId: string;
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' }});
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Store latest readings
const sensorReadings: Map<string, SensorReading> = new Map();

// WebSocket for real-time data
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});

// Socket.IO for real-time events
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// REST API endpoint to receive sensor data from ESP-12
app.post('/api/sensor/data', (req, res) => {
    try {
        const { voltage, current, power, temperature, humidity, deviceId } = req.body;
        if (!voltage || !current || !power || deviceId === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const reading: SensorReading = {
            timestamp: new Date(),
            voltage: parseFloat(voltage),
            current: parseFloat(current),
            power: parseFloat(power),
            temperature: parseFloat(temperature) || 0,
            humidity: parseFloat(humidity) || 0,
            deviceId: deviceId || 'unknown',
        };
        sensorReadings.set(deviceId, reading);
        console.log('Sensor data received:', reading);

        // Broadcast to all connected WebSocket clients
        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(JSON.stringify(reading));
            }
        });

        // Emit via Socket.IO
        io.emit('sensor:update', reading);
        res.json({ success: true, message: 'Data received', data: reading });
    } catch (error) {
        console.error('Error processing sensor data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET endpoint to retrieve latest sensor readings
app.get('/api/sensor/latest', (req, res) => {
    const readings = Array.from(sensorReadings.values());
    res.json({ success: true, data: readings });
});

// GET endpoint for a specific device
app.get('/api/sensor/latest/:deviceId', (req, res) => {
    const { deviceId } = req.params;
    const reading = sensorReadings.get(deviceId);
    if (!reading) {
        return res.status(404).json({ error: 'Device not found' });
    }
    res.json({ success: true, data: reading });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`WebSocket server available at ws://localhost:${PORT}`);
    console.log(`Socket.IO available at http://localhost:${PORT}`);
});