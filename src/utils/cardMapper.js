/**
 * Card Mapping Utility
 * 인덱스 기반으로 타로 카드 데이터와 이미지를 매핑하는 헬퍼 함수
 */

// Wikimedia Commons Rider-Waite Tarot Image URLs
const WIKIMEDIA_BASE_URL = 'https://upload.wikimedia.org/wikipedia/commons';

// Major Arcana 이미지 매핑 (0-21)
const MAJOR_ARCANA_IMAGES = [
  '0/0f/RWS_Tarot_00_Fool.jpg',      // 0 - The Fool
  '3/33/RWS_Tarot_01_Magician.jpg',  // 1 - The Magician
  '4/4d/RWS_Tarot_02_High_Priestess.jpg', // 2 - The High Priestess
  'd/db/RWS_Tarot_03_Empress.jpg',   // 3 - The Empress
  'c/c3/RWS_Tarot_04_Emperor.jpg',   // 4 - The Emperor
  '9/9e/RWS_Tarot_05_Hierophant.jpg', // 5 - The Hierophant
  '8/87/RWS_Tarot_06_Lovers.jpg',    // 6 - The Lovers
  'f/f4/RWS_Tarot_07_Chariot.jpg',   // 7 - The Chariot
  '7/7a/RWS_Tarot_08_Strength.jpg',  // 8 - Strength
  'e/e4/RWS_Tarot_09_Hermit.jpg',    // 9 - The Hermit
  '4/4f/RWS_Tarot_10_Wheel_of_Fortune.jpg', // 10 - Wheel of Fortune
  '9/94/RWS_Tarot_11_Justice.jpg',   // 11 - Justice
  'f/f1/RWS_Tarot_12_Hanged_Man.jpg', // 12 - The Hanged Man
  '6/62/RWS_Tarot_13_Death.jpg',     // 13 - Death
  '0/00/RWS_Tarot_14_Temperance.jpg', // 14 - Temperance
  '0/0b/RWS_Tarot_15_Devil.jpg',     // 15 - The Devil
  '3/3b/RWS_Tarot_16_Tower.jpg',     // 16 - The Tower
  '9/9b/RWS_Tarot_17_Star.jpg',      // 17 - The Star
  'b/bf/RWS_Tarot_18_Moon.jpg',      // 18 - The Moon
  '7/79/RWS_Tarot_19_Sun.jpg',       // 19 - The Sun
  'a/ac/RWS_Tarot_20_Judgement.jpg', // 20 - Judgement
  'e/e8/RWS_Tarot_21_World.jpg'      // 21 - The World
];

// Wands 이미지 매핑
const WANDS_IMAGES = [
  'a/a6/RWS_Tarot_00_Fool.jpg',      // Ace - placeholder
  '1/14/RWS_Tarot_Wands_01.jpg',     // 1 - Ace of Wands (placeholder)
  '2/23/RWS_Tarot_Wands_02.jpg',     // 2 - Two of Wands (placeholder)
  // ... 나머지 카드 이미지
];

/**
 * Wikimedia Commons 이미지 URL을 가져옵니다
 * @param {string} imagePath - 이미지 경로
 * @returns {string} 전체 URL
 */
const getWikimediaUrl = (imagePath) => {
  return `${WIKIMEDIA_BASE_URL}/thumb/${imagePath}/400px-${imagePath.split('/').pop()}`;
};

/**
 * 카드 데이터로부터 이미지 경로를 가져옵니다
 * @param {Object} cardData - 카드 데이터 객체
 * @returns {string} 이미지 URL
 */
export const getCardImagePath = (cardData) => {
  if (!cardData) return '/assets/images/card-back.svg';

  const { suit, number } = cardData;
  let imagePath;

  if (suit === 'major') {
    // Major Arcana
    imagePath = MAJOR_ARCANA_IMAGES[number] || MAJOR_ARCANA_IMAGES[0];
    return getWikimediaUrl(imagePath);
  } else {
    // Minor Arcana - 임시로 로컬 placeholder 사용
    // 나중에 실제 이미지로 교체 필요
    return `/assets/images/${suit}_${number}.svg`;
  }
};

/**
 * 모든 카드 이미지 경로 목록을 가져옵니다
 * @returns {string[]} 이미지 경로 배열
 */
export const getAllCardImagePaths = () => {
  const paths = [];

  // Major Arcana - Wikimedia URLs
  MAJOR_ARCANA_IMAGES.forEach(img => {
    paths.push(getWikimediaUrl(img));
  });

  // Minor Arcana - 임시 placeholder (나중에 실제 이미지로 교체)
  const suits = ['wands', 'cups', 'swords', 'pentacles'];
  suits.forEach(suit => {
    for (let i = 1; i <= 10; i++) {
      paths.push(`/assets/images/${suit}_${i}.svg`);
    }
    ['page', 'knight', 'queen', 'king'].forEach(rank => {
      paths.push(`/assets/images/${suit}_${rank}.svg`);
    });
  });

  // Card back
  paths.push('/assets/images/card-back.svg');

  return paths;
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
