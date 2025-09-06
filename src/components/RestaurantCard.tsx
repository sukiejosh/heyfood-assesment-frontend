import { Card, CardMedia, CardContent, Box, Typography, Rating, Chip } from '@mui/material';
import { Restaurant } from '@/lib/api';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card 
      sx={{ 
        borderRadius: 3, 
        overflow: 'hidden', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="div"
          sx={{
            height: 180,
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
            fontSize: '14px'
          }}
        >
          Restaurant Image
        </CardMedia>
        
        {/* Status badges */}
        <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {!restaurant.isOpen && (
            <Chip 
              label="Currently closed" 
              size="small"
              sx={{ 
                backgroundColor: '#ff5252', 
                color: 'white',
                fontWeight: 500,
                fontSize: '0.75rem'
              }} 
            />
          )}
        </Box>
      </Box>

      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem', mb: 1 }}>
          {restaurant.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Rating 
            value={parseFloat(restaurant.rating)} 
            precision={0.1} 
            size="small" 
            readOnly 
            sx={{ color: '#ffa000' }}
          />
          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
            {restaurant.rating}
          </Typography>
          <Typography variant="body2" sx={{ color: '#999' }}>
            • {restaurant.reviewCount}+ Ratings
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}