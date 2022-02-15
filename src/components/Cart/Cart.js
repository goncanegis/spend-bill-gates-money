import React, { useState, useEffect } from 'react';
import styles from './Cart.module.css';

import { connect } from 'react-redux';

const Cart = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;
    });
    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  const formatToCurrency = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number);
  };

  return (
    <div className={styles.cart}>
      <h4 className={styles.summary__title}>Your Receipt</h4>
      {cart.map((item) => {
        return (
          <div key={item.id} className={styles.cart__items}>
            <span className={styles.cart__item__title}>{item.title}</span>
            <span className={styles.cart__item__amount}>x{item.qty}</span>
            <span className={styles.cart__item__price}>
              $
              {new Intl.NumberFormat('en-GB', {
                notation: 'compact',
                compactDisplay: 'short',
              }).format(item.qty * item.price)}
            </span>
          </div>
        );
      })}
      <div className={styles.cart__items__total}>
        <span className={styles.cart__item__title__total}>TOTAL:</span>
        <span className={styles.cart__item__price}>
          {formatToCurrency(totalPrice)}
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(Cart);
