import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert

const FormContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--light-gray);
  border: 2px solid black;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: var(--dark-gray);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--gray);
  border-radius: 5px;
  font-size: 1rem;
  color: var(--dark-gray);
  transition: border-color 0.3s ease-in-out;
  
  &:focus {
    border-color: black;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  
  &:hover {
    background-color: var(--dark-gray);
  }
`;

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    cost: '',
    stock: '',
    category: '',
    image: null,
  });



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('cost', product.cost);
    formData.append('stock', product.stock);
    formData.append('category', product.category);
    if (product.image) {
      formData.append('image', product.image);
    }

    try {
      const response = await axios.post('https://gladiator-api-8x04.onrender.com/itemapi/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      if (response && response.data) {
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Product Created',
          text: 'Your product has been successfully created!',
        });

        // Reset the form state to clear the inputs
        setProduct({
          name: '',
          price: '',
          cost: '',
          stock: '',
          category: '',
          image: null,
        });
      } else {
        console.error('Unexpected response structure:', response);
      }
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="cost">Cost</Label>
          <Input
            type="number"
            id="cost"
            name="cost"
            value={product.cost}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="stock">Stock</Label>
          <Input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="category">Category</Label>
          <Input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">Add Product</Button>
      </form>
    </FormContainer>
  );
};

export default AddProductForm;
