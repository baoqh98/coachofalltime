import React from 'react';
import { Col, Row } from 'react-grid-system';
import { useNavigate } from 'react-router-dom';

import ButtonPrimary from '../../Button/ButtonPrimary';

import './Error404Page.css';

const Error404Page = () => {
  const navigate = useNavigate();

  const goHomeHandler = () => {
    navigate('/');
  };

  return (
    <section className='home'>
      <div className='home__container container'>
        <div className='home__data'>
          <span className='home__subtitle'>Error 404</span>
          <h1 className='home__title'>Hey Buddy</h1>
          <p className='home__description'>
            We can't seem to find the page <br /> you are looking for.
          </p>
          <ButtonPrimary onClick={goHomeHandler}>Go home</ButtonPrimary>
        </div>
        <div className='home__img'>
          <img src='/assets/ghost-img.png' alt='ghost-img' />
          <div className='home__shadow' />
        </div>
      </div>
    </section>
  );
};

export default Error404Page;
