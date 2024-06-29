import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Test = () => {
  return (
    <Box sx={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
      <Box sx={{ width: '100vw', backgroundColor: '#2c2b2b', height: '60px' }}></Box>
      <Container sx={{ backgroundColor: '#f0f0f0', width: '100vw', padding: '50px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h2" sx={{ fontSize: '24px', margin: '10px 0' }}>Sit back & relax, we will</Typography>
        <Typography variant="h1" sx={{ fontSize: '48px', margin: 0 }}>Design Deliver & Grow</Typography>
        <Typography variant="h2" sx={{ fontSize: '24px', margin: '10px 0' }}>Your Online Business</Typography>
        <Box sx={{ width: '300px', height: '300px', background: 'url(path-to-your-image.jpg) no-repeat center center', backgroundSize: 'cover', borderRadius: '50%', marginTop: '30px' }}></Box>
      </Container>
      <Box sx={{ width: '100vw', height: '5rem', backgroundColor: '#2c2b2b', color: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', position: 'relative', bottom: 0 }}>
        <Typography>+91 9978652993</Typography>
        <Typography>+91 9978557777</Typography>
        <Typography>Mail: jojo@gmail.com</Typography>
        <Typography>All Rights Reserved</Typography>
      </Box>
    </Box>
  );
};

export default Test;