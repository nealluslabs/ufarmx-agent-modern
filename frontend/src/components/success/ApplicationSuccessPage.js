import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import Bonlogo from "../../assets/images/logo.png";

// Styled components
const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  display: 'flex',
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  width: '100%',
  maxWidth: '800px',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  justifyContent: 'space-between',
  position: 'relative',
}));

const StyledContainerSecond = styled(Container)(({ theme }) => ({
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  justifyContent: 'center',
  width: '100%',
  textAlign: 'center',
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

const CheckboxIconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#90C4341A',
  borderRadius: '50%',
  width: '80px',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '52px auto 32px auto',
}));

const NextStepsContainer = styled(Paper)(({ theme }) => ({
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  marginTop: '2rem',
  marginBottom: '2rem',
}));

const StepsContentBox = styled(Box)(({ theme }) => ({
  border: '1px solid #90C434',
  backgroundColor: '#F1FFE9',
  borderRadius: '8px',
  padding: '1.5rem',
  marginTop: '1rem',
  marginBottom: '2rem',
}));

const StepItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '1rem',
  '&:last-child': {
    marginBottom: 0,
  },
}));

const CheckIconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#90C434',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '12px',
  marginTop: '2px',
  flexShrink: 0,
}));

const ApplicationSuccessPage = () => {
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
        <StyledContainer maxWidth="md">
          <StyledLogo>
            <img src={Bonlogo} height="42" alt="UfarmX Logo" />
          </StyledLogo>
          
          <StyledContainerSecond>
            {/* Welcome Section */}
            <Typography variant="h4" sx={{ fontWeight: '600', mb: 2, color: '#333' }}>
              Welcome to UfarmX
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#666', mb: 4 }}>
              Join thousands of retailers serving farmers across Nigeria
            </Typography>

            {/* Success Icon */}
            <CheckboxIconWrapper>
              <CheckCircleIcon 
                sx={{ 
                  fontSize: '48px', 
                  color: '#90C434' 
                }} 
              />
            </CheckboxIconWrapper>

            {/* Success Message */}
            <Typography variant="h5" sx={{ fontWeight: '600', mb: 2, color: '#333' }}>
              Application Submitted Successfully!
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1rem', color: '#666', mb: 3 }}>
              Thank you, Adams! We've received your information and our team is reviewing it.
            </Typography>

            {/* Next Steps Container */}
            <NextStepsContainer>
              <Typography variant="h6" sx={{ fontWeight: '600', mb: 2, textAlign: 'center', color: '#333' }}>
                What happens next?
              </Typography>

              <StepsContentBox>
                <StepItem>
                  <CheckIconWrapper>
                    <CheckIcon sx={{ fontSize: '14px', color: 'white' }} />
                  </CheckIconWrapper>
                  <Typography variant="body2" sx={{ fontSize: '0.95rem', color: '#333', textAlign: 'left' }}>
                    Our team will verify your information within the next 2 business days
                  </Typography>
                </StepItem>

                <StepItem>
                  <CheckIconWrapper>
                    <CheckIcon sx={{ fontSize: '14px', color: 'white' }} />
                  </CheckIconWrapper>
                  <Typography variant="body2" sx={{ fontSize: '0.95rem', color: '#333', textAlign: 'left' }}>
                    We may contact you for additional documents
                  </Typography>
                </StepItem>

                <StepItem>
                  <CheckIconWrapper>
                    <CheckIcon sx={{ fontSize: '14px', color: 'white' }} />
                  </CheckIconWrapper>
                  <Typography variant="body2" sx={{ fontSize: '0.95rem', color: '#333', textAlign: 'left' }}>
                    Once your account is approved, you'll get full access to your dashboard
                  </Typography>
                </StepItem>

                <StepItem>
                  <CheckIconWrapper>
                    <CheckIcon sx={{ fontSize: '14px', color: 'white' }} />
                  </CheckIconWrapper>
                  <Typography variant="body2" sx={{ fontSize: '0.95rem', color: '#333', textAlign: 'left' }}>
                    You can then start onboarding farmers, distribute goods, finance inputs, and manage produce purchases
                  </Typography>
                </StepItem>
              </StepsContentBox>

              <Button
                variant="contained"
                onClick={handleGoHome}
                sx={{
                  width: '90%',
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: '600',
                  backgroundColor: '#90C434',
                  color: 'white',
                  borderRadius: '8px',
                  mb: 2,
                  '&:hover': {
                    backgroundColor: '#7FB02E',
                  },
                }}
              >
                Go Home
              </Button>

              <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>
                You'll have limited access until your account is verified
              </Typography>
            </NextStepsContainer>

            {/* Security Message */}
            <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#666', mt: 2, mb: 2 }}>
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

export default ApplicationSuccessPage;
