import React, { useState } from 'react';

const FURNITURE_DATA = [
  { id: 1, name: "Nordic Lounge Chair", telugu: "విశ్రాంతి కుర్చీ", price: 12000, category: "Living Room" },
  { id: 2, name: "Modern Office Desk", telugu: "ఆఫీస్ బల్ల", price: 8500, category: "Office" },
  { id: 3, name: "Teak Wood Bed", telugu: "టేకు మంచం", price: 45000, category: "Bedroom" },
  { id: 4, name: "Luxury Sofa Set", telugu: "సోఫా సెట్", price: 55000, category: "Living Room" },
  { id: 5, name: "Ergonomic Office Chair", telugu: "ఆఫీస్ కుర్చీ", price: 7000, category: "Office" },
  { id: 6, name: "Wooden Dining Table", telugu: "భోజనపు బల్ల", price: 32000, category: "Dining Room" },
];

const CATEGORIES = [
  { eng: "All", tel: "అన్నీ" },
  { eng: "Living Room", tel: "లివింగ్ రూమ్" },
  { eng: "Bedroom", tel: "బెడ్ రూమ్" },
  { eng: "Office", tel: "ఆఫీస్" },
  { eng: "Dining Room", tel: "డైనింగ్ రూమ్" }
];
const styles = `
  .store-wrapper { font-family: 'Segoe UI', Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; color: #222; }
  .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #f0f0f0; padding-bottom: 20px; }
  
  .filter-container { display: flex; justify-content: center; gap: 10px; margin-bottom: 40px; flex-wrap: wrap; }
  .tab-btn { padding: 10px 20px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 4px; transition: 0.3s; }
  .tab-btn.active { background: #d4a373; color: white; border-color: #d4a373; font-weight: bold; }

  .grid-layout { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px; }
  .card { border: 1px solid #eee; border-radius: 8px; overflow: hidden; transition: 0.3s; padding: 15px; background: #fff; }
  .card:hover { box-shadow: 0 10px 20px rgba(0,0,0,0.1); transform: translateY(-5px); }
  .card img { width: 100%; height: 200px; object-fit: cover; border-radius: 4px; background: #f9f9f9; }
  
  .title-eng { font-size: 1.1rem; margin: 15px 0 5px; color: #333; }
  .title-tel { font-size: 1rem; color: #666; margin-bottom: 10px; }
  .price { font-size: 1.2rem; font-weight: bold; color: #2a9d8f; }
  .buy-btn { width: 100%; margin-top: 15px; padding: 12px; background: #222; color: white; border: none; border-radius: 4px; cursor: pointer; }
  .buy-btn:hover { background: #444; }
`;
export default function FurnitureStore() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filtering Logic
  const filteredProducts = activeCategory === "All" 
    ? FURNITURE_DATA 
    : FURNITURE_DATA.filter(item => item.category === activeCategory);

  return (
    <div className="store-wrapper">
      <style>{styles}</style>

      <header className="header">
        <h1>Modern Furniture Store</h1>
        <p>మీ ఇంటికి అందమైన ఫర్నిచర్ (Beautiful Furniture for your Home)</p>
      </header>

      {/* Step: Filter Section */}
      <div className="filter-container">
        {CATEGORIES.map(cat => (
          <button 
            key={cat.eng}
            className={`tab-btn ${activeCategory === cat.eng ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.eng)}
          >
            {cat.eng} <br/> <small>{cat.tel}</small>
          </button>
        ))}
      </div>

      {/* Step: Product Display Section */}
      <div className="grid-layout">
        {filteredProducts.map(product => (
          <div key={product.id} className="card">
            <img src={`https://via.placeholder.com/300x200?text=${product.name}`} alt={product.name} />
            <h3 className="title-eng">{product.name}</h3>
            <p className="title-tel">{product.telugu}</p>
            <p className="price">₹{product.price.toLocaleString('en-IN')}</p>
            <button className="buy-btn" onClick={() => alert(`${product.name} added!`)}>
              Add to Cart / కార్ట్ లో చేర్చండి
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}