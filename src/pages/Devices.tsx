import Layout from "@/components/Layout";
import DeviceManagement from "@/components/devices/DeviceManagement";
import { useDevices, useEnergyData } from "@/hooks/use-energy-data";

const Devices = () => {
  const { devices, toggleDevice, toggleMode, reorderDevices, runAutoSwitch } = useDevices();
  const { energyData } = useEnergyData();

  return (
    <Layout>
      <DeviceManagement
        devices={devices}
        onToggle={toggleDevice}
        onModeToggle={toggleMode}
        onReorder={reorderDevices}
        onAutoSwitch={() => runAutoSwitch(energyData.batteryPercentage)}
        batteryPercentage={energyData.batteryPercentage}
      />
    </Layout>
  );
};

export default Devices;
