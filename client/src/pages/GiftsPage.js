import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import giftImages from '../data/giftsData';
import GiftCard from '../components/GiftCard';

function GiftsPage() {

  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGifts() {
      try {
        const response = await api.get('/products/gifts');
        const giftsWithImages = response.data.map((gift) => ({
          ...gift,
          id: gift._id,
          image: giftImages[gift.image],
          description: gift.description,
        }));
        setGifts(giftsWithImages);
        setLoading(false);
      } catch (err) {
        setError('Could not load gifts. Please make sure the server is running.');
        setLoading(false);
      }
    }
    fetchGifts();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <p style={{ fontSize: '18px', color: '#e91e8c' }}>Loading gifts... 🎁</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <p style={{ fontSize: '16px', color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px' }}>

      {/* Header row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto 20px auto',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h1 style={{ color: '#a13f75', margin: 0 }}>Gift Collection</h1>
        <Link to="/shop">
          <button style={{
            backgroundColor: 'white',
            color: '#e91e8c',
            border: '2px solid #e91e8c',
            padding: '10px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            ← Back to Shop
          </button>
        </Link>
      </div>

      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Add a little extra to your bouquet — pick one or more gifts below.
      </p>

      {/* Gift grid — 4 per row on desktop */}
      <div
        className="product-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {gifts.map((gift) => (
          <GiftCard key={gift.id} gift={gift} />
        ))}
      </div>

      {/* Responsive grid breakpoints */}
      <style>{`
        @media (max-width: 1024px) {
          .product-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .product-grid { grid-template-columns: repeat(1, 1fr) !important; }
        }
      `}</style>

    </div>
  );
}

export default GiftsPage;