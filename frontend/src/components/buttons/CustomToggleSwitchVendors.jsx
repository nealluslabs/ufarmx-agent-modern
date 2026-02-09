import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

const CustomToggleSwitchVendors = ({activeButton, setActiveButton, handleSeedsClick, handleFertilizersClick,handleEquipmentClick,handleServicesClick,handleHerbicideClick}) => {


  return (
    <Box
      sx={{
        display: 'flex',
        borderRadius: '20px',
        overflow: 'hidden',
        padding: '4px',
        backgroundColor: '#F5F5F5',
        fontFamily:"Poppins",
      }}
    >
      <Button
        variant={activeButton === 'Fertilizers' ? 'contained' : 'outlined'}
        style={{
          minHeight: '50px',
          minWidth: '90px',
          backgroundColor: activeButton === 'Fertilizers' ? '#0A6054' : 'transparent',
          color: activeButton === 'Fertilizers' ? '#fff' : '#000',
          border: 'none',
          borderRadius: '20px',
          marginRight: '4px',
          fontFamily:"Poppins",
        }}
        onClick={handleFertilizersClick}
      >
        Fertilizers
      </Button>
      <Button
        variant={activeButton === 'Seeds' ? 'contained' : 'outlined'}
        style={{
          minHeight: '50px',
          minWidth: '90px',
          backgroundColor: activeButton === 'Seeds' ? '#0A6054' : 'transparent',
          color: activeButton === 'Seeds' ? '#FFF' : '#000',
          border: 'none',
          borderRadius: '20px',
          fontFamily:"Poppins",
        }}
        onClick={handleSeedsClick}
      >
         Seeds
      </Button>

      <Button
        variant={activeButton === 'Equipment' ? 'contained' : 'outlined'}
        style={{
          minHeight: '50px',
          minWidth: '90px',
          backgroundColor: activeButton === 'Equipment' ? '#0A6054' : 'transparent',
          color: activeButton === 'Equipment' ? '#FFF' : '#000',
          border: 'none',
          borderRadius: '20px',
          fontFamily:"Poppins",
        }}
        onClick={handleEquipmentClick}
      >
         Equipment
      </Button>


      <Button
        variant={activeButton === 'Herbicide' ? 'contained' : 'outlined'}
        style={{
          minHeight: '50px',
          minWidth: '90px',
          backgroundColor: activeButton === 'Herbicide' ? '#0A6054' : 'transparent',
          color: activeButton === 'Herbicide' ? '#FFF' : '#000',
          border: 'none',
          borderRadius: '20px',
          fontFamily:"Poppins",
        }}
        onClick={handleHerbicideClick}
      >
         Pesticides
      </Button>


      <Button
        variant={activeButton === 'Services' ? 'contained' : 'outlined'}
        style={{
          minHeight: '50px',
          minWidth: '90px',
          backgroundColor: activeButton === 'Services' ? '#0A6054' : 'transparent',
          color: activeButton === 'Services' ? '#FFF' : '#000',
          border: 'none',
          borderRadius: '20px',
          fontFamily:"Poppins",
        }}
        onClick={handleServicesClick}
      >
         Services
      </Button>
    </Box>
  );
};

export default CustomToggleSwitchVendors;
