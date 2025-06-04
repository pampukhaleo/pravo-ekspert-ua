
import { useEffect } from 'react';

export const usePerformanceOptimization = () => {
  useEffect(() => {
    // Preload критически важные ресурсы
    const preloadCriticalResources = () => {
      // Preload шрифты
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.as = 'font';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap';
      fontLink.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink);

      // Preload критически важные изображения
      const logoImage = new Image();
      logoImage.src = '/logonise.png';
    };

    // Оптимизация прокрутки
    const optimizeScrollPerformance = () => {
      let ticking = false;
      
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            // Здесь можно добавить логику для оптимизации при прокрутке
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    };

    preloadCriticalResources();
    const cleanupScroll = optimizeScrollPerformance();

    return cleanupScroll;
  }, []);

  // Функция для оптимизации изображений
  const getOptimizedImageSrc = (originalSrc: string, width?: number) => {
    // В реальном проекте здесь можно добавить логику для 
    // автоматической генерации WebP версий или изменения размера
    return originalSrc;
  };

  return {
    getOptimizedImageSrc
  };
};
