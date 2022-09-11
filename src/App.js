import React, { Suspense, useContext } from 'react';

import useDetectSize from './helper/hooks/responsive/useDetectSize';

// Context
import DiaryProvider from './store/diary-context';

// store
import { CartContextProvider } from './store/cart-context';
import DiaryFileDetail from './Components/Diary/DiaryFileDetail/DiaryFileDetail';
import { AuthContext } from './store/auth-context';

// LAYOUT
import { Col, Container, Row } from 'react-grid-system';
import { Route, Routes } from 'react-router-dom';
import './App.css';

// UI
import HeaderNavigation from './Components/Navigation/HeaderNavigation';
import SideBar from './Layout/Sidebar';

import SignForm from './Pages/Authentication/SignForm';
import Responsive from './UI/Responsive/Responsive';
import Dashboard from './Pages/Dashboard';

const Error404Page = React.lazy(() => import('./UI/Status/Error/Error404Page'));
const Shop = React.lazy(() => import('./Pages/Shop'));
const Squad = React.lazy(() => import('./Pages/Squad'));
const Diary = React.lazy(() => import('./Pages/Diary'));

function App() {
  const { windowWidth } = useDetectSize();
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {windowWidth < 1366 && <Responsive />}
      {windowWidth >= 1366 && (
        <div className='App'>
          {!isLoggedIn && (
            <Container>
              <SignForm />
            </Container>
          )}

          {isLoggedIn && (
            <Container>
              <Row>
                <Col sm={2}>
                  <SideBar />
                </Col>
                <Col sm={10}>
                  <CartContextProvider>
                    <DiaryProvider>
                      <HeaderNavigation />
                      <Suspense>
                        <Routes>
                          <Route path='/' element={<Dashboard />} exact />
                          <Route path='/squad' element={<Squad />} />
                          <Route path='diary' element={<Diary />} />
                          <Route
                            path='diary/:id'
                            element={<DiaryFileDetail />}
                          />
                          <Route path='shop' element={<Shop />} />
                          <Route path='/*' element={<Error404Page />} />
                        </Routes>
                      </Suspense>
                    </DiaryProvider>
                  </CartContextProvider>
                </Col>
              </Row>

              <footer />
            </Container>
          )}
        </div>
      )}
    </>
  );
}

export default App;
