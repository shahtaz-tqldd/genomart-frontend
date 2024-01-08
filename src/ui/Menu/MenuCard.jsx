import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';

const MenuCard = ({ openMenu, handleMenuClose, options, onClick }) => {
  return (
    <Menu
      id="basic-menu"
      disableScrollLock={true}
      anchorEl={openMenu}
      open={Boolean(openMenu)}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      PaperProps={{
        sx: {
          borderRadius: '8px', // Adjust this value as needed
        },
      }}
    >
      {options?.map((option) => (
        <MenuItem sx={{fontSize:'13px', width:'124px'}} key={option} onClick={() => onClick(option)}>
          {option}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default MenuCard;
