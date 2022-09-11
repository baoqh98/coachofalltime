import React from 'react';
import ModalDialog from './ModalDialog';
import Overlay from './Overlay';

const Modal = (props) => {
  const showModalHandler = () => {
    props.onShowModal();
  };

  const callBackHandler = () => {
    if (props.onCallBack) {
      props.onCallBack();
    }
  };
  return (
    <>
      <Overlay onCallBack={callBackHandler} onClick={showModalHandler}>
        <ModalDialog>{props.children}</ModalDialog>
      </Overlay>
    </>
  );
};

export default Modal;
