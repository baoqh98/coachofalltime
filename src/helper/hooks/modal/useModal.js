import { useState } from 'react';

import './useModal.css';

export const useModal = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  return [
    isShowModal,
    () => {
      setIsShowModal((prevBoolean) => !prevBoolean);
      document.body.classList.toggle('stopScrolling');
    },
  ];
};
