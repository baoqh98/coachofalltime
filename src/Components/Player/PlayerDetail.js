import classes from './PlayerDetail.module.css';

const PlayerDetail = ({ player, onEdit, onDelete }) => {
  const statsList = [];
  for (const key in player.stats) {
    statsList.push([key, player.stats[key]]);
  }

  return (
    <div className={`${classes.wrapper} col`}>
      <div className={classes.card}>
        <div className={classes.header}>
          <div className={classes['image-box']}>
            <img
              className=''
              src={
                player.image
                  ? player.image
                  : '/assets/blank-profile-picture.png'
              }
              alt={player.name}
            />
          </div>
          <div className={classes['info-box']}>
            <h1>{player.name}</h1>
            <div className={classes.info}>
              <div className={classes.age}>
                <span>age</span>
                <span>{player.age}</span>
              </div>
              <div className={classes.nation}>
                <span>nationality</span>
                <span>{player.country}</span>
              </div>
              <div className={classes.position}>
                <span>position</span>
                <span>{player.position}</span>
              </div>
            </div>
          </div>
        </div>

        <ul className={classes['detail-list']}>
          {statsList.map((data) => {
            let statClass;
            switch (data[0]) {
              case 'attack':
                statClass = classes.attack;
                break;
              case 'defensive':
                statClass = classes.defensive;
                break;
              case 'moving':
                statClass = classes.moving;
                break;
              case 'passing':
                statClass = classes.passing;
                break;
              default:
                break;
            }

            return (
              <li key={data[0]} className={classes.detail}>
                <div className={classes.body}>
                  <span>{data[0]}</span>
                  <span>{data[1]}</span>
                </div>
                <div className={classes.stats}>
                  <span className={classes.bar}></span>
                  <span
                    className={classes.percentage + ' ' + statClass}
                    style={{ width: `${data[1]}%` }}
                  ></span>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={classes.actions}>
          <button className={classes.edit} onClick={onEdit}>
            <i className='fa-solid fa-pen-to-square' />
          </button>
          <button className={classes.delete} onClick={onDelete}>
            <i className='fa-solid fa-trash-can'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;
