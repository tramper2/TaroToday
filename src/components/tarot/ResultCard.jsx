/**
 * ResultCard Component
 * 카드 결과 표시 컴포넌트
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCardImagePath, getCardMeaning, getCardKeywords, getCardNameKo } from '../../utils/cardMapper';
import { HiShare, HiRefresh } from 'react-icons/hi';

const ResultCard = ({ card, isReversed, onReset }) => {
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const resultRef = useRef(null);

  if (!card) {
    return null;
  }

  const imagePath = getCardImagePath(card);
  const meaning = getCardMeaning(card, isReversed);
  const [luckyNumbers, setLuckyNumbers] = useState([]);
  const keywords = getCardKeywords(card);
  const orientation = isReversed ? '역방향' : '정방향';

  // 로또 번호 생성 (1~45 중 3개)
  useEffect(() => {
    const numbers = [];
    while (numbers.length < 3) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    setLuckyNumbers(numbers.sort((a, b) => a - b));
  }, []);

  const handleShare = async (type) => {
    switch (type) {
      case 'image':
        // 이미지로 저장 기능 (구현 필요)
        console.log('이미지 저장');
        break;
      case 'url':
        // URL 복사 기능 (구현 필요)
        navigator.clipboard.writeText(window.location.href);
        alert('URL이 복사되었습니다.');
        break;
      case 'text':
        const text = `🔮 오늘의 타로 카드\n\n${card.name} (${orientation})\n\n키워드: ${keywords.join(', ')}\n\n${meaning.join('\n')}`;
        navigator.clipboard.writeText(text);
        alert('운세 내용이 복사되었습니다.');
        break;
    }
    setShareMenuOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 py-12">
      <motion.div
        ref={resultRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-card mx-auto"
      >
        {/* Card Display */}
        <div className="relative mb-8">
          <motion.div
            className="relative w-64 h-96 md:w-80 md:h-[480px] mx-auto rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-purple-950 to-indigo-950 border-4 border-purple-500/30"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            style={{
              transform: isReversed ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={imagePath}
                alt={card.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Card Name Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4" style={{ transform: isReversed ? 'rotate(180deg)' : 'rotate(0deg)', transformOrigin: 'center bottom' }}>
              <p className="text-white text-center font-bold text-lg drop-shadow-lg">
                {getCardNameKo(card)}
              </p>
              <p className="text-purple-300 text-center text-sm">
                {orientation}
              </p>
            </div>
          </motion.div>

          {/* Glow Effect */}
          <div className="absolute inset-0 -z-10 bg-purple-500/20 blur-3xl rounded-full scale-150"></div>
        </div>

        {/* Card Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-purple-900/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-purple-500/30 shadow-xl"
        >
          {/* Keywords */}
          <div className="mb-6">
            <h3 className="text-purple-300 font-semibold mb-2 text-sm uppercase tracking-wide">
              키워드
            </h3>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-800/50 text-purple-200 rounded-full text-sm border border-purple-500/30"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Meaning */}
          <div className="mb-6">
            <h3 className="text-purple-300 font-semibold mb-3 text-sm uppercase tracking-wide">
              해석
            </h3>
            <ul className="space-y-4 mb-10">
              {meaning.map((text, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start text-purple-100/90 text-sm leading-relaxed"
                >
                  <span className="text-purple-400 mr-3 mt-1">✦</span>
                  {text}
                </motion.li>
              ))}
            </ul>

            {/* Lucky Numbers Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-xl p-6 border border-purple-500/20 text-center mb-8"
            >
              <h4 className="text-purple-300 text-xs font-semibold uppercase tracking-widest mb-3">
                오늘의 행운로또 번호
              </h4>
              <div className="flex justify-center gap-3">
                {luckyNumbers.map((num, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 text-purple-900 font-bold flex items-center justify-center shadow-lg shadow-yellow-500/20"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Card Info */}
          <div className="flex items-center justify-between text-xs text-purple-400/60 pt-4 border-t border-purple-500/20">
            <span>{card.arcana} Arcana</span>
            {card.suit !== 'major' && (
              <span className="capitalize">{card.suit}</span>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex gap-4 mt-8"
        >
          <button
            onClick={onReset}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 hover:shadow-purple-500/50 hover:scale-105 flex items-center justify-center gap-2"
          >
            <HiRefresh className="w-5 h-5" />
            다시 뽑기
          </button>

          <div className="relative">
            <button
              onClick={() => setShareMenuOpen(!shareMenuOpen)}
              className="py-3 px-6 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 hover:shadow-pink-500/50 hover:scale-105 flex items-center justify-center gap-2"
            >
              <HiShare className="w-5 h-5" />
              공유하기
            </button>

            {/* Share Dropdown */}
            {shareMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-full mb-2 left-0 right-0 bg-purple-900/95 backdrop-blur-sm rounded-xl border border-purple-500/30 shadow-xl overflow-hidden"
              >
                <button
                  onClick={() => handleShare('image')}
                  className="w-full py-3 px-4 text-left text-purple-200 hover:bg-purple-800/50 transition-colors text-sm"
                >
                  이미지로 저장
                </button>
                <button
                  onClick={() => handleShare('url')}
                  className="w-full py-3 px-4 text-left text-purple-200 hover:bg-purple-800/50 transition-colors text-sm"
                >
                  URL 복사
                </button>
                <button
                  onClick={() => handleShare('text')}
                  className="w-full py-3 px-4 text-left text-purple-200 hover:bg-purple-800/50 transition-colors text-sm"
                >
                  텍스트 복사
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResultCard;
