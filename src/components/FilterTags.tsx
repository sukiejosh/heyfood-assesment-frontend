import { getTags, type Tag } from '@/lib/api';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
// Food icons
import SmoothieIcon from '@mui/icons-material/Blender';
import DoughnutIcon from '@mui/icons-material/Cake';
import ChickenIcon from '@mui/icons-material/Egg';
import TurkeyIcon from '@mui/icons-material/EggAlt';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShawarmaIcon from '@mui/icons-material/LocalDining';
import JuiceIcon from '@mui/icons-material/LocalDrink';
import GrillIcon from '@mui/icons-material/OutdoorGrill';
import VegetableIcon from '@mui/icons-material/Park';
import GoatMeatIcon from '@mui/icons-material/Pets';
import AmalaIcon from '@mui/icons-material/Restaurant';
import RiceIcon from '@mui/icons-material/RiceBowl';
import GroceryIcon from '@mui/icons-material/ShoppingBasket';
import SoupIcon from '@mui/icons-material/SoupKitchen';

interface FilterTagsProps {
  selectedTags: string[];
  onTagSelect: (tags: string[]) => void;
}

// Icon mapping for tags
const getIconForTag = (tagName: string) => {
  const iconMap: Record<string, any> = {
    'Rice': RiceIcon,
    'Chicken': ChickenIcon,
    'Shawarma': ShawarmaIcon,
    'Juice': JuiceIcon,
    'Fastfood': FastfoodIcon,
    'Goat meat': GoatMeatIcon,
    'Amala': AmalaIcon,
    'Soup bowl': SoupIcon,
    'Grills': GrillIcon,
    'Turkey': TurkeyIcon,
    'Grocery': GroceryIcon,
    'Vegetable': VegetableIcon,
    'Doughnuts': DoughnutIcon,
    'Smoothies': SmoothieIcon
  };

  return iconMap[tagName] || AmalaIcon; // default icon
};

export default function FilterTags({ selectedTags, onTagSelect }: FilterTagsProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  // Load tags from API
  useEffect(() => {
    const loadTags = async () => {
      try {
        setLoading(true);
        const response = await getTags();
        setTags(response.data);
      } catch (error) {
        console.error('Failed to load tags:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTags();
  }, []);
  const handleTagClick = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      onTagSelect(selectedTags.filter(t => t !== tagName));
    } else {
      onTagSelect([...selectedTags, tagName]);
    }
  };

  const handleTagRemove = (tagName: string) => {
    onTagSelect(selectedTags.filter(t => t !== tagName));
  };

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
        mb: 3
      }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: { xs: 'flex-start', md: 'space-between' },
      gap: { xs: 2, md: 0 },
      mb: 3,
      overflowX: 'auto',
      py: 2,
      px: 1,
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      scrollbarWidth: 'none',
      width: '100%'
    }}>
      {tags.map((tag) => {
        const IconComponent = getIconForTag(tag.name);
        const isSelected = selectedTags.includes(tag.name);

        return (
          <Box
            key={tag.id}
            onClick={() => handleTagClick(tag.name)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              position: 'relative',
              minWidth: '60px',
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: isSelected ? '#4CAF50' : '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: isSelected ? '#45a049' : '#e8e8e8',
                  transform: 'scale(1.05)',
                }
              }}
            >
              <IconComponent
                sx={{
                  fontSize: 30,
                  color: isSelected ? '#fff' : '#666'
                }}
              />
            </Box>

            <Typography
              variant="caption"
              sx={{
                fontSize: '12px',
                fontWeight: isSelected ? 600 : 400,
                color: isSelected ? '#4CAF50' : '#666',
                textAlign: 'center',
                fontFamily: 'Poppins, Arial, sans-serif'
              }}
            >
              {tag.name}
            </Typography>

            {isSelected && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleTagRemove(tag.name);
                }}
                sx={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  width: 20,
                  height: 20,
                  backgroundColor: '#f44336',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#d32f2f',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '14px',
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        );
      })}
    </Box>
  );
}