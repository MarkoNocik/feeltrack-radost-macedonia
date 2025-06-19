
import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="relative">
            <Heart className="h-8 w-8 text-purple-500 fill-purple-500" />
            <Sparkles className="h-4 w-4 text-pink-400 absolute -top-1 -right-1" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              FeelTrack.mk
            </h1>
            <p className="text-sm text-gray-600">Твоето ментално здравје е важно</p>
          </div>
        </div>
      </div>
    </header>
  );
};
