/**
 * Share Helpers
 * 공유 기능을 위한 유틸리티 함수
 */

import html2canvas from 'html2canvas';
import { getCardNameKo, getCardKeywords } from './cardMapper';

/**
 * 엘리먼트를 이미지로 캡처합니다
 * @param {HTMLElement} element - 캡처할 엘리먼트
 * @param {Object} options - html2canvas 옵션
 * @returns {Promise<string>} Data URL
 */
export const captureElementAsImage = async (element, options = {}) => {
  const defaultOptions = {
    backgroundColor: '#0f0c29',
    scale: 2,
    logging: false,
    useCORS: true,
    allowTaint: true,
    ...options
  };

  try {
    const canvas = await html2canvas(element, defaultOptions);
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('이미지 캡처 실패:', error);
    throw error;
  }
};

/**
 * 이미지를 다운로드합니다
 * @param {string} dataUrl - Data URL
 * @param {string} filename - 파일 이름
 */
export const downloadImage = (dataUrl, filename) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename || 'tarot-result.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * URL을 클립보드에 복사합니다
 * @param {string} url - 복사할 URL
 * @returns {Promise<boolean>} 성공 여부
 */
export const copyUrlToClipboard = async (url = window.location.href) => {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch (error) {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackError) {
      console.error('URL 복사 실패:', fallbackError);
      return false;
    }
  }
};

/**
 * Web Share API를 사용하여 공유합니다
 * @param {Object} shareData - 공유 데이터
 * @returns {Promise<boolean>} 성공 여부
 */
export const shareContent = async (shareData) => {
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('공유 실패:', error);
      }
      return false;
    }
  }
  return false;
};

/**
 * 타로 결과를 공유합니다
 * @param {Object} cardData - 카드 데이터
 * @param {boolean} isReversed - 역방향 여부
 * @returns {Promise<boolean>} 성공 여부
 */
export const shareTarotResult = async (cardData, isReversed) => {
  const orientation = isReversed ? '역방향' : '정방향';
  const cardName = getCardNameKo(cardData);
  const keywords = getCardKeywords(cardData);
  const text = `🔮 오늘의 타로 카드\n\n${cardName} (${orientation})\n\n"${keywords.join(', ')}"\n\n#TarotToday #오늘의운세`;

  if (navigator.share) {
    return await shareContent({
      title: '오늘의 타로 카드',
      text: text,
      url: window.location.href
    });
  }

  return false;
};

/**
 * 텍스트를 클립보드에 복사합니다
 * @param {string} text - 복사할 텍스트
 * @returns {Promise<boolean>} 성공 여부
 */
export const copyTextToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackError) {
      console.error('텍스트 복사 실패:', fallbackError);
      return false;
    }
  }
};

/**
 * 소셜 미디어 공유 URL을 생성합니다
 * @param {string} platform - 플랫폼 (twitter, facebook, etc.)
 * @param {string} text - 공유할 텍스트
 * @param {string} url - 공유할 URL
 * @returns {string} 공유 URL
 */
export const getSocialShareUrl = (platform, text, url = window.location.href) => {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case 'kakaotalk':
      // 카카오톡은 별도의 SDK가 필요합니다
      return null;
    default:
      return null;
  }
};

/**
 * 파일 이름을 생성합니다
 * @param {Object} cardData - 카드 데이터
 * @param {boolean} isReversed - 역방향 여부
 * @returns {string} 파일 이름
 */
export const generateFileName = (cardData, isReversed) => {
  const date = new Date().toISOString().split('T')[0];
  const orientation = isReversed ? 'reversed' : 'upright';
  const cardName = cardData.name.replace(/\s+/g, '-').toLowerCase();
  return `tarot-${date}-${cardName}-${orientation}.png`;
};
