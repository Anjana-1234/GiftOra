// useState to manage form input values and submission status
import { useState } from 'react';

// Import our cart context to get items and total
import { useCart } from '../context/CartContext';

// Import our pre-configured axios instance
import api from '../api/axiosConfig';

function CheckoutPage() {

  // Get cart items and total from our shared cart context
  const { cartItems, getCartTotal } = useCart();

  // Holds the values typed into the form
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    phone: '',
  });

  // Tracks whether we're currently redirecting to Stripe (to disable button, show loading)
  const [submitting, setSubmitting] = useState(false);

  // Tracks any error message if something fails
  const [error, setError] = useState(null);

  // Runs every time the user types in an input field
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Runs when the form is submitted - sends user to Stripe's payment page
  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitting(true);
    setError(null);

    try {
      // Save the delivery details temporarily in the browser's sessionStorage
      // We need these AFTER Stripe redirects back, to actually save the order
      sessionStorage.setItem('checkoutDetails', JSON.stringify({
        customerName: formData.customerName,
        address: formData.address,
        phone: formData.phone,
        items: cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          type: item.type,
        })),
        totalAmount: getCartTotal(),
      }));

      // Ask our backend to create a Stripe Checkout session
      const response = await api.post('/stripe/create-checkout-session', {
        items: cartItems,
      });

      // Redirect the browser to Stripe's hosted payment page
      window.location.href = response.data.url;

    } catch (err) {
      setError('Something went wrong starting payment. Please try again.');
      setSubmitting(false);
    }
  }

  // If cart is empty, don't allow checkout
  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <h1 style={{ color: '#e91e8c' }}>Checkout</h1>
        <p>Your cart is empty. Add some items before checking out.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>

      <h1 style={{ color: '#e91e8c', textAlign: 'center' }}>Checkout 🌸</h1>

      {/* Order summary */}
      <div style={{
        backgroundColor: '#fff0f5',
        borderRadius: '10px',
        padding: '15px 20px',
        margin: '20px 0'
      }}>
        <h3 style={{ marginTop: 0, color: '#e91e8c' }}>Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px',
            padding: '4px 0'
          }}>
            <span>{item.name} × {item.quantity}</span>
            <span>£{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: 'bold',
          marginTop: '10px',
          paddingTop: '10px',
          borderTop: '1px solid #e91e8c'
        }}>
          <span>Total</span>
          <span>£{getCartTotal().toFixed(2)}</span>
        </div>
      </div>

      {/* Delivery details form */}
      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Full Name
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Delivery Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Show error message if something failed */}
        {error && (
          <p style={{ color: 'red', fontSize: '14px', marginBottom: '15px' }}>{error}</p>
        )}

        {/* Submit button - redirects to Stripe when clicked */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            backgroundColor: submitting ? '#ccc' : '#e91e8c',
            color: 'white',
            border: 'none',
            padding: '14px',
            borderRadius: '8px',
            cursor: submitting ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {submitting ? 'Redirecting to payment...' : 'Pay with Card'}
        </button>

      </form>

    </div>
  );
}

export default CheckoutPage;