import React, { useState } from 'react';
import styles from './Product.module.css';
import { connect } from 'react-redux';
import {
  addToCart,
  removeFromCart,
} from '../../../redux/Shopping/shopping-actions';

const Product = ({ cart, productData, addToCart, removeFromCart }) => {
  const { title, image, price, id } = productData;
  const [itemAmount, setItemAmount] = useState(0);

  const handleAddButtonClick = () => {
    addToCart(id);
    setItemAmount((prevState) => prevState + 1);
  };

  const handleSellButtonClick = () => {
    if (itemAmount <= 0) {
      return;
    }
    removeFromCart(id);
    setItemAmount((prevState) => prevState - 1);
  };

  const formatToCurrency = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number);
  };

  return (
    <div className={styles.product}>
      <img
        className={styles.product__image}
        src={require(`../../../assets/images/${image}.jpeg`)}
        alt={title}
      />
      <p className={styles.details__title}>{title}</p>
      <p className={styles.details__price}>{formatToCurrency(price)}</p>

      <div className={styles.product__buttons}>
        <button
          onClick={() => handleSellButtonClick(id)}
          className={`${styles.sell__btn} ${styles.btn} ${
            itemAmount <= 0 ? styles.disabled : ''
          }`}
        >
          Sell
        </button>
        <div className={styles.amountInput}>{itemAmount}</div>
        <button
          onClick={() => {
            handleAddButtonClick();
          }}
          className={`${styles.buy__btn} ${styles.btn}`}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
