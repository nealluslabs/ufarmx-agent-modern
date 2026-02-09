import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import Bonlogo from '../../assets/images/logo.png';

// Styled Components
const StyledRoot = styled('div')(() => ({
  backgroundColor: '#ffffff',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
}));

const StyledContainer = styled(Container)(() => ({
  maxWidth: '800px',
  position: 'relative',
}));

const StyledContainerSecond = styled('div')(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  justifyContent: 'center',
  width: '100%',
  minWidth: '800px',
  marginLeft:"-2rem"
}));

const StyledLogo = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  left: '-120px',
  zIndex: 1000,
  [theme.breakpoints.down('md')]: {
    left: '20px',
    top: '20px',
  },
}));

const InfoCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  padding: theme.spacing(3),
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StepsContainer = styled(Box)(({ theme }) => ({
  border: '1px solid #90C434',
  backgroundColor: '#F1FFE9',
  borderRadius: '8px',
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const RegisteredBusinessSuccessForm = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard/home');
  };

  return (
    <>
      <Helmet>
        <title>Application Submitted - UfarmX</title>
      </Helmet>

      <StyledRoot>
        <StyledContainer maxWidth="sm">
          <StyledLogo>
            <img src={Bonlogo} height="42" alt="UfarmX Logo" />
          </StyledLogo>
          
          <StyledContainerSecond>
            <Grid item xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"2rem",marginTop:"3rem"}}>
              <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",textAlign:"center"}}>
                <h1 style={{fontWeight:"500",marginBottom:"0rem",fontSize:"2rem", marginTop: "20px"}}>
                  Welcome to Ufarmx
                </h1>
                <div style={{fontSize:"1.1rem",fontWeight:"300",marginBottom:"1rem"}}>
                  Join thousands of retailers serving farmers across Nigeria
                </div>
              </div>
            </Grid>

            {/* Success Icon */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
              <CheckCircleIcon sx={{ 
                fontSize: '100px', 
                color: '#90C434', 
                backgroundColor: '#90C4341A',
                borderRadius: '50%',
                padding: '20px'
              }} />
            </Box>

            {/* Success Message */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <h2 style={{fontWeight:"500",marginBottom:"0.5rem",fontSize:"1.5rem"}}>
                Application Submitted Successfully!
              </h2>
              <Typography variant="body1" sx={{ color: '#666', fontSize: '1rem' }}>
                Thank you, Adams! We've received your information and our team is reviewing it.
              </Typography>
            </Box>

            {/* What happens next card */}
            <InfoCard>
              <Typography variant="h6" sx={{ fontWeight: '600', mb: 2, fontSize: '1.2rem' }}>
                What happens next?
              </Typography>
              
              <StepsContainer>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <CheckIcon sx={{ color: '#90C434', mr: 1, fontSize: '1.2rem' }} />
                  <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                    Our team will verify your information within the next 2 business days
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <CheckIcon sx={{ color: '#90C434', mr: 1, fontSize: '1.2rem' }} />
                  <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                    We may contact you for additional documents
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <CheckIcon sx={{ color: '#90C434', mr: 1, fontSize: '1.2rem' }} />
                  <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                    Once your account is approved, you'll get full access to your dashboard
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckIcon sx={{ color: '#90C434', mr: 1, fontSize: '1.2rem' }} />
                  <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                    You can then start onboarding farmers, distribute goods, finance inputs, and manage produce purchases
                  </Typography>
                </Box>
              </StepsContainer>
            </InfoCard>

            {/* Go Home Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleGoHome}
              sx={{
                mt: 2,
                mb: 1,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#90C434',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#7FB02E',
                },
              }}
            >
              Go Home
            </Button>

            {/* Limited access notice */}
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', fontSize: '0.9rem', mb: 3 }}>
              You'll have limited access until your account is verified
            </Typography>

            {/* Security notice */}
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', fontSize: '0.9rem', mt: 4 }}>
              Your information is secure and will be verified by our team
            </Typography>
          </StyledContainerSecond>

          <div style={{ 
            padding: '20px', 
            textAlign: 'center', 
            color: '#666', 
            fontSize: '0.9rem' 
          }}>
            <p>@2025 UfarmX inc. All rights reserved</p>
          </div>
        </StyledContainer>
      </StyledRoot>
    </>
  );
};

export default RegisteredBusinessSuccessForm;
