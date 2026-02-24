import { motion } from "framer-motion";
import { Wifi, WifiOff, AlertTriangle } from "lucide-react";

interface GridStatusProps {
  status: "online" | "offline" | "unstable";
}

export default function GridStatus({ status }: GridStatusProps) {
  const config = {
    online: {
      icon: Wifi,
      label: "Grid Online",
      color: "text-primary",
      bg: "bg-primary/10",
      dot: "bg-primary",
      glow: "energy-glow-green",
    },
    offline: {
      icon: WifiOff,
      label: "Grid Offline",
      color: "text-destructive",
      bg: "bg-destructive/10",
      dot: "bg-destructive",
      glow: "",
    },
    unstable: {
      icon: AlertTriangle,
      label: "Grid Unstable",
      color: "text-warning",
      bg: "bg-warning/10",
      dot: "bg-warning",
      glow: "energy-glow-yellow",
    },
  }[status];

  const Icon = config.icon;

  return (
    <div className={`glass-card p-6 ${config.glow}`}>
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-xl ${config.bg}`}>
          <Icon className={`w-6 h-6 ${config.color}`} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">AC Power Line</p>
          <div className="flex items-center gap-2">
            <motion.div
              className={`w-2 h-2 rounded-full ${config.dot}`}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className={`font-semibold ${config.color}`}>{config.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
