import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import flowerImages from '../data/flowersData';
import FlowerCard from '../components/FlowerCard';

function ShopPage() {

  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('default');
  const [colorFilter, setColorFilter] = useState('All');

  useEffect(() => {
    async function fetchFlowers() {
      try {
        const response = await api.get('/products/flowers');
        const flowersWithImages = response.data.map((flower) => ({
          ...flower,
          id: flower._id,
          image: flowerImages[flower.image],
          description: flower.description,
        }));
        setFlowers(flowersWithImages);
        setLoading(false);
      } catch (err) {
        setError('Could not load flowers. Please make sure the server is running.');
        setLoading(false);
      }
    }
    fetchFlowers();
  }, []);

  // Filter by color
  let filteredFlowers = flowers.filter((flower) => {
    if (colorFilter === 'All') return true;
    return flower.color === colorFilter;
  });

  // Sort by price
  if (sortOrder === 'lowToHigh') {
    filteredFlowers = [...filteredFlowers].sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'highToLow') {
    filteredFlowers = [...filteredFlowers].sort((a, b) => b.price - a.price);
  }

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <p style={{ fontSize: '18px', color: '#e91e8c' }}>Loading flowers... 🌸</p>
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

      <h1 style={{ color: '#a13f75', textAlign: 'center', marginBottom: '25px' }}>
        Our Flower Collection 
      </h1>

      {/* Filter and Sort controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        margin: '20px 0',
        flexWrap: 'wrap'
      }}>
        <div>
          <label style={{ marginRight: '8px', fontWeight: 'bold', color: '#e91e8c' }}>
            Sort by Price:
          </label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="default">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>

        <div>
          <label style={{ marginRight: '8px', fontWeight: 'bold', color: '#e91e8c' }}>
            Filter by Color:
          </label>
          <select value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Red">Red</option>
            <option value="Pink">Pink</option>
            <option value="White">White</option>
            <option value="Yellow">Yellow</option>
            <option value="Blue">Blue</option>
            <option value="Purple">Purple</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>
      </div>

      {/* Add gift items button */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <Link to="/gifts">
          <button style={{
            backgroundColor: 'white',
            color: '#e91e8c',
            border: '2px solid #e91e8c',
            padding: '12px 30px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 'bold'
          }}>
             Add Gift Items
          </button>
        </Link>
      </div>

      {/* Flower grid — 4 per row on desktop */}
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
        {filteredFlowers.map((flower) => (
          <FlowerCard key={flower.id} flower={flower} />
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

export default ShopPage;