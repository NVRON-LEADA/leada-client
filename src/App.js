import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PatientToken from './pages/PatientToken';
import DoctorDashboard from './pages/DoctorDashboard';
import ReceptionDashboard from './pages/ReceptionDashboard';
import DoctorLogin from './pages/Login';  // Renamed from Login
import ReceptionLogin from './pages/ReceptionLogin';
import firebase from './firebase/config';
import GoogleLogin from './pages/GoogleLogin';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Protected Route component
const ProtectedRoute = ({ children, allowedRole }) => {
  const isAuthenticated = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Map frontend route names to backend roles
  const roleMap = {
    'reception': 'receptionist',
    'doctor': 'doctor'
  };

  if (!isAuthenticated || user.role !== roleMap[allowedRole]) {
    return <Navigate to={`/${allowedRole}/login`} />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<GoogleLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/token" element={<PatientToken />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/reception/login" element={<ReceptionLogin />} />
          <Route
            path="/reception"
            element={
              <ProtectedRoute allowedRole="reception">
                <ReceptionDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;