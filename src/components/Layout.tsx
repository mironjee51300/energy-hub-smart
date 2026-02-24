import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Cpu, Settings, Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/devices", label: "Devices", icon: Cpu },
  { path: "/settings", label: "Settings", icon: Settings },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Side Rail */}
      {!isMobile && (
        <aside className="w-20 border-r border-border/30 flex flex-col items-center py-6 gap-2 bg-sidebar sticky top-0 h-screen">
          <div className="mb-8 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 energy-glow-green">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center gap-1 p-3 rounded-xl transition-colors group"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active-desktop"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon
                  className={`w-5 h-5 relative z-10 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
                <span
                  className={`text-[10px] relative z-10 transition-colors ${
                    isActive ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </aside>
      )}

      {/* Main Content */}
      <main className={`flex-1 ${isMobile ? "pb-20" : ""}`}>
        <div className="max-w-6xl mx-auto p-4 md:p-8">{children}</div>
      </main>

      {/* Mobile Bottom Nav */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 border-t border-border/30 bg-sidebar/95 backdrop-blur-xl z-50">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative flex flex-col items-center gap-1 p-2 min-w-[64px]"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-mobile"
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <item.icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={`text-[10px] transition-colors ${
                      isActive ? "text-primary font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
