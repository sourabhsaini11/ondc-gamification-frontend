import React, { useState } from 'react';
import { NavLink, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
} from '@mui/material';
import { Dashboard, UploadFile, Logout, Menu as MenuIcon } from '@mui/icons-material';
import FileUploadWrapper from '../components/FileUploadWrapper';
import { useAuth } from '../services/AuthContext';
import NewLeaderBoardComponent from '../components/NewLeaderBoardComponent';
import GameMechanics from '../components/ui/Data';
import { Gamepad2Icon } from 'lucide-react';

const UserDashboard = () => {
  const { logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  let currentPage = location.pathname.split('/')[2];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          [`& .MuiDrawer-paper`]: { width: 300, bgcolor: '#1e3a8a', color: 'white' },
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', textAlign: 'center' }}>
            ONDC-Aarambh
          </Typography>
        </Toolbar>

        <List>
          <NavItem to="/dashboard/upload" active={currentPage === 'upload'} text="Upload" icon={<UploadFile />} onClick={() => setDrawerOpen(false)} />
          <NavItem to="/dashboard/leaderboard" active={currentPage === 'leaderboard'} text="Leaderboard" icon={<Dashboard />} onClick={() => setDrawerOpen(false)} />
          <NavItem to="/dashboard/game-rules" active={currentPage === 'game-rules'} text="Game Rule" icon={<Gamepad2Icon />} onClick={() => setDrawerOpen(false)} />
        </List>

        <Box sx={{ flexGrow: 1 }} />

        <List>
          <ListItem component="button" onClick={logout} sx={{
            color: 'white',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            borderRadius: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}>
            <ListItemIcon>
              <Logout sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" sx={{ bgcolor: '#4077cf', px: 3 }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', ml: 'auto', gap: 1 }} />
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 2 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/upload" />} />
            <Route path="leaderboard" element={<NewLeaderBoardComponent />} />
            <Route path="upload" element={<FileUploadWrapper />} />
            <Route path="game-rules" element={<GameMechanics />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

const NavItem = ({ to, text, icon, active, onClick }: { to: string; text: string; icon: React.ReactNode; active: boolean, onClick: any }) => (
  <ListItem
    component={NavLink}
    to={to}
    sx={{
      color: active ? '#fff' : '#b0c4de',
      textDecoration: 'none',
      backgroundColor: active ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
      borderRadius: 1,
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    }}
    onClick={onClick}
  >
    <ListItemIcon sx={{ color: active ? '#fff' : '#b0c4de' }}>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

export default UserDashboard;
