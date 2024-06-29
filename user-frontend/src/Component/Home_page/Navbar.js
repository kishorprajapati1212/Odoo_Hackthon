import React from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, Box, InputAdornment, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';

export function getuser() {
  let user = localStorage.getItem('userdata');
  // console.log(user)
  if (user) {
      user = JSON.parse(user);
  } else {
      user = null;
  }
  return user;
}

const Navbar = () => {
  const handleSearchClick = () => {
    console.log('Search icon clicked!');
    // Add your search handling logic here
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            sx={{ width: '30%', backgroundColor: 'white', borderRadius: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchClick}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
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
          to={"/cart"}
        >
          Cart
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
        >
          <AccountCircleOutlinedIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
