export interface Device {
  id: string;
  name: string;
  icon: string;
  priority: number;
  isOn: boolean;
  mode: "manual" | "auto";
  wattage: number;
}

export interface EnergyData {
  solarPower: number;
  inverterPower: number;
  batteryPercentage: number;
  batteryHealth: number;
  gridStatus: "online" | "offline" | "unstable";
  totalConsumption: number;
  totalGeneration: number;
}

export function autoSwitch(devices: Device[], batteryPercentage: number): Device[] {
  const sorted = [...devices].sort((a, b) => b.priority - a.priority); // higher priority = lower importance
  
  if (batteryPercentage < 20) {
    return sorted.map((device) => {
      if (device.mode === "auto" && device.priority >= 3) {
        return { ...device, isOn: false };
      }
      return device;
    });
  }
  
  if (batteryPercentage < 40) {
    return sorted.map((device) => {
      if (device.mode === "auto" && device.priority >= 4) {
        return { ...device, isOn: false };
      }
      return device;
    });
  }
  
  return sorted;
}

export const defaultDevices: Device[] = [
  { id: "1", name: "Living Room Lights", icon: "Lightbulb", priority: 3, isOn: true, mode: "auto", wattage: 60 },
  { id: "2", name: "Ceiling Fan", icon: "Fan", priority: 4, isOn: true, mode: "auto", wattage: 75 },
  { id: "3", name: "Television", icon: "Tv", priority: 5, isOn: false, mode: "manual", wattage: 120 },
  { id: "4", name: "Air Conditioner", icon: "AirVent", priority: 2, isOn: true, mode: "auto", wattage: 1500 },
  { id: "5", name: "Laptop Charger", icon: "Laptop", priority: 1, isOn: true, mode: "manual", wattage: 65 },
];

export const defaultEnergyData: EnergyData = {
  solarPower: 3.2,
  inverterPower: 1.8,
  batteryPercentage: 72,
  batteryHealth: 94,
  gridStatus: "online",
  totalConsumption: 1.82,
  totalGeneration: 3.2,
};
