import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const RegisteredBusinessPreviewForm = ({ 
  companyData = {}, 
  businessData = {},
  personalData = {}, 
  onBack, 
  onSubmit,
  onEditCompanyInfo,
  onEditBusinessDetails,
  onEditPersonalInfo 
}) => {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/complete-profile');
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    } else {
      navigate('/application-success');
    }
  };

  const handleEditCompanyInfo = () => {
    if (onEditCompanyInfo) {
      onEditCompanyInfo();
    }
  };

  const handleEditBusinessDetails = () => {
    if (onEditBusinessDetails) {
      onEditBusinessDetails();
    }
  };

  const handleEditPersonalInfo = () => {
    if (onEditPersonalInfo) {
      onEditPersonalInfo();
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
            <Grid item xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"2rem",marginTop:"3rem"}}>
              <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",textAlign:"center"}}>
                <h1 style={{fontWeight:"500",marginBottom:"0rem",fontSize:"2rem", marginTop: "20px"}}>Preview Application</h1>
                <div style={{fontSize:"1.1rem",fontWeight:"300",marginBottom:"1rem"}}>This is the final look of your application.</div>
              </div>
            </Grid>

            {/* Company Information */}
            <SectionDivider>
              <SectionHeader>
                <Typography variant="h4" sx={{ fontWeight: '500' }}>
                  Company Information
                </Typography>
                <EditButton onClick={handleEditCompanyInfo}>Edit</EditButton>
              </SectionHeader>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Business Name</FieldLabel>
                  <FieldValue>{companyData.businessName || 'Adebowale Farms Ltd'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>CAC Registration Number</FieldLabel>
                  <FieldValue>{companyData.cacNumber || 'RC261526'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Tax Identification Number</FieldLabel>
                  <FieldValue>{companyData.taxId || '8348393'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Business Registration Date</FieldLabel>
                  <FieldValue>{companyData.businessRegistrationDate || '10/10/2020'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Business Address</FieldLabel>
                  <FieldValue>{companyData.businessAddress || 'Suite 10, Ademokoya, Street Sango, Lagos State.'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>State</FieldLabel>
                  <FieldValue>{companyData.state || 'Lagos'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Local Government</FieldLabel>
                  <FieldValue>{companyData.localGovernment || 'Ikeja'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>City</FieldLabel>
                  <FieldValue>{companyData.city || 'Lagos'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Phone Number</FieldLabel>
                  <FieldValue>{`${companyData.countryCode || '+234'} ${companyData.phoneNumber || '8012345678'}`}</FieldValue>
                </Grid>
              </Grid>
            </SectionDivider>

            {/* Business Details */}
            <SectionDivider>
              <SectionHeader>
                <Typography variant="h4" sx={{ fontWeight: '500' }}>
                  Business Details
                </Typography>
                <EditButton onClick={handleEditBusinessDetails}>Edit</EditButton>
              </SectionHeader>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Business Name</FieldLabel>
                  <FieldValue>{businessData.businessName || 'Adebowale Farms'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Store Name</FieldLabel>
                  <FieldValue>{businessData.storeName || 'Main Store'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Business Address</FieldLabel>
                  <FieldValue>{businessData.businessAddress || '23 Unity Avenue'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>State</FieldLabel>
                  <FieldValue>{businessData.state || 'Lagos'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Local Government</FieldLabel>
                  <FieldValue>{businessData.localGovernment || 'Ikeja'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Nearest Landmark</FieldLabel>
                  <FieldValue>{businessData.nearestLandmark || 'Bank Building'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Years in Business</FieldLabel>
                  <FieldValue>{businessData.yearsInBusiness || '3-5 years'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Shop Ownership</FieldLabel>
                  <FieldValue>{businessData.shopOwnership === 'own' ? 'I own this shop' : businessData.shopOwnership === 'rent' ? 'I rent this shop' : 'Not specified'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Shop Size</FieldLabel>
                  <FieldValue>
                    {businessData.shopSize === 'small' ? 'Small (can serve 10-50 farmers)' : 
                     businessData.shopSize === 'medium' ? 'Medium (can serve 50-200 farmers)' : 
                     businessData.shopSize === 'large' ? 'Large (can serve 200+ farmers)' : 'Not specified'}
                  </FieldValue>
                </Grid>
              </Grid>
            </SectionDivider>

            {/* Personal Information */}
            <SectionDivider>
              <SectionHeader>
                <Typography variant="h4" sx={{ fontWeight: '500' }}>
                  Personal Information
                </Typography>
                <EditButton onClick={handleEditPersonalInfo}>Edit</EditButton>
              </SectionHeader>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>First Name</FieldLabel>
                  <FieldValue>{personalData.firstName || 'Samson'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Last Name</FieldLabel>
                  <FieldValue>{personalData.lastName || 'Adamu'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Middle Name</FieldLabel>
                  <FieldValue>{personalData.middleName || 'Michael'}</FieldValue>
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
                  <FieldValue>{personalData.email || 'sample@email.com'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Phone Number</FieldLabel>
                  <FieldValue>{`${personalData.countryCode || '+234'} ${personalData.phoneNumber || '8012345678'}`}</FieldValue>
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
                  <FieldLabel sx={{color:"#667085"}}>Local Government (Origin)</FieldLabel>
                  <FieldValue>{personalData.localGovernmentOrigin || 'Ikeja'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Address</FieldLabel>
                  <FieldValue>{personalData.address || '23 Unity Avenue'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Current State</FieldLabel>
                  <FieldValue>{personalData.currentState || 'Lagos'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Current Local Government</FieldLabel>
                  <FieldValue>{personalData.currentLocalGovernment || 'Ikeja'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Utility Type</FieldLabel>
                  <FieldValue>{personalData.utilityType || 'Electricity'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Means of ID</FieldLabel>
                  <FieldValue>{personalData.meansOfId || 'Driver\'s License'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Meter Number</FieldLabel>
                  <FieldValue>{personalData.meterNumber || '123456789'}</FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>NIN</FieldLabel>
                  <FieldValue>{personalData.nin || '2546895712'}</FieldValue>
                </Grid>
              </Grid>
            </SectionDivider>

            {/* Documentation */}
            <SectionDivider>
              <SectionHeader>
                <Typography variant="h4" sx={{ fontWeight: '500' }}>
                  Documentation
                </Typography>
                <EditButton onClick={handleEditCompanyInfo}>Edit</EditButton>
              </SectionHeader>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Certificate of Incorporation</FieldLabel>
                  <FieldValue>
                    <DocumentLink>See Document</DocumentLink>
                  </FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Business Application Form / Status Report</FieldLabel>
                  <FieldValue>
                    <DocumentLink>See Document</DocumentLink>
                  </FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>MEMART Document</FieldLabel>
                  <FieldValue>
                    <DocumentLink>See Document</DocumentLink>
                  </FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Shop Photo</FieldLabel>
                  <FieldValue>
                    <DocumentLink>See Document</DocumentLink>
                  </FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Proof of Business Address</FieldLabel>
                  <FieldValue>
                    <DocumentLink>See Document</DocumentLink>
                  </FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>Utility Bill</FieldLabel>
                  <FieldValue>
                    <DocumentLink>See Document</DocumentLink>
                  </FieldValue>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FieldLabel sx={{color:"#667085"}}>ID Documents</FieldLabel>
                  <FieldValue>
                    <DocumentLink>See Document</DocumentLink>
                  </FieldValue>
                </Grid>
              </Grid>
            </SectionDivider>

            {/* Confirmation Checkbox */}
            <Box sx={{ mb: 4 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isConfirmed}
                    onChange={(e) => setIsConfirmed(e.target.checked)}
                    sx={{
                      color: '#90C434',
                      position:"relative",
                      top:"-0.6rem",
                      '&.Mui-checked': {
                        color: '#90C434',
                      },
                    }}
                  />
                }
                label="I confirm that all information provided are verified and accurate."
                sx={{ alignItems: 'flex-start' }}
              />
            </Box>

            {/* Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mt: 3, width: '100%' }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleBack}
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
                  backgroundColor: !isConfirmed ? '#cccccc' :'#0A6054' /*'#90C434'*/,
                  color: !isConfirmed ? '#666666' : 'white',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: !isConfirmed ? '#cccccc' : '#7FB02E',
                  },
                  '&:disabled': {
                    backgroundColor: '#cccccc',
                    color: '#666666',
                  },
                }}
              >
                Submit Application
              </Button>
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

export default RegisteredBusinessPreviewForm;
