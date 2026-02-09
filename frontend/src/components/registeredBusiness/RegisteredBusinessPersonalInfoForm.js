import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FormLabel,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Bonlogo from "../../assets/images/logo.png";
import { useDispatch } from 'react-redux';

import {uploadPhotoIdInd,uploadPhotoIdBus} from 'src/redux/actions/group.action'

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
  height: '180px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
}));

const RegisteredBusinessPersonalInfoForm = ({ personalData, onInputChange, onBack, onContinue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()


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
    }
  };



  const [photoIdBusFile, setPhotoIdBusFile] = useState(null);
  const [photoIdBusPhotoURL, setPhotoIdBusPhotoURL] = useState('')
  
  
  const handlePhotoIdBusChange = (e) => {
  const file = e.target.files[0];
  if (file) {
  setPhotoIdBusFile(file);
  setPhotoIdBusPhotoURL(file.name);
  dispatch(uploadPhotoIdBus(file))
  }
  }

  return (
    <>
      <Helmet>
        <title>Personal Information - UfarmX</title>
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

            {/* Personal Information Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: '500', mb: 3, mt: 3, textAlign: 'left' }}>
                Personal Information
              </Typography>

              <Grid container spacing={3}>
                {/* First Name and Last Name */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    First Name
                  </Typography>
                  <TextField
                   sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                   InputProps={{
                    style: { height: '4rem' },
                  }}
                    fullWidth
                    name="firstName"
                    value={personalData.firstName || ''}
                    onChange={onInputChange}
                    placeholder="e.g John"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Last Name
                  </Typography>
                  <TextField
                   sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                   InputProps={{
                    style: { height: '4rem' },
                  }}
                    fullWidth
                    name="lastName"
                    value={personalData.lastName || ''}
                    onChange={onInputChange}
                    placeholder="e.g Doe"
                    variant="outlined"
                  />
                </Grid>

                {/* Middle Name and Gender */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Middle Name (Optional)
                  </Typography>
                  <TextField
                   sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                   InputProps={{
                    style: { height: '4rem' },
                  }}
                    fullWidth
                    name="middleName"
                    value={personalData.middleName || ''}
                    onChange={onInputChange}
                    placeholder="e.g Michael"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormLabel component="legend" sx={{ mb: 2, color: '#333', fontSize: '1rem', fontWeight: '500' }}>
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    name="gender"
                    value={personalData.gender || ''}
                    onChange={onInputChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio sx={{ color: '#90C434', '&.Mui-checked': { color: '#90C434' } }} />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio sx={{ color: '#90C434', '&.Mui-checked': { color: '#90C434' } }} />}
                      label="Female"
                    />
                  </RadioGroup>
                </Grid>

                {/* Email and Phone Number */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Email
                  </Typography>
                  <TextField
                  sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                  InputProps={{
                    style: { height: '4rem' },
                  }}
                    fullWidth
                    name="email"
                    type="email"
                    value={personalData.email || ''}
                    onChange={onInputChange}
                    placeholder="example@email.com"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Phone Number
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                     
                      name="countryCode"
                      value={personalData.countryCode || '+234'}
                      onChange={onInputChange}
                      InputProps={{
                        style: { height: '4rem' },
                      }}
                      placeholder="+234"
                      variant="outlined"
                      sx={{ width: '100px',backgroundColor:"#F9FAFB",height:"4rem" }}
                    />
                    <TextField
                     sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                    
                      fullWidth
                      name="phoneNumber"
                      value={personalData.phoneNumber || ''}
                      onChange={onInputChange}
                      placeholder="8012345678"
                      variant="outlined"
                      InputProps={{
                        style: { height: '4rem' },
                      }}
                    />
                  </Box>
                </Grid>

                {/* Nationality and State of Origin */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Nationality
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                     sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                      name="nationality"
                      value={personalData.nationality || ''}
                      onChange={onInputChange}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return <span style={{ color: '#999' }}>Select nationality</span>;
                        }
                        return selected;
                      }}
                    >
                      <MenuItem value="Nigerian">Nigerian</MenuItem>
                      <MenuItem value="Ghanaian">Ghanaian</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    State of Origin
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                     sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                      name="stateOfOrigin"
                      value={personalData.stateOfOrigin || ''}
                      onChange={onInputChange}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return <span style={{ color: '#999' }}>Select state of origin</span>;
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

                {/* Local Government and Date of Birth */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Local Government
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                     sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                      name="localGovernmentOrigin"
                      value={personalData.localGovernmentOrigin || ''}
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
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Date of Birth
                  </Typography>
                  <TextField
                   sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                   InputProps={{
                    style: { height: '4rem' },
                  }}
                    fullWidth
                    name="dateOfBirth"
                    type="date"
                    value={personalData.dateOfBirth || ''}
                    onChange={onInputChange}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                {/* Address */}
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Address
                  </Typography>
                  <TextField
                   sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                   InputProps={{
                    style: { height: '4rem' },
                  }}
                    fullWidth
                    name="address"
                    value={personalData.address || ''}
                    onChange={onInputChange}
                    placeholder="e.g 23 Unity Avenue"
                    variant="outlined"
                  />
                </Grid>

                {/* State and Local Government (Current Location) */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    State
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                     sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                      name="currentState"
                      value={personalData.currentState || ''}
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
                      name="currentLocalGovernment"
                      value={personalData.currentLocalGovernment || ''}
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

                {/* Utility Type and Means of ID */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Utility Type
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                     sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                      name="utilityType"
                      value={personalData.utilityType || ''}
                      onChange={onInputChange}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return <span style={{ color: '#999' }}>Select utility type</span>;
                        }
                        return selected;
                      }}
                    >
                      <MenuItem value="Electricity">Electricity</MenuItem>
                      <MenuItem value="Water">Water</MenuItem>
                      <MenuItem value="Gas">Gas</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Means of ID
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                     sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                      name="meansOfId"
                      value={personalData.meansOfId || ''}
                      onChange={onInputChange}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return <span style={{ color: '#999' }}>Select means of ID</span>;
                        }
                        return selected;
                      }}
                    >
                      <MenuItem value="National ID">National ID</MenuItem>
                      <MenuItem value="Driver's License">Driver's License</MenuItem>
                      <MenuItem value="Passport">Passport</MenuItem>
                      <MenuItem value="Voter's Card">Voter's Card</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Meter Number and NIN */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Meter Number
                  </Typography>
                  <TextField
                   sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                   InputProps={{
                    style: { height: '4rem' },
                  }}
                    fullWidth
                    name="meterNumber"
                    value={personalData.meterNumber || ''}
                    onChange={onInputChange}
                    placeholder="123456789"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    NIN
                  </Typography>
                  <TextField
                   sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                   InputProps={{
                    style: { height: '4rem' },
                  }}
                    fullWidth
                    name="nin"
                    value={personalData.nin || ''}
                    onChange={onInputChange}
                    placeholder="e.g 123456789"
                    variant="outlined"
                  />
                </Grid>

                {/* Utility Bill and ID Documents */}
                <Grid item xs={12} md={6} style={{position:"relative"}}>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: '500',color:"#667085" }}>
                    Utility Bill
                  </Typography>
                  <UploadBox>
                    <CloudUploadIcon sx={{ fontSize: '40px', color: '#666', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: '600', mb: 1, fontSize: '1rem',color:"#667085" }}>
                      Upload your utility bill
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1 ,color:"#667085"}}>
                      Drag and drop here to upload or choose file
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem', mt: 1.5 }}>
                      Formats: JPG, PNG, PDF (Max 5MB)
                    </Typography>
                  </UploadBox>
                </Grid>

                <Grid item xs={12} md={6} style={{position:"relative"}}>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: '500',color:"#667085" }}>
                    ID Documents
                  </Typography>
                  <UploadBox>
                    <CloudUploadIcon sx={{ fontSize: '40px', color: '#666', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: '600', mb: 1, fontSize: '1rem',color:"#667085" }}>
                      Upload clear photo of your ID
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                      Drag and drop here to upload or choose file
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem', mt: 1.5 }}>
                      Formats: JPG, PNG, PDF (Max 5MB)
                    </Typography>


                    <input
                    type="file"
                    multiple
                    onChange={handlePhotoIdBusChange}
                    style={{ /*display: "none"*//*background:"pink",*/opacity:"0",userSelect:"none",height:"11rem",width:"35rem",position:"absolute",top:"4rem",left:"1rem"}}
                    id="fileInput"
                    title="" 
                    />
                    <Typography variant="body2" sx={{ color: '#666', fontSize: '1rem', mt: 1.5,mb: 1.5 }}>
                    {photoIdBusPhotoURL}
                    </Typography>
                  </UploadBox>
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
                          backgroundColor:'#629D23' /*'#7FB02E'*/,
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

export default RegisteredBusinessPersonalInfoForm;
