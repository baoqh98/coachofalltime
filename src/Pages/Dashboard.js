import React from 'react';
import { Col, Row } from 'react-grid-system';

// Component
import OverviewBoard from '../Components/DashBoard/OverviewBoard';
import PlayersTable from '../Components/DashBoard/PlayersTable/PlayersTable';

import classes from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <section className={classes.dashboard}>
      <OverviewBoard />

      <PlayersTable />
    </section>
  );
};

export default Dashboard;
