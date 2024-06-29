import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

const ProductDetail = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:1414/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleRemoveProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:1414/products/${productId}`);
      // Filter out the removed product from state
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <h1>Product Details</h1>
        <Button component={Link} to="/addproduct" variant="contained" color="primary" padding="10px">
          Add Product
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Renting Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.productid}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.rentingPrice}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  {product.image && (
                    <img
                      src={`data:image/jpeg;base64,${product.image}`} // Assuming img1 is the correct field
                      alt={product.name}
                      style={{ width: '100px', height: '100px' }}
                    />
                  )}
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveProduct(product._id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductDetail;
