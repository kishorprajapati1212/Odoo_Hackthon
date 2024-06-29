import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Card, CardMedia, CardContent, CardActions, Button, Grid } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:1415/products');
        setProducts(response.data.slice(0, 20)); // Limit to 20 items
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const truncateDescription = (description) => {
    if (description.length > 40) {
      return description.substring(0, 40) + '...';
    }
    return description;
  };

  return (
    <Box sx={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
      <Container sx={{ backgroundColor: '#f0f0f0', width: '100vw', padding: '50px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h2" sx={{ fontSize: '24px', margin: '10px 0' }}>Sit back & relax, we will</Typography>
        <Typography variant="h1" sx={{ fontSize: '48px', margin: 0 }}>Design Deliver & Grow</Typography>
        <Typography variant="h2" sx={{ fontSize: '24px', margin: '10px 0' }}>Your Online Business</Typography>
        <Box sx={{ width: '300px', height: '300px', background: 'url(path-to-your-image.jpg) no-repeat center center', backgroundSize: 'cover', borderRadius: '50%', marginTop: '30px' }}></Box>
      </Container>

      <Container sx={{ padding: '20px' }}>
        <Typography variant="h4" sx={{ fontSize: '32px', margin: '20px 0', textAlign: 'center' }}>Our Products</Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`data:image/jpeg;base64,${product.image}`} // Make sure to use the correct field for the image
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {truncateDescription(product.description)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    to={`/productdetail/${product._id}`} // Use productid here
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
