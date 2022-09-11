import React from 'react';

import { colors } from '../../../UI/Colors/colors';

import classes from './BMIMetric.module.css';

const BMIMetric = ({ idPlayer, players }) => {
  const player = players?.find((item) => item.id === idPlayer);

  const weight = player?.weight;
  const height = player?.height;
  const name = player?.name;

  const BMIPoint = weight / (height / 100) ** 2;

  const fillStyle = {
    transform: `rotate(${(BMIPoint * 5) / 4 / 100}turn)`,
    backgroundColor:
      BMIPoint <= 18
        ? colors().info
        : BMIPoint > 18 && BMIPoint <= 25
        ? colors().primary
        : BMIPoint > 25 && BMIPoint <= 30
        ? colors().warning
        : colors().danger,
  };

  return (
    <div className={classes.metric}>
      <div className={classes.heading}>
        <h1>BMI Metric</h1>
      </div>
      <div className={classes.gauge}>
        <div className={classes.gauge__body}>
          <div
            className={classes.gauge__fill}
            style={player && fillStyle}
          ></div>
          <div className={classes.gauge__cover}>
            {!isNaN(BMIPoint) && BMIPoint.toFixed(2)}
            {isNaN(BMIPoint) && ''}
          </div>
        </div>
        <div className={classes.param}>
          <p className={classes.p15}>15</p>
          <p className={classes.p40}>40</p>
        </div>
      </div>
      <div className={classes.detail}>
        <span className={classes.name}>{name ? name : '?'}</span>
        <p>Healthy BMI range: 18.5 kg/m2 - 25 kg/m2</p>
        <p>Healthy weight for the height: 59.9 kgs - 81.0 kgs 11.1</p>
        <p>Ponderal Index: kg/m3</p>
      </div>
    </div>
  );
};

export default BMIMetric;
