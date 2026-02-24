import { useState, useEffect, useCallback } from "react";
import { EnergyData, Device, defaultDevices, defaultEnergyData, autoSwitch } from "@/lib/energy-logic";

export function useEnergyData() {
  const [energyData, setEnergyData] = useState<EnergyData>(defaultEnergyData);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyData((prev) => ({
        ...prev,
        solarPower: Math.max(0, prev.solarPower + (Math.random() - 0.5) * 0.3),
        inverterPower: Math.max(0, prev.inverterPower + (Math.random() - 0.5) * 0.2),
        batteryPercentage: Math.max(0, Math.min(100, prev.batteryPercentage + (Math.random() - 0.48) * 2)),
        totalConsumption: Math.max(0, prev.totalConsumption + (Math.random() - 0.5) * 0.1),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return energyData;
}

export function useDevices() {
  const [devices, setDevices] = useState<Device[]>(defaultDevices);

  const toggleDevice = useCallback((id: string) => {
    setDevices((prev) => prev.map((d) => (d.id === id ? { ...d, isOn: !d.isOn } : d)));
  }, []);

  const toggleMode = useCallback((id: string) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, mode: d.mode === "auto" ? "manual" : "auto" } : d))
    );
  }, []);

  const reorderDevices = useCallback((newOrder: Device[]) => {
    setDevices(newOrder.map((d, i) => ({ ...d, priority: i + 1 })));
  }, []);

  const runAutoSwitch = useCallback((batteryPercentage: number) => {
    setDevices((prev) => autoSwitch(prev, batteryPercentage));
  }, []);

  return { devices, toggleDevice, toggleMode, reorderDevices, runAutoSwitch };
}
