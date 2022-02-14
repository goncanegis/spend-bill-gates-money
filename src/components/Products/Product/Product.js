import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Product.module.css';
import { connect } from 'react-redux';
import {
  addToCart,
  loadCurrentItem,
} from '../../../redux/Shopping/shopping-actions';

const Product = ({ productData, addToCart, loadCurrentItem }) => {
  const { title, image, description, price } = productData;
  return (
    <div className={styles.product}>
      <img className={styles.product__image} src={image} alt={title} />

      <div className={styles.product__details}>
        <p className={styles.details__title}>{title}</p>
        <p className={styles.details__desc}>{description}</p>
        <p className={styles.details__price}>$ {price}</p>
      </div>

      <div className={styles.product__buttons}>
        <Link to={`/product/${productData.id}`}>
          <button
            onClick={() => loadCurrentItem(productData)}
            className={`${styles.buttons__btn} ${styles.buttons__view}`}
          >
            View Item
          </button>
        </Link>
        <button
          onClick={() => addToCart(productData.id)}
          className={`${styles.buttons__btn} ${styles.buttons__add}`}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
  };
};

export default connect(null, mapDispatchToProps)(Product);
