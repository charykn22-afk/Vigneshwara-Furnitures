import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; 
import AuthForm from './AuthForm';           
import logoImg from './assets/vigneshwara-logo.png'; 

// 1. CSS Styles
const styles = `
  .app-container { font-family: 'Segoe UI', Tahoma, sans-serif; color: #333; margin: 0; padding: 0; }
  .navbar { display: flex; justify-content: space-between; padding: 20px 5%; align-items: center; border-bottom: 1px solid #eee; background: white; position: sticky; top: 0; z-index: 100; }
  .hero { background: #f9f9f9; padding: 60px 5%; text-align: center; }
  .filter-bar { display: flex; justify-content: center; gap: 10px; padding: 20px; flex-wrap: wrap; }
  .filter-btn { padding: 10px 20px; border: 1px solid #333; background: white; cursor: pointer; border-radius: 5px; transition: 0.3s; }
  .filter-btn.active { background: #333; color: white; }
  .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; padding: 50px 5%; }
  .logo-img { height: 50px !important; width: auto; object-fit: contain; transition: transform 0.3s; }
  .logo-container { display: flex; align-items: center; gap: 12px; }
  .product-card { border: 1px solid #efefef; padding: 15px; transition: 0.3s; text-align: center; border-radius: 8px; }
  .product-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
  .product-card img { width: 100%; height: 250px; object-fit: cover; background: #eee; border-radius: 4px; }
  .telugu-name { color: #666; font-size: 0.9rem; margin: 5px 0; font-weight: 500; }
  .price { color: #2a9d8f; font-size: 1.2rem; font-weight: bold; margin: 10px 0; }
  .btn-add { width: 100%; padding: 12px; background: #333; color: white; border: none; cursor: pointer; border-radius: 4px; }
  .footer { background: #1a1a1a; color: white; padding: 40px 5%; margin-top: 50px; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; }
  .footer-section h3 { border-bottom: 2px solid #d4a373; padding-bottom: 10px; margin-bottom: 20px; display: inline-block; }
  .contact-btn { background: #d4a373; color: white; padding: 12px 25px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin-top: 15px; }
  .upload-section { background: #fdfaf5; padding: 20px; border-radius: 8px; margin: 20px 5%; border: 2px dashed #d4a373; text-align: center; }
  .logout-btn { background: #ff4b4b; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; margin-left: 20px; }
  .admin-link { color: #555; font-size: 0.7rem; text-decoration: none; margin-top: 20px; display: block; cursor: pointer; }
  .auth-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 1000; }
`;

const FURNITURE_DATA = [
  { id: 1, name: "Nordic Lounge Chair", telugu: "విశ్రాంతి కుర్చీ", price: 15000, category: "Living Room" },
  { id: 2, name: "Minimalist Oak Desk", telugu: "ఆఫీస్ బల్ల", price: 8500, category: "Office" },
  { id: 3, name: "Velvet Accent Sofa", telugu: "సోఫా సెట్", price: 45000, category: "Living Room" },
  { id: 4, name: "Wooden Bed", telugu: "చెక్క మంచం", price: 32000, category: "Bedroom" },
  { id: 5, name: "Ergonomic Office Chair", telugu: "ఆఫీస్ కుర్చీ", price: 7500, category: "Office" },
];

const CATEGORIES = ["All", "Living Room", "Bedroom", "Office"];

export default function App() {
  const [session, setSession] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [mobileUploads, setMobileUploads] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) setShowLoginModal(false); // Close login box when logged in
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMobileUploads(prev => [...prev, { id: Date.now(), url: reader.result, name: file.name }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredItems = activeFilter === "All" 
    ? FURNITURE_DATA 
    : FURNITURE_DATA.filter(item => item.category === activeFilter);

  return (
    <div className="app-container">
      <style>{styles}</style>

      {/* ADMIN LOGIN MODAL (Only shows when you click the secret link) */}
      {showLoginModal && !session && (
        <div className="auth-overlay">
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', position: 'relative' }}>
            <button 
              onClick={() => setShowLoginModal(false)} 
              style={{ position: 'absolute', right: '10px', top: '10px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
            >
              ✕
            </button>
            <AuthForm />
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo-container">
          <img src={logoImg} alt="Logo" className="logo-img" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ margin: 0, fontSize: '1.2rem', letterSpacing: '1px' }}>VIGNESHWARA</h2>
            <small style={{ color: '#666', fontWeight: 'bold', fontSize: '0.7rem' }}>FURNITURES</small>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="cart"><strong>Cart: {cartCount}</strong></div>
          {session && (
            <button className="logout-btn" onClick={() => supabase.auth.signOut()}>
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <h1>Premium Furniture for your Home</h1>
        <p>మీ ఇంటికి అందమైన ఫర్నిచర్</p>
        {session && <p style={{ color: '#2a9d8f', fontSize: '0.8rem' }}>Signed in as: {session.user.email}</p>}
      </header>

      {/* ADMIN UPLOAD SECTION (Hidden from Customers) */}
      {session && (
        <div className="upload-section">
          <h3>Admin Panel: Upload New Photo</h3>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
        </div>
      )}

      {/* FILTER BAR */}
      <div className="filter-bar">
        {CATEGORIES.map(cat => (
          <button 
            key={cat} 
            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <main className="product-grid">
        {mobileUploads.map(media => (
          <div key={media.id} className="product-card">
            <img src={media.url} alt="Uploaded" />
            <p className="telugu-name">కొత్త ఫర్నిచర్ (New Upload)</p>
            <button className="btn-add" onClick={() => setCartCount(c => c + 1)}>Add to Cart</button>
          </div>
        ))}

        {filteredItems.map((item) => (
          <div key={item.id} className="product-card">
            <img src={`https://via.placeholder.com/300x400?text=${item.name}`} alt={item.name} />
            <div style={{fontSize: '0.7rem', color: '#999', marginTop: '10px'}}>{item.category}</div>
            <h3 style={{margin: '10px 0 5px'}}>{item.name}</h3>
            <p className="telugu-name">{item.telugu}</p>
            <p className="price">₹{item.price.toLocaleString('en-IN')}</p>
            <button className="btn-add" onClick={() => setCartCount(prev => prev + 1)}>
              Add to Cart / కార్ట్ లో చేర్చండి
            </button>
          </div>
        ))}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-section">
          <h3>Vigneshwara Furnitures</h3>
          <p>Warangal, Telangana</p>
          {/* SECRET ADMIN LINK */}
          {!session && (
            <span className="admin-link" onClick={() => setShowLoginModal(true)}>
              Admin Login
            </span>
          )}
        </div>
        <div className="footer-section">
          <h3>Shop Address</h3>
          <p>H.no 16-8-659 Abbanikunta, Labour Colony,</p>
          <p>Warangal - 506013</p>
        </div>
        <div className="footer-section">
          <h3>Contact Details</h3>
          <p>📞 +91 9948425625</p>
          <button className="contact-btn" onClick={() => window.location = 'mailto:kanukuntlavenkatrajam@gmail.com'}>
            Contact Us / సంప్రదించండి
          </button>
        </div>
      </footer>
    </div>
  );
}