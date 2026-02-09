import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';

// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';
import agentConfig from './agentConfig';

import agentRetailerConfig from './agentRetailerConfig';
import agentFarmerConfig from './agentFarmerConfig';

import farmerConfig from './farmerConfig';
import athleteConfig from './athleteConfig';
import regmgrConfig from './regmgrConfig';
import BONLOGO from '../../../assets/images/logo.png';
import { useSelector } from 'react-redux';
import { MdLogout } from 'react-icons/md';

// ----------------------------------------------------------------------

// const NAV_WIDTH = 280;
const NAV_WIDTH = 250;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const {isSuperAdmin,isFarmer,isAgent,agentType,isAdmin} = useSelector((state)=> state.group)
  const navigate = useNavigate()
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const { user } = useSelector((state) => state.auth);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
        backgroundColor:"#122F2B",
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>{/* <Logo /> */}</Box>
      <Box sx={{ mb: 5, mx: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link underline="none">
          <img src={BONLOGO} width="170" height="40" alt="Logo" />
        </Link>
      </Box>

      <NavSection data={isFarmer?farmerConfig:isAgent?(agentType==="Retailer"?agentRetailerConfig:agentFarmerConfig):isAdmin?regmgrConfig:navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              // bgcolor: 'background.default',
              // bgcolor: '#60A1EC',
             // bgcolor: '#21712E',
             // bgcolor: '#F0F0F0',
              bgColor:"#FFF",
              backgroundColor:"#122F2B",
              color:"black",
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}

          <div style={{color:"white",
              backgroundColor:"#90C434",
             
             margin:"0 auto",
             marginBottom:"1rem",
             width:"95%",
             display:"flex",
             cursor:"pointer",
             justifyContent:"center",
             alignItems:"center",
             fontSize:"1.2rem",
             paddingTop:"0.5rem",
             paddingBottom:"0.5rem",
             position:"relative",
             borderRadius:"5px"
             
                     }}> 
             
              <span onClick={()=>{navigate('/logout')}} style={{position:"relative",left:"-2rem", display:"flex",justifyContent:"center",alignItems:"center"}}>
              <MdLogout style={{marginRight:"0.3rem"}} />  Logout
              </span>

              </div>


        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { 
                width: NAV_WIDTH,
                //bgcolor: '#21712E',
                bgcolor: '#F0F0F0',
                backgroundColor:"#122F2B",
                color:"black"
             },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
