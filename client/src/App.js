// Import BrowserRouter for page navigation
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import CartProvider so the whole app can share cart data
import { CartProvider } from './context/CartContext';

// Import Navbar component
import Navbar from './components/Navbar';

// Import all pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import GiftsPage from './pages/GiftsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';

function App() {
  return (
    // CartProvider wraps everything so all pages can access cart functions
    <CartProvider>
      <BrowserRouter>

        {/* Navbar shows on every page */}
        <Navbar />

        {/* Routes - decides which page to show based on URL */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/gifts" element={<GiftsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
        </Routes>

      </BrowserRouter>
    </CartProvider>
  );
}

export default App;