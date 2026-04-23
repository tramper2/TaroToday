/**
 * Image Helpers
 * 이미지 로딩 및 프리로딩을 위한 유틸리티 함수
 */

/**
 * 이미지를 프리로딩합니다
 * @param {string[]} srcArray - 이미지 경로 배열
 * @param {Function} onProgress - 진행률 콜백 함수 (progress: number)
 * @returns {Promise<string[]>} 로드된 이미지 경로 배열
 */
export const preloadImages = (srcArray, onProgress) => {
  return new Promise((resolve) => {
    if (!srcArray || srcArray.length === 0) {
      resolve([]);
      return;
    }

    let loadedCount = 0;
    const totalImages = srcArray.length;
    const loadedImages = [];

    srcArray.forEach((src) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        loadedCount++;
        loadedImages.push(src);

        if (onProgress) {
          onProgress((loadedCount / totalImages) * 100);
        }

        if (loadedCount === totalImages) {
          resolve(loadedImages);
        }
      };

      img.onerror = () => {
        // 실패해도 계속 진행
        loadedCount++;

        if (onProgress) {
          onProgress((loadedCount / totalImages) * 100);
        }

        if (loadedCount === totalImages) {
          resolve(loadedImages);
        }
      };
    });
  });
};

/**
 * 단일 이미지가 로드되었는지 확인합니다
 * @param {string} src - 이미지 경로
 * @returns {Promise<boolean>} 로드 완료 여부
 */
export const isImageLoaded = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;

    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

/**
 * 이미지 크기를 조정합니다
 * @param {string} src - 이미지 경로
 * @param {number} maxWidth - 최대 너비
 * @param {number} maxHeight - 최대 높이
 * @returns {Promise<HTMLImageElement>} 조정된 이미지 엘리먼트
 */
export const resizeImage = (src, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // 가로세로 비율 유지하며 크기 조정
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const resizedImg = new Image();
      resizedImg.src = canvas.toDataURL('image/webp');
      resizedImg.onload = () => resolve(resizedImg);
      resizedImg.onerror = reject;
    };

    img.onerror = reject;
  });
};

/**
 * Blob URL을 생성합니다 (외부 이미지용)
 * @param {string} url - 이미지 URL
 * @returns {Promise<string>} Blob URL
 */
export const fetchImageAsBlob = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('이미지 로드 실패:', error);
    return url;
  }
};
