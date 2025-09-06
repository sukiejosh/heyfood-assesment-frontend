import SortIcon from '@mui/icons-material/Sort';
import { Box, List, ListItem, ListItemText, Radio, Typography } from '@mui/material';

interface SortSectionProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  restaurantCount?: number;
}

const sortOptions = [
  'Most Popular',
  'Highest rated',
  'Nearest',
  'Newest',
  'Most Rated'
];

export default function SortSection({ sortBy, onSortChange, restaurantCount }: SortSectionProps) {
  return (
    <Box sx={{
      backgroundColor: 'white',
      borderRadius: 2,
      p: 3,
    }}>
      {/* All Stores Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 0.5 }}>
          All Stores
        </Typography>
        <Typography variant="caption" sx={{ color: '#666' }}>
          ({restaurantCount || 0} Stores)
        </Typography>
      </Box>

      {/* Sort Section */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <SortIcon sx={{ color: '#666', fontSize: 18 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#333' }}>
            Sort
          </Typography>
        </Box>

        <List sx={{ p: 0 }}>
          {sortOptions.map((option) => (
            <ListItem
              key={option}
              onClick={() => onSortChange(option)}
              sx={{
                px: 0,
                py: 0.5,
                cursor: 'pointer',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <Radio
                checked={sortBy === option}
                onChange={() => onSortChange(option)}
                sx={{
                  py: 0.5,
                  px: 1,
                  '&.Mui-checked': {
                    color: '#4CAF50',
                  }
                }}
                size="small"
              />
              <ListItemText
                primary={option}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  '& .MuiListItemText-primary': {
                    fontSize: '18px',
                    fontWeight: 400,
                    fontFamily: 'Poppins, Arial, sans-serif',
                    color: '#666'
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}