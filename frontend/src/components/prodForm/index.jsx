import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin: 2rem 0;
  padding: 2rem;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddProductForm = ({ addProduct }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(), // or use any unique id generator
      name: productName,
      description,
      image: imageUrl,
      quantity: parseInt(quantity, 10),
    };
    addProduct(newProduct);
    setProductName('');
    setDescription('');
    setImageUrl('');
    setQuantity('');
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label>Product Name</Label>
          <Input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        </FormField>
        <FormField>
          <Label>Description</Label>
          <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </FormField>
        <FormField>
          <Label>Image URL</Label>
          <Input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </FormField>
        <FormField>
          <Label>Quantity</Label>
          <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </FormField>
        <Button type="submit">Add Product</Button>
      </form>
    </FormContainer>
  );
};

export default AddProductForm;
