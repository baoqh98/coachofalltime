import React from 'react';
import { Col, Row } from 'react-grid-system';

import { useModal } from '../helper/hooks/modal/useModal';

import DiaryFiles from '../Components/Diary/DiaryFiles';
import RecentlyView from '../Components/Diary/RecentlyView';
import Upload from '../Components/Diary/Upload';
import Modal from '../UI/Modal/Modal';
import UploadModalDialog from '../Components/Diary/UploadModalDialog';

const Diary = () => {
  const [isModalShow, showModalHandler] = useModal();

  return (
    <>
      {isModalShow && (
        <Modal onShowModal={showModalHandler}>
          <UploadModalDialog onCloseModal={showModalHandler} />
        </Modal>
      )}
      <Row>
        <Col sm={8}>
          <RecentlyView />
          <Upload onShowModal={showModalHandler} />
          <DiaryFiles />
        </Col>
        <Col sm={4}></Col>
      </Row>
    </>
  );
};

export default Diary;
