import { useMemo } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity } from "lucide-react";
import { EnergyData } from "@/lib/energy-logic";

interface EnergyChartsProps {
  history: Array<EnergyData & { time: string }>;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function EnergyCharts({ history }: EnergyChartsProps) {
  const chartData = useMemo(
    () =>
      history.map((d) => ({
        time: d.time,
        solar: +d.solarPower.toFixed(2),
        inverter: +d.inverterPower.toFixed(2),
        generation: +d.totalGeneration.toFixed(2),
        consumption: +d.totalConsumption.toFixed(2),
      })),
    [history]
  );

  return (
    <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Generation Chart */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          Power Generation
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradSolar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(45 93% 58%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(45 93% 58%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradInverter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(262 83% 58%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(262 83% 58%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
              <XAxis dataKey="time" tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }} tickLine={false} axisLine={false} unit=" kW" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222 40% 10%)",
                  border: "1px solid hsl(222 30% 18%)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "hsl(210 40% 96%)" }}
              />
              <Area type="monotone" dataKey="solar" name="Solar" stroke="hsl(45 93% 58%)" fill="url(#gradSolar)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="inverter" name="Inverter" stroke="hsl(262 83% 58%)" fill="url(#gradInverter)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Consumption vs Generation Chart */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-warning" />
          Generation vs Consumption
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradGen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142 71% 45%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(142 71% 45%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradCons" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(38 92% 50%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(38 92% 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
              <XAxis dataKey="time" tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }} tickLine={false} axisLine={false} unit=" kW" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222 40% 10%)",
                  border: "1px solid hsl(222 30% 18%)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "hsl(210 40% 96%)" }}
              />
              <Area type="monotone" dataKey="generation" name="Generation" stroke="hsl(142 71% 45%)" fill="url(#gradGen)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="consumption" name="Consumption" stroke="hsl(38 92% 50%)" fill="url(#gradCons)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
