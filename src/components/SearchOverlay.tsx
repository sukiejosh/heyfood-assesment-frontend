import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Avatar, Box, CircularProgress, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Rating, Tab, Tabs, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { getTags, getRestaurantsByTag, type Tag, type Restaurant } from '@/lib/api';

interface SearchOverlayProps {
  isVisible: boolean;
  onCategorySelect: (category: string) => void;
  onResultSelect: (result: Restaurant) => void;
}

export default function SearchOverlay({ isVisible, onCategorySelect, onResultSelect }: SearchOverlayProps) {
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [categories, setCategories] = useState<Tag[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);

  // Load categories from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getTags();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    if (isVisible && categories.length === 0) {
      loadCategories();
    }
  }, [isVisible, categories.length]);

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
    
    try {
      const restaurants = await getRestaurantsByTag(category);
      setRestaurants(restaurants);
      setShowResults(true);
      onCategorySelect(category);
    } catch (error) {
      console.error('Failed to load restaurants for category:', error);
      setRestaurants([]);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResultSelect = (result: Restaurant) => {
    onResultSelect(result);
    setShowResults(false);
    setSelectedCategory('');
    setActiveTab(0);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (isVisible) {
      setShowResults(false);
      setSelectedCategory('');
      setActiveTab(0);
      setRestaurants([]);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Box
      data-search-overlay="true"
      onMouseDown={(e) => e.preventDefault()}
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        maxHeight: showResults ? '500px' : '80vh',
        overflow: 'hidden',
      }}
    >
      {!showResults ? (
        // Categories View
        <Box sx={{
          px: { xs: 2, md: "3.37em" },
          py: { xs: 2, md: "2em" },
          height: "80vh"
        }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, px: "8px", color: 'black' }}>
            Categories
          </Typography>

          {categories.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <List sx={{ py: 0, overflow: 'auto', maxHeight: "calc(80vh - 100px)" }}>
              {categories.map((category) => (
                <ListItem
                  key={category.id}
                  onClick={() => handleCategorySelect(category.name)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: 1,
                    py: "2em",
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <RestaurantIcon sx={{ fontSize: 25, color: 'black', fontWeight: 'bold' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={category.name}
                    primaryTypographyProps={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: 'black',
                      fontFamily: 'Poppins, Arial, sans-serif',
                      px: "5px"
                    }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      ) : (
        // Search Results View
        <Box>
          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, pt: 3 }}>
            <Tabs 
              key={`tabs-${selectedCategory}-${restaurants.length}`}
              value={activeTab} 
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '16px',
                  fontFamily: 'Poppins, Arial, sans-serif',
                  color: '#666',
                  minWidth: 'auto',
                  px: 0,
                  mr: 4,
                },
                '& .MuiTab-root.Mui-selected': {
                  color: '#4CAF50',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#4CAF50',
                  height: 3,
                }
              }}
            >
              <Tab label={`Restaurants(${restaurants.length})`} />
              <Tab label={`Items(0)`} />
            </Tabs>
          </Box>

          {/* Search Query Header */}
          <Box sx={{ px: 3, py: 2 }}>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 600, 
                color: '#333',
                fontSize: '16px',
                fontFamily: 'Poppins, Arial, sans-serif'
              }}
            >
              {activeTab === 0 ? 'Restaurants' : 'Items'} search results for "{selectedCategory}"
            </Typography>
          </Box>

          {/* Results List */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <List 
              key={`${selectedCategory}-${restaurants.length}`} 
              sx={{ px: 3, py: 0, maxHeight: '350px', overflow: 'auto' }}
            >
              {(activeTab === 0 ? restaurants : []).map((restaurant) => (
                <ListItem
                  key={`${selectedCategory}-${restaurant.id}`}
                  onClick={() => handleResultSelect(restaurant)}
                  sx={{
                    px: 0,
                    py: 2,
                    cursor: 'pointer',
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={restaurant.image || '/api/placeholder/60/60'}
                      sx={{ width: 60, height: 60, borderRadius: 2 }}
                    >
                      <RestaurantIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <Box sx={{ ml: 2, flex: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        fontSize: '16px',
                        color: '#333',
                        fontFamily: 'Poppins, Arial, sans-serif',
                        mb: 0.5,
                      }}
                    >
                      {restaurant.name}
                    </Typography>
                    
                    {/* Tags */}
                    <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {restaurant.tags.map((tag, index) => (
                        <Typography
                          key={index}
                          variant="caption"
                          sx={{
                            color: '#666',
                            fontSize: '12px',
                            fontFamily: 'Poppins, Arial, sans-serif'
                          }}
                        >
                          {tag}{index < restaurant.tags.length - 1 && ', '}
                        </Typography>
                      ))}
                    </Box>

                    {/* Rating */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating
                        value={parseFloat(restaurant.rating)}
                        precision={0.1}
                        size="small"
                        readOnly
                        sx={{ color: '#4CAF50' }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          color: '#333',
                          fontSize: '12px'
                        }}
                      >
                        {restaurant.rating}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#666',
                          fontSize: '12px'
                        }}
                      >
                        {restaurant.reviewCount}+ Ratings
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
              ))}
              
              {restaurants.length === 0 && !loading && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body2" color="textSecondary">
                    No restaurants found for "{selectedCategory}"
                  </Typography>
                </Box>
              )}
            </List>
          )}
        </Box>
      )}
    </Box>
  );
}