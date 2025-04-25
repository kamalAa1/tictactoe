import { useEffect, useState } from 'react';

const usePlatform = () => {
  const [platform, setPlatform] = useState('Unknown');

  useEffect(() => {
    const detectPlatform = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // iOS detection
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'iOS';
      }

      // Android detection
      if (/android/i.test(userAgent)) {
        return 'Android';
      }

      // Browser detection
      if (
        typeof window !== 'undefined' &&
        typeof window.document !== 'undefined'
      ) {
        return 'Browser';
      }

      return 'Unknown';
    };

    setPlatform(detectPlatform());
  }, []);

  return platform;
};

export default usePlatform;
