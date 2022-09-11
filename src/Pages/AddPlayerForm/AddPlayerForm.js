import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';
import { resetRefForm } from '../../helper/form/resetForm';

import { AuthContext } from '../../store/auth-context';

import { URL } from '../../store/URL';

import ButtonPrimary from '../../UI/Button/ButtonPrimary';
import ButtonSecondary from '../../UI/Button/ButtonSecondary';
import { useHttps } from '../../helper/hooks/https/useHttps';

import SuccessStatus from '../../UI/Status/Success/SuccessStatus';

import classes from './AddPlayerForm.module.css';

const AddPlayerForm = ({ player, onSuccess, onShowModal, type }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { userUID } = useContext(AuthContext);

  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const countryRef = useRef(null);
  const heightRef = useRef(null);
  const weightRef = useRef(null);
  const numberRef = useRef(null);
  const positionRef = useRef(null);
  const footRef = useRef(null);
  const imageRef = useRef(null);
  const attackRef = useRef(null);
  const defensiveRef = useRef(null);
  const passingRef = useRef(null);
  const movingRef = useRef(null);

  const [squadState, sendRequest] = useHttps();

  const exitHandler = (event) => {
    event.preventDefault();
    onShowModal();
  };

  const uploadPlayerHandler = useCallback(
    (event) => {
      event.preventDefault();
      const playerInput = {
        name: nameRef.current.value,
        country: countryRef.current.value,
        age: ageRef.current.value,
        height: heightRef.current.value,
        weight: weightRef.current.value,
        number: numberRef.current.value,
        position: positionRef.current.value,
        foot: footRef.current.value,
        image: imageRef.current.value,
        stats: {
          attack: attackRef.current.value,
          defensive: defensiveRef.current.value,
          passing: passingRef.current.value,
          moving: movingRef.current.value,
        },
      };

      if (type === 'ADD') {
        sendRequest(`${URL}/${userUID}/players.json`, {
          method: 'POST',
          body: playerInput,
        });
      }

      if (type === 'EDIT') {
        sendRequest(`${URL}/${userUID}/players/${player.id}.json`, {
          method: 'PUT',
          body: playerInput,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      resetRefForm(
        nameRef,
        countryRef,
        ageRef,
        heightRef,
        weightRef,
        numberRef,
        positionRef,
        footRef,
        imageRef,
        attackRef,
        defensiveRef,
        passingRef,
        movingRef
      );
      setIsSuccess(true);
    },
    [sendRequest, type, player.id, userUID]
  );

  const fillFormHandler = useCallback((fieldData) => {
    nameRef.current.value = fieldData.name;
    countryRef.current.value = fieldData.country;
    ageRef.current.value = fieldData.age;
    heightRef.current.value = fieldData.height;
    weightRef.current.value = fieldData.weight;
    numberRef.current.value = fieldData.number;
    positionRef.current.value = fieldData.position;
    footRef.current.value = fieldData.foot;
    imageRef.current.value = fieldData.image;
    attackRef.current.value = fieldData.stats.attack;
    defensiveRef.current.value = fieldData.stats.defensive;
    passingRef.current.value = fieldData.stats.passing;
    movingRef.current.value = fieldData.stats.moving;
  }, []);

  const onSuccessFormHandler = useCallback(() => {
    onShowModal();
    onSuccess();
  }, [onShowModal, onSuccess]);

  useEffect(() => {
    if (type === 'EDIT') {
      fillFormHandler(player);
      return;
    }
  }, [fillFormHandler, player, type]);

  const { isLoading } = squadState;

  return (
    <React.Fragment>
      {!isLoading && isSuccess && (
        <SuccessStatus
          content={
            type === 'EDIT'
              ? 'Update Player Successfully!'
              : type === 'ADD'
              ? 'Upload Player Successfully!'
              : `${squadState.error}`
          }
          onClose={onSuccessFormHandler}
        />
      )}
      {!isLoading && !isSuccess && (
        <div className={classes['form-wrapper']}>
          <form onSubmit={uploadPlayerHandler} className={classes.form}>
            <h2>Player information</h2>

            <div className={classes['general-info']}>
              <div className={classes['input-info']}>
                <input
                  name='name'
                  type='text'
                  placeholder='Name'
                  ref={nameRef}
                />
              </div>
              <div className={classes['input-info']}>
                <input
                  name='age'
                  type='number'
                  id=''
                  min={18}
                  max={40}
                  placeholder='Age'
                  ref={ageRef}
                />
              </div>
              <div className={classes['input-info']}>
                <input
                  name='country'
                  type='text'
                  id=''
                  placeholder='Country'
                  ref={countryRef}
                />
              </div>
              <div className={classes['input-info']}>
                <input
                  name='height'
                  type='number'
                  id=''
                  placeholder='Height (cm)'
                  min={150}
                  max={210}
                  ref={heightRef}
                />
              </div>
              <div className={classes['input-info']}>
                <input
                  name='weight'
                  type='number'
                  id=''
                  placeholder='Weight (kg)'
                  ref={weightRef}
                />
              </div>
              <div className={classes['input-info']}>
                <input
                  name='number'
                  type='number'
                  min={1}
                  max={100}
                  id=''
                  placeholder='Number'
                  ref={numberRef}
                />
              </div>

              <div className={classes['input-info']}>
                <select id='' name='position' ref={positionRef}>
                  <option value=''>Pick your player position</option>
                  <option value='GK'>Goalkeeper</option>
                  <option value='CB'>Centre-back</option>
                  <option value='SW'>Sweeper</option>
                  <option value='FB'>Full-back</option>
                  <option value='WB'>Wing-back</option>
                  <option value='DM'>Defensive midfield</option>
                  <option value='AM'>Attacking midfield</option>
                  <option value='WM'>Wide midfield</option>
                  <option value='SS'>Second striker</option>
                  <option value='WG'>Winger</option>
                  <option value='CF'>Centre forward</option>
                </select>
              </div>

              <div
                className={classes['input-info'] + ' ' + classes['foot-radio']}
              >
                <span>Foot: </span>
                <label htmlFor='leftFoot'>Left</label>
                <input
                  type='radio'
                  id='leftFoot'
                  name='dominant_foot'
                  value='Left'
                  ref={footRef}
                />
                <label htmlFor='rightFoot'>Right</label>
                <input
                  type='radio'
                  id='rightFoot'
                  name='dominant_foot'
                  value='Right'
                  ref={footRef}
                />
              </div>

              <div className={classes['input-info']}>
                <input
                  nam='image'
                  type='text'
                  id=''
                  placeholder='Image Url'
                  ref={imageRef}
                />
              </div>
            </div>

            <h3>Data information</h3>
            <div className={classes['stats-info']}>
              <div className={classes['input-stats']}>
                <input
                  type='number'
                  min={0}
                  max={100}
                  id=''
                  name='attack'
                  placeholder='Attack'
                  ref={attackRef}
                />
              </div>
              <div className={classes['input-stats']}>
                <input
                  type='number'
                  min={0}
                  max={100}
                  id=''
                  name='defensive'
                  placeholder='Defensive'
                  ref={defensiveRef}
                />
              </div>
              <div className={classes['input-stats']}>
                <input
                  type='number'
                  min={0}
                  max={100}
                  id=''
                  name='passing'
                  placeholder='Passing'
                  ref={passingRef}
                />
              </div>
              <div className={classes['input-stats']}>
                <input
                  type='number'
                  min={0}
                  max={100}
                  id=''
                  name='moving'
                  placeholder='Moving'
                  ref={movingRef}
                />
              </div>
            </div>
            <div className={classes['form-actions']}>
              <ButtonPrimary onClick={uploadPlayerHandler}>
                {type === 'ADD' && 'Add Player'}
                {type === 'EDIT' && 'Update Player'}
              </ButtonPrimary>
              <ButtonSecondary onClick={exitHandler}>Exit</ButtonSecondary>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default AddPlayerForm;
