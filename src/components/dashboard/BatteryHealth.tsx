import { motion } from "framer-motion";
import { Battery, BatteryCharging } from "lucide-react";

interface BatteryHealthProps {
  percentage: number;
  health: number;
}

export default function BatteryHealth({ percentage, health }: BatteryHealthProps) {
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);

  const getColor = () => {
    if (percentage < 20) return "hsl(var(--destructive))";
    if (percentage < 40) return "hsl(var(--warning))";
    return "hsl(var(--energy-battery))";
  };

  return (
    <div className="glass-card p-6 flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        {percentage > 50 ? (
          <BatteryCharging className="w-5 h-5 text-primary" />
        ) : (
          <Battery className="w-5 h-5 text-warning" />
        )}
        <h3 className="text-sm font-semibold text-foreground">Battery Status</h3>
      </div>

      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${getColor()}50)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground font-mono">
            {Math.round(percentage)}%
          </span>
          <span className="text-xs text-muted-foreground">Charge</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Health:</span>
        <span className="font-semibold text-primary font-mono">{health}%</span>
      </div>
    </div>
  );
}
