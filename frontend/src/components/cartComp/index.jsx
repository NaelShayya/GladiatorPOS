import React from 'react';
import styled from 'styled-components';

const CartContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 400px;
  height: 100%;
  background-color: #f9f9f9;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  overflow-y: auto;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
`;

const CartHeader = styled.h2`
  margin-top: 0;
  font-size: 1.5rem;
  color: #333;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
`;

const CartItem = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
`;

const ItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
`;

const ItemTitle = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
`;

const ItemPrice = styled.span`
  font-size: 1.25rem;
  color: #333;
`;

const QuantityControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const QuantityButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.75rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1.5rem;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const Cart = ({ isOpen, cartItems, onClose, onQuantityChange, onClearCart, onCheckOut }) => {
  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <CartContainer isOpen={isOpen}>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <CartHeader>Shopping Cart</CartHeader>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <CartItem key={index}>
            <ItemDetails>
              <ItemImage src={item.image} alt={item.name} />
              <ItemTitle>{item.name}</ItemTitle>
              <ItemPrice>${item.price * item.quantity}</ItemPrice>
            </ItemDetails>
            <QuantityControl>
              <QuantityButton onClick={() => onQuantityChange(item, item.quantity - 1)}>-</QuantityButton>
              <span>{item.quantity}</span>
              <QuantityButton onClick={() => onQuantityChange(item, item.quantity + 1)}>+</QuantityButton>
            </QuantityControl>
          </CartItem>
        ))
      )}
      <Total>
        <span>Total:</span>
        <span>${getTotal().toFixed(2)}</span>
      </Total>
      <ButtonContainer>
        <ActionButton onClick={onClearCart}>Clear Cart</ActionButton>
        <ActionButton onClick={onCheckOut}>Check Out</ActionButton>
      </ButtonContainer>
    </CartContainer>
  );
};

export default Cart;
