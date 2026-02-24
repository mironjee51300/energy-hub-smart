import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Lightbulb, Fan, Tv, AirVent, Laptop, Cpu, Zap } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Device } from "@/lib/energy-logic";

const iconMap: Record<string, React.ElementType> = {
  Lightbulb,
  Fan,
  Tv,
  AirVent,
  Laptop,
};

interface DeviceItemProps {
  device: Device;
  onToggle: (id: string) => void;
  onModeToggle: (id: string) => void;
}

function SortableDeviceItem({ device, onToggle, onModeToggle }: DeviceItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: device.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = iconMap[device.icon] || Cpu;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      className={`glass-card p-4 flex items-center gap-4 ${isDragging ? "opacity-50 scale-105" : ""}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="touch-none text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      <div
        className={`p-2.5 rounded-xl transition-colors ${
          device.isOn ? "bg-primary/10" : "bg-muted"
        }`}
      >
        <Icon className={`w-5 h-5 ${device.isOn ? "text-primary" : "text-muted-foreground"}`} />
      </div>

      <div className="flex-1 min-w-0">
        <p className={`font-medium text-sm truncate ${device.isOn ? "text-foreground" : "text-muted-foreground"}`}>
          {device.name}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Badge
            variant={device.mode === "auto" ? "default" : "secondary"}
            className="text-[10px] px-1.5 py-0 h-4 cursor-pointer select-none"
            onClick={() => onModeToggle(device.id)}
          >
            {device.mode === "auto" ? "AUTO" : "MANUAL"}
          </Badge>
          <span className="text-[10px] text-muted-foreground font-mono">{device.wattage}W</span>
          <span className="text-[10px] text-muted-foreground">P{device.priority}</span>
        </div>
      </div>

      <Switch
        checked={device.isOn}
        onCheckedChange={() => onToggle(device.id)}
        className="data-[state=checked]:bg-primary"
      />
    </motion.div>
  );
}

interface DeviceManagementProps {
  devices: Device[];
  onToggle: (id: string) => void;
  onModeToggle: (id: string) => void;
  onReorder: (devices: Device[]) => void;
  onAutoSwitch: () => void;
  batteryPercentage: number;
}

export default function DeviceManagement({
  devices,
  onToggle,
  onModeToggle,
  onReorder,
  onAutoSwitch,
  batteryPercentage,
}: DeviceManagementProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = devices.findIndex((d) => d.id === active.id);
      const newIndex = devices.findIndex((d) => d.id === over.id);
      onReorder(arrayMove(devices, oldIndex, newIndex));
    }
  };

  const activeCount = devices.filter((d) => d.isOn).length;
  const totalWattage = devices.filter((d) => d.isOn).reduce((sum, d) => sum + d.wattage, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-accent/10">
            <Cpu className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Devices</h1>
            <p className="text-sm text-muted-foreground">Priority Engine</p>
          </div>
        </div>
        <button
          onClick={onAutoSwitch}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
        >
          <Zap className="w-4 h-4" />
          Auto Switch
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card p-3 text-center">
          <p className="text-lg font-bold text-foreground font-mono">{activeCount}</p>
          <p className="text-[10px] text-muted-foreground">Active</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className="text-lg font-bold text-warning font-mono">{totalWattage}W</p>
          <p className="text-[10px] text-muted-foreground">Load</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className={`text-lg font-bold font-mono ${batteryPercentage < 20 ? "text-destructive" : "text-primary"}`}>
            {Math.round(batteryPercentage)}%
          </p>
          <p className="text-[10px] text-muted-foreground">Battery</p>
        </div>
      </div>

      {/* Low Battery Warning */}
      {batteryPercentage < 20 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 text-sm text-destructive flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Low battery! Tap Auto Switch to conserve power.
        </motion.div>
      )}

      {/* Device List */}
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Drag to reorder priority (top = highest priority)</p>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={devices.map((d) => d.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {devices.map((device) => (
                <SortableDeviceItem
                  key={device.id}
                  device={device}
                  onToggle={onToggle}
                  onModeToggle={onModeToggle}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </motion.div>
  );
}
