
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { MoodTracker } from '@/components/MoodTracker';
import { DailyTip } from '@/components/DailyTip';
import { InteractiveTasks } from '@/components/InteractiveTasks';
import { ProgressDashboard } from '@/components/ProgressDashboard';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  const [activeTab, setActiveTab] = useState('mood');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'mood':
        return <MoodTracker />;
      case 'tips':
        return <DailyTip />;
      case 'tasks':
        return <InteractiveTasks />;
      case 'progress':
        return <ProgressDashboard />;
      default:
        return <MoodTracker />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header />
      <main className="container mx-auto px-4 pb-20">
        <div className="max-w-md mx-auto">
          {renderActiveComponent()}
        </div>
      </main>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
