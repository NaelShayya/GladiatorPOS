import React from 'react';
import styled from 'styled-components';

const ReportContainer = styled.div`
  margin: 2rem;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const SalesReport = () => {
  const mockSalesData = [
    { id: 1, name: 'Product 1', price: 100, quantity: 2 },
    { id: 2, name: 'Product 2', price: 200, quantity: 1 },
    { id: 3, name: 'Product 3', price: 150, quantity: 3 },
  ];

  const totalSales = mockSalesData.reduce((total, sale) => total + sale.price * sale.quantity, 0);

  return (
    <ReportContainer>
      <h2>Sales Report</h2>
      <Table>
        <thead>
          <tr>
            <Th>Product</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Total</Th>
          </tr>
        </thead>
        <tbody>
          {mockSalesData.map((sale) => (
            <tr key={sale.id}>
              <Td>{sale.name}</Td>
              <Td>${sale.price}</Td>
              <Td>{sale.quantity}</Td>
              <Td>${sale.price * sale.quantity}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Total Sales: ${totalSales}</h3>
    </ReportContainer>
  );
};

export default SalesReport;
