import classes from './PlayerItem.module.css';

const PlayerItem = (props) => {
  return (
    <li
      className={classes['player-item']}
      onClick={props.showPlayerDetail}
      id={props.id}
      key={props.id}
    >
      <div className={classes.img}>
        <img src={props.image} alt={props.id} />
      </div>
      <div className={classes.info}>
        <h3>{props.name}</h3>
        <div className={classes['info-box']}>
          <span className={classes.content}>
            <p>AGE</p>
            <p>{props.age}</p>
          </span>
          <span className={classes.content}>
            <p>NATIONALITY</p>
            <p>{props.country}</p>
          </span>
          <span className={classes.content}>
            <p>POSITION</p>
            <p>{props.position}</p>
          </span>
        </div>
      </div>
      <div className={classes.number}>
        <span>{props.number}</span>
      </div>
    </li>
  );
};

export default PlayerItem;
