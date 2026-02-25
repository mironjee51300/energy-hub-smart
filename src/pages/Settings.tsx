import Layout from "@/components/Layout";
import { Settings as SettingsIcon, Wifi, Radio, User, Eye, EyeOff, Save, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } }),
};

const Settings = () => {
  const { toast } = useToast();

  // Wi-Fi state
  const [wifiSSID, setWifiSSID] = useState("HomeNetwork_5G");
  const [wifiPassword, setWifiPassword] = useState("mySecurePass123");
  const [showWifiPass, setShowWifiPass] = useState(false);
  const [wifiAutoConnect, setWifiAutoConnect] = useState(true);

  // MQTT state
  const [mqttBroker, setMqttBroker] = useState("mqtt://192.168.1.100");
  const [mqttPort, setMqttPort] = useState("1883");
  const [mqttUsername, setMqttUsername] = useState("energy_hub");
  const [mqttPassword, setMqttPassword] = useState("");
  const [showMqttPass, setShowMqttPass] = useState(false);
  const [mqttTopic, setMqttTopic] = useState("home/energy/#");
  const [mqttTLS, setMqttTLS] = useState(false);

  // User preferences
  const [displayName, setDisplayName] = useState("Admin");
  const [autoSwitchThreshold, setAutoSwitchThreshold] = useState("20");
  const [refreshRate, setRefreshRate] = useState("5");
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [units, setUnits] = useState("kw");

  const handleSave = (section: string) => {
    toast({ title: "Settings saved", description: `${section} configuration updated successfully.` });
  };

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-muted">
            <SettingsIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground">Configure your energy management system</p>
          </div>
        </div>

        {/* Wi-Fi Configuration */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={sectionVariants} className="glass-card p-6 space-y-5">
          <div className="flex items-center gap-2 text-foreground">
            <Wifi className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-semibold">Wi-Fi Configuration</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wifi-ssid">Network Name (SSID)</Label>
              <Input id="wifi-ssid" value={wifiSSID} onChange={(e) => setWifiSSID(e.target.value)} placeholder="Enter SSID" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wifi-pass">Password</Label>
              <div className="relative">
                <Input id="wifi-pass" type={showWifiPass ? "text" : "password"} value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} placeholder="Enter password" />
                <button type="button" onClick={() => setShowWifiPass(!showWifiPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showWifiPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Switch checked={wifiAutoConnect} onCheckedChange={setWifiAutoConnect} />
              <Label>Auto-connect on startup</Label>
            </div>
            <Button size="sm" onClick={() => handleSave("Wi-Fi")} className="gap-2">
              <Save className="w-4 h-4" /> Save
            </Button>
          </div>
        </motion.div>

        {/* MQTT Setup */}
        <motion.div custom={1} initial="hidden" animate="visible" variants={sectionVariants} className="glass-card p-6 space-y-5">
          <div className="flex items-center gap-2 text-foreground">
            <Radio className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">MQTT Broker Setup</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mqtt-broker">Broker URL</Label>
              <Input id="mqtt-broker" value={mqttBroker} onChange={(e) => setMqttBroker(e.target.value)} placeholder="mqtt://host" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mqtt-port">Port</Label>
              <Input id="mqtt-port" value={mqttPort} onChange={(e) => setMqttPort(e.target.value)} placeholder="1883" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mqtt-user">Username</Label>
              <Input id="mqtt-user" value={mqttUsername} onChange={(e) => setMqttUsername(e.target.value)} placeholder="Username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mqtt-pass">Password</Label>
              <div className="relative">
                <Input id="mqtt-pass" type={showMqttPass ? "text" : "password"} value={mqttPassword} onChange={(e) => setMqttPassword(e.target.value)} placeholder="Password" />
                <button type="button" onClick={() => setShowMqttPass(!showMqttPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showMqttPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mqtt-topic">Subscribe Topic</Label>
            <Input id="mqtt-topic" value={mqttTopic} onChange={(e) => setMqttTopic(e.target.value)} placeholder="home/energy/#" className="font-mono text-sm" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Switch checked={mqttTLS} onCheckedChange={setMqttTLS} />
              <Label>Enable TLS/SSL</Label>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" /> Test Connection
              </Button>
              <Button size="sm" onClick={() => handleSave("MQTT")} className="gap-2">
                <Save className="w-4 h-4" /> Save
              </Button>
            </div>
          </div>
        </motion.div>

        {/* User Preferences */}
        <motion.div custom={2} initial="hidden" animate="visible" variants={sectionVariants} className="glass-card p-6 space-y-5">
          <div className="flex items-center gap-2 text-foreground">
            <User className="w-5 h-5 text-[hsl(var(--energy-solar))]" />
            <h2 className="text-lg font-semibold">User Preferences</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="display-name">Display Name</Label>
              <Input id="display-name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="threshold">Auto-Switch Battery Threshold (%)</Label>
              <Input id="threshold" type="number" min="5" max="50" value={autoSwitchThreshold} onChange={(e) => setAutoSwitchThreshold(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Data Refresh Rate</Label>
              <Select value={refreshRate} onValueChange={setRefreshRate}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 second</SelectItem>
                  <SelectItem value="5">5 seconds</SelectItem>
                  <SelectItem value="10">10 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Energy Units</Label>
              <Select value={units} onValueChange={setUnits}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="kw">Kilowatts (kW)</SelectItem>
                  <SelectItem value="w">Watts (W)</SelectItem>
                  <SelectItem value="kwh">Kilowatt-hours (kWh)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              <Label>Dark Mode</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={notifications} onCheckedChange={setNotifications} />
              <Label>Push Notifications</Label>
            </div>
          </div>

          <div className="flex justify-end">
            <Button size="sm" onClick={() => handleSave("Preferences")} className="gap-2">
              <Save className="w-4 h-4" /> Save Preferences
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Settings;
