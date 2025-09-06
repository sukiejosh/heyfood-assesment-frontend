import { Box, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface PromotionalBannerProps {
  title: string;
  subtitle: string;
}

export default function PromotionalBanner({ title, subtitle }: PromotionalBannerProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2 
      }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button 
            variant="text" 
            sx={{ 
              color: '#2e7d32', 
              fontWeight: 500, 
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline'
              }
            }}
          >
            {subtitle}
          </Button>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              sx={{
                minWidth: 'auto',
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#f5f5f5',
                color: '#666',
                '&:hover': {
                  backgroundColor: '#e8e8e8',
                }
              }}
            >
              <ArrowBackIcon fontSize="small" />
            </Button>
            <Button
              sx={{
                minWidth: 'auto',
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#f5f5f5',
                color: '#666',
                '&:hover': {
                  backgroundColor: '#e8e8e8',
                }
              }}
            >
              <ArrowForwardIcon fontSize="small" />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}