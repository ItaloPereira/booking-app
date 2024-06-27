import { useState } from 'react';
import type { MouseEvent } from 'react';

import { styled } from '@mui/material/styles';

import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import ListIcon from '@mui/icons-material/List';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,

    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '1px solid currentColor',
      content: '""',
    },
  },
}));


const UserAvatar = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(menuAnchorEl);

  const handleProfileClose = () => {
    setMenuAnchorEl(null);
  }

  const handleProfileClick = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const menuItems = [
    {
      label: 'My Bookings',
      icon: <ListIcon fontSize="small" />,
      href: '/my-bookings',
    },
  ]

  return (
    <>
      <IconButton
        onClick={handleProfileClick}
        size="small"
        aria-label="account of current user"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar />
        </StyledBadge>
      </IconButton>

      <Menu
        anchorEl={menuAnchorEl}
        id="account-menu"
        open={open}
        onClose={handleProfileClose}
        onClick={handleProfileClose}
        slotProps={{
          paper: {
            elevation: 1,
            sx: {
              pt: 0,
              overflow: 'visible',
              '& .MuiList-root': {
                py: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box p={2} width={250} tabIndex={-1}>
          <Typography variant="body1">FirstName LastName</Typography>
          <Typography variant="body2" color="text.secondary">user@bookingapp.com</Typography>
        </Box>

        <Divider />

        <Box p={1}>
          {menuItems.map(item => {
            const Icon = item.icon;

            return (
              <MenuItem
                tabIndex={0}
                component={Link}
                key={item.label}
                href={item.href}
                sx={{ borderRadius: 2, px: 1 }}
              >
                <ListItemIcon>
                  {Icon}
                </ListItemIcon>
                {item.label}
              </MenuItem>
            );
          })}
        </Box>
      </Menu>
    </>

  )
}

export default UserAvatar;