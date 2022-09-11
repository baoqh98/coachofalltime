import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Col, Row } from 'react-grid-system';
import { useHttps } from '../../../helper/hooks/https/useHttps';
import { fetchDataHandler } from '../../../Pages/Squad';
import { AuthContext } from '../../../store/auth-context';
import { URL } from '../../../store/URL';
import BMImetric from './BMIMetric';

import classes from './PlayersTable.module.css';
import SquadInformation from './SquadInformation';

const PlayersTable = () => {
  const [idPlayer, setIdPlayer] = useState(null);
  const { userUID } = useContext(AuthContext);
  const [playersState, sendRequestPlayer] = useHttps();

  const players = fetchDataHandler(playersState);

  useEffect(() => {
    sendRequestPlayer(`${URL}/${userUID}/players.json`, { method: 'GET' });
  }, []);

  return (
    <section className={classes['player-table-section']}>
      <Row>
        <Col sm={8}>
          <SquadInformation
            onGetPlayer={(id) => setIdPlayer(id)}
            players={players}
          />
        </Col>
        <Col sm={4}>
          <BMImetric idPlayer={idPlayer} players={players} />
        </Col>
      </Row>
    </section>
  );
};

export default PlayersTable;
