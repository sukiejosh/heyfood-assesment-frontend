import { Apple, Google } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

interface SideBarProps {
    onClose?: () => void;
}

export default function SideBar({ onClose }: SideBarProps) {
    return (
        <Box sx={{
            width: 350,
            height: '100vh',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            p: 3
        }}>
            {/* Close button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
                <IconButton onClick={onClose} sx={{ backgroundColor: '#f5f5f5', borderRadius: '50%' }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Sign in section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6 }}>
                <LockOpenIcon sx={{ fontSize: 24, color: '#666' }} />
                <Typography variant="h6" sx={{ fontWeight: 500, color: '#333' }}>
                    Sign in
                </Typography>
            </Box>

            {/* Menu items */}
            <Box sx={{ mb: 6 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        color: '#333',
                        mb: 4,
                        fontSize: '18px',
                        cursor: 'pointer',
                        '&:hover': {
                            color: '#2E7D32'
                        }
                    }}
                >
                    Add your restaurant
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        color: '#333',
                        mb: 4,
                        fontSize: '18px',
                        cursor: 'pointer',
                        '&:hover': {
                            color: '#2E7D32'
                        }
                    }}
                >
                    Become a delivery rider
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        color: '#333',
                        mb: 4,
                        fontSize: '18px',
                        cursor: 'pointer',
                        '&:hover': {
                            color: '#2E7D32'
                        }
                    }}
                >
                    Go to Homepage
                </Typography>
            </Box>

            {/* App download section */}
            <Box sx={{ mt: 'auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Image
                        src="/logo-circle-green.svg"
                        alt="HeyFood Logo"
                        width={40}
                        height={40}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#333' }}>
                        Experience the
                        <br />
                        Heyfood mobile app
                    </Typography>
                </Box>

                {/* App store buttons */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<Apple />}
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            borderRadius: 25,
                            textTransform: 'none',
                            px: 3,
                            py: 1.5,
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: '#333',
                            }
                        }}
                    >
                        App Store
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<Google />}
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            borderRadius: 25,
                            textTransform: 'none',
                            px: 3,
                            py: 1.5,
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: '#333',
                            }
                        }}
                    >
                        Play Store
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}