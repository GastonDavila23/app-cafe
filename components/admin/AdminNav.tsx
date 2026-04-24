"use client";

import { Coffee, Clock, Share2 } from "lucide-react";

interface AdminNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminNav({ activeTab, setActiveTab }: AdminNavProps) {
  const navItems = [
    { id: "products", icon: Coffee, label: "Productos" },
    { id: "schedule", icon: Clock, label: "Horarios" },
    { id: "share", icon: Share2, label: "Compartir" },
  ];

  return (
    <div className="fixed bottom-6 left-0 w-full px-4 z-40 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-2 bg-neutral-100/90 dark:bg-neutral-800/90 backdrop-blur-md p-2 rounded-full shadow-2xl border border-neutral-300 dark:border-neutral-600 w-full max-w-[400px]">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-2 rounded-full transition-all text-xs font-bold shadow-sm ${
                activeTab === item.id
                  ? "bg-[#009EE3] text-white"
                  : "bg-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" strokeWidth={2.5} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}