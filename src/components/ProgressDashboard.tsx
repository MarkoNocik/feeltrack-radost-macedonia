
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BarChart3, Calendar, Trophy, TrendingUp } from 'lucide-react';

export const ProgressDashboard = () => {
  const [moodData, setMoodData] = useState<any[]>([]);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [streakDays, setStreakDays] = useState(0);

  useEffect(() => {
    // Load mood data
    const moods = JSON.parse(localStorage.getItem('feeltrack-moods') || '[]');
    setMoodData(moods.slice(-7)); // Last 7 days
    
    // Calculate completed tasks
    let totalTasks = 0;
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const completed = JSON.parse(localStorage.getItem(`feeltrack-completed-${dateStr}`) || '[]');
      totalTasks += completed.length;
    }
    setCompletedTasksCount(totalTasks);
    
    // Calculate streak
    let streak = 0;
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayMoods = moods.filter((m: any) => m.date === dateStr);
      const dayTasks = JSON.parse(localStorage.getItem(`feeltrack-completed-${dateStr}`) || '[]');
      
      if (dayMoods.length > 0 || dayTasks.length > 0) {
        streak++;
      } else {
        break;
      }
    }
    setStreakDays(streak);
  }, []);

  const averageMood = moodData.length > 0 
    ? (moodData.reduce((sum, entry) => sum + entry.mood, 0) / moodData.length).toFixed(1)
    : 0;

  const getMoodEmoji = (mood: number) => {
    if (mood >= 4.5) return '😄';
    if (mood >= 3.5) return '😊';
    if (mood >= 2.5) return '😐';
    if (mood >= 1.5) return '😔';
    return '😢';
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 4) return 'bg-green-400';
    if (mood >= 3) return 'bg-blue-400';
    if (mood >= 2) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="space-y-6 py-6">
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-200">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BarChart3 className="h-6 w-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-800">Твојот напредок</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200">
            <div className="text-center">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{streakDays}</div>
              <div className="text-sm text-gray-600">Дена низа</div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-green-100 to-blue-100 border-green-200">
            <div className="text-center">
              <Calendar className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{completedTasksCount}</div>
              <div className="text-sm text-gray-600">Активности</div>
            </div>
          </Card>
        </div>
        
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 mb-6">
          <div className="text-center">
            <TrendingUp className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-800 mb-1">
              Просечно расположение
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-3xl">{getMoodEmoji(Number(averageMood))}</span>
              <span className="text-xl font-bold text-gray-700">{averageMood}/5</span>
            </div>
          </div>
        </Card>
        
        <div>
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-purple-500" />
            Расположение во изминатите 7 дена
          </h3>
          
          {moodData.length > 0 ? (
            <div className="space-y-2">
              {moodData.reverse().map((entry, index) => {
                const date = new Date(entry.date).toLocaleDateString('mk-MK', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                });
                
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">{date}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{getMoodEmoji(entry.mood)}</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getMoodColor(entry.mood)}`}
                          style={{ width: `${(entry.mood / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{entry.mood}/5</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Почнете да го следите вашето расположение за да видите напредок!</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
