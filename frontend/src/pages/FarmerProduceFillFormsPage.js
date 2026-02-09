import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Box } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';


import BONLOGO from '../assets/images/logo.png';
import LoginForm from 'src/components/login/LoginForm';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from "react-icons/fa";

import AddResponseForm from 'src/components/addResponse/AddResponseForm';
import FillFormForm from 'src/components/fillForm/FillFormForm';

import { useSelector } from 'react-redux';

import FarmersProduceForm from 'src/components/farmerProducefillForm/FarmersProduceForm';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));




const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems:"center",
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  //scale:"1.2"
}));

// ----------------------------------------------------------------------

export default function FarmerProduceFillFormsPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
 
  useEffect(()=>{

   if(!user ){
    navigate('/login')
   }

  },[user])




  return (
    <>
      <Helmet>
        <title> UfarmX</title>
      </Helmet>

      <StyledRoot style={{ flexDirection: 'row-reverse' }}>
      

        <Container maxWidth="sm" style={{ border: '0px solid red', flex: 2 }}>
          
      { /*
        <div  onClick ={()=>{navigate('/')}} style={{fontSize:"2rem",color:"white",fontWeight:"900",color:"#21712E",position:"absolute",top:"1rem",left:"1rem",cursor:"pointer"}}>
        <FaArrowCircleLeft/>

     
          </div>
      */}   
          
          
          <StyledContent>
         
          
             <Box sx={{minWidth:{md:"1200px", xs: '100%'},maxWidth:"1200px",display:"flex",alignItems:"flex-start",justifyContent:"center",marginTop:"-5rem"}}>
          
            
            <FarmersProduceForm />
            </Box>
          
          
          
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
