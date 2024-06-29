import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, Button, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getuser } from '../Home_page/Navbar';

const Productdetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:1415/productdetail/${productId}`);
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const user = getuser();

  const handleAddToCart = async() => {
    if (!user) {
      navigate('/login'); // Redirect to login page if user is not logged in
    } else {
      // Implement logic to add product to cart
      const userid = user.user._id;
      const productid = product.productid;
       
      console.log('Product added to cart');
      await axios.post('http://localhost:1415/cart/add', {userid, productid });
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  const { name, description, category, rentingPrice, stock, image } = product;

  return (
    <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '90vh', padding: '40px 0' }}>
      <Container maxWidth="lg" sx={{ marginTop: 12 }}>
        <Card sx={{ display: 'flex', marginBottom: 4 }}>
          <CardMedia
            component="img"
            image={`data:image/jpeg;base64,${image}`}
            height="400"
            alt={name}
            sx={{ width: '50%', objectFit: 'cover', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
          />
          <CardContent sx={{ flex: 1, marginLeft: 4 }}>
            <Typography variant="h4" gutterBottom>{name}</Typography>
            <Typography variant="body1" sx={{ color: '#666', marginBottom: 2 }}>{description}</Typography>
            <Typography variant="body1" sx={{ color: '#666', marginBottom: 2 }}>Category: {category}</Typography>
            <Typography variant="body1" sx={{ color: '#666', marginBottom: 2 }}>Price: ${rentingPrice}</Typography>
            <Typography variant="body1" sx={{ color: '#666', marginBottom: 2 }}>Stock: {stock}</Typography>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Productdetail;
