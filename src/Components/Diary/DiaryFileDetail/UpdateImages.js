import React, { useState, useReducer, useContext, useEffect } from 'react';

import { DiaryContext } from '../../../store/diary-context';

// UI
import ButtonPrimary from '../../../UI/Button/ButtonPrimary';
import ButtonSecondary from '../../../UI/Button/ButtonSecondary';

import LoadingSpinner from '../../../UI/Status/Pending/LoadingSpinner';

import classes from './UpdateImages.module.css';

const initialStatus = {
  isSelected: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
};

const statusReducer = (state, action) => {
  switch (action.type) {
    case 'SELECTED':
      return {
        ...state,
        isSelected: true,
      };
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'ERROR':
      return {
        ...state,
        isError: true,
        errorMessage: action.message,
      };
    case 'SUCCESS':
      return {
        ...state,
        isSuccess: true,
      };
    case 'DEFAULT':
      return initialStatus;
    default:
      return state;
  }
};

const UpdateImages = ({ imagesReferences, payload }) => {
  const diaryCtx = useContext(DiaryContext);
  const [selectedImages, setSelectedImage] = useState([]);
  const [updateStatus, dispatchUpdateStatus] = useReducer(
    statusReducer,
    initialStatus
  );

  const { URL, id } = payload;

  const updateHandler = async () => {
    dispatchUpdateStatus({ type: 'LOADING' });
    try {
      diaryCtx
        .updateImagesItem(selectedImages, imagesReferences, URL, id)
        .then(() => {
          dispatchUpdateStatus({ type: 'SUCCESS' });
        });
    } catch (error) {
      dispatchUpdateStatus({ type: 'ERROR', errorMessage: error.message });
    }
  };

  const selectImagesHandler = (event) => {
    const images = event.target.files;
    const imageList = Array.from(images);
    setSelectedImage(imageList);
    dispatchUpdateStatus({ type: 'SELECTED' });
  };

  const cancelUpdateHandler = () => {
    setSelectedImage([]);
    dispatchUpdateStatus({ type: 'DEFAULT' });
  };
  const { isSelected, isLoading, isSuccess } = updateStatus;

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        dispatchUpdateStatus({ type: 'DEFAULT' });
        setSelectedImage([]);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <div className={classes.imageUpdate}>
      {!isSelected && (
        <label htmlFor='updateImageInput' className={classes.inputLabel}>
          + More Images
        </label>
      )}
      {isSelected && selectedImages.length > 0 && (
        <div className={classes.status}>
          {isLoading && !isSuccess && <LoadingSpinner color={'#1980FF'} />}
          {!isLoading && !isSuccess && (
            <p>
              {`${selectedImages.length} ${
                selectedImages.length === 1 ? 'file' : 'files'
              } selected`}
            </p>
          )}
          {isSuccess && <p>Update Successfully</p>}
        </div>
      )}
      {isSelected && !isLoading && (
        <div className={classes.action}>
          <ButtonPrimary onClick={updateHandler}>Update</ButtonPrimary>
          <ButtonSecondary onClick={cancelUpdateHandler}>
            Cancel
          </ButtonSecondary>
        </div>
      )}

      <input
        onClick={(event) => {
          event.target.value = null;
        }}
        onChange={selectImagesHandler}
        id='updateImageInput'
        type='file'
        multiple
      />
    </div>
  );
};

export default UpdateImages;
