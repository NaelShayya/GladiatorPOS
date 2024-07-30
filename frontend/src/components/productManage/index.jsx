import React from 'react';
import styled from 'styled-components';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Card = styled.div`
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
  font-weight: bold;
`;

const CardDescription = styled.p`
  margin: 0.75rem 0;
  font-size: 1rem;
  color: #777;
`;

const CardPrice = styled.p`
  font-size: 1.25rem;
  color: #333;
  font-weight: bold;
`;

const QuantityDisplay = styled.div`
  margin-top: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuantityLabel = styled.span`
  font-size: 1rem;
  color: #555;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 1.5rem;
  margin: 0 0.25rem;

  &:hover {
    color: #0056b3;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  position: relative;
  z-index: 2;
`;

const OutOfStockOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: 1;
`;

const ProductCard2 = ({ product, onEdit, onDelete }) => {
  return (
    <Card>
      <OutOfStockOverlay show={product.quantity === 0}>Out of Stock</OutOfStockOverlay>
      <CardImage src={product.image} alt={product.name} />
      <CardContent>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
        <CardPrice>${product.price}</CardPrice>
        <QuantityDisplay>
          <QuantityLabel>Quantity:</QuantityLabel>
          {product.quantity}
        </QuantityDisplay>
        <IconContainer>
          <IconButton onClick={() => onDelete(product)}><FaTrash /></IconButton>
          <IconButton onClick={() => onEdit(product)}><FaEdit /></IconButton>
        </IconContainer>
      </CardContent>
    </Card>
  );
};

export default ProductCard2;
