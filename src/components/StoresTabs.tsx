import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

export default function StoresTabs() {
  const [selectedTab, setSelectedTab] = useState('restaurants');

  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 3, borderBottom: '1px solid #e0e0e0', py: { xs: 2, md: 5 } }}>
      <Button
        startIcon={<RestaurantIcon sx={{
          fontSize: '18px !important',
          color: selectedTab === 'restaurants' ? 'white' : '#000'
        }} />}
        onClick={() => setSelectedTab('restaurants')}
        sx={{
          backgroundColor: selectedTab === 'restaurants' ? '#000' : 'transparent',
          color: selectedTab === 'restaurants' ? 'white' : '#000',
          fontWeight: 600,
          px: 6,
          py: 2,
          minHeight: 45,
          borderRadius: 25,
          border: selectedTab === 'restaurants' ? 'none' : '1px solid #e0e0e0',
          fontFamily: 'Poppins, Arial, sans-serif',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: selectedTab === 'restaurants' ? '#333' : '#f5f5f5',
          },
        }}
      >
        Restaurants
      </Button>
      <Button
        startIcon={<ShoppingBasketIcon sx={{
          fontSize: '18px !important',
          color: selectedTab === 'grocery' ? '#fff' : '#000'
        }} />}
        onClick={() => setSelectedTab('grocery')}
        sx={{
          backgroundColor: selectedTab === 'grocery' ? '#000' : 'transparent',
          color: selectedTab === 'grocery' ? '#fff' : '#000',
          fontWeight: 600,
          px: 6,
          py: 2,
          minHeight: 45,
          borderRadius: 25,
          border: selectedTab === 'grocery' ? 'none' : '1px solid #e0e0e0',
          fontFamily: 'Poppins, Arial, sans-serif',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: selectedTab === 'grocery' ? '#333' : '#f5f5f5',
          },
        }}
      >
        Grocery
      </Button>
    </Box>
  );
}