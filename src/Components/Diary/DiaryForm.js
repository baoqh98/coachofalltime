import React, { useRef, useState, useContext, useEffect } from 'react';

// custom hooks

// store
import { URL } from '../../store/URL';

// context
import { DiaryContext } from '../../store/diary-context';
import { AuthContext } from '../../store/auth-context';

// UI
import { Col, Row } from 'react-grid-system';
import ButtonPrimary from '../../UI/Button/ButtonPrimary';
import ButtonSecondary from '../../UI/Button/ButtonSecondary';
import classes from './DiaryForm.module.css';
import FormStatus from './FormStatus';
import validationHelper from '../../helper/firebase/validation/validationHelper';

const defaultError = {
  isError: false,
  errorMessage: null,
};

const DiaryForm = (props) => {
  const diaryCtx = useContext(DiaryContext);
  const [imagesUpload, setImagesUpload] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState(defaultError);
  const { userUID } = useContext(AuthContext);

  const titleRef = useRef(null);
  const videoRef = useRef(null);
  const textareaRef = useRef(null);
  const opponentRef = useRef(null);
  const teamScoreRef = useRef(null);
  const opponentScoreRef = useRef(null);
  const dateRef = useRef(null);
  const locationRef = useRef(null);

  const selectFilesHandler = (event) => {
    const fileList = event.target.files;
    const files = Array.from(fileList);
    setImagesUpload(files);
  };

  const uploadFileHandler = (enteredInfoRecap) => {
    const fileName = `${
      enteredInfoRecap.title.split(' ').join('-') || 'Filename'
    }-${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`;

    const finalFile = {
      ...enteredInfoRecap,
      imagesRef: `${userUID}/diary/images-${fileName}`,
    };

    diaryCtx
      .uploadRecapItem(
        `${URL}/${userUID}/diary-files.json`,
        finalFile,
        imagesUpload,
        fileName,
        userUID
      )
      .then(() => setIsUploaded(true))
      .catch((error) => {
        console.log(error);
        setError((prevState) => {
          return {
            ...prevState,
            isError: true,
            errorMessage: error.message,
          };
        });
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredInfoRecap = {
      title: titleRef.current.value,
      video: videoRef.current.value,
      textarea: textareaRef.current.value,
      opponent: opponentRef.current.value,
      teamScore: teamScoreRef.current.value,
      opponentScore: opponentScoreRef.current.value,
      date: dateRef.current.value,
      location: locationRef.current.value,
    };

    const allEnteredInfoIsEmpty = Object.values(enteredInfoRecap).every(
      (value) => value === ''
    );

    if (allEnteredInfoIsEmpty) {
      setError((prevState) => {
        return {
          ...prevState,
          isError: true,
          errorMessage: 'All fields is empty! Please input Once',
        };
      });
      return;
    }

    const isErrors = validationHelper(enteredInfoRecap);
    if (isErrors.title) {
      setError((prevState) => {
        return {
          ...prevState,
          isError: true,
          errorMessage: isErrors.title,
        };
      });
      return;
    }

    if (isErrors.video) {
      setError((prevState) => {
        return {
          ...prevState,
          isError: true,
          errorMessage: `${isErrors.video}: At this time, you only can use the copy URL video on Youtube (Right click and copy URL)`,
        };
      });
      return;
    }

    // console.log(isErrors);

    uploadFileHandler(enteredInfoRecap);
  };

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  if (isUploaded) {
    return (
      <FormStatus
        onResetUpload={() => {
          setImagesUpload([]);
          setIsUploaded((prevState) => !prevState);
        }}
      >
        Progress Successfully!
      </FormStatus>
    );
  }

  if (error.isError) {
    return (
      <FormStatus
        onResetUpload={() => {
          setError((prevState) => (prevState = defaultError));
        }}
      >
        {error.errorMessage}
      </FormStatus>
    );
  }

  return (
    <form className={classes['diary-form']} onSubmit={submitHandler}>
      <Row>
        <Col sm={8}>
          <div className={classes['recap-wrapper']}>
            <input
              ref={titleRef}
              className={classes['title-input']}
              type='text'
              name='title'
              placeholder='Recap titles'
              id=''
            />
            <div className={classes['media-input']}>
              <label htmlFor='imageInput'>
                {!imagesUpload.length && (
                  <>
                    <span>
                      <i className='fa-solid fa-image' />
                    </span>
                    <span>Upload your image</span>
                  </>
                )}
                {imagesUpload.length > 0 && (
                  <span className={classes.selected}>
                    {imagesUpload.length} files selected
                  </span>
                )}
                <input
                  onChange={selectFilesHandler}
                  className={classes['image-input']}
                  type='file'
                  name=''
                  id='imageInput'
                  multiple
                />
              </label>

              <label htmlFor='videoInput'>
                <span></span>
                <input
                  ref={videoRef}
                  className={classes['video-input']}
                  type='text'
                  name='url'
                  id='videoInput'
                  placeholder='Enter your record URL video'
                />
              </label>
            </div>

            <div className={classes['recap-writing']}>
              <textarea
                ref={textareaRef}
                className={classes['recap-textarea']}
                name='recap'
                id=''
                placeholder='How was the match?'
              />
            </div>
          </div>
        </Col>
        <Col
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          sm={4}
        >
          <div className={classes['info-wrapper']}>
            <input
              ref={opponentRef}
              className={classes['opponent-input']}
              type='text'
              placeholder='Opponent'
              name='Opponent'
              id=''
            />

            <label htmlFor='' className={classes['final-score']}>
              <span>Final Score: </span>
              <input
                ref={teamScoreRef}
                type='number'
                placeholder='Team'
                min={0}
                name='Team score'
              />
              <input
                ref={opponentScoreRef}
                type='number'
                placeholder='Opponent'
                min={0}
                name='Opponent score'
              />
            </label>

            <input
              ref={dateRef}
              className={classes['date-input']}
              type='date'
              name=''
              id=''
            />

            <input
              ref={locationRef}
              className={classes['location-input']}
              placeholder='Location'
              type='text'
              name=''
              id=''
            />
          </div>
          <div className={classes.action}>
            <ButtonSecondary onClick={props.onCloseModal}>
              Cancel
            </ButtonSecondary>
            <ButtonPrimary>Save</ButtonPrimary>
          </div>
        </Col>
      </Row>
    </form>
  );
};

export default DiaryForm;
