import React, { useState } from 'react';
import styled from 'styled-components';
import TopNavBar from '../../components/topNav';
import ProductCard2 from '../../components/productManage';
import ViewForm from '../../components/viewForm'; // Import the new ViewForm component

const MainContainer = styled.div`
  margin-left: 2rem; /* Adjust based on your sidebar width */
  padding: 2rem; /* Adjusted padding for top and sides */
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem; /* Added margin to create space between TopNavBar and products */
`;

const initialProducts = [
  { id: 1, name: 'Product 1', description: 'This is product 1 description.', image: 'https://via.placeholder.com/150', quantity: 10, price: 100 },
  { id: 2, name: 'Product 2', description: 'This is product 2 description.', image: 'https://via.placeholder.com/150', quantity: 5, price: 200 },
  { id: 3, name: 'Product 3', description: 'This is product 3 description.', image: 'https://via.placeholder.com/150', quantity: 8, price: 150 },
  // Add more products as needed
];

const MainContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(query.toLowerCase())));
  };

  const handleDelete = (productToDelete) => {
    const updatedProducts = products.filter(product => product.id !== productToDelete.id);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  const handleModify = (productToModify) => {
    setSelectedProduct(productToModify);
  };

  const handleCloseForm = () => {
    setSelectedProduct(null);
  };

  const handleSaveProduct = (modifiedProduct) => {
    const updatedProducts = products.map(product =>
      product.id === modifiedProduct.id ? modifiedProduct : product
    );
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    handleCloseForm();
  };

  return (
    <MainContainer>
      <TopNavBar searchQuery={searchQuery} setSearchQuery={handleSearchChange} />
      <ProductGrid>
        {filteredProducts.map(product => (
          <ProductCard2 
            key={product.id} 
            product={product} 
            onEdit={handleModify}
            onDelete={handleDelete}
          />
        ))}
      </ProductGrid>
      {selectedProduct && (
        <ViewForm
          product={selectedProduct}
          onClose={handleCloseForm}
          onSave={handleSaveProduct}
        />
      )}
    </MainContainer>
  );
};

export default MainContent;
