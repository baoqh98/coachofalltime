import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
  useReducer,
} from 'react';

// custom hook
import { useClickOutside } from '../../../helper/hooks/domHooks/useClickOutside';

import { useNavigate, useParams } from 'react-router-dom';

// UI
import { Row, Col } from 'react-grid-system';
import SegmentedControl from '../../../UI/SegmentedControl/SegmentedControl';

// css
import classes from './DiaryFileDetail.module.css';

// context
import { DiaryContext } from '../../../store/diary-context';
import { AuthContext } from '../../../store/auth-context';
import { URL } from '../../../store/URL';

// UI
import ButtonUpdateFile from './ButtonUpdateFile';
import StreamingSection from './StreamingSection';
import RecapTextEditor from './RecapTextEditor';
import UpdateImages from './UpdateImages';
import ViewImages from './ViewImages';
import validationHelper from '../../../helper/firebase/validation/validationHelper';

const isEditingDefault = {
  isEditingTitle: false,
  isEditingOpponent: false,
  isEditingDate: false,
  isEditingScore: false,
  isEditingLocation: false,
};

const isEditingReducer = (state, action) => {
  switch (action.type) {
    case 'title':
      return {
        ...state,
        isEditingTitle: true,
      };
    case 'opponent':
      return {
        ...state,
        isEditingOpponent: true,
      };
    case 'date':
      return {
        ...state,
        isEditingDate: true,
      };
    case 'score':
      return {
        ...state,
        isEditingScore: true,
      };
    case 'location':
      return {
        ...state,
        isEditingLocation: true,
      };
    default:
      return isEditingDefault;
  }
};

