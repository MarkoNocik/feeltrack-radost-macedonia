
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckSquare, Star, Smile } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const tasks = [
  {
    id: 'kindness',
    title: 'Направи нешто добро',
    description: 'Направи едно мило дело денес - помогни на некого, искажи комплимент или сподели насмевка.',
    emoji: '💝',
    type: 'action'
  },
  {
    id: 'gratitude',
    title: 'Три работи за кои сум благодарен/на',
    description: 'Напиши три работи за кои си благодарен/на денес, без разлика колку мали се.',
    emoji: '🙏',
    type: 'journal'
  },
  {
    id: 'nature',
    title: '15 минути на свеж воздух',
    description: 'Излези надвор на барем 15 минути. Прошетај се, седни во паркот или само диши свеж воздух.',
    emoji: '🌳',
    type: 'action'
  },
  {
    id: 'reflection',
    title: 'Размисли за денот',
    description: 'Што беше најдобро во денешниот ден? Што научи нешто ново?',
    emoji: '💭',
    type: 'journal'
  },
  {
    id: 'mindfulness',
    title: '5 минути мирувач',
    description: 'Затвори ги очите и фокусирај се само на твоето дишење 5 минути.',
    emoji: '🧘‍♀️',
    type: 'action'
  }
];

export const InteractiveTasks = () => {
  const [dailyTasks, setDailyTasks] = useState<typeof tasks>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [journalEntries, setJournalEntries] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  useEffect(() => {
    // Get 3 random tasks for today
    const shuffled = [...tasks].sort(() => 0.5 - Math.random());
    setDailyTasks(shuffled.slice(0, 3));
    
    // Load completed tasks for today
    const today = new Date().toISOString().split('T')[0];
    const completed = JSON.parse(localStorage.getItem(`feeltrack-completed-${today}`) || '[]');
    setCompletedTasks(completed);
    
    // Load journal entries for today
    const entries = JSON.parse(localStorage.getItem(`feeltrack-journal-${today}`) || '{}');
    setJournalEntries(entries);
  }, []);

  const toggleTaskCompletion = (taskId: string) => {
    const today = new Date().toISOString().split('T')[0];
    let updated;
    
    if (completedTasks.includes(taskId)) {
      updated = completedTasks.filter(id => id !== taskId);
    } else {
      updated = [...completedTasks, taskId];
      toast({
        title: "Одлично! 🎉",
        description: "Уште една активност завршена!",
      });
    }
    
    setCompletedTasks(updated);
    localStorage.setItem(`feeltrack-completed-${today}`, JSON.stringify(updated));
  };

  const saveJournalEntry = (taskId: string, entry: string) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = { ...journalEntries, [taskId]: entry };
    setJournalEntries(updated);
    localStorage.setItem(`feeltrack-journal-${today}`, JSON.stringify(updated));
    
    if (entry.trim() && !completedTasks.includes(taskId)) {
      toggleTaskCompletion(taskId);
    }
  };

  const completionPercentage = Math.round((completedTasks.length / dailyTasks.length) * 100);

  return (
    <div className="space-y-6 py-6">
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-200">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CheckSquare className="h-6 w-6 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-800">Денешни активности</h2>
          </div>
          
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-gray-800">
                Напредок: {completionPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {dailyTasks.map((task) => {
            const isCompleted = completedTasks.includes(task.id);
            const journalEntry = journalEntries[task.id] || '';
            
            return (
              <Card 
                key={task.id} 
                className={`p-4 transition-all duration-200 ${
                  isCompleted 
                    ? 'bg-green-50 border-green-200 ring-1 ring-green-300' 
                    : 'bg-white/80 border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{task.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-2">{task.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    
                    {task.type === 'journal' && (
                      <Textarea
                        value={journalEntry}
                        onChange={(e) => setJournalEntries({...journalEntries, [task.id]: e.target.value})}
                        onBlur={() => saveJournalEntry(task.id, journalEntry)}
                        placeholder="Напиши го твојот одговор тука..."
                        className="mb-3 bg-white/80"
                        rows={3}
                      />
                    )}
                    
                    <Button
                      onClick={() => toggleTaskCompletion(task.id)}
                      variant={isCompleted ? "default" : "outline"}
                      className={`w-full ${
                        isCompleted 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : 'hover:bg-green-50'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <Smile className="h-4 w-4 mr-2" />
                          Завршено!
                        </>
                      ) : (
                        'Означи како завршено'
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
