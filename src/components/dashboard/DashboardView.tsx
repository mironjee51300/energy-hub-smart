import { motion } from "framer-motion";
import { Sun, Zap, TrendingUp, TrendingDown } from "lucide-react";
import CircularGauge from "./CircularGauge";
import BatteryHealth from "./BatteryHealth";
import GridStatus from "./GridStatus";
import { EnergyData } from "@/lib/energy-logic";

interface DashboardViewProps {
  data: EnergyData;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardView({ data }: DashboardViewProps) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item} className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/10">
          <Zap className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Energy Hub</h1>
          <p className="text-sm text-muted-foreground">Real-time power monitoring</p>
        </div>
      </motion.div>

      {/* Power Gauges */}
      <motion.div variants={item} className="glass-card p-6">
        <h2 className="text-sm font-semibold text-muted-foreground mb-6 flex items-center gap-2">
          <Sun className="w-4 h-4 text-energy-solar" />
          Power Sources
        </h2>
        <div className="flex justify-around flex-wrap gap-6">
          <CircularGauge
            value={data.solarPower}
            max={5}
            label="Solar"
            unit="kW"
            color="hsl(var(--energy-solar))"
          />
          <CircularGauge
            value={data.inverterPower}
            max={5}
            label="Inverter"
            unit="kW"
            color="hsl(var(--energy-inverter))"
          />
        </div>
      </motion.div>

      {/* Battery + Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <BatteryHealth percentage={data.batteryPercentage} health={data.batteryHealth} />
        </motion.div>
        <motion.div variants={item} className="space-y-4">
          <GridStatus status={data.gridStatus} />
          {/* Quick Stats */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Generation</span>
              </div>
              <span className="font-bold text-primary font-mono">{data.totalGeneration.toFixed(1)} kW</span>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-warning" />
                <span className="text-sm text-muted-foreground">Consumption</span>
              </div>
              <span className="font-bold text-warning font-mono">{data.totalConsumption.toFixed(1)} kW</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
