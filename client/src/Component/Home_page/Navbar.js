import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        <Button
          color="inherit"
          sx={{
            marginLeft: 2,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: 'primary.light',
              transform: 'scale(1.1)',
            },
          }}
          component={Link}
          to={"/productdetail"}
        >
          Product
        </Button>
        <Button
          color="inherit"
          sx={{
            marginLeft: 2,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: 'primary.light',
              transform: 'scale(1.1)',
            },
          }}
          component={Link}
          to={"/productdetail"}
        >
          Payment
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
