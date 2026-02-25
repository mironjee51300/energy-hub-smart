import { useState, useEffect, useCallback, useRef } from "react";
import { EnergyData, Device, defaultDevices, defaultEnergyData, autoSwitch } from "@/lib/energy-logic";

function getTimeLabel() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

const MAX_HISTORY = 20;

export function useEnergyData() {
  const [energyData, setEnergyData] = useState<EnergyData>(defaultEnergyData);
  const [history, setHistory] = useState<Array<EnergyData & { time: string }>>([
    { ...defaultEnergyData, time: getTimeLabel() },
  ]);
  const energyRef = useRef(energyData);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyData((prev) => {
        const next = {
          ...prev,
          solarPower: Math.max(0, prev.solarPower + (Math.random() - 0.5) * 0.3),
          inverterPower: Math.max(0, prev.inverterPower + (Math.random() - 0.5) * 0.2),
          batteryPercentage: Math.max(0, Math.min(100, prev.batteryPercentage + (Math.random() - 0.48) * 2)),
          totalConsumption: Math.max(0, prev.totalConsumption + (Math.random() - 0.5) * 0.1),
          totalGeneration: Math.max(0, prev.solarPower + prev.inverterPower + (Math.random() - 0.5) * 0.1),
        };
        energyRef.current = next;
        return next;
      });
      setHistory((prev) => {
        const entry = { ...energyRef.current, time: getTimeLabel() };
        const next = [...prev, entry];
        return next.length > MAX_HISTORY ? next.slice(-MAX_HISTORY) : next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return { energyData, history };
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
