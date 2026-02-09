import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Grid, 
  Button, 
  Typography, 
  Container,
  Box,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
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
  maxWidth: '900px',
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

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const SectionDivider = styled('div')(({ theme }) => ({
  borderBottom: '1px solid #DFDDE4',
  paddingBottom: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const EditButton = styled(Typography)(({ theme }) => ({
  color: '#0A6054',
  fontSize: '0.9rem',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontWeight: '600',
  fontSize: '1rem',
  marginBottom: theme.spacing(0.5),
}));

const FieldValue = styled(Typography)(({ theme }) => ({
  color: '#666',
  fontSize: '0.95rem',
  marginBottom: theme.spacing(2),
}));

const DocumentLink = styled(Typography)(({ theme }) => ({
  color: '#0A6054',
  fontSize: '0.85rem',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const IndividualPreviewForm = ({ 
  formData = {}, 
  personalData = {}, 
  onBack, 
  onSubmit, 
  onEditBusinessDetails, 
  onEditPersonalInfo 
}) => {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleMakeChanges = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    } else {
      // Navigate to success page
      navigate('/application-success');
    }
  };

  return (
    <>
      <Helmet>
        <title>Preview Application - UfarmX</title>
      </Helmet>

      <StyledRoot>
        <StyledContainer maxWidth="md">
          <StyledLogo>
            <img src={Bonlogo} height="42" alt="UfarmX Logo" />
          </StyledLogo>
          
          <StyledContainerSecond>
            {/* Header Section */}
            <Grid item xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"2rem",marginTop:"3rem"}}>
              <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",textAlign:"center"}}>
                <h1 style={{fontWeight:"500",marginBottom:"0rem",fontSize:"2rem", marginTop: "20px"}}>Complete Your Profile</h1>
                <div style={{fontSize:"0.9rem",fontWeight:"300",marginBottom:"1rem"}}>{"Welcome! Let's set up your retailer account"}</div>
              </div>
            </Grid>

            {/* Preview Application Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: '600', mb: 1, mt: 3, textAlign: 'left' }}>
                Preview Application
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', mb: 4 }}>
                This is the final look of your application.
              </Typography>

              {/* Company Information */}
              <SectionDivider>
                <SectionHeader>
                  <Typography variant="h5" sx={{ fontWeight: '600' }}>
                    Company Information
                  </Typography>
                  <EditButton onClick={onEditBusinessDetails} sx={{ cursor: 'pointer' }}>
                    Edit
                  </EditButton>
                </SectionHeader>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>Business Name</FieldLabel>
                    <FieldValue>{formData.businessName || 'Adebowale farms'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>Store Name</FieldLabel>
                    <FieldValue>{formData.storeName || 'Main Store'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>Business Address</FieldLabel>
                    <FieldValue>{formData.businessAddress || 'Suite 10, Ademokoya, Street Sango, Lagos State.'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>State</FieldLabel>
                    <FieldValue>{formData.state || 'Lagos'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>Local Government</FieldLabel>
                    <FieldValue>{formData.localGovernment || 'Ikeja'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>Nearest Landmark</FieldLabel>
                    <FieldValue>{formData.nearestLandmark || 'Near City Mall'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>Years in Business</FieldLabel>
                    <FieldValue>{formData.yearsInBusiness || '3-5 years'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>Shop Ownership</FieldLabel>
                    <FieldValue>{formData.shopOwnership || 'Owned'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>Shop Size</FieldLabel>
                    <FieldValue>{formData.shopSize || 'Medium'}</FieldValue>
                  </Grid>
                </Grid>
              </SectionDivider>

              {/* Personal Information */}
              <SectionDivider>
                <SectionHeader>
                  <Typography variant="h5" sx={{ fontWeight: '600' }}>
                    Personal Information
                  </Typography>
                  <EditButton onClick={onEditPersonalInfo} sx={{ cursor: 'pointer' }}>
                    Edit
                  </EditButton>
                </SectionHeader>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>Name</FieldLabel>
                    <FieldValue>{`${personalData.firstName || ''} ${personalData.middleName || ''} ${personalData.lastName || ''}`.trim() || 'Samson Adamu'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>Date of Birth</FieldLabel>
                    <FieldValue>{personalData.dateOfBirth || '10/10/1988'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>Gender</FieldLabel>
                    <FieldValue>{personalData.gender || 'Male'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>Email Address</FieldLabel>
                    <FieldValue>{personalData.email || 'Sample@email.com'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>Phone Number</FieldLabel>
                    <FieldValue>{personalData.phoneNumber || '222 0555 555'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>Nationality</FieldLabel>
                    <FieldValue>{personalData.nationality || 'Nigeria'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>State of Origin</FieldLabel>
                    <FieldValue>{personalData.stateOfOrigin || 'Lagos'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>Address</FieldLabel>
                    <FieldValue>{personalData.address || 'Suite 10, Ademokoya, Street Sango, Lagos State.'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>NIN</FieldLabel>
                    <FieldValue>{personalData.nin || '2546895712'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>ID Type</FieldLabel>
                    <FieldValue>{personalData.meansOfId || 'Drivers licence'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>Meter Number</FieldLabel>
                    <FieldValue>{personalData.meterNumber || 'KJA2652186352'}</FieldValue>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FieldLabel sx={{color:"#667085"}}>Utility Bill</FieldLabel>
                    <FieldValue>
                      {personalData.utilityBill ? personalData.utilityBill.name : 'Electricity Bill'}
                      <br />
                      <DocumentLink>See Document</DocumentLink>
                    </FieldValue>
                  </Grid>
                </Grid>
              </SectionDivider>

              {/* Confirmation Checkbox */}
              <Box sx={{ mb: 3, mt: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isConfirmed}
                      onChange={(e) => setIsConfirmed(e.target.checked)}
                      sx={{
                        color: '#ccc',
                        position:"relative",
                        top:"-0rem",
                        '&.Mui-checked': {
                          color: '#ccc',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body1" sx={{ fontSize: '0.95rem' }}>
                      I confirm that all information provided are verified and accurate.
                    </Typography>
                  }
                />
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleMakeChanges}
                  sx={{
                    py: 1.5,
                    px: 3,
                    fontSize: '1rem',
                    fontWeight: '600',
                    borderColor: '#629D23',
                    color: '#629D23',
                    borderRadius: '8px',
                    '&:hover': {
                      borderColor: '#629D23',
                      backgroundColor: 'rgba(98, 157, 35, 0.1)',
                    },
                  }}
                >
                  Make Changes
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={!isConfirmed}
                  onClick={handleSubmit}
                  sx={{
                    py: 1.5,
                    px: 3,
                    fontSize: '1rem',
                    fontWeight: '600',
                    backgroundColor: isConfirmed ? '#0A6054'/*'#90C434'*/ : '#cccccc',
                    color: isConfirmed ? 'white' : '#666666',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: isConfirmed ? '#7FB02E' : '#cccccc',
                    },
                    '&:disabled': {
                      backgroundColor: '#cccccc',
                      color: '#666666',
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
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

export default IndividualPreviewForm;
