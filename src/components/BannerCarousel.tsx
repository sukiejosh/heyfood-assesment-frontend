import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  code?: string;
  cta: string;
  backgroundColor: string;
  textColor: string;
  image: string;
}

const banners: Banner[] = [
  {
    id: 1,
    title: "Feedwell Supermarket",
    subtitle: "FREE DELIVERY",
    code: "use code 'FEEDWELL2'",
    cta: "Order now",
    backgroundColor: "#f44336",
    textColor: "white",
    image: "📦"
  },
  {
    id: 2,
    title: "Bodija Market at a cheaper rate.",
    subtitle: "10% 5% service fee",
    cta: "Order now",
    backgroundColor: "#8D6E63",
    textColor: "white",
    image: "🍎"
  },
  {
    id: 3,
    title: "Westmead Royal Bites",
    subtitle: "NOW ON HEYFOOD",
    code: "Use code 'BITES' to get FREE DELIVERY + ₦500 off your first order",
    cta: "Order now",
    backgroundColor: "#5D4037",
    textColor: "white",
    image: "🍗"
  },
  {
    id: 4,
    title: "Lemonade Fresh",
    subtitle: "REFRESHING DRINKS",
    code: "Get 20% off all drinks",
    cta: "Order now",
    backgroundColor: "#4CAF50",
    textColor: "white",
    image: "🥤"
  }
];

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const visibleBanners = 3;
  const getVisibleBanners = () => {
    const result = [];
    for (let i = 0; i < visibleBanners; i++) {
      const index = (currentIndex + i) % banners.length;
      result.push(banners[index]);
    }
    return result;
  };

  return (
    <Box sx={{ mb: 4, position: 'relative', }}>
      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          left: -20,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          }
        }}
      >
        <ArrowBackIosIcon fontSize="small" />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          right: -20,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          }
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'hidden',
        }}
      >
        {getVisibleBanners().map((banner) => (
          <Box
            key={banner.id}
            sx={{
              flex: '1 0 calc(33.333% - 16px)',
              minWidth: 280,
              height: 200,
              backgroundColor: banner.backgroundColor,
              borderRadius: 2,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <Box>
              <Typography
                variant="caption"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  color: '#333',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '10px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  mb: 1,
                }}
              >
                {banner.subtitle}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: banner.textColor,
                  fontWeight: 700,
                  fontSize: '16px',
                  fontFamily: 'Poppins, Arial, sans-serif',
                  mb: banner.code ? 0.5 : 2,
                }}
              >
                {banner.title}
              </Typography>

              {banner.code && (
                <Typography
                  variant="caption"
                  sx={{
                    color: banner.textColor,
                    fontSize: '11px',
                    opacity: 0.9,
                    mb: 1,
                    display: 'block',
                  }}
                >
                  {banner.code}
                </Typography>
              )}
            </Box>

            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: 'white',
                color: banner.backgroundColor,
                fontWeight: 600,
                fontSize: '12px',
                textTransform: 'none',
                borderRadius: 25,
                px: 2,
                py: 0.5,
                alignSelf: 'flex-start',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                }
              }}
            >
              {banner.cta}
            </Button>

            <Box
              sx={{
                position: 'absolute',
                right: -10,
                top: -10,
                fontSize: '60px',
                opacity: 0.3,
              }}
            >
              {banner.image}
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 1 }}>
        {banners.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: currentIndex === index ? '#4CAF50' : '#ddd',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}