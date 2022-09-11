import React, { useContext, useState, useRef } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../store/auth-context';

import ButtonPrimary from '../../UI/Button/ButtonPrimary';
import ButtonSecondary from '../../UI/Button/ButtonSecondary';
import LoadingContinuous from '../../UI/Status/Pending/LoadingContinuous';

import classes from './SignForm.module.css';

const SIGN_UP_AUTH =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBn6TL6RKVXFCqS3Z7sGmKJpN4IR6nKo7U';

const SIGN_IN_AUTH =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBn6TL6RKVXFCqS3Z7sGmKJpN4IR6nKo7U';

const SignForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { logIn, token } = useContext(AuthContext);

  const authenticateHandler = async (account) => {
    setIsLoading(true);
    try {
      let URL;
      if (isSignIn) {
        URL = SIGN_IN_AUTH;
      } else {
        URL = SIGN_UP_AUTH;
      }
      const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(account),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data.error);
        throw new Error(data.error.message);
      }

      const data = await response.json();
      logIn(data.idToken, data.localId);

      setError(null);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.message.replace('_', ' ');
      setError(errorMessage);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const enteredAccount = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };

    authenticateHandler(enteredAccount);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      alert(
        'This is just a test model app which use free firebase server to show my experiences with ReactJs (yup, portfolio app). I recommend you to use this account: "test@test.com - qwertyui" for logging in. Or create a new account (not recommended bc of overloading firebase limit).'
      );

      return () => {
        clearTimeout(timer);
      };
    }, 1000);

    return () => {};
  }, []);

  return (
    <section className={classes.SignForm}>
      <div className={classes.box}>
        <div className={classes.heading}>
          <h1>
            {isLoading && <LoadingContinuous />}
            {!isLoading && isSignIn && 'Welcome back'}
            {!isLoading && !isSignIn && 'Create your account'}
          </h1>
        </div>
        <p className={classes.subtitle}>
          use this account: "test@test.com - qwertyui" for logging in
        </p>
        <form onSubmit={submitHandler} className={classes.form}>
          <div className={classes.input}>
            <label htmlFor='emailSign'>Your email:</label>
            <input
              id='emailSign'
              type='email'
              placeholder='example@email.com'
              ref={emailRef}
            />
            <span className={classes.validation}>{error}</span>
          </div>

          <div className={classes.input}>
            <label htmlFor='passwordSign'>Your password:</label>
            <input
              id='passwordSign'
              type='password'
              placeholder='Password'
              ref={passwordRef}
            />
            <span className={classes.validation}>{error}</span>
          </div>

          <div className={classes.action}>
            <ButtonPrimary>
              {isSignIn && 'Log In'}
              {!isSignIn && 'Sign Up'}
            </ButtonPrimary>
            <ButtonSecondary onClick={() => setIsSignIn((prev) => !prev)}>
              {isSignIn && 'Sign Up'}
              {!isSignIn && 'Log In'}
            </ButtonSecondary>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignForm;
