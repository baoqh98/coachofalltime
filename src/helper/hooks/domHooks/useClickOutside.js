import { useEffect } from 'react';

export const useClickOutside = (ref, callback, exceptionRef = null) => {
  useEffect(() => {
    const clickOutsideHandler = (event) => {
      if (event.target === ref.current) return;
      if (event.target === exceptionRef?.current) return;
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', clickOutsideHandler);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, [ref, callback, exceptionRef]);
};
