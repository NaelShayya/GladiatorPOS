import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

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

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardImage src={product.image} alt={product.name} />
      <CardContent>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
        <QuantityDisplay>
          <QuantityLabel>Quantity:</QuantityLabel>
          {product.quantity}
        </QuantityDisplay>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
