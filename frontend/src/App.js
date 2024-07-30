import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/sideBar';
import MainContent from './pages/products';
import AuthForm from './pages/auth';
import './App.css'; // Import your global CSS file
import CartPage from './pages/cart';
import AddProductForm from './components/prodForm';
import OrdersTable from './pages/ordersTable';
import ProtectedRoute from "./components/protectedRoute"
import SalesReport from './pages/salesReport';

const App = () => {
  const location = useLocation();

  return (
    <div className="app-container">
      {location.pathname !== '/auth' && <Sidebar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<MainContent />} />} />
          <Route path="/cart" element={<ProtectedRoute element={<CartPage />} />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/addProd" element={<ProtectedRoute element={<AddProductForm />} />} />
          <Route path="/table" element={<ProtectedRoute element={<OrdersTable />} />} />
          <Route path="/report" element={<ProtectedRoute element={<SalesReport />} />} />
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
