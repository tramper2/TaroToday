/**
 * CardDisplay Component
 * Framer Motion을 사용한 카드 뒤집기 애니메이션 컴포넌트
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCardImagePath, getCardNameKo } from '../../utils/cardMapper';

const CardDisplay = ({ card, isReversed = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef(null);

  if (!card) {
    return null;
  }

  const imagePath = getCardImagePath(card);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div
        ref={cardRef}
        className="relative w-64 h-96 md:w-80 md:h-[480px] cursor-pointer"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: '1000px' }}
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            // Card Back
            <motion.div
              key="back"
              className="absolute inset-0 rounded-2xl shadow-2xl bg-gradient-to-br from-purple-900 to-indigo-900 border-4 border-purple-500/50 flex items-center justify-center"
              initial={{ rotateY: 0 }}
              exit={{ rotateY: 180 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{ backfaceVisibility: 'hidden' }}
            >
              {/* Mystical Pattern */}
              <div className="absolute inset-0 opacity-20 rounded-2xl overflow-hidden">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="mystical-pattern-back" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1" fill="currentColor" className="text-purple-300" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mystical-pattern-back)" />
                </svg>
              </div>

              {/* Center Symbol */}
              <div className="text-6xl text-purple-300/80 animate-pulse">
                ✧
              </div>

              {/* Corner Decorations */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-purple-400/50"></div>
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-purple-400/50"></div>
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-purple-400/50"></div>
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-purple-400/50"></div>

              {/* Inner Border */}
              <div className="absolute inset-3 rounded-xl border border-purple-400/30"></div>
            </motion.div>
          ) : (
            // Card Front
            <motion.div
              key="front"
              className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-purple-950 to-indigo-950 border-4 border-purple-500/30"
              initial={{ rotateY: -180 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: -180 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{
                backfaceVisibility: 'hidden',
                transform: isReversed ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            >
              {/* Card Image */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-purple-900/50">
                    <div className="animate-spin text-4xl">✨</div>
                  </div>
                )}
                <img
                  src={imagePath}
                  alt={getCardNameKo(card)}
                  className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>

              {/* Card Name Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-center font-bold text-lg drop-shadow-lg">
                  {getCardNameKo(card)}
                </p>
                <p className="text-purple-300 text-center text-sm">
                  {isReversed ? '역방향' : '정방향'}
                </p>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-transparent pointer-events-none"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Click Instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 text-purple-300/80 text-sm animate-pulse"
      >
        카드를 클릭하여 뒤집기
      </motion.p>
    </div>
  );
};

export default CardDisplay;
