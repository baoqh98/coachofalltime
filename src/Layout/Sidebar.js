import { NavLink } from 'react-router-dom';

import classes from './Sidebar.module.css';

const SideBar = () => {
  const activeStyle = {
    color: '#fff',
    backgroundColor: '#65cd95',
  };

  const checkActive = ({ isActive }) => (isActive ? activeStyle : undefined);

  return (
    <section className={classes.section}>
      <nav>
        <ul>
          <li>
            <NavLink style={checkActive} to='/'>
              <i className='fa-solid fa-bars-progress'></i>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink style={checkActive} to='/squad'>
              <i className='fa-solid fa-people-group'></i>
              <span>Squad</span>
            </NavLink>
          </li>
          <li>
            <NavLink style={checkActive} to='/diary'>
              <i className='fa-solid fa-book'></i>
              <span>Diary</span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink style={checkActive} to='/line-up'>
              <i className='fa-solid fa-chess-board'></i>
              <span>Line-up</span>
            </NavLink>
          </li> */}
          <li>
            <NavLink style={checkActive} to='/shop'>
              <i className='fa-solid fa-store'></i>
              <span>Shop</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default SideBar;
