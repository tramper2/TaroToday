/**
 * Card Component
 * 개별 타로 카드 컴포넌트
 */

import React from 'react';

const Card = ({
  onClick,
  isDisabled = false,
  style = {},
  className = '',
  showBack = true
}) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' && !isDisabled) onClick();
      }}
      className={`
        relative w-24 h-36 sm:w-32 sm:h-48 md:w-40 md:h-60 lg:w-48 lg:h-72
        cursor-pointer transition-all duration-300
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-2xl'}
        ${className}
      `}
      style={style}
    >
      {/* Card Back Design */}
      <div className={`
        absolute inset-0 rounded-xl shadow-lg
        bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900
        border-4 border-purple-400/60
        overflow-hidden
        transition-all duration-300
        ${!isDisabled ? 'hover:border-purple-300 hover:shadow-purple-400/70' : ''}
      `}>

        {/* Mystical Dots Pattern - CSS only */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, #a78bfa 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        ></div>

        {/* Center Symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-7xl sm:text-8xl md:text-9xl text-purple-200 animate-pulse">
            ✧
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-purple-300/70"></div>
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-purple-300/70"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-purple-300/70"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-purple-300/70"></div>

        {/* Inner Border */}
        <div className="absolute inset-4 rounded-lg border-2 border-purple-300/40"></div>

        {/* Additional Inner Border */}
        <div className="absolute inset-6 rounded-lg border border-purple-400/20"></div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-400/20 via-transparent to-transparent pointer-events-none"></div>

        {/* Center Glow */}
        <div className="absolute inset-1/3 rounded-full bg-purple-500/10 blur-xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Card;
