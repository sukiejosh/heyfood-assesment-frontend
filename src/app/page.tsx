'use client';

import BannerCarousel from '@/components/BannerCarousel';
import FilterTags from '@/components/FilterTags';
import Header from '@/components/Header';
import RestaurantGrid from '@/components/RestaurantGrid';
import SortSection from '@/components/SortSection';
import StoresTabs from '@/components/StoresTabs';
import { Box } from '@mui/material';
import { useState } from 'react';

export default function Home() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('Most Popular');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [restaurantCount, setRestaurantCount] = useState<number>(0);

  return (
    <div className="min-h-screen bg-white">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <Box sx={{ px: { xs: 2, md: 5 } }}>
        <StoresTabs />
        <FilterTags selectedTags={selectedTags} onTagSelect={setSelectedTags} />
        <BannerCarousel />

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box
            sx={{
              width: { xs: '100%', md: 250 },
              display: { xs: 'none', md: 'block' },
              position: 'sticky',
              top: 60,
              height: 'fit-content',
            }}
          >
            <SortSection
              sortBy={sortBy}
              onSortChange={setSortBy}
              restaurantCount={restaurantCount}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <RestaurantGrid
              searchQuery={searchQuery}
              selectedTags={selectedTags}
              sortBy={sortBy}
              onRestaurantCountChange={setRestaurantCount}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}