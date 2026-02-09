import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';


import BONLOGO from '../assets/images/logo.png';
import LoginForm from 'src/components/login/LoginForm';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from "react-icons/fa";
import LoginFormAgent from 'src/components/login/LoginFormAgent';

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
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  //scale:"1.2"
}));

// ----------------------------------------------------------------------

export default function LoginPageAgent() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title> UfarmX</title>
      </Helmet>

      <StyledRoot style={{ flexDirection: 'row-reverse' }}>
        {/*mdUp && ( //THE PICTURE USED TO BE HERE, SO COMMENT IT OUT IF YOU NEED
           <StyledSection style={{ border: '0px solid green', flex: 2 }}>
       </StyledSection>
        )*/}

        <Container maxWidth="sm" style={{ border: '0px solid red', flex: 2 }}>
          
        <div  onClick ={()=>{navigate('/')}} style={{fontSize:"2rem",color:"white",fontWeight:"900",color:"#21712E",position:"absolute",top:"1rem",left:"1rem",cursor:"pointer"}}>
        <FaArrowCircleLeft/>

         {/*<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
          <img src={BONLOGO} width="160" height="160" />
      </div>*/}
       
      </div>
          
          
          
          <StyledContent>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px',position:"relative" }}>
           {<img style={{position:"absolute",top:"-15rem"}} src={BONLOGO} width="240" height="75" />}
          </div>
           {
            <Typography variant="h4" gutterBottom>
              Agent
            </Typography>
           }
           
            <LoginFormAgent />

            {/* <center>
            <Typography variant="body2" sx={{ mt: 2,scale:"1.2" }}>
              Don’t have an account yet? {''}
              <Link href='/register' variant="subtitle2"> <span style={{ color:"blue",textDecoration:"underline" }} >Register Here.</span> </Link>
            </Typography>
          </center> */}


            {/* <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider> */}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
