import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { CiShoppingBasket } from "react-icons/ci";
import { RiBillLine } from "react-icons/ri";

const CustomToggleSwitchRequests = ({activeButton, setActiveButton, handleSeedsClick, handleFertilizersClick}) => {


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
        variant={activeButton === 'Requests' ? 'contained' : 'outlined'}
        style={{
          height: '30px',
          minWidth: '90px',
          backgroundColor: activeButton === 'Requests' ? '#0A6054' : 'transparent',
          color: activeButton === 'Requests' ? '#fff' : '#000',
          border: 'none',
          borderRadius: '20px',
          marginRight: '4px',
          fontFamily:"Poppins",
        }}
        onClick={handleFertilizersClick}
      >
       <CiShoppingBasket style={{fontSize:"1rem",marginRight:"5px"}}/>  Requests
      </Button>
      <Button
        variant={activeButton === 'Credit' ? 'contained' : 'outlined'}
        style={{
          height: '30px',
          minWidth: '90px',
          backgroundColor: activeButton === 'Credit' ? '#0A6054' : 'transparent',
          color: activeButton === 'Credit' ? '#FFF' : '#000',
          border: 'none',
          borderRadius: '20px',
          fontFamily:"Poppins",
        }}
        onClick={handleSeedsClick}
      >
      <RiBillLine style={{fontSize:"1rem",marginRight:"5px"}}/>   Credit History
      </Button>

      {/*
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
      */}
    </Box>
  );
};

export default CustomToggleSwitchRequests;
