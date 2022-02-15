import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { connect } from 'react-redux';

const Header = ({ cart }) => {
  const [moneyLeft, setMoneyLeft] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let price = 0;

    cart.forEach((item) => {
      price += item.qty * item.price;
    });
    setTotalPrice(price);
    setMoneyLeft(100000000000 - totalPrice);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  const formatToCurrency = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number);
  };

  return (
    <>
      <section className={styles.header}>
        <img
          src={require('../../assets/images/billgates.jpeg')}
          alt="Bill Gates"
        />
        <h2 className={styles.headerTitle}>Spend Bill Gates' Money</h2>
      </section>
      <div className={styles.hede}>
        <p>{formatToCurrency(moneyLeft)}</p>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    moneyLeft: state.shop.moneyLeft,
  };
};

export default connect(mapStateToProps)(Header);
