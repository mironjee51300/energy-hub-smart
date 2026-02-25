import Layout from "@/components/Layout";
import DashboardView from "@/components/dashboard/DashboardView";
import EnergyCharts from "@/components/dashboard/EnergyCharts";
import { useEnergyData } from "@/hooks/use-energy-data";

const Index = () => {
  const { energyData, history } = useEnergyData();

  return (
    <Layout>
      <DashboardView data={energyData} />
      <div className="mt-6">
        <EnergyCharts history={history} />
      </div>
    </Layout>
  );
};

export default Index;
