import { useEffect } from 'react';
import { useState } from 'react';

const useDetectSize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const detectSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize);
    };
  });

  return {
    windowWidth,
  };
};

export default useDetectSize;
