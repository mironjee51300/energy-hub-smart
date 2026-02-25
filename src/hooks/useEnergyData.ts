// useEnergyData.ts

import { useEffect, useState } from 'react';

const useEnergyData = () => {
    const [sensorData, setSensorData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/energy/sensor-data');
                const data = await response.json();
                setSensorData(data);
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000); // Fetch data every 10 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return sensorData;
};

export default useEnergyData;