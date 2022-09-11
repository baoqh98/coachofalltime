import React from 'react';
import { Row } from 'react-grid-system';

import ProductItem from './ProductItem';
import classes from './ProductList.module.css';

const ProductList = ({ products, page }) => {
  if (!products) return;

  let productsEveryPage = [];
  for (let i = 0; i < products.length; i += 12) {
    const chunk = products.slice(i, i + 12);
    productsEveryPage.push(chunk);
  }

  const emptyContent = (
    <h1 className={classes['error-notification']}>There is no products</h1>
  );

  return (
    <section className={classes['product-wrapper']}>
      <Row>
        {products.length === 0
          ? emptyContent
          : productsEveryPage[page]?.map((product) => {
              return (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  type={product.type}
                  price={product.price}
                  image={product.image}
                  desc={product.desc}
                />
              );
            })}
      </Row>
    </section>
  );
};

export default ProductList;
