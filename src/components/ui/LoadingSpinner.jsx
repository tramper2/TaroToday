/**
 * LoadingSpinner Component
 * 로딩 스피너 컴포넌트
 */

import React from 'react';

const LoadingSpinner = ({ progress = 0, message = '카드를 준비 중입니다...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-mystical-900 via-mystical-800 to-mystical-700 p-4">
      {/* Mystic Circle Animation */}
      <div className="relative w-32 h-32 mb-8">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-pulse"></div>
        <div className="absolute inset-2 border-4 border-purple-400/30 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
        <div className="absolute inset-4 border-4 border-purple-300/30 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>

        {/* Center Star */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl animate-pulse">✨</div>
        </div>
      </div>

      {/* Loading Message */}
      <h2 className="text-2xl md:text-3xl font-bold text-purple-200 mb-4 text-shadow-mystical text-center">
        {message}
      </h2>

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="w-full max-w-md">
          <div className="flex justify-between text-purple-300 mb-2">
            <span className="text-sm">로딩 중...</span>
            <span className="text-sm font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-purple-900/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Floating Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-purple-300/20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
          >
            ✦
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
