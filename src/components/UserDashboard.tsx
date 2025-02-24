import React, { useState } from 'react'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
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
} from '@mui/material'
import { Dashboard, UploadFile, Logout, Menu as MenuIcon, AccountCircle } from '@mui/icons-material'
import FileUploadWrapper from './FileUploadWrapper'
import Leaderboard from './Leaderboard'
import { useAuth } from '../services/AuthContext'

const UserDashboard = () => {
  const { userEmail, logout } = useAuth()
  const userName = (userEmail && userEmail.split('@')[0]) || 'User'
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f4f6f8' }}>
      {/* Sidebar */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          [`& .MuiDrawer-paper`]: { width: 240, bgcolor: '#4077cf', color: 'white' },
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', textAlign: 'center' }}>
            ONDC-Aarambh
          </Typography>
        </Toolbar>

        <List>
          <NavItem to="/dashboard/upload" text="Upload" icon={<UploadFile />} />
          <NavItem to="/dashboard/leaderboard" text="Leaderboard" icon={<Dashboard />} />
        </List>

        <Box sx={{ flexGrow: 1 }} />

        <List>
          <ListItem component="button" onClick={logout} sx={{ color: 'white', cursor: 'pointer' }}>
            <ListItemIcon>
              <Logout sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Navbar */}
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
            {/* User Info with Icon */}
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', ml: 'auto', gap: 1 }}>
              <AccountCircle sx={{ fontSize: 28 }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {userName}
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box sx={{ p: 4 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/leaderboard" />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="upload" element={<FileUploadWrapper />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  )
}

// Sidebar Navigation Item Component
const NavItem = ({ to, text, icon }: { to: string; text: string; icon: React.ReactNode }) => (
  <ListItem component={NavLink} to={to} sx={{ color: 'inherit', textDecoration: 'none' }}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
)

export default UserDashboard
