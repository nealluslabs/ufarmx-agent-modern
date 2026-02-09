import { useEffect, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover, Grid } from '@mui/material';
// mocks_

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'src/redux/actions/auth.action';
import { useNavigate } from 'react-router-dom';
import hm from 'src/assets/images/rec.png'
import redboy from 'src/assets/images/rec.png'

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const { user } = useSelector((state) => state.auth);


  useEffect(()=>{
    console.log("USER FOR RETAILER IS--->",user)

   if(!user ){
    navigate('/login')
   }

  },[user])



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {
        user && user.profilePicture?
        <Avatar  src={user && user.profilePicture?user.profilePicture:(user && user.userType==="business"? hm:redboy)} alt="photoURL" />
        :
        user && user.firstName && user.lastName &&
        <div style={{backgroundColor:"#0A6054",color:"white",fontSize:"0.8rem",padding:"0.5rem",borderRadius:"50%"}}>

        {`${user && user.firstName.slice(0,1)}${user && user.lastName.slice(0,1)}`}
       
        </div>
        }
      </IconButton>
      <ArrowDropDownIcon sx={{color: 'black'}} onClick={handleOpen}/>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            // width: 180,
            width: 200,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid sx={{mt: 1, ml: 1}}>
          <Avatar src={user && user.imageUrl?user.imageUrl:(user && user.userType==="athlete"?redboy:hm) } alt="photoURL" />
          </Grid>
          <Box sx={{ my: 1.5, px: 1 }}>
          <Typography variant="subtitle2" noWrap>
           
            {user && user.firstName?user && user.firstName:user && user.companyName?user.companyName:" "}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography> 
        </Box>
        </Grid>


        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <MenuItem sx={{ pt: 1 }}>
          Accounts
        </MenuItem>
        <Divider />
        <Stack sx={{color: '#828D9F' }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={() => dispatch(logout(navigate))} sx={{ m: 1 }} >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
