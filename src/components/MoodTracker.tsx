
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const moods = [
  { emoji: '😄', label: 'Одлично', value: 5, color: 'bg-green-100 border-green-300' },
  { emoji: '😊', label: 'Добро', value: 4, color: 'bg-blue-100 border-blue-300' },
  { emoji: '😐', label: 'Неутрално', value: 3, color: 'bg-yellow-100 border-yellow-300' },
  { emoji: '😔', label: 'Лошо', value: 2, color: 'bg-orange-100 border-orange-300' },
  { emoji: '😢', label: 'Многу лошо', value: 1, color: 'bg-red-100 border-red-300' },
];

export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const { toast } = useToast();

  const handleSaveMood = () => {
    if (selectedMood === null) return;
    
    // Save mood to localStorage for demo purposes
    const today = new Date().toISOString().split('T')[0];
    const moodData = {
      date: today,
      mood: selectedMood,
      note: note.trim(),
    };
    
    const existingData = JSON.parse(localStorage.getItem('feeltrack-moods') || '[]');
    const updatedData = existingData.filter((entry: any) => entry.date !== today);
    updatedData.push(moodData);
    localStorage.setItem('feeltrack-moods', JSON.stringify(updatedData));
    
    toast({
      title: "Расположението е зачувано! 💜",
      description: "Благодариме што го споделивте вашето расположение денес.",
    });
    
    setNote('');
  };

  const today = new Date().toLocaleDateString('mk-MK', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-6 py-6">
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Како се чувствувате денес?
          </h2>
          <p className="text-sm text-gray-600">{today}</p>
        </div>
        
        <div className="grid grid-cols-1 gap-3 mb-6">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                selectedMood === mood.value 
                  ? `${mood.color} ring-2 ring-purple-300 scale-105` 
                  : 'bg-white/50 border-gray-200 hover:bg-white/80'
              }`}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className="font-medium text-gray-700">{mood.label}</span>
            </button>
          ))}
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Што влијаеше на вашето расположение денес? (опционо)
            </label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Споделете ги вашите мисли..."
              className="resize-none bg-white/80"
              rows={3}
            />
          </div>
          
          <Button 
            onClick={handleSaveMood}
            disabled={selectedMood === null}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            Зачувај расположение 💜
          </Button>
        </div>
      </Card>
    </div>
  );
};
