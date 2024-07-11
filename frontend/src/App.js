import React from 'react';
import Sidebar from './components/sideBar';
import MainContent from './pages/products';

const App = () => {
  return (
    <div>
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default App;
