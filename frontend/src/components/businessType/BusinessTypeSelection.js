import { useState } from 'react';
import { 
  Grid, 
  Button, 
  FormControlLabel, 
  Typography, 
  Container,
  Box,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import BusinessIcon from '@mui/icons-material/Business';
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
  maxWidth: '600px',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  justifyContent: 'space-between',
  position: 'relative',
}));

const StyledContainerSecond = styled(Container)(({ theme }) => ({
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  justifyContent: 'center',
  width: '100%',
  minWidth: '800px',
  marginLeft:"-4rem"
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

const InfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#EBFDD8',
  border: '1px solid #629D23',
  borderRadius: '8px',
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const BusinessTypeSelection = ({ onContinue, onBack }) => {
  const [businessType, setBusinessType] = useState('');

  const handleBusinessTypeChange = (event) => {
    setBusinessType(event.target.value);
  };

  const handleContinue = () => {
    onContinue(businessType);
  };

  return (
    <>
      <Helmet>
        <title>Business Type Selection - UfarmX</title>
      </Helmet>

      <StyledRoot>
        <StyledContainer maxWidth="sm">
          <StyledLogo>
            <img src={Bonlogo} height="42" alt="UfarmX Logo" />
          </StyledLogo>
          
          <StyledContainerSecond>
            <Grid item xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"2rem",marginTop:"3rem"}}>
              <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",textAlign:"center"}}>
                <h1 style={{fontWeight:"500",marginBottom:"0rem",fontSize:"2rem", marginTop: "20px"}}>Complete Your Profile</h1>
                <div style={{fontSize:"0.9rem",fontWeight:"300",marginBottom:"1rem"}}>{"Welcome! Let's set up your retailer account"}</div>
                <div style={{fontSize:"1.5rem",fontWeight:"500",marginTop:"1rem"}}>Business Type</div>
              </div>
            </Grid>

            {/* Business Icon */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
              <BusinessIcon sx={{ 
                fontSize: '100px', 
                color: '#90C434', 
                backgroundColor: '#90C4341A',
                borderRadius: '50%',
                padding: '20px'
              }} />
            </Box>

            {/* Tell us about your business */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <h2 style={{fontWeight:"500",marginBottom:"0.5rem",fontSize:"1.5rem"}}>Tell us about your business</h2>
              <Typography variant="body1" sx={{ color: '#666', fontSize: '1rem' }}>
                This helps us provide the right services for your business type
              </Typography>
            </Box>

            {/* CAC Registration Question */}
            <Box sx={{ mb: 3 }}>
              <FormLabel component="legend" sx={{ mb: 2, color: '#333', fontSize: '1rem', fontWeight: '500' }}>
                Is your business formally registered with CAC? *
              </FormLabel>
              
              <RadioGroup
                value={businessType}
                onChange={handleBusinessTypeChange}
                sx={{ gap: 1 }}
              >
                <FormControlLabel
                  value="registered"
                  control={
                    <Radio
                      sx={{
                        color: '#90C434',
                        '&.Mui-checked': {
                          color: '#90C434',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body1" sx={{ fontSize: '0.95rem' }}>
                      Yes, I have a registered company (CAC)
                    </Typography>
                  }
                  sx={{ alignItems: 'center', margin: 0 }}
                />
                
                {/* Info Box for registered business */}
                {businessType === 'registered' && (
                  <InfoBox sx={{ ml: 0, mb: 2 }}>
                    <Typography variant="h5" component="h4" sx={{ fontSize: '1.2rem', fontWeight: '600', mb: 1, color: '#333' }}>
                      Registered Business
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.6 }}>
                      Complete your registration with your company documents to unlock full access. 
                      List your products, onboard farmers, offer credit, and grow your impact in the agro community.
                    </Typography>
                  </InfoBox>
                )}
                
                <FormControlLabel
                  value="individual"
                  control={
                    <Radio
                      sx={{
                        color: '#90C434',
                        '&.Mui-checked': {
                          color: '#90C434',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body1" sx={{ fontSize: '0.95rem' }}>
                      No, I operate as an individual business
                    </Typography>
                  }
                  sx={{ alignItems: 'center', margin: 0 }}
                />
                
                {/* Info Box for individual business */}
                {businessType === 'individual' && (
                  <InfoBox sx={{ ml: 0 }}>
                    <Typography variant="h5" component="h4" sx={{ fontSize: '1.2rem', fontWeight: '600', mb: 1, color: '#333' }}>
                      Individual Business
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.6 }}>
                      No problem! We'll help you get started as an individual business owner. 
                      You can always upgrade to a registered company later.
                    </Typography>
                  </InfoBox>
                )}
              </RadioGroup>
            </Box>

            {/* Continue Button */}
            <Button
              fullWidth
              variant="contained"
              disabled={!businessType}
              onClick={handleContinue}
              sx={{
                mt: 2,
                mb: 2,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: businessType ? '#0A6054'/*'#90C434'*/ : '#cccccc',
                color: businessType ? 'white' : '#666666',
                '&:hover': {
                  backgroundColor: businessType ? '#7FB02E' : '#cccccc',
                },
                '&:disabled': {
                  backgroundColor: '#cccccc',
                  color: '#666666',
                },
              }}
            >
              Continue
            </Button>
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

export default BusinessTypeSelection;
