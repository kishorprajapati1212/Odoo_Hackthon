import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Grid, InputLabel } from '@mui/material';

const Addproduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    rentingPrice: '',
    image: null,
    description: '',
    category: '',
    stock:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64String = await convertFileToBase64(file);
      setProductData({ ...productData, image: base64String });
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result.split(',')[1]);
        } else {
          reject(new Error('Failed to read file.'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productData)

    try {
      const response = await axios.post('http://localhost:1414/productsadd', productData);
      console.log('Product saved:', response.data);
      setProductData({ name: '', rentingPrice: '', image: '', description: '', category: '', stock:'' });
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <Box sx={{ height: '60vh', width: '100%' }}>
        <Box margin={3}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ width: '50%', margin: 'auto' }}>
              <Grid item xs={6}>
                <TextField
                  label="Product Name"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Renting Price"
                  name="rentingPrice"
                  type="number"
                  value={productData.rentingPrice}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ mt: 2 }}>Image</InputLabel>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'block', margin: '10px 0' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Category"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
              <TextField
                  label="Product Stock"
                  name="stock"
                  type="number"
                  value={productData.stock}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button type="submit" variant="contained" color="primary">
                  Save Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default Addproduct;
