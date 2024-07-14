import React, { useState } from 'react';
import styled from 'styled-components';
import TopNavBar from '../../components/topNav';
import ProductCard from '../../components/productCard';

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
  { id: 1, name: 'Product 1', description: 'This is product 1 description.', image: 'https://via.placeholder.com/150', quantity: 10 },
  { id: 2, name: 'Product 2', description: 'This is product 2 description.', image: 'https://via.placeholder.com/150', quantity: 5 },
  { id: 3, name: 'Product 3', description: 'This is product 3 description.', image: 'https://via.placeholder.com/150', quantity: 8 },
  // Add more products as needed
];

const MainContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(query.toLowerCase())));
  };

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setFilteredProducts([...products, newProduct]);
  };

  return (

   
    <MainContainer>
      <TopNavBar searchQuery={searchQuery} setSearchQuery={handleSearchChange} />
      <ProductGrid>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </MainContainer>
 
  );
};

export default MainContent;
