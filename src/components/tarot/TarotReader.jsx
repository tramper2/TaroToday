/**
 * TarotReader Component
 * 메인 타로 리딩 컴포넌트
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTarotData } from '../../hooks/useTarotData';
import { useCardSelection } from '../../hooks/useCardSelection';
import { useImagePreload } from '../../hooks/useImagePreload';
import CardDeck from '../ui/CardDeck';
import ResultCard from './ResultCard';
import LoadingSpinner from '../ui/LoadingSpinner';

const TarotReader = () => {
  const { cards, isLoading: dataLoading } = useTarotData();
  const { selectedCard, isReversed, isAnimating, drawCard, resetSelection } = useCardSelection(cards);
  const { progress, isComplete: preloadComplete, isLoading: preloadLoading } = useImagePreload();

  const [showResult, setShowResult] = useState(false);

  // 카드 선택 후 결과 화면 표시
  useEffect(() => {
    if (selectedCard && isAnimating) {
      const timer = setTimeout(() => {
        setShowResult(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [selectedCard, isAnimating]);

  // 카드 뽑기
  const handleCardSelect = () => {
    if (!isAnimating) {
      drawCard();
    }
  };

  // 다시 뽑기
  const handleReset = () => {
    setShowResult(false);
    resetSelection();
  };

  // 로딩 상태
  if (dataLoading || preloadLoading) {
    return <LoadingSpinner progress={progress} />;
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <CardDeck
            key="deck"
            onCardSelect={handleCardSelect}
            isDisabled={isAnimating}
          />
        ) : (
          <ResultCard
            key="result"
            card={selectedCard}
            isReversed={isReversed}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TarotReader;
