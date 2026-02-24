import { motion } from "framer-motion";

interface CircularGaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color: string;
  size?: number;
}

export default function CircularGauge({ value, max, label, unit, color, size = 140 }: CircularGaugeProps) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const offset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-2">
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
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground font-mono">
            {value.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
      </div>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
}
