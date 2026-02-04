"use client";

import { Plane, CalendarCheck, Clock, MapPin } from "lucide-react";

interface SearchTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function SearchTabs({ activeTab, setActiveTab }: SearchTabsProps) {
    const tabs = [
        { id: "book", label: "Book a flight", icon: Plane },
        { id: "manage", label: "Manage / Check-in", icon: CalendarCheck },
        { id: "status", label: "Flight Status", icon: Clock },
    ];

    return (
        <div className="flex bg-white/10 backdrop-blur-md rounded-t-xl overflow-hidden p-1 gap-1">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
              flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold transition-all duration-200
              ${isActive
                                ? "bg-white text-secondary shadow-sm rounded-t-lg"
                                : "text-white/80 hover:bg-white/10 hover:text-white rounded-t-lg"
                            }
            `}
                    >
                        <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-white"}`} />
                        <span className="uppercase tracking-wide">{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
