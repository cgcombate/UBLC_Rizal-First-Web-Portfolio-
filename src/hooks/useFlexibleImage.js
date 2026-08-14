import { useCallback, useEffect, useState } from 'react';

const FALLBACK_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif'];

const swapExtension = (path, ext) => path.replace(/\.[^/.]+$/, `.${ext}`);

const getOriginalExtension = (src) => {
  const match = src.match(/\.([^/.?#]+)(?:\?|#|$)/);
  return match ? match[1].toLowerCase() : 'jpg';
};

export const useFlexibleImage = (src, placeholderUrl) => {
  const originalExt = getOriginalExtension(src);
  const orderedExtensions = [
    originalExt,
    ...FALLBACK_EXTENSIONS.filter((ext) => ext !== originalExt),
  ];

  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    setIndex(0);
    setIsLoaded(false);
    setIsFailed(false);
  }, [src]);

  const currentSrc = isFailed
    ? placeholderUrl
    : index === 0
      ? src
      : swapExtension(src, orderedExtensions[index]);

  const handleError = useCallback(() => {
    if (index < orderedExtensions.length - 1) {
      setIndex((current) => current + 1);
      setIsLoaded(false);
    } else {
      setIsFailed(true);
    }
  }, [index, orderedExtensions.length]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return { src: currentSrc, isLoaded, isFailed, handleError, handleLoad };
};