const DiaryFileDetail = () => {
  // param
  const params = useParams();

  // State
  const [mediaSegment, setMediaSegment] = useState('images');
  const [isShowImage, setIsShowImage] = useState(false);
  const [imageDetailURL, setImageDetailURL] = useState(null);
  const [errors, setErrors] = useState({});

  // reducer state
  const [isEditing, dispatchIsEditing] = useReducer(
    isEditingReducer,
    isEditingDefault
  );

  const dispatchIsEditingDefault = () => {
    dispatchIsEditing({ type: 'DEFAULT' });
  };

  const titleRef = useRef();
  const opponentRef = useRef();
  const dateRef = useRef();
  const teamScoreRef = useRef();
  const opponentScoreRef = useRef();
  const locationRef = useRef();
  const videoRef = useRef();
  const buttonRef = useRef();

  useClickOutside(titleRef, dispatchIsEditingDefault, buttonRef);
  useClickOutside(opponentRef, dispatchIsEditingDefault, buttonRef);
  useClickOutside(dateRef, dispatchIsEditingDefault, buttonRef);
  useClickOutside(teamScoreRef, dispatchIsEditingDefault, buttonRef);
  useClickOutside(opponentScoreRef, dispatchIsEditingDefault, buttonRef);
  useClickOutside(locationRef, dispatchIsEditingDefault, buttonRef);

  // value
  const { id } = params;

  // context
  const diaryCtx = useContext(DiaryContext);
  const { userUID } = useContext(AuthContext);

  // action
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('/diary');
  };

  const segmentsControlHandler = (val) => {
    setMediaSegment(val);
  };

  // update specific info in recap
  const updateHandler = useCallback(
    (event, ref) => {
      if (!event.currentTarget) return;
      if (ref.type === 'score') {
        const teamScore = teamScoreRef.current.value;
        const opponentScore = opponentScoreRef.current.value;

        const newItemRecap = {
          ...diaryCtx.recapItem,
          teamScore,
          opponentScore,
        };
        diaryCtx
          .updateRecapItem(`${URL}/${userUID}`, newItemRecap, id)
          .then(() => {
            teamScoreRef.current.defaultValue = teamScore;
            opponentScoreRef.current.defaultValue = opponentScore;

            dispatchIsEditing({ type: 'default' });
          });

        return;
      }

      const { type } = ref.current.dataset;
      let value;
      if (ref.current.tagName === 'INPUT') {
        value = ref.current.value;
      } else {
        value = ref.current.innerText;
      }

      const newItemRecap = {
        ...diaryCtx.recapItem,
        [type]: value,
      };

      if (newItemRecap.video === '') {
        newItemRecap.video = videoRef.current.defaultValue;
        diaryCtx
          .updateRecapItem(`${URL}/${userUID}`, newItemRecap, id)
          .then(() => {
            if (ref.current.tagName === 'INPUT') {
              ref.current.defaultValue = '';
            }

            dispatchIsEditing({ type: 'default' });
          });
      }

      const errorMessage = validationHelper(newItemRecap);
      if (errorMessage.video) {
        setErrors(errorMessage);
        return;
      } else {
        diaryCtx
          .updateRecapItem(`${URL}/${userUID}`, newItemRecap, id)
          .then(() => {
            if (ref.current.tagName === 'INPUT') {
              ref.current.defaultValue = '';
            }

            dispatchIsEditing({ type: 'default' });
          });
      }
    },
    [diaryCtx, id, userUID]
  );

  const showImageHandler = (event, url) => {
    if (!event.currentTarget) return;
    setIsShowImage((prev) => !prev);
    setImageDetailURL(url);
  };

  const {
    title,
    date,
    teamScore,
    opponentScore,
    imagesRef,
    location,
    opponent,
    textarea,
    video,
  } = diaryCtx.recapItem;

  const { itemImagesList } = diaryCtx;

  // fetching
  useEffect(() => {
    diaryCtx.fetchItemRecap(`${URL}/${userUID}`, id);
    const unmountImageClosure = diaryCtx.fetchImagesItemRecap(
      `${URL}/${userUID}`,
      id
    );
    return () => {
      unmountImageClosure.then((unmount) => unmount());
    };
  }, []);

  return (
    <>
      {isShowImage && (
        <ViewImages
          onShowView={() => setIsShowImage((prev) => !prev)}
          src={imageDetailURL}
          images={itemImagesList}
        />
      )}
      <Row>
        <Col sm={8}>
          <nav className={classes['file-control__nav']}>
            <button
              onClick={navigateHandler}
              className={classes['file-control__nav-back']}
            >
              <i className='fa-solid fa-arrow-left'></i>
            </button>

            <div className={classes.title}>
              <h1
                contentEditable={true}
                suppressContentEditableWarning={true}
                ref={titleRef}
                data-text={'Click to update your title'}
                data-type='title'
                onClick={(event) => dispatchIsEditing({ type: 'title' })}
              >
                {title}
              </h1>
              {isEditing.isEditingTitle && (
                <ButtonUpdateFile
                  onRef={buttonRef}
                  refUpdate={titleRef}
                  onUpdate={(event, ref) => updateHandler(event, ref)}
                />
              )}
            </div>
          </nav>

          <StreamingSection video={video} extra={{ title: title }} />

          <RecapTextEditor textarea={textarea} />
        </Col>
        <Col sm={4}>
          <div className={classes['general-info']}>
            {/* <div className={classes.participants}>
            <h4>Players:</h4>
            <div className={classes.players}>
              <span className={classes.player}>
                <img src='/assets/blank-profile-picture.png' alt='' />
              </span>
              <span className={classes.player}>
                <img src='/assets/blank-profile-picture.png' alt='' />
              </span>
              <span className={classes.player}>
                <img src='/assets/blank-profile-picture.png' alt='' />
              </span>
              <span className={classes.player}>+more</span>
            </div>
          </div> */}
            <div className={classes.opponent}>
              <span>Opponent:</span>
              <p
                contentEditable={true}
                suppressContentEditableWarning={true}
                ref={opponentRef}
                data-text='Empty Opponent'
                data-type='opponent'
                onClick={(event) => dispatchIsEditing({ type: 'opponent' })}
              >
                {opponent}
              </p>
              {isEditing.isEditingOpponent && (
                <ButtonUpdateFile
                  onRef={buttonRef}
                  refUpdate={opponentRef}
                  onUpdate={(event, ref) => updateHandler(event, ref)}
                />
              )}
            </div>
            <div className={classes.box}>
              <div className={classes.date}>
                <label htmlFor='dateInput1'>Date: </label>
                <input
                  ref={dateRef}
                  data-type='date'
                  defaultValue={date}
                  id='dateInput'
                  type='date'
                  className={classes.dateInput}
                  onClick={(event) => dispatchIsEditing({ type: 'date' })}
                />
                <div className={classes.action}>
                  {isEditing.isEditingDate && (
                    <ButtonUpdateFile
                      onRef={buttonRef}
                      refUpdate={dateRef}
                      isIcon={true}
                      onUpdate={(event, ref) => updateHandler(event, ref)}
                    />
                  )}
                </div>
              </div>
              <div className={classes.scoreBox}>
                <span>Score:</span>
                <div className={classes.score}>
                  <input
                    type='number'
                    defaultValue={teamScore}
                    data-type='teamScore'
                    ref={teamScoreRef}
                    min={0}
                    className={classes.inputScore}
                    onClick={(event) => dispatchIsEditing({ type: 'score' })}
                  />
                  <span> : </span>
                  <input
                    type='number'
                    data-type='opponentScore'
                    defaultValue={opponentScore}
                    ref={opponentScoreRef}
                    min={0}
                    className={classes.inputScore}
                    onClick={(event) => dispatchIsEditing({ type: 'score' })}
                  />
                </div>
                <div className={classes.action}>
                  {isEditing.isEditingScore && (
                    <ButtonUpdateFile
                      onRef={buttonRef}
                      refUpdate={{ type: 'score' }}
                      isIcon={true}
                      onUpdate={(event, ref) => updateHandler(event, ref)}
                    />
                  )}
                </div>
              </div>
              <div className={classes.location}>
                <span>Location: </span>
                <span
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  ref={locationRef}
                  data-text='Empty Opponent'
                  data-type='location'
                  onClick={(event) => dispatchIsEditing({ type: 'location' })}
                >
                  {location}
                </span>
                <div className={classes.action}>
                  {isEditing.isEditingLocation && (
                    <ButtonUpdateFile
                      onRef={buttonRef}
                      refUpdate={locationRef}
                      isIcon={true}
                      onUpdate={(event, ref) => updateHandler(event, ref)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={classes.media}>
            <SegmentedControl
              name='group-1'
              callback={(val) => segmentsControlHandler(val)}
              defaultIndex={0}
              controlRef={useRef()}
              segments={[
                {
                  label: 'Images',
                  value: 'images',
                  ref: useRef(),
                },
                {
                  label: 'Links',
                  value: 'links',
                  ref: useRef(),
                },
              ]}
            />
            <div className={classes.box}>
              {mediaSegment === 'images' && (
                <div className={classes.images}>
                  <Row gutterWidth={4}>
                    <UpdateImages
                      imagesReferences={imagesRef}
                      payload={{ URL: `${URL}/${userUID}`, id }}
                    />
                    {itemImagesList.map((url) => {
                      return (
                        <Col sm={4} key={url}>
                          <img
                            src={url}
                            alt={url}
                            onClick={(event) => showImageHandler(event, url)}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              )}
              {mediaSegment === 'links' && (
                <>
                  <div className={classes.links}>
                    {video && (
                      <input
                        data-type='video'
                        placeholder={video}
                        defaultValue={video}
                        ref={videoRef}
                      />
                    )}
                    {!video && (
                      <input
                        data-type='video'
                        placeholder='Import youtube video url'
                        defaultValue={''}
                        ref={videoRef}
                      />
                    )}

                    <button onClick={(event) => updateHandler(event, videoRef)}>
                      {video ? 'Update' : 'Import'}
                    </button>
                  </div>
                  {!errors.video && (
                    <p className={classes.youtubeValidation}>
                      At this time, you only can use youtube video URL.
                      <span>
                        {' '}
                        (Right click to the video on youtube, select copy URL)
                      </span>
                    </p>
                  )}
                  {errors && (
                    <p className={classes.youtubeValidation}>{errors.video}</p>
                  )}
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DiaryFileDetail;
