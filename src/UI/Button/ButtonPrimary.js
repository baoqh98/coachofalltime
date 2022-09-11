import classes from './ButtonPrimary.module.css';

const ButtonPrimary = ({ onClick, children }) => {
  return (
    <button type='submit' className={classes['primary-btn']} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonPrimary;
