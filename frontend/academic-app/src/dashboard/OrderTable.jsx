import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// Sample data
const orders = [
  {
    id: "ORD001",
    date: "2023-07-30",
    status: "Delivered",
    payment: "Paid",
    customer: "John Doe",
    items: [
      { name: "Product A", quantity: 2, price: 29.99 },
      { name: "Product B", quantity: 1, price: 49.99 },
    ],
    total: 109.97,
  },
  {
    id: "ORD002",
    date: "2023-07-29",
    status: "Processing",
    payment: "Pending",
    customer: "Jane Smith",
    items: [{ name: "Product C", quantity: 3, price: 19.99 }],
    total: 59.97,
  },
  {
    id: "ORD003",
    date: "2023-07-28",
    status: "Shipped",
    payment: "Paid",
    customer: "Bob Johnson",
    items: [
      { name: "Product D", quantity: 1, price: 99.99 },
      { name: "Product E", quantity: 2, price: 34.99 },
    ],
    total: 169.97,
  },
];

const OrderTable = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  const handleClose = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="order table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow
                key={order.id}
                onClick={() => handleRowClick(order)}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.payment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        fullScreen={fullScreen}
        open={selectedOrder !== null}
        onClose={handleClose}
        aria-labelledby="order-dialog-title"
      >
        <DialogTitle id="order-dialog-title">
          Order Details - {selectedOrder?.id}
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <Typography variant="body1">
                Customer: {selectedOrder.customer}
              </Typography>
              <Typography variant="body1">
                Date: {selectedOrder.date}
              </Typography>
              <Typography variant="body1">
                Status: {selectedOrder.status}
              </Typography>
              <Typography variant="body1">
                Payment: {selectedOrder.payment}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Items:
              </Typography>
              {selectedOrder.items.map((item, index) => (
                <Typography key={index} variant="body2">
                  {item.name} - Quantity: {item.quantity}, Price: $
                  {item.price.toFixed(2)}
                </Typography>
              ))}
              <Typography variant="h6" sx={{ mt: 2 }}>
                Total: ${selectedOrder.total.toFixed(2)}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderTable;
