# Hardware Setup Instructions

This document provides detailed instructions on the hardware connections and setup for the Energy Hub Smart project.

## Required Components
- Arduino UNO
- WiFi Module (e.g., ESP8266)
- Sensors (e.g., temperature, humidity)
- Breadboard
- Jumper Wires

## Connection Instructions
1. **Connect the WiFi Module**:  
   - VCC to Arduino 5V
   - GND to Arduino GND
   - TX to Arduino Pin 2
   - RX to Arduino Pin 3

2. **Set Up Sensors**:  
   - Connect the temperature sensor to the analog pin A0.
   - Connect the humidity sensor to the analog pin A1.

3. **Power the Arduino**:  
   - Use a USB cable or an external power supply.

## Final Setup Steps
- Ensure all connections are secure.
- Upload the code to the Arduino integrated development environment (IDE).
- Test the setup by monitoring the output on the Serial Monitor.