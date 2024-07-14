import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin: 2rem auto;
  max-width: 90%;
  padding: 1rem;
  background-color: var(--light-gray);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid black; /* Added black border */
`;

const TableHeader = styled.th`
  background-color: var(--light-gray);
  color: black; /* Changed text color to black */
  padding: 1rem;
  border: 1px solid black; /* Added black border */
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border: 1px solid black; /* Added black border */
`;

const mockOrders = [
  {
    _id: '1',
    items: [
      {
        _id: '1a',
        item: { name: 'Product 1' },
        quantity: 2,
      },
      {
        _id: '1b',
        item: { name: 'Product 2' },
        quantity: 1,
      },
    ],
    total: 40,
    date: new Date().toISOString(),
    cashier: { name: 'Cashier 1' },
  },
  {
    _id: '2',
    items: [
      {
        _id: '2a',
        item: { name: 'Product 3' },
        quantity: 3,
      },
    ],
    total: 45,
    date: new Date().toISOString(),
    cashier: { name: 'Cashier 2' },
  },
];

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Instead of fetching from an API, use mock data
    setOrders(mockOrders);
  }, []);

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader>Date</TableHeader>
            <TableHeader>Items</TableHeader>
            <TableHeader>Total</TableHeader>
            <TableHeader>Cashier</TableHeader>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
              <TableCell>
                {order.items.map((item) => (
                  <div key={item._id}>
                    {item.item.name} (x{item.quantity})
                  </div>
                ))}
              </TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>{order.cashier.name}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
