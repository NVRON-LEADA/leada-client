import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }));

      // Redirect to the main app
      window.location.href = 'https://leada-client.vercel.app/';
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        mt: isMobile ? 4 : 8,
        px: isMobile ? 2 : 3
      }}
    >
      <Paper 
        sx={{ 
          p: isMobile ? 3 : 4,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        elevation={3}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            fontSize: isMobile ? '1.5rem' : '2rem',
            mb: isMobile ? 2 : 3
          }}
        >
          Welcome to Clinic Management
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGoogleSignIn}
          disabled={loading}
          startIcon={<GoogleIcon />}
          sx={{ 
            mt: 2,
            py: 1.5,
            width: '100%',
            maxWidth: '300px'
          }}
        >
          {loading ? <CircularProgress size={24} /> : 'Sign in with Google'}
        </Button>
      </Paper>
    </Container>
  );
};

export default GoogleLogin;