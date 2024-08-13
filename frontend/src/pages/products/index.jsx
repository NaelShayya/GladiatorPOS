import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TopNavBar from '../../components/topNav';
import ProductCard2 from '../../components/productManage';
import ViewForm from '../../components/viewForm'; // Import the new ViewForm component
import axios from 'axios';

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

const MainContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://gladiator-api-8x04.onrender.com/itemapi/items');
        const fetchedProducts = response.data.map(item => ({
          id: item._id,
          name: item.name,
          description: item.category,
          image: item.image,
          quantity: item.stock,
          price: item.price,
          cost: item.cost, // Added cost field
        }));
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(query.toLowerCase())));
  };

  const handleDelete = async (productToDelete) => {
    try {
      await axios.delete(`https://gladiator-api-8x04.onrender.com/itemapi/items/${productToDelete.id}`);
      const updatedProducts = products.filter(product => product.id !== productToDelete.id);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleModify = (productToModify) => {
    setSelectedProduct(productToModify);
  };

  const handleCloseForm = () => {
    setSelectedProduct(null);
  };

  const handleSaveProduct = async (modifiedProduct) => {
    try {
      const response = await axios.put(`https://gladiator-api-8x04.onrender.com/itemapi/items/${modifiedProduct.id}`, {
        name: modifiedProduct.name,
        category: modifiedProduct.description, // assuming category is used for description
        image: modifiedProduct.image,
        stock: modifiedProduct.quantity,
        price: modifiedProduct.price,
        cost: modifiedProduct.cost, // Added cost field
      });

      const updatedProduct = response.data;

      const updatedProducts = products.map(product =>
        product.id === updatedProduct._id ? {
          id: updatedProduct._id,
          name: updatedProduct.name,
          description: updatedProduct.category,
          image: updatedProduct.image,
          quantity: updatedProduct.stock,
          price: updatedProduct.price,
          cost: updatedProduct.cost, // Added cost field
        } : product
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      handleCloseForm();
    } catch (error) {
      console.error('Error saving product:', error);
    }
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
