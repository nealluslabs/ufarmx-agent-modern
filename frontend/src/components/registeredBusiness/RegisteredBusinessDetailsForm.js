import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Grid, 
  Button, 
  Typography, 
  Container,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Bonlogo from "../../assets/images/logo.png";
import { uploadPhotoOfShopBus, uploadUtilityBillBus } from 'src/redux/actions/group.action';

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
  maxWidth: '1200px',
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
  marginLeft:"0rem"
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

const UploadBox = styled(Box)(({ theme }) => ({
  border: '2px dashed #F9FAFB',
  borderRadius: '8px',
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: '#F9FAFB',
  height: '180px', // Fixed height instead of minHeight
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
}));

const RegisteredBusinessDetailsForm = ({ formData, onInputChange, onBack, onContinue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else {
      navigate('/registered-business-preview', { state: { formData, businessType: 'registered' } });
    }
  };

  const [photoOfShopBusFile, setPhotoOfShopBusFile] = useState(null);
  const [photoOfShopBusPhotoURL, setPhotoOfShopBusPhotoURL] = useState('');
  const [photoURL,setPhotoURL] = useState(null)


  const handlePhotoOfShopBusChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoOfShopBusFile(file);
      setPhotoOfShopBusPhotoURL(file.name);
     
      
      dispatch(uploadPhotoOfShopBus(file))
      
    }
  };




  const [utilityBillBusFile, setUtilityBillBusFile] = useState(null);
  const [utilityBillBusPhotoURL, setUtilityBillBusPhotoURL] = useState('')



  const handleUtilityBillBusChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUtilityBillBusFile(file);
      setUtilityBillBusPhotoURL(file.name);
     
      
      dispatch(uploadUtilityBillBus(file))
      
    }
  }

  return (
    <>
      <Helmet>
        <title>Complete Profile - Business Details - UfarmX</title>
      </Helmet>

      <StyledRoot>
        <StyledContainer maxWidth="lg">
          <StyledLogo>
            <img src={Bonlogo} height="42" alt="UfarmX Logo" />
          </StyledLogo>
          
          <StyledContainerSecond>
            <Grid item xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"2rem",marginTop:"3rem"}}>
              <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",textAlign:"center"}}>
                <h1 style={{fontWeight:"500",marginBottom:"0rem",fontSize:"2rem", marginTop: "20px"}}>Complete Your Profile</h1>
                <div style={{fontSize:"0.9rem",fontWeight:"300",marginBottom:"1rem"}}>{"Welcome! Let's set up your retailer account"}</div>
              </div>
            </Grid>

            {/* Business Details Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: '500', mb: 3, mt: 3, textAlign: 'left' }}>
                Business Details
              </Typography>

              <Grid container spacing={3}>
                {/* Business Name and Store Name */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Business Name
                  </Typography>
                  <TextField
                  sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                  InputProps={{
                    style: { height: '4rem' },
                  }}
                    fullWidth
                    name="businessName"
                    value={formData.businessName || ''}
                    onChange={onInputChange}
                    placeholder="e.g Adebowale Farms"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Store Name (if different from business name)
                  </Typography>
                  <TextField
                  sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                  InputProps={{
                    style: { height: '4rem' },
                  }}
                    fullWidth
                    name="storeName"
                    value={formData.storeName || ''}
                    onChange={onInputChange}
                    placeholder="e.g Main Store"
                    variant="outlined"
                  />
                </Grid>

                {/* Business Address */}
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Business Address
                  </Typography>
                  <TextField
                  sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                  InputProps={{
                    style: { height: '4rem' },
                  }}
                    fullWidth
                    name="businessAddress"
                    value={formData.businessAddress || ''}
                    onChange={onInputChange}
                    placeholder="e.g 23 Unity Avenue"
                    variant="outlined"
                  />
                </Grid>

                {/* State and Local Government */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    State
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                    sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                      name="state"
                      value={formData.state || ''}
                      onChange={onInputChange}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return <span style={{ color: '#999' }}>Select state</span>;
                        }
                        return selected;
                      }}
                    >
                      <MenuItem value="Lagos">Lagos</MenuItem>
                      <MenuItem value="Abuja">Abuja</MenuItem>
                      <MenuItem value="Kano">Kano</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Local Government
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                    sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                      name="localGovernment"
                      value={formData.localGovernment || ''}
                      onChange={onInputChange}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return <span style={{ color: '#999' }}>Select local government</span>;
                        }
                        return selected;
                      }}
                    >
                      <MenuItem value="Ikeja">Ikeja</MenuItem>
                      <MenuItem value="Victoria Island">Victoria Island</MenuItem>
                      <MenuItem value="Surulere">Surulere</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Nearest Landmark and Years in Business */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Nearest Landmark to Store
                  </Typography>
                  <TextField
                  sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                  InputProps={{
                    style: { height: '4rem' },
                  }}
                    fullWidth
                    name="nearestLandmark"
                    value={formData.nearestLandmark || ''}
                    onChange={onInputChange}
                    placeholder="e.g Bank Building"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Years in Business
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                    sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                      name="yearsInBusiness"
                      value={formData.yearsInBusiness || ''}
                      onChange={onInputChange}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return <span style={{ color: '#999' }}>Select years in business</span>;
                        }
                        return selected;
                      }}
                    >
                      <MenuItem value="1-2">1-2 years</MenuItem>
                      <MenuItem value="3-5">3-5 years</MenuItem>
                      <MenuItem value="5+">5+ years</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Shop Ownership */}
                <Grid item xs={12}>
                  <FormLabel component="legend" sx={{ mb: 2, color: '#333', fontSize: '1rem', fontWeight: '500' ,color:"#667085"}}>
                    Is this your shop or rented?
                  </FormLabel>
                  <RadioGroup
                    row
                    name="shopOwnership"
                    value={formData.shopOwnership || ''}
                    onChange={onInputChange}
                  >
                    <FormControlLabel
                      value="own"
                      control={<Radio sx={{ color:'#ccc' /*'#90C434'*/, '&.Mui-checked': { color: '#ccc'/*'#90C434'*/ } }} />}
                      label="I own this shop"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          color: "#667085"
                        }}}
                    />
                    <FormControlLabel
                      value="rent"
                      control={<Radio sx={{ color: '#ccc'/*'#90C434'*/, '&.Mui-checked': { color:'#ccc' /*'#90C434'*/ } }} />}
                      label="I rent this shop"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          color: "#667085"
                        }}}
                    />
                  </RadioGroup>
                </Grid>

                {/* Shop Size */}
                <Grid item xs={12} style={{position:"relative"}}>
                  <FormLabel component="legend" sx={{ mb: 2, color: '#333', fontSize: '1rem', fontWeight: '500',color:"#667085" }}>
                    Estimate size of your shop
                  </FormLabel>
                  <RadioGroup
                    row
                    name="shopSize"
                    value={formData.shopSize || ''}
                    onChange={onInputChange}
                    sx={{ flexWrap: 'wrap' }}
                  >
                    <FormControlLabel
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          color: "#667085"
                        }}}
                      value="small"
                      control={<Radio sx={{ color: '#ccc'/*'#90C434'*/, '&.Mui-checked': { color: '#ccc'/*'#90C434'*/ } }} />}
                      label="Small (can serve 10-50 farmers)"
                    />
                    <FormControlLabel
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          color: "#667085"
                        }}}
                      value="medium"
                      control={<Radio sx={{ color: '#ccc'/*'#90C434'*/, '&.Mui-checked': { color: '#ccc'/*'#90C434'*/ } }} />}
                      label="Medium (can serve 50-200 farmers)"
                    />
                    <FormControlLabel
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          color: "#667085"
                        }}}
                      value="large"
                      control={<Radio sx={{ color: '#ccc'/*'#90C434'*/, '&.Mui-checked': { color: '#ccc'/*'#90C434'*/ } }} />}
                      label="Large (can serve 200+ farmers)"
                    />
                  </RadioGroup>
                </Grid>

                {/* Shop Photo and Proof of Business Address */}
                <Grid item xs={12} md={6} style={{position:"relative"}}>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: '500',color:"#667085" }}>
                    Shop Photo
                  </Typography>
                  <UploadBox>
                    <CloudUploadIcon sx={{ fontSize: '40px', color: '#666', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: '600', mb: 1, fontSize: '1rem',color:"#667085" }}>
                      Add Photo of your shop (Interior & Exterior)
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                      Drag and drop file here to upload or choose file
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem', mt: 1.5 }}>
                      Format: JPG, PNG, PDF (Max 5MB)
                    </Typography>

                          <input
                      type="file"
                      multiple
                      onChange={handlePhotoOfShopBusChange}
                      style={{ /*display: "none"*//*background:"pink",*/opacity:"0",userSelect:"none",height:"11rem",width:"35rem",position:"absolute",top:"4rem",left:"1rem"}}
                      id="fileInput"
                      title="" 
                    />
      
      
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '1rem', mt: 1.5,mb: 1.5 }}>
                   {photoOfShopBusPhotoURL}
                  </Typography>

                  </UploadBox>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem', mt: 1 }}>
                    Photo help us verify your business location and setup
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6} style={{position:"relative"}}>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: '500',color:"#667085" }}>
                    Proof of Business Address
                  </Typography>
                  <UploadBox>
                    <CloudUploadIcon sx={{ fontSize: '40px', color: '#666', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: '600', mb: 1, fontSize: '1rem',color:"#667085" }}>
                      Upload utility bill or lease Agreement
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                      Drag and drop file here to upload or choose file
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem', mt: 1.5 }}>
                      Format: JPG, PNG, PDF (Max 5MB)
                    </Typography>
                  </UploadBox>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem', mt: 1 }}>
                    Recent utility bill, lease agreement, or property document
                  </Typography>



                  <input
                      type="file"
                      multiple
                      onChange={handleUtilityBillBusChange}
                      style={{ /*display: "none"*//*background:"pink"*/opacity:"0",userSelect:"none",height:"11rem",width:"35rem",position:"absolute",top:"4rem",left:"1rem"}}
                      id="fileInput"
                      title="" 
                    />


                  <Typography variant="body2" sx={{ color: '#666', fontSize: '1rem', mt: 1.5,mb: 1.5 }}>
                   {utilityBillBusPhotoURL}
                  </Typography>
                </Grid>

                {/* Buttons */}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
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
                      Back
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleContinue}
                      sx={{
                        py: 1.5,
                        px: 3,
                        fontSize: '1rem',
                        fontWeight: '600',
                        backgroundColor: '#0A6054'/*'#90C434'*/,
                        color: 'white',
                        borderRadius: '8px',
                        '&:hover': {
                          backgroundColor: '#7FB02E',
                        },
                      }}
                    >
                      Continue
                    </Button>
                  </Box>
                </Grid>
              </Grid>
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

export default RegisteredBusinessDetailsForm;
