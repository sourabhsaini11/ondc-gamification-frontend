import React, { useState } from 'react'
import { NavLink, Routes, Route, Navigate, useLocation } from 'react-router-dom'
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
import { Dashboard, UploadFile, Logout, Menu as MenuIcon } from '@mui/icons-material'
import FileUploadWrapper from './FileUploadWrapper'

import { useAuth } from '../services/AuthContext'
import Data from './ui/Data'

import {  User2Icon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const UserDashboard = () => {
  const { userEmail, logout } = useAuth()
  const userName = (userEmail && userEmail.split('@')[0]) || 'User'
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()
  let currentPage = location.pathname.split('/')[2]

  

  return (
    <Box sx={{ display: 'flex', height: '200vh', bgcolor: '#f4f6f8' }}>
      {/* Sidebar */}
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
          <NavItem  to="/dashboard/upload" active={currentPage === 'upload'} text="Upload"  icon={<UploadFile />} onClick={() => setDrawerOpen(false)}  />
          <NavItem to="/dashboard/leaderboard" active={currentPage === 'leaderboard'}  text="Leaderboard" icon={<Dashboard />} onClick={() => setDrawerOpen(false)} />
        </List>

        <Box sx={{ flexGrow: 1 }} />

        <List>
          <ListItem component="button" onClick={logout} sx={{
    color: 'white',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    borderRadius: 1,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Subtle highlight on hover
    },
  }}>
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
            <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a>
            <User2Icon />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>{userName}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
             
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box sx={{ p: 4 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/leaderboard" />} />
            {/* <Route path="leaderboard" element={<Leaderboard />} /> */}
            <Route path="leaderboard" element={<Data />} />
            <Route path="upload" element={<FileUploadWrapper />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  )
}

// Sidebar Navigation Item Component
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



export default UserDashboard
