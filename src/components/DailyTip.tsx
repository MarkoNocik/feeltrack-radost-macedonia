
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, RefreshCw, Heart } from 'lucide-react';

const tips = [
  {
    category: "Стрес",
    title: "Дишење за релаксација",
    content: "Кога се чувствувате стресирано, пробајте со длабоко дишење: вдишете 4 секунди, задржете 4 секунди, издишете 4 секунди. Повторете 5 пати.",
    emoji: "🌸"
  },
  {
    category: "Односи",
    title: "Поврзување со пријатели",
    content: "Испратете порака на еден пријател кому не сте му се јавиле скоро. Малите гестови на грижа ги засилуваат врските.",
    emoji: "💝"
  },
  {
    category: "Сон",
    title: "Подобар сон",
    content: "Оставете го телефонот час време пред спиење. Читајте книга или слушајте мирна музика наместо тоа.",
    emoji: "🌙"
  },
  {
    category: "Физичка активност",
    title: "Движење за енергија",
    content: "Дури и 10 минути прошетка на свеж воздух може да ви го подобри расположението и енергијата.",
    emoji: "🚶‍♀️"
  },
  {
    category: "Самодоверба",
    title: "Позитивни потврди",
    content: "Секое утро кажете си нешто позитивно. На пример: 'Јас сум способен/на и заслужувам добри работи.'",
    emoji: "✨"
  },
  {
    category: "Екрани",
    title: "Дигитална пауза",
    content: "Направете 20-минутна пауза од екраните. Користете го тоа време за цртање, читање или разговор со семејството.",
    emoji: "📱"
  }
];

export const DailyTip = () => {
  const [currentTip, setCurrentTip] = useState(tips[0]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Get today's tip based on date
    const today = new Date();
    const dayIndex = today.getDate() % tips.length;
    setCurrentTip(tips[dayIndex]);
    
    // Check if tip is already liked
    const likedTips = JSON.parse(localStorage.getItem('feeltrack-liked-tips') || '[]');
    setIsLiked(likedTips.includes(tips[dayIndex].title));
  }, []);

  const getNewTip = () => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setCurrentTip(tips[randomIndex]);
    setIsLiked(false);
  };

  const toggleLike = () => {
    const likedTips = JSON.parse(localStorage.getItem('feeltrack-liked-tips') || '[]');
    
    if (isLiked) {
      const updated = likedTips.filter((title: string) => title !== currentTip.title);
      localStorage.setItem('feeltrack-liked-tips', JSON.stringify(updated));
    } else {
      likedTips.push(currentTip.title);
      localStorage.setItem('feeltrack-liked-tips', JSON.stringify(likedTips));
    }
    
    setIsLiked(!isLiked);
  };

  return (
    <div className="space-y-6 py-6">
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-200">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Lightbulb className="h-6 w-6 text-yellow-500 fill-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-800">Денешен совет</h2>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-6xl">{currentTip.emoji}</span>
          </div>
          
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4">
            <div className="text-sm font-medium text-purple-600 mb-2">
              {currentTip.category}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              {currentTip.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {currentTip.content}
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button
              onClick={toggleLike}
              variant="outline"
              className={`flex-1 ${
                isLiked 
                  ? 'bg-pink-100 border-pink-300 text-pink-700' 
                  : 'hover:bg-pink-50'
              }`}
            >
              <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
              {isLiked ? 'Сакам' : 'Сакам'}
            </Button>
            
            <Button
              onClick={getNewTip}
              variant="outline"
              className="flex-1 hover:bg-purple-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Нов совет
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
