import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

const CustomToggleSwitchCreditScore = ({activeButton, setActiveButton, handleSeedsClick, handleFertilizersClick,handleEquipmentClick,handleServicesClick}) => {


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
        Overview
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
         Score Factors
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
       //no OnClick for history, for now - sep 15 2025 - dagogog -uf-206
      >
         History
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
         Recommendations
      </Button>
    </Box>
  );
};

export default CustomToggleSwitchCreditScore;
