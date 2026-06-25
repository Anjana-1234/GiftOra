// useState and useEffect to fetch and store the order details
import { useState, useEffect } from 'react';

// useParams reads the order ID from the URL, Link lets user navigate back to shop
import { useParams, Link } from 'react-router-dom';

// Import our pre-configured axios instance
import api from '../api/axiosConfig';

function OrderConfirmationPage() {

  // Reads the :id part of the URL (e.g. /order-confirmation/65abc123)
  const { id } = useParams();

  // Holds the fetched order details
  const [order, setOrder] = useState(null);

  // Tracks loading state
  const [loading, setLoading] = useState(true);

  // Fetch the order details when the page loads
  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await api.get(`/orders/${id}`);
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id]); // re-runs if the id in the URL ever changes

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <p>Loading your order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <p>Order not found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 30px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>

      <div style={{ fontSize: '50px', marginBottom: '10px' }}>🌸</div>

      <h1 style={{ color: '#e91e8c' }}>Order Confirmed!</h1>

      <p style={{ color: '#666', marginBottom: '25px' }}>
        Thank you, {order.customerName}! Your order has been placed successfully.
      </p>

      {/* Order details card */}
      <div style={{
        backgroundColor: '#fff0f5',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'left',
        marginBottom: '25px'
      }}>
        <p style={{ margin: '5px 0' }}><strong>Order ID:</strong> {order._id}</p>
        <p style={{ margin: '5px 0' }}><strong>Status:</strong> {order.status}</p>
        <p style={{ margin: '5px 0' }}>
          <strong>Payment:</strong> {order.paymentMethod === 'card' ? ' Card' : ' Cash on Delivery'}
          {' '}({order.paymentStatus === 'paid' ? 'Paid' : 'Pay on delivery'})
        </p>
        <p style={{ margin: '5px 0' }}><strong>Delivery Address:</strong> {order.address}</p>
        <p style={{ margin: '5px 0' }}><strong>Phone:</strong> {order.phone}</p>

        <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #e91e8c' }} />

        {order.items.map((item, index) => (
          <div key={index} style={{
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
          <span>Total Paid</span>
          <span>£{order.totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <Link to="/shop">
        <button style={{
          backgroundColor: '#e91e8c',
          color: 'white',
          border: 'none',
          padding: '12px 30px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px'
        }}>
          Continue Shopping
        </button>
      </Link>

    </div>
  );
}

export default OrderConfirmationPage;