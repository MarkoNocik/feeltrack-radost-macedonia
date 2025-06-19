
import React from 'react';
import { Heart, Lightbulb, CheckSquare, BarChart3 } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'mood', icon: Heart, label: 'Расположение' },
    { id: 'tips', icon: Lightbulb, label: 'Совети' },
    { id: 'tasks', icon: CheckSquare, label: 'Активности' },
    { id: 'progress', icon: BarChart3, label: 'Напредок' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-purple-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center p-2 transition-all duration-200 ${
                  isActive 
                    ? 'text-purple-600 scale-110' 
                    : 'text-gray-500 hover:text-purple-500'
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? 'fill-purple-100' : ''}`} />
                <span className="text-xs mt-1 font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
