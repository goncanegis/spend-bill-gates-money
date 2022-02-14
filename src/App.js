import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import SingleItem from './components/SingleItem/SingleItem';
import { connect } from 'react-redux';

function App({ currentItem }) {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/product/:id"
          element={currentItem ? <SingleItem /> : <Products />}
        />
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.shop.currentItem,
  };
};

export default connect(mapStateToProps)(App);
