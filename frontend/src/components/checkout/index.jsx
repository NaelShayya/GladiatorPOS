import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalBody = styled.div`
  margin-bottom: 1rem;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-top: 1rem;
`;

const PayButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: var(--dark-gray);
  }
`;

const CheckoutModal = ({ isOpen, cartItems, onClose, onPaymentSuccess }) => {
  if (!isOpen) return null;

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePayment = async () => {
    try {
      await axios.post('/api/checkout', { cartItems });
      onPaymentSuccess();
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>Order Summary</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          {cartItems.map((item) => (
            <SummaryItem key={item.id}>
              <span>{item.name} (x{item.quantity})</span>
              <span>${item.price * item.quantity}</span>
            </SummaryItem>
          ))}
          <TotalPrice>
            <span>Total:</span>
            <span>${totalPrice}</span>
          </TotalPrice>
        </ModalBody>
        <PayButton onClick={handlePayment}>Pay</PayButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CheckoutModal;
