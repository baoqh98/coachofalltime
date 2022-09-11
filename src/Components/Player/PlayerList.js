import ButtonPrimary from '../../UI/Button/ButtonPrimary';

import PlayerItem from './PlayerItem';

import classes from './PlayerList.module.css';

const PlayerList = ({ onGetDetail, players, onAddPlayer }) => {
  return (
    <div className={`col ${classes.wrapper}`}>
      <ul className={classes['player-list']}>
        {players
          .map((player) => {
            const { id, name, image, number, age, position, country } = player;
            return (
              <PlayerItem
                key={id}
                name={name}
                image={image ? image : '/assets/blank-profile-picture.png'}
                number={number}
                age={age}
                position={position}
                country={country}
                showPlayerDetail={() => onGetDetail(id)}
              />
            );
          })
          .reverse()}
        <div className={classes.actions}>
          <ButtonPrimary onClick={onAddPlayer}>+ Add More Player</ButtonPrimary>
        </div>
      </ul>
    </div>
  );
};

export default PlayerList;
