import React, { useEffect, useState } from 'react';

import { Row, Col } from 'react-grid-system';

import { useModal } from '../helper/hooks/modal/useModal';
import { useHttps } from '../helper/hooks/https/useHttps';

// import { URL } from '../store/URL';

import Cart from '../Components/Shop/Cart/Cart';
import Filter from '../Components/Shop/Filter';
import CartModalDialog from '../Components/Shop/Cart/CartModalDialog';
import ProductList from '../Components/Shop/Product/ProductList';
import Modal from '../UI/Modal/Modal';
import Pagination from '../Components/Shop/Pagination/Pagination';
import LoadingSpinner from '../UI/Status/Pending/LoadingSpinner';

import classes from './Shop.module.css';
import Search from '../Components/Shop/Search/Search';

const Shop = () => {
  const [isShowModal, showModalHandler] = useModal();
  const [shopState, sendRequestShop] = useHttps();
  const [searchValue, setSearchValue] = useState('');
  const [filteredProduct, setFilteredProduct] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(0);

  const { data, isLoading } = shopState;
  const shopProducts = data;

  const totalPagesDefault = Math.ceil(shopProducts?.length / 12) || '';

  const filterHandler = (type) => {
    if (type === 'all') {
      setFilteredProduct(shopProducts);
      setTotalPages(totalPagesDefault);
      setPage(0);
    } else {
      const filterProduct = shopProducts.filter((item) => item.type === type);
      setFilteredProduct(filterProduct);
      setTotalPages(Math.ceil(filterProduct?.length / 12));
      setPage(0);
    }
  };

  useEffect(() => {
    const param = searchValue && `?title=${searchValue}`;
    sendRequestShop(
      `https://62f71205ab9f1f8e89f8052a.mockapi.io/products${param}`,
      {
        method: 'GET',
      }
    );

    return () => {
      setFilteredProduct(null);
      setTotalPages(null);
      setPage(0);
    };
  }, [searchValue, sendRequestShop]);

  return (
    <>
      {isShowModal && (
        <Modal onShowModal={showModalHandler}>
          <CartModalDialog onCloseModal={showModalHandler} />
        </Modal>
      )}

      {isLoading && (
        <Row
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
          }}
        >
          {/* <div
      
          > */}
          <LoadingSpinner color={'#6CCE5A'} />
          {/* </div> */}
        </Row>
      )}
      {!isLoading && (
        <>
          <div className={classes['product-header']}>
            <Row className={classes['align-center']}>
              <Col sm={4}>
                <Filter onFilter={filterHandler} products={shopProducts} />
              </Col>
              <Col sm={8}>
                <div className={classes.box}>
                  <Search onSearch={(value) => setSearchValue(value)} />
                  <Cart onShowModal={showModalHandler} />
                </div>
              </Col>
            </Row>
          </div>
          <ProductList page={page} products={filteredProduct || shopProducts} />
          <Pagination
            totalPages={totalPages || totalPagesDefault}
            setPage={setPage}
            page={page}
          />
        </>
      )}
    </>
  );
};

export default Shop;
