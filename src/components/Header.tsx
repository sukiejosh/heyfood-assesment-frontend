import SearchOverlay from '@/components/SearchOverlay';
import SideBar from '@/components/SideBar';
import SortSection from '@/components/SortSection';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { AppBar, Box, Button, Drawer, IconButton, InputAdornment, Slide, TextField, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function Header({ searchQuery, onSearchChange, sortBy, onSortChange }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showMobileSort, setShowMobileSort] = useState(false);
  const [mobileSortOpacity, setMobileSortOpacity] = useState(0);
  const drawerWidth = 350;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileSortToggle = () => {
    setShowMobileSort(!showMobileSort);
  };

  useEffect(() => {
    if (showMobileSort) {
      setTimeout(() => {
        setMobileSortOpacity(1);
      }, 100);
    } else {
      setTimeout(() => {
        setMobileSortOpacity(0);
      }, 400);
    }
  }, [showMobileSort]);

  const handleSearchFocus = () => {
    setSearchFocused(true);
    setTimeout(() => {
      setShowOverlay(true);
    }, 250);
  };

  const handleSearchBlur = (e: React.FocusEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget && relatedTarget.closest('[data-search-overlay]')) {
      return;
    }
    setShowOverlay(false);
    setTimeout(() => {
      setSearchFocused(false);
    }, 350);
  };

  const handleCategorySelect = (category: string) => {

  };

  const handleSearchResultSelect = (result: any) => {
    onSearchChange('');
    setShowOverlay(false);
    setSearchFocused(false);
    console.log('Selected restaurant:', result.name);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <Toolbar
          className="justify-between py-[1.5em] px-[1.2em] min-h-[56px] md:min-h-[64px] md:py-[0.9em] md:px-[2.4em] lg:px-[4.4em]"
          sx={{ justifyContent: 'space-between', overflow: 'hidden', position: 'relative' }}
        >
          {/* Left section */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            transform: searchFocused ? 'translateX(-200px)' : 'translateX(0)',
            transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.2s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s, visibility 0s 0.4s',
            opacity: searchFocused ? 0 : 1,
            visibility: searchFocused ? 'hidden' : 'visible',
          }}>
            <IconButton onClick={handleDrawerToggle} sx={{ color: 'black', p: 1 }}>
              <MenuIcon />
            </IconButton>

            {/* HeyFood Logo - Hidden on mobile */}
            <Link href="/" className="cursor-pointer hidden md:block">
              <Image
                src="/logo-circle-green.svg"
                alt="HeyFood Logo"
                width={40}
                height={40}
              />
            </Link>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'black' }}>
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Ibadan
              </Typography>
            </Box>
          </Box>

          {/* Search focused left section - only hamburger + logo */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: searchFocused ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(-200px)',
            transition: searchFocused
              ? 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0.4s, opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) 0.5s, visibility 0s 0.4s'
              : 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.2s cubic-bezier(0.25, 0.1, 0.25, 1), visibility 0s 0.4s',
            opacity: searchFocused ? 1 : 0,
            visibility: searchFocused ? 'visible' : 'hidden',
            zIndex: 10,
          }}>
            <IconButton onClick={handleDrawerToggle} sx={{ color: 'black', p: 1, ml: 2 }}>
              <MenuIcon />
            </IconButton>
            <Link href="/" className="cursor-pointer">
              <Image
                src="/logo-circle-green.svg"
                alt="HeyFood Logo"
                width={40}
                height={40}
              />
            </Link>
          </Box>

          {/* Search bar - Hidden on mobile */}
          <Box sx={{
            width: searchFocused ? '60%' : '30%',
            display: { xs: 'none', md: 'block' },
            transition: 'width 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s'
          }}>
            <TextField
              fullWidth
              placeholder="Search restaurants or food"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ marginLeft: '2px', marginRight: '0px' }}>
                    <SearchIcon sx={{ fontSize: '20px', color: 'black' }} />
                  </InputAdornment>
                ),
                endAdornment: searchFocused && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => {
                      setShowOverlay(false);
                      setSearchFocused(false);
                    }} sx={{ p: 0.5 }}>
                      <CloseIcon sx={{ fontSize: '18px', color: '#666' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '25px',
                  backgroundColor: '#F0F0F0',
                  border: 'none',
                  height: '40px',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: '8px 8px 8px 4px',
                  fontSize: '14px',
                  fontWeight: '500',
                  '&::placeholder': {
                    fontWeight: '400',
                    color: '#666',
                    opacity: 1,
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
            />
          </Box>

          {/* Right section */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            transform: searchFocused ? 'translateX(200px)' : 'translateX(0)',
            transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.2s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s, visibility 0s 0.4s',
            opacity: searchFocused ? 0 : 1,
            visibility: searchFocused ? 'hidden' : 'visible',
          }}>
            <Button
              variant="text"
              sx={{
                color: 'black',
                fontWeight: 600,
                textTransform: 'none',
                display: { xs: 'none', md: 'inline-flex' },
                '&:hover': {
                  backgroundColor: 'transparent',
                }
              }}
            >
              SIGN IN
            </Button>

            {/* Desktop Cart Button */}
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 25,
                px: 3,
                display: { xs: 'none', md: 'inline-flex' },
                '&:hover': {
                  backgroundColor: '#333',
                }
              }}
            >
              CART • 0
            </Button>

            {/* Mobile Cart Button - Icon only */}
            <IconButton
              sx={{
                backgroundColor: 'black',
                color: 'white',
                borderRadius: 25,
                px: 3,
                py: 1,
                display: { xs: 'inline-flex', md: 'none' },
                '&:hover': {
                  backgroundColor: '#333',
                }
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: '18px' }} />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile Search Layer - Only visible on mobile */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            px: 2,
            pb: 1.5,
            backgroundColor: 'white',
          }}
        >
          <TextField
            fullWidth
            placeholder="Search restaurants or food"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ marginLeft: '2px', marginRight: '0px' }}>
                  <SearchIcon sx={{ fontSize: '20px', color: 'black' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                backgroundColor: '#F0F0F0',
                border: 'none',
                height: '40px',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              },
              '& .MuiOutlinedInput-input': {
                padding: '8px 8px 8px 4px',
                fontSize: '14px',
                fontWeight: '500',
                '&::placeholder': {
                  fontWeight: '400',
                  color: '#666',
                  opacity: 1,
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          />

          <IconButton onClick={handleMobileSortToggle} sx={{ color: 'black' }}>
            <SwapVertIcon />
          </IconButton>
        </Box>

        {/* Mobile Sort Section with Slide Animation - Overlay */}
        <Slide
          direction="down"
          in={showMobileSort}
          mountOnEnter
          unmountOnExit
          timeout={600}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          <Box sx={{
            display: { xs: 'block', md: 'none' },
            backgroundColor: 'white',
            p: 2,
            borderTop: '1px solid #f0f0f0',
            width: '100%',
            overflow: 'visible',
            opacity: mobileSortOpacity,
            transition: 'opacity 0.5s ease-in-out',
          }}>
            <Box sx={{ width: '100%', maxWidth: 'none' }}>
              <SortSection sortBy={sortBy} onSortChange={onSortChange} />
            </Box>
          </Box>
        </Slide>

        <SearchOverlay
          isVisible={showOverlay}
          onCategorySelect={handleCategorySelect}
          onResultSelect={handleSearchResultSelect}
        />
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <SideBar onClose={handleDrawerToggle} />
      </Drawer>
    </>
  );
}