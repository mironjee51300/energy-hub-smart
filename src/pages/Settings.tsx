import Layout from "@/components/Layout";
import { Settings as SettingsIcon } from "lucide-react";
import { motion } from "framer-motion";

const Settings = () => {
  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-muted">
            <SettingsIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground">Configure your system</p>
          </div>
        </div>
        <div className="glass-card p-8 text-center text-muted-foreground">
          <p>Settings panel coming soon.</p>
          <p className="text-sm mt-2">Wi-Fi configuration, MQTT setup, and user preferences.</p>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Settings;
