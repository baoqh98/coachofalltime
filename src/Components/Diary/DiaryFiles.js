import React, { useEffect, useContext, useState } from 'react';

import DiaryFileItem from './DiaryFileItem';

// store
import { URL } from '../../store/URL';
import { DiaryContext } from '../../store/diary-context';
import { AuthContext } from '../../store/auth-context';

import classes from './DiaryFiles.module.css';

import LoadingSpinner from '../../UI/Status/Pending/LoadingSpinner';

const DiaryFiles = () => {
  const diaryCtx = useContext(DiaryContext);
  const { userUID } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const deleteItemRecapHandler = async (id) => {
    try {
      // delete database
      await diaryCtx.deleteRecapItem(`${URL}/${userUID}`, id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    diaryCtx.fetchRecapList(`${URL}/${userUID}/diary-files.json`).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <section className={classes['files-section']}>
      <div className={classes.title}>
        <h2>My Diary</h2>
      </div>

      <table className={classes['files-table']}>
        <thead>
          <tr>
            <th>Recap</th>
            <th>Opponent</th>
            <th>Date</th>
            <th>Score</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {isLoading && (
            <tr>
              <td>
                <LoadingSpinner color={'#65CD95'} />
              </td>
            </tr>
          )}
          {!isLoading && (
            <DiaryFileItem
              onDelete={deleteItemRecapHandler}
              recapList={diaryCtx.recapList}
            />
          )}
        </tbody>
      </table>
    </section>
  );
};

export default DiaryFiles;
