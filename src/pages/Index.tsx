import Layout from "@/components/Layout";
import DashboardView from "@/components/dashboard/DashboardView";
import { useEnergyData } from "@/hooks/use-energy-data";

const Index = () => {
  const energyData = useEnergyData();

  return (
    <Layout>
      <DashboardView data={energyData} />
    </Layout>
  );
};

export default Index;
