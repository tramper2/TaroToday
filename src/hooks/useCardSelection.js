/**
 * useCardSelection Hook
 * 카드 선택 및 정/역방향 결정을 위한 커스텀 훅
 */

import { useState, useCallback } from 'react';

/**
 * 카드 선택을 관리하는 훅
 * @param {Array} cards - 타로 카드 데이터 배열
 * @returns {Object} 카드 선택 상태와 함수들
 */
export const useCardSelection = (cards) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isReversed, setIsReversed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  /**
   * 무작위 카드를 뽑습니다
   * @returns {Object|null} 선택된 카드와 방향 정보
   */
  const drawCard = useCallback(() => {
    if (!cards || cards.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * cards.length);
    const card = cards[randomIndex];
    const reversed = Math.random() < 0.5; // 50% 확률로 역방향

    setSelectedCard(card);
    setIsReversed(reversed);
    setIsAnimating(true);

    return { card, isReversed: reversed };
  }, [cards]);

  /**
   * 카드 선택을 초기화합니다
   */
  const resetSelection = useCallback(() => {
    setSelectedCard(null);
    setIsReversed(false);
    setIsAnimating(false);
  }, []);

  /**
   * 특정 카드를 선택합니다 (테스트용)
   * @param {Object} card - 선택할 카드
   * @param {boolean} reversed - 역방향 여부
   */
  const selectCard = useCallback((card, reversed = false) => {
    setSelectedCard(card);
    setIsReversed(reversed);
    setIsAnimating(true);
  }, []);

  /**
   * 애니메이션 완료를 처리합니다
   */
  const finishAnimation = useCallback(() => {
    setIsAnimating(false);
  }, []);

  return {
    selectedCard,
    isReversed,
    isAnimating,
    drawCard,
    resetSelection,
    selectCard,
    finishAnimation
  };
};
