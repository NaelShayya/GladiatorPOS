import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sideBar';
import MainContent from './pages/products';
import AuthForm from './pages/auth';
import './App.css'; // Import your global CSS file
import CartPage from './pages/cart';

const App = () => {
  return (
   
    <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/auth" element={<AuthForm />} />
          </Routes>
        </div>
      </div>
   
  );
};

export default App;
