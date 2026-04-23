/**
 * useImagePreload Hook
 * 이미지 프리로딩을 위한 커스텀 훅
 */

import { useState, useEffect } from 'react';
import { preloadImages } from '../utils/imageHelpers';
import { getAllCardImagePaths } from '../utils/cardMapper';

/**
 * 이미지 프리로딩을 관리하는 훅
 * @returns {Object} 프리로딩 상태
 */
export const useImagePreload = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const preloadAllImages = async () => {
      try {
        const imagePaths = getAllCardImagePaths();

        await preloadImages(imagePaths, (progressValue) => {
          if (isMounted) {
            setProgress(progressValue);
          }
        });

        if (isMounted) {
          setIsComplete(true);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('이미지 프리로딩 실패:', err);
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      }
    };

    preloadAllImages();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    progress,
    isComplete,
    isLoading,
    error
  };
};
