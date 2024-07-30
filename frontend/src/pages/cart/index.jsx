import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import TopNavBar from '../../components/topNav';
import ProductCard from '../../components/productCard';
import Cart from '../../components/cartComp'; // Import the Cart component
import CheckoutModal from '../../components/checkout'; // Import the CheckoutModal component
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
  }
`;

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

const CartButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: #000000;
  color: white;
  padding: 1rem 2rem; /* Increased padding for larger button */
  border: none;
  border-radius: 35px; /* Increased border-radius for oval shape */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem; /* Increased font size */

  &:hover {
    background-color: #0056b3;
  }
`;

const initialProducts = [
  { id: 1, name: 'Product 1', description: 'This is product 1 description.', image: 'https://via.placeholder.com/150', price: 10, quantity: 10 },
  { id: 2, name: 'Product 2', description: 'This is product 2 description.', image: 'https://via.placeholder.com/150', price: 20, quantity: 5 },
  { id: 3, name: 'Product 3', description: 'This is product 3 description.', image: 'https://via.placeholder.com/150', price: 15, quantity: 8 },
  // Add more products as needed
];

const CartPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(query.toLowerCase())));
  };

  const handleAddToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (product, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.id !== product.id));
    } else {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: newQuantity } : item));
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckOut = () => {
    setIsCheckoutModalOpen(true);
  };

  const closeCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
  };

  const handlePaymentSuccess = () => {
    setCart([]);
    setIsCheckoutModalOpen(false);
  };

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <TopNavBar searchQuery={searchQuery} setSearchQuery={handleSearchChange} />
        <ProductGrid>
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isCartView={false} 
              showAddToCart={true} 
              onAddToCart={handleAddToCart} 
            />
          ))}
        </ProductGrid>
        <CartButton onClick={toggleCart}>
          <FaShoppingCart size={30} /> {/* Increased icon size */}
        </CartButton>
        <Cart 
          isOpen={isCartOpen} 
          cartItems={cart} 
          onClose={toggleCart} 
          onQuantityChange={handleQuantityChange} 
          onClearCart={handleClearCart} 
          onCheckOut={handleCheckOut} 
        />
        <CheckoutModal
          isOpen={isCheckoutModalOpen}
          cartItems={cart}
          onClose={closeCheckoutModal}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </MainContainer>
    </>
  );
};

export default CartPage;
