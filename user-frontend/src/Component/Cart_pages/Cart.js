import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { getuser } from '../Home_page/Navbar';
import DatePicker from '@mui/lab/DatePicker';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rentingDate, setRentingDate] = useState(getTodayDateString()); // Default to today's date
    const [rentalDays, setRentalDays] = useState(1); // Default rental days
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState('');
    const [checkoutDetails, setCheckoutDetails] = useState(null); // State to hold checkout details

    useEffect(() => {
        fetchCartProducts();
    }, []);

    const fetchCartProducts = async () => {
        try {
            const user = getuser();
            const userid = user.user._id;
            const response = await axios.get(`http://localhost:1415/getcart`, { params: { userid } });
            const fetchedCartItems = response.data.cartItems.map(item => ({
                ...item,
                quantity: 1 // Set default quantity to 1 for each item
            }));
            setCartItems(fetchedCartItems);
            setProducts(response.data.products.flat()); // Flatten the products array
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cart products:', error);
            setLoading(false);
        }
    };

    const handleQuantityChange = (index, newQuantity) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity = newQuantity;
        setCartItems(updatedCartItems);
    };

    const handleRemoveProduct = async (productid) => {
        try {
            const response = await axios.delete(`http://localhost:1415/cart/${productid}/remove`);
            console.log('Product removed:', response.data);
            fetchCartProducts();
        } catch (error) {
            console.error('Error removing product:', error);
        }
    };

    const calculateSubtotal = (quantity, rentingPrice) => {
        return (quantity * rentingPrice).toFixed(2);
    };

    const calculateTotal = () => {
        return cartItems.reduce((acc, cartItem) => {
            const product = products.find(prod => prod.productid === cartItem.productid);
            if (product) {
                return acc + (cartItem.quantity * product.rentingPrice);
            }
            return acc;
        }, 0).toFixed(2);
    };

    const handleCheckout = async () => {
        try {
            // Prepare checkout data
            const checkoutData = {
                userid: getuser().user._id,
                rentingDate: rentingDate,
                rentalDays: rentalDays,
                totalPrice: totalPrice,
                address: address,
                products: cartItems.map(item => ({
                    productid: item.productid,
                    quantity: item.quantity,
                    rentingPrice: products.find(prod => prod.productid === item.productid).rentingPrice
                }))
            };

            // Save checkout details locally for display or further processing
            setCheckoutDetails(checkoutData);

            // Make API call to save checkout details to database
            const saveCheckoutResponse = await axios.post('http://localhost:1415/savecheckout', checkoutData);
            console.log('Checkout details saved:', saveCheckoutResponse.data);

            // Implement Stripe payment integration here
            // Example: Redirect to Stripe checkout or handle Stripe payment intent

        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    const handleRentalDaysChange = (event) => {
        const days = parseInt(event.target.value);
        setRentalDays(days);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    if (loading) {
        return <CircularProgress />;
    }

    function getTodayDateString() {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        if (month < 10) {
            month = `0${month}`;
        }
        if (day < 10) {
            day = `0${day}`;
        }

        return `${year}-${month}-${day}`;
    }

    return (
        <Box sx={{
            fontFamily: 'Arial, sans-serif',
            margin: 0,
            padding: 0,
            backgroundColor: '#f0f0f0',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2em',
        }}>
            <Container maxWidth="lg" sx={{ width: '100%', marginTop: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: '1em' }}>Shopping Cart</Typography>
                <TableContainer sx={{ width: '100%', bgcolor: 'background.paper', boxShadow: 2, borderRadius: 1 }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                            <TableRow>
                                <TableCell sx={{ padding: '10px', fontWeight: 'bold' }}>Product</TableCell>
                                <TableCell sx={{ padding: '10px', fontWeight: 'bold' }}>Quantity</TableCell>
                                <TableCell sx={{ padding: '10px', fontWeight: 'bold' }}>Price</TableCell>
                                <TableCell sx={{ padding: '10px', fontWeight: 'bold' }}>Subtotal</TableCell>
                                <TableCell sx={{ padding: '10px', fontWeight: 'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product, index) => (
                                <TableRow key={product._id}>
                                    <TableCell sx={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {/* Assuming product.image is base64 encoded */}
                                            <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} width="50px" height="50px" style={{ marginRight: '10px' }} />
                                            <Typography variant="body1">{product.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                        <TextField
                                            type="number"
                                            value={cartItems[index].quantity}
                                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                                            variant="outlined"
                                            size="small"
                                            inputProps={{ min: 1, max: 10 }}
                                            sx={{ width: '50px' }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ padding: '10px', borderBottom: '1px solid #ddd' }}>${product.rentingPrice}</TableCell>
                                    <TableCell sx={{ padding: '10px', borderBottom: '1px solid #ddd' }}>${calculateSubtotal(cartItems[index].quantity, product.rentingPrice)}</TableCell>
                                    <TableCell sx={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                        <IconButton sx={{ backgroundColor: 'red', color: '#fff', padding: '5px' }} aria-label="delete" onClick={() => handleRemoveProduct(product.productid)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={3} sx={{ padding: '10px', fontWeight: 'bold' }}>Total:</TableCell>
                                <TableCell sx={{ padding: '10px', fontWeight: 'bold' }}>
                                    ${calculateTotal()}
                                </TableCell>
                                <TableCell sx={{ padding: '10px' }}></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={3} sx={{ padding: '10px', fontWeight: 'bold' }}>Rental Days:</TableCell>
                                <TableCell sx={{ padding: '10px' }}>
                                    <TextField
                                        type="number"
                                        value={rentalDays}
                                        onChange={handleRentalDaysChange}
                                        variant="outlined"
                                        size="small"
                                        inputProps={{ min: 1 }}
                                        sx={{ width: '50px' }}
                                    />
                                </TableCell>
                                <TableCell sx={{ padding: '10px' }}></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={3} sx={{ padding: '10px', fontWeight: 'bold' }}>Total for {rentalDays} days:</TableCell>
                                <TableCell sx={{ padding: '10px', fontWeight: 'bold' }}>
                                    ${(calculateTotal() * rentalDays).toFixed(2)}
                                </TableCell>
                                <TableCell sx={{ padding: '10px' }}></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={3} sx={{ padding: '10px', fontWeight: 'bold' }}>Address:</TableCell>
                                <TableCell sx={{ padding: '10px' }}>
                                    <TextField
                                        type="text"
                                        value={address}
                                        onChange={handleAddressChange}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell sx={{ padding: '10px' }}></TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
                <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button variant="contained" color="primary" sx={{ backgroundColor: '#333', color: '#fff', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', '&:hover': { backgroundColor: '#444' } }} onClick={handleCheckout}>Checkout</Button>
                </Box>
            </Container>
            <Box sx={{
                backgroundColor: 'peachpuff',
                color: '#333',
                padding: '1em',
                textAlign: 'center',
                marginTop: 'auto',
                width: '100%'
            }}>
                <Typography variant="body1">KP'S Furniture</Typography>
            </Box>
        </Box>
    );
};

export default Cart;
