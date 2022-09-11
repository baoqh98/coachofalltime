import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClickOutside } from '../../helper/hooks/domHooks/useClickOutside';

// storage firebase

import classes from './DiaryFiles.module.css';

const DiaryFileItem = ({ recapList, onDelete }) => {
  const [isShowEditId, setIsShowEditId] = useState('');

  const actionRef = useRef();

  useClickOutside(actionRef, () => setIsShowEditId(''));

  const showEditHandler = (id) => {
    setIsShowEditId(id);
  };

  return (
    <>
      {recapList.length > 0 &&
        recapList
          .map((recap) => {
            const { id, title, opponent, date, teamScore, opponentScore } =
              recap;

            return (
              <tr id={id} key={id}>
                <td>
                  <Link to={`${id}`} className={classes['recap-file']}>
                    {title}
                  </Link>
                </td>
                <td>{opponent}</td>
                <td>{date}</td>
                <td>
                  {teamScore || '-'} : {opponentScore || '-'}
                </td>
                <td>
                  <button
                    onClick={() => showEditHandler(id)}
                    className={classes['recap-file__edit']}
                  >
                    <i className='fa-solid fa-ellipsis'></i>
                  </button>
                  {isShowEditId === id && (
                    <div ref={actionRef} className={classes.action}>
                      <span
                        onClick={() => onDelete(id)}
                        className={classes.editBtn}
                      >
                        Delete
                      </span>
                      <span
                        onClick={() => setIsShowEditId('')}
                        className={classes.deleteBtn}
                      >
                        Cancel
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            );
          })
          .reverse()}
      {recapList.length === 0 && (
        <tr>
          <td>
            <h4>There is not thing here!</h4>
          </td>
        </tr>
      )}
    </>
  );
};

export default React.memo(DiaryFileItem);
