import './App.css';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Products />
      <Cart />
      <Footer />
    </div>
  );
}

export default App;
