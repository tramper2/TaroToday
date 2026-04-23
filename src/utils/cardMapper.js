import { CARD_NAMES_KO } from '../data/translations';

/**
 * Card Mapping Utility
 * 인덱스 기반으로 타로 카드 데이터와 이미지를 매핑하는 헬퍼 함수
 */

// Vite base URL for proper asset paths
const BASE_URL = import.meta.env.BASE_URL || '/';

// jsDelivr CDN for GitHub-hosted tarot images
// From metabismuth/tarot-json repository
const GITHUB_IMAGE_BASE_URL = 'https://cdn.jsdelivr.net/gh/metabismuth/tarot-json@master/cards';

/**
 * 코트 카드 이름을 숫자로 변환합니다
 * @param {string} courtCard - page, knight, queen, king
 * @returns {number} 11-14
 */
const courtCardToNumber = (courtCard) => {
  const mapping = {
    'page': 11,
    'knight': 12,
    'queen': 13,
    'king': 14
  };
  return mapping[courtCard] || 0;
};

/**
 * suit 문자열을 CDN 파일명 prefix로 변환합니다
 * @param {string} suit - wands, cups, swords, pentacles
 * @returns {string} w, c, s, p
 */
const suitToPrefix = (suit) => {
  const mapping = {
    'wands': 'w',
    'cups': 'c',
    'swords': 's',
    'pentacles': 'p'
  };
  return mapping[suit] || '';
};

/**
 * 숫자를 두 자리 문자열로 포맷팅합니다
 * @param {number} num - 숫자
 * @returns {string} 두 자리 문자열 (01, 02, ..., 14)
 */
const padTwo = (num) => {
  return num.toString().padStart(2, '0');
};

/**
 * 카드 데이터로부터 이미지 경로를 가져옵니다
 * @param {Object} cardData - 카드 데이터 객체
 * @returns {string} 이미지 URL
 */
export const getCardImagePath = (cardData) => {
  if (!cardData) return `${BASE_URL}assets/images/card-back.svg`;

  const { suit, number } = cardData;
  let imageUrl;

  if (suit === 'major') {
    // Major Arcana: m00.jpg - m21.jpg
    imageUrl = `${GITHUB_IMAGE_BASE_URL}/m${padTwo(number)}.jpg`;
  } else {
    // Minor Arcana: {suit_letter}{number}.jpg
    // 숫자 카드 (Ace=1, 2-10)와 코트 카드 (Page=11, Knight=12, Queen=13, King=14)
    let cardNumber;
    if (typeof number === 'string') {
      // 코트 카드
      cardNumber = courtCardToNumber(number);
    } else {
      // 숫자 카드
      cardNumber = number;
    }
    const prefix = suitToPrefix(suit);
    imageUrl = `${GITHUB_IMAGE_BASE_URL}/${prefix}${padTwo(cardNumber)}.jpg`;
  }

  return imageUrl;
};

/**
 * 모든 카드 이미지 경로 목록을 가져옵니다
 * @returns {string[]} 이미지 경로 배열
 */
export const getAllCardImagePaths = () => {
  const paths = [];

  // Major Arcana (m00.jpg - m21.jpg)
  for (let i = 0; i <= 21; i++) {
    paths.push(`${GITHUB_IMAGE_BASE_URL}/m${padTwo(i)}.jpg`);
  }

  // Wands (w01.jpg - w14.jpg)
  for (let i = 1; i <= 14; i++) {
    paths.push(`${GITHUB_IMAGE_BASE_URL}/w${padTwo(i)}.jpg`);
  }

  // Cups (c01.jpg - c14.jpg)
  for (let i = 1; i <= 14; i++) {
    paths.push(`${GITHUB_IMAGE_BASE_URL}/c${padTwo(i)}.jpg`);
  }

  // Swords (s01.jpg - s14.jpg)
  for (let i = 1; i <= 14; i++) {
    paths.push(`${GITHUB_IMAGE_BASE_URL}/s${padTwo(i)}.jpg`);
  }

  // Pentacles (p01.jpg - p14.jpg)
  for (let i = 1; i <= 14; i++) {
    paths.push(`${GITHUB_IMAGE_BASE_URL}/p${padTwo(i)}.jpg`);
  }

  // Card back
  paths.push(`${BASE_URL}assets/images/card-back.svg`);

  return paths;
};

/**
 * 카드의 한국어 이름을 가져옵니다
 * @param {Object} cardData - 카드 데이터 객체
 * @returns {string} 한국어 이름
 */
export const getCardNameKo = (cardData) => {
  if (!cardData) return '알 수 없는 카드';

  if (cardData.suit === 'major') {
    return CARD_NAMES_KO[cardData.number] || cardData.name;
  }

  return CARD_NAMES_KO[cardData.name] || cardData.name;
};

/**
 * 카드 ID로 카드를 찾습니다
 * @param {number} id - 카드 ID
 * @param {Array} cards - 카드 데이터 배열
 * @returns {Object|null} 카드 객체 또는 null
 */
export const findCardById = (id, cards) => {
  return cards.find(card => card.id === id) || null;
};

/**
 * 카드의 정방향/역방향 해석을 가져옵니다
 * @param {Object} card - 카드 데이터
 * @param {boolean} isReversed - 역방향 여부
 * @returns {string[]} 해석 배열
 */
export const getCardMeaning = (card, isReversed = false) => {
  if (!card) return [];
  return isReversed ? card.meaning_rev : card.meaning_up;
};

/**
 * 카드의 키워드를 가져옵니다
 * @param {Object} card - 카드 데이터
 * @returns {string[]} 키워드 배열
 */
export const getCardKeywords = (card) => {
  if (!card) return [];
  return card.keywords || [];
};

/**
 * 카드가 Major Arcana인지 확인합니다
 * @param {Object} card - 카드 데이터
 * @returns {boolean} Major Arcana 여부
 */
export const isMajorArcana = (card) => {
  return card && card.arcana === 'Major';
};

/**
 * 카드가 Minor Arcana인지 확인합니다
 * @param {Object} card - 카드 데이터
 * @returns {boolean} Minor Arcana 여부
 */
export const isMinorArcana = (card) => {
  return card && card.arcana === 'Minor';
};

/**
 * 카드의 Court Card(Page, Knight, Queen, King)인지 확인합니다
 * @param {Object} card - 카드 데이터
 * @returns {boolean} Court Card 여부
 */
export const isCourtCard = (card) => {
  if (!card) return false;
  return typeof card.number === 'string';
};
