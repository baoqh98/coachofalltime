import classes from './LoadingSpinner.module.css';

const LoadingSpinner = ({ color }) => {
  return (
    <div className={classes['lds-ring']}>
      <div
        style={{ borderColor: `${color}  transparent transparent transparent` }}
      ></div>
      <div
        style={{ borderColor: `${color}  transparent transparent transparent` }}
      ></div>
      <div
        style={{ borderColor: `${color}  transparent transparent transparent` }}
      ></div>
      <div
        style={{ borderColor: `${color}  transparent transparent transparent` }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
