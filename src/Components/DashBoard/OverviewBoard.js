import React, { useEffect, useState } from 'react';

import { useHttps } from '../../helper/hooks/https/useHttps';

import classes from './OverviewBoard.module.css';
import { URL } from '../../store/URL';
import { useContext } from 'react';
import { AuthContext } from '../../store/auth-context';
import { fetchDataHandler } from '../../Pages/Squad';
import { DiaryContext } from '../../store/diary-context';

// Layout
import { Col, Row } from 'react-grid-system';
import { useCallback } from 'react';

const OverviewBoard = () => {
  const [expense, setExpense] = useState(0);
  const { userUID } = useContext(AuthContext);
  const diaryCtx = useContext(DiaryContext);
  const [playerState, sendRequestPlayer] = useHttps();

  const players = fetchDataHandler(playerState);
  const { recapList } = diaryCtx;

  let winMatch = 0;
  let loseMatch = 0;
  const scoreList = recapList.filter((item) => {
    return item.teamScore && item.opponentScore;
  });

  scoreList.forEach((item) => {
    if (+item.teamScore > +item.opponentScore) {
      winMatch += 1;
    } else if (+item.teamScore <= +item.opponentScore) {
      loseMatch += 1;
    }
  });

  const fetchCart = useCallback(async () => {
    try {
      const data = await (await fetch(`${URL}/${userUID}/expense.json`)).json();
      setExpense(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    sendRequestPlayer(`${URL}/${userUID}/players.json`, { method: 'GET' });
    diaryCtx.fetchRecapList(`${URL}/${userUID}/diary-files.json`);
    fetchCart();
  }, []);

  return (
    <div className={classes.overview}>
      <Row>
        <Col sm={3}>
          <div className={classes.content}>
            <span className={`${classes.icon} ${classes.squad}`}>
              <i className='fa-solid fa-people-group'></i>
            </span>
            <div className={classes.detail}>
              <span className={classes.title}>Total Player</span>
              <span className={classes.number}>
                {players.length !== 0 && players.length}
              </span>
            </div>
          </div>
        </Col>
        <Col sm={3}>
          <div className={classes.content}>
            <span className={`${classes.icon} ${classes.match}`}>
              <i className='fa-solid fa-futbol'></i>
            </span>
            <div className={classes.detail}>
              <span className={classes.title}>Match</span>
              <span className={classes.number}>
                {recapList.length > 0 && recapList.length}
                {recapList.length === 0 && ''}
              </span>
            </div>
          </div>
        </Col>
        <Col sm={3}>
          <div className={classes.content}>
            <span className={`${classes.icon} ${classes.expense}`}>
              <i className='fa-solid fa-money-bill'></i>
            </span>
            <div className={classes.detail}>
              <span className={classes.title}>Expense</span>
              <span className={classes.number}>
                {expense ? `$${expense}` : ''}
              </span>
            </div>
          </div>
        </Col>
        <Col sm={3}>
          <div className={classes.content}>
            <span className={`${classes.icon} ${classes.winRate}`}>
              <i className='fa-solid fa-trophy'></i>
            </span>
            <div className={classes.detail}>
              <span className={classes.title}>Win rate</span>
              <span className={classes.number}>
                {recapList.length > 0 && loseMatch > 0 && winMatch / loseMatch}
                {recapList.length === 0 && ''}
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OverviewBoard;
