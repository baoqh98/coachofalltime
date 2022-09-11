import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { useClickOutside } from '../../helper/hooks/domHooks/useClickOutside';
import { AuthContext } from '../../store/auth-context';

import classes from './HeaderNavigation.module.css';

const HeaderNavigation = () => {
  const { logOut } = useContext(AuthContext);
  const [isShowTool, setIsShowTool] = useState(false);
  const toolRef = useRef();
  const imgRef = useRef();
  useClickOutside(toolRef, () => setIsShowTool(false), imgRef);

  return (
    <header className={classes.header}>
      <div className={classes['header-wrapper']}>
        <div className={classes.start}>
          <p>Notification feature is developing...</p>
        </div>
        <div className={classes.end}>
          {/* <div className={classes.search}>
            <span>
              <i className='fa-solid fa-magnifying-glass' />
            </span>
          </div> */}
          <div className={classes.notification}>
            <span>
              <i className='fa-solid fa-bell' />
            </span>
          </div>
          <div
            onClick={(event) => {
              event.stopPropagation();
              if (!event.currentTarget) return;
              setIsShowTool((boo) => !boo);
            }}
            className={classes.account}
          >
            <img
              ref={imgRef}
              src='/assets/blank-profile-picture.png'
              alt='avatar'
            />
            {isShowTool && (
              <div ref={toolRef} className={classes.tool}>
                <span>Profile</span>
                <span onClick={logOut}>Log Out</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderNavigation;
