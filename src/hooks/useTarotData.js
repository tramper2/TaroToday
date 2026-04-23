/**
 * useTarotData Hook
 * 타로 데이터 로드 및 관리를 위한 커스텀 훅
 */

import { useState, useEffect } from 'react';
import tarotData from '../data/tarot-data-ko.json';

/**
 * 타로 데이터를 로드하고 관리하는 훅
 * @returns {Object} 타로 데이터와 상태
 */
export const useTarotData = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 타로 데이터 로드
    try {
      setCards(tarotData.cards);
      setIsLoading(false);
    } catch (err) {
      console.error('타로 데이터 로드 실패:', err);
      setError(err);
      setIsLoading(false);
    }
  }, []);

  /**
   * ID로 카드를 찾습니다
   * @param {number} id - 카드 ID
   * @returns {Object|null} 카드 객체
   */
  const findCardById = (id) => {
    return cards.find(card => card.id === id) || null;
  };

  /**
   * 무작위 카드를 뽑습니다
   * @returns {Object} 카드 객체
   */
  const drawRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
  };

  /**
   * 슈트로 카드를 필터링합니다
   * @param {string} suit - 슈트 (major, wands, cups, swords, pentacles)
   * @returns {Array} 필터링된 카드 배열
   */
  const getCardsBySuit = (suit) => {
    return cards.filter(card => card.suit === suit);
  };

  /**
   * Major Arcana 카드를 가져옵니다
   * @returns {Array} Major Arcana 카드 배열
   */
  const getMajorArcana = () => {
    return getCardsBySuit('major');
  };

  /**
   * Minor Arcana 카드를 가져옵니다
   * @returns {Array} Minor Arcana 카드 배열
   */
  const getMinorArcana = () => {
    return cards.filter(card => card.arcana === 'Minor');
  };

  return {
    cards,
    isLoading,
    error,
    findCardById,
    drawRandomCard,
    getCardsBySuit,
    getMajorArcana,
    getMinorArcana
  };
};
