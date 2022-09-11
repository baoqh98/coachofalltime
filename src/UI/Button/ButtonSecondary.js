import classes from './ButtonSecondary.module.css';

const ButtonSecondary = ({ onClick, children }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={classes['secondary-btn']}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
