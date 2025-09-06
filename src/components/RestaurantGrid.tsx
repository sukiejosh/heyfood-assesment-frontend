import { getRestaurants, type Restaurant } from '@/lib/api';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PromotionalBanner from './PromotionalBanner';
import RestaurantCard from './RestaurantCard';

interface RestaurantGridProps {
  searchQuery: string;
  selectedTags: string[];
  sortBy: string;
  onRestaurantCountChange?: (count: number) => void;
}


export default function RestaurantGrid({ searchQuery, selectedTags, sortBy, onRestaurantCountChange }: RestaurantGridProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch restaurants from API when filters change
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        // Map frontend sort options to backend parameters
        let backendSortBy: 'rating' | 'reviewCount' | 'name' | 'deliveryTime' | 'deliveryFee' = 'rating'; // default
        let sortOrder: 'asc' | 'desc' = 'desc';

        switch (sortBy) {
          case 'Highest rated':
            backendSortBy = 'rating';
            sortOrder = 'desc';
            break;
          case 'Most Rated':
            backendSortBy = 'reviewCount';
            sortOrder = 'desc';
            break;
          case 'Newest':
            backendSortBy = 'name';
            sortOrder = 'asc';
            break;
          case 'Most Popular':
          default:
            backendSortBy = 'reviewCount';
            sortOrder = 'desc';
            break;
        }

        const response = await getRestaurants({
          search: searchQuery || undefined,
          tags: selectedTags.length > 0 ? selectedTags : undefined,
          sortBy: backendSortBy,
          sortOrder: sortOrder,
          limit: 50
        });
        setRestaurants(response.data);
        onRestaurantCountChange?.(response.data.length);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
        setRestaurants([]);
        onRestaurantCountChange?.(0);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [searchQuery, selectedTags, sortBy]);

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 8
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Promotional Banner */}
      <PromotionalBanner
        title="Spend Less, Order More! 😊"
        subtitle="See all"
      />

      {/* Restaurant Grid - Horizontal Scrollable */}
      {restaurants.length > 0 ? (
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            pb: 2,
            mb: 4,
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            scrollbarWidth: 'none',
            width: '100%'
          }}
        >
          {restaurants.map((restaurant) => (
            <Box key={restaurant.id} sx={{ minWidth: '280px', flexShrink: 0 }}>
              <RestaurantCard restaurant={restaurant} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{
          textAlign: 'center',
          py: 8,
          color: 'text.secondary'
        }}>
          <Typography variant="h6" gutterBottom>
            No restaurants found
          </Typography>
          <Typography variant="body2">
            {searchQuery || selectedTags.length > 0
              ? 'Try adjusting your search or filters'
              : 'No restaurants available at the moment'
            }
          </Typography>
        </Box>
      )}

      {/* Second Promotional Banner */}
      <PromotionalBanner
        title="Free drinks for you! 🥤"
        subtitle="See all"
      />

      {restaurants.length > 0 ? (
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            pb: 2,
            mb: 4,
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            scrollbarWidth: 'none',
            width: '100%'
          }}
        >
          {restaurants.map((restaurant) => (
            <Box key={restaurant.id} sx={{ minWidth: '280px', flexShrink: 0 }}>
              <RestaurantCard restaurant={restaurant} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{
          textAlign: 'center',
          py: 8,
          color: 'text.secondary'
        }}>
          <Typography variant="h6" gutterBottom>
            No restaurants found
          </Typography>
          <Typography variant="body2">
            {searchQuery || selectedTags.length > 0
              ? 'Try adjusting your search or filters'
              : 'No restaurants available at the moment'
            }
          </Typography>
        </Box>
      )}
    </Box>
  );
}