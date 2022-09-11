import React, { useCallback, useEffect, useState, useContext } from 'react';

// fetching
import { URL } from '../store/URL';
import { useHttps } from '../helper/hooks/https/useHttps';
import { AuthContext } from '../store/auth-context';

// UI
import Grid from '../Layout/Grid';
import PlayerList from '../Components/Player/PlayerList';
import PlayerDetail from '../Components/Player/PlayerDetail';
import Modal from '../UI/Modal/Modal';
import { useModal } from '../helper/hooks/modal/useModal';
import AddPlayerForm from './AddPlayerForm/AddPlayerForm';
import LoadingSpinner from '../UI/Status/Pending/LoadingSpinner';

import classes from './Squad.module.css';
import { Col } from 'react-grid-system';
import ButtonPrimary from '../UI/Button/ButtonPrimary';

export const fetchDataHandler = (state) => {
  const loadedData = [];
  const { data } = state;

  for (const key in data) {
    loadedData.push({
      id: key,
      name: data[key].name,
      image: data[key].image,
      number: data[key].number,
      age: data[key].age,
      height: data[key].height,
      weight: data[key].weight,
      position: data[key].position,
      country: data[key].country,
      stats: data[key].stats,
    });
  }
  return loadedData;
};

const Squad = () => {
  const [typeForm, setTypeForm] = useState(null);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [playerDetail, setPlayerDetail] = useState({});
  const [isShowModal, showModalHandler] = useModal(false);
  const [squadState, sendRequest] = useHttps();
  const { userUID } = useContext(AuthContext);

  const players = fetchDataHandler(squadState);

  const getDetailHandler = useCallback(
    (id) => {
      const player = players.find((data) => data.id === id);
      setPlayerDetail({ ...player });
      setIsShowDetail(true);
    },
    [setPlayerDetail, setIsShowDetail, players]
  );

  const delHandler = useCallback(() => {
    setTypeForm('EDIT');
    const id = playerDetail.id;
    fetch(`${URL}/${userUID}/players/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        sendRequest(`${URL}/${userUID}/players.json`, { method: 'GET' });
        setIsShowDetail(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [playerDetail, sendRequest, userUID]);

  const addPlayerHandler = useCallback(() => {
    setTypeForm('ADD');
    showModalHandler();
  }, [setTypeForm, showModalHandler]);

  const updatePlayerHandler = useCallback(() => {
    setTypeForm('EDIT');

    showModalHandler();
  }, [setTypeForm, showModalHandler]);

  const fetchPlayers = useCallback(() => {
    sendRequest(`${URL}/${userUID}/players.json`, { method: 'GET' });
    setIsShowDetail(false);
  }, [sendRequest, userUID]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers, userUID]);

  return (
    <>
      {isShowModal && (
        <Modal onCallBack={fetchPlayers} onShowModal={showModalHandler}>
          <AddPlayerForm
            type={typeForm}
            player={typeForm === 'EDIT' && playerDetail}
            onShowModal={showModalHandler}
            onSuccess={fetchPlayers}
          />
        </Modal>
      )}
      <Grid>
        {squadState.isLoading && <LoadingSpinner color={'#65CD95'} />}
        {players.length === 0 && !squadState?.isLoading && (
          <Col sm={12}>
            <section className={classes.empty}>
              <div className={classes.content}>
                <p>
                  There is no player here. Your squad is empty now. Click to add
                  more
                </p>
              </div>
              <div className={classes.action}>
                <ButtonPrimary onClick={addPlayerHandler}>
                  Add player
                </ButtonPrimary>
              </div>
            </section>
          </Col>
        )}
        {!squadState.isLoading && players.length > 0 && (
          <PlayerList
            players={players}
            onAddPlayer={addPlayerHandler}
            onGetDetail={getDetailHandler}
          />
        )}
        {isShowDetail && (
          <PlayerDetail
            player={playerDetail}
            onDelete={delHandler}
            onEdit={updatePlayerHandler}
          />
        )}
      </Grid>
    </>
  );
};

export default Squad;
