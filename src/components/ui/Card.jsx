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
      disabled={isDisabled}
      className={`
        relative w-24 h-36 sm:w-32 sm:h-48 md:w-40 md:h-56 lg:w-48 lg:h-64
        cursor-pointer transition-all duration-300
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-2xl'}
        ${className}
      `}
      style={style}
    >
      {/* Card Back Design */}
      <div className={`
        absolute inset-0 rounded-xl shadow-lg
        bg-gradient-to-br from-purple-900 to-indigo-900
        border-4 border-purple-500/50
        overflow-hidden
        transition-all duration-300
        ${!isDisabled ? 'hover:border-purple-400 hover:shadow-purple-500/50' : ''}
      `}>
        {/* Mystical Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mystical-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="currentColor" className="text-purple-300" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mystical-pattern)" />
          </svg>
        </div>

        {/* Center Symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl sm:text-5xl text-purple-300/80 animate-pulse">
            ✧
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-purple-400/50"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-purple-400/50"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-purple-400/50"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-purple-400/50"></div>

        {/* Inner Border */}
        <div className="absolute inset-2 rounded-lg border border-purple-400/30"></div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Card;
