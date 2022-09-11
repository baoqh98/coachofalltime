import React, { useState } from 'react';

import classes from './SquadInformation.module.css';
const SquadInformation = ({ players, onGetPlayer }) => {
  const defaultId = players[0]?.id;
  const [isActive, setIsActive] = useState(defaultId);
  const selectHandler = (id) => {
    setIsActive(id);
    onGetPlayer(id);
  };

  const activeRowStyle = (id = defaultId) => {
    return {
      backgroundColor: isActive === id ? 'rgba(101, 205, 149, 0.2)' : '',
      color: isActive === id ? '#222' : '',
    };
  };

  return (
    <div className={classes['squad-information']}>
      <div className={classes.header}>
        <h1 className={classes.heading}>Squad Information</h1>
        <div className={classes.selection}>
          <label htmlFor='position_dashboard'>
            <span>
              <i className='fa-solid fa-chevron-down'></i>
            </span>
          </label>
          <select name='' id='position_dashboard'>
            <option value=''>Position</option>
          </select>
        </div>
      </div>
      <div className={classes['table-wrapper']}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Height (cm)</th>
              <th>Weight (kg)</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => {
              const { id, image, name, age, height, weight } = player;
              return (
                <tr
                  style={activeRowStyle(id)}
                  key={id}
                  onClick={() => selectHandler(id)}
                >
                  <td>
                    <img
                      src={image ? image : '/assets/blank-profile-picture.png'}
                      alt={name}
                    />
                    <span>{name}</span>
                  </td>
                  <td>{age || '- '}</td>
                  <td>{height || '- '}</td>
                  <td>{weight || '- '}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SquadInformation;
