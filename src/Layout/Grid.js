import classes from './Grid.module.css';

const Grid = (props) => {
  return (
    <div className={`${classes.grid} ${classes.wide}`}>
      <div className={classes.row}>{props.children}</div>
    </div>
  );
};

export default Grid;
