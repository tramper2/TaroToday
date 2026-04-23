/**
 * CardDeck Component
 * 카드 덱 표시 컴포넌트
 */

import React from 'react';
import Card from './Card';

const CardDeck = ({ onCardSelect, isDisabled = false }) => {
  // 덱에 표시할 카드 수
  const cardCount = 7;

  const cards = Array.from({ length: cardCount }, (_, i) => i);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-purple-200 mb-4 text-center text-shadow-mystical">
        오늘의 운세를 확인하세요
      </h1>
      <p className="text-purple-300/80 mb-12 text-center text-lg">
        카드를 선택하여 당신의 운세를 발견하세요
      </p>

      {/* Card Deck */}
      <div className="relative flex items-center justify-center gap-2 md:gap-4 perspective-1000">
        {cards.map((index) => (
          <div
            key={index}
            className="transition-all duration-500 hover:-translate-y-2"
            style={{
              transform: `rotate(${(index - Math.floor(cardCount / 2)) * 3}deg)`,
              transformOrigin: 'center bottom'
            }}
          >
            <Card
              onClick={() => !isDisabled && onCardSelect(index)}
              isDisabled={isDisabled}
              className="shadow-2xl"
            />
          </div>
        ))}
      </div>

      {/* Instruction */}
      {!isDisabled && (
        <p className="mt-12 text-purple-400/60 text-sm animate-pulse">
          ✨ 카드를 클릭하세요 ✨
        </p>
      )}

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-purple-400/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            ✦
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDeck;
