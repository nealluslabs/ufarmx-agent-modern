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
  FormLabel,
  Switch,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
//import Bonlogo from "../../assets/images/logo.png";
import { uploadPhotoOfShopInd,uploadUtilityBillInd } from 'src/redux/actions/group.action';
import { useDispatch } from 'react-redux';

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
  // minWidth: '600px',
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

const UploadBox = styled(Box)(({ theme }) => ({
  border: '2px dashed #F9FAFB',
  borderRadius: '8px',
  padding: theme.spacing(3),
  paddingBottom:"0.5rem",
  paddingTop:"1.5rem",
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

const AddNewProductPage = ({ formData, onInputChange, onBack, onContinue }) => {
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
    } else {
      navigate('/individual-business-preview', { state: { formData, businessType: 'individual' } });
    }
  };


  const [photoOfShopIndFile, setPhotoOfShopIndFile] = useState(null);
  const [photoOfShopIndPhotoURL, setPhotoOfShopIndPhotoURL] = useState('');
  const [photoURL,setPhotoURL] = useState(null)

  const [utilityBillIndFile, setUtilityBillIndFile] = useState(null);
  const [utilityBillIndPhotoURL, setUtilityBillIndPhotoURL] = useState('')



  const handleUtilityBillIndChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUtilityBillIndFile(file);
      setUtilityBillIndPhotoURL(file.name);
     
      
      dispatch(uploadUtilityBillInd(file))
      
    }
  }


  const handlePhotoOfShopIndChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoOfShopIndFile(file);
      setPhotoOfShopIndPhotoURL(file.name);
     
      
      dispatch(uploadPhotoOfShopInd(file))
      
    }
  }




  return (
    <>
      <Helmet>
        <title>Add New Product - UfarmX</title>
      </Helmet>

      <StyledRoot>
        <StyledContainer maxWidth="lg">
          {/*<StyledLogo>
            <img src={Bonlogo} height="42" alt="UfarmX Logo" />
          </StyledLogo>*/}
          
          <StyledContainerSecond>
            <Grid item xs={12} style={{
              display: "flex", 
              justifyContent: "flex-start", 
              alignItems: "flex-start", 
              marginBottom: "0.2rem", 
              marginTop: "0rem"
            }}>
              <div style={{
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "flex-start", 
                alignItems: "flex-start", 
                width: "100%", 
                textAlign: "left"
              }}>
                <h1 style={{
                  fontWeight: "500", 
                  marginBottom: "0rem", 
                  fontSize: "1.2rem", 
                  marginTop: "20px"
                }}>
                  Add New Product
                </h1>
                <div style={{
                  fontSize: "0.9rem", 
                  fontWeight: "300", 
                  marginBottom: "1rem"
                }}>
                  {"Create a new product listing with details,images and pricing information"}
                </div>
              </div>
            </Grid>

            {/* Business Details Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: '600', 
                mb: 3, 
                mt: 3, 
                textAlign: 'left'
              }}>
                Basic Information
              </Typography>

              <Grid container spacing={3}>
                {/* Business Name and Store Name */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ 
                    mb: 1, 
                    fontWeight: '500', 
                    fontSize: '0.9rem',
                    color: "#667085"
                  }}>
                    Product Name
                  </Typography>
                  <TextField
                    sx={{
                      backgroundColor: "#F9FAFB",
                      height: { xs: "3.5rem", md: "4rem" },
                      '& .MuiOutlinedInput-root': {
                        height: '100%'
                      }
                    }}
                    InputProps={{
                      style: { height: '100%' },
                    }}
                    fullWidth
                    name="businessName"
                    value={""}
                    onChange={onInputChange}
                    placeholder=" "
                    variant="outlined"
                  />
                </Grid>
              

                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ 
                    mb: 1, 
                    fontWeight: '500', 
                    fontSize: '0.9rem',
                    color: "#667085"
                  }}>
                    Category
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      sx={{
                        backgroundColor: "#F9FAFB",
                        height: { xs: "3.5rem", md: "4rem" }
                      }}
                      name="localGovernment"
                      value={""}
                      onChange={onInputChange}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return <span style={{ color: '#999' }}>Select Category</span>;
                        }
                        return selected;
                      }}
                    >
                      <MenuItem value="Equipment">Equipment</MenuItem>
                      <MenuItem value="Fertilizer">Fertilizer</MenuItem>
                      <MenuItem value="Seeds">Seeds</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Business Address */}
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ 
                    mb: 1, 
                    fontWeight: '500', 
                    fontSize: '0.9rem',
                    color: "#667085"
                  }}>
                    Product / Service Description
                  </Typography>
                  <TextField
                    sx={{
                      backgroundColor: "#F9FAFB",
                      height: { xs: "3.5rem", md: "4rem" },
                      '& .MuiOutlinedInput-root': {
                        height: '100%'
                      }
                    }}
                    InputProps={{
                      style: { height: '100%' },
                    }}
                    fullWidth
                    name="businessAddress"
                    value={""}
                    onChange={onInputChange}
                    placeholder="Describe the product or services you need"
                    variant="outlined"
                  />
                </Grid>

                {/* State and Local Government */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ 
                    mb: 1, 
                    fontWeight: '500', 
                    fontSize: '0.9rem',
                    color: "#667085"
                  }}>
                    Price (₦)
                  </Typography>
                  <TextField
                    sx={{
                      backgroundColor: "#F9FAFB",
                      height: { xs: "3.5rem", md: "4rem" },
                      '& .MuiOutlinedInput-root': {
                        height: '100%'
                      }
                    }}
                    InputProps={{
                      style: { height: '100%' },
                    }}
                    fullWidth
                    name="storeName"
                    value={""}
                    onChange={onInputChange}
                    placeholder=" "
                    variant="outlined"
                  />
                </Grid>


                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ 
                    mb: 1, 
                    fontWeight: '500', 
                    fontSize: '0.9rem',
                    color: "#667085"
                  }}>
                    Stock Quantity
                  </Typography>
                  <TextField
                    sx={{
                      backgroundColor: "#F9FAFB",
                      height: { xs: "3.5rem", md: "4rem" },
                      '& .MuiOutlinedInput-root': {
                        height: '100%'
                      }
                    }}
                    InputProps={{
                      style: { height: '100%' },
                    }}
                    fullWidth
                    name="storeName"
                    value={""}
                    onChange={onInputChange}
                    placeholder=" "
                    variant="outlined"
                  />
                </Grid>

                {/* MEMART (whole row) */}
                <Grid item xs={12} style={{position: "relative"}}>
                  <Typography variant="body1" sx={{ 
                    mb: 2, 
                    fontWeight: '500',
                    color: "#667085"
                  }}>
                    Product Images
                  </Typography>
                  <UploadBox sx={{ 
                    position: 'relative',
                    minHeight: { xs: '200px', md: 'auto' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}>
                    <CloudUploadIcon sx={{ 
                      fontSize: '40px', 
                      color: '#666', 
                      mb: 1 
                    }} />
                    <Typography variant="h6" sx={{ 
                      fontWeight: '600', 
                      mb: 1, 
                      fontSize: '1rem',
                      color: "#667085"
                    }}>
                      Upload Images (0/5)
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#666', 
                      mb: 1 
                    }}>
                      Drag and drop file here to upload or choose file
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#666', 
                      fontSize: '0.75rem', 
                      mt: 0.5 
                    }}>
                      Upload up to 5 images
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#666', 
                      fontSize: '0.8rem', 
                      mt: 1.5 
                    }}>
                      Format: JPG, PNG, PDF (Max 5MB)
                    </Typography>

                    <input
                      type="file"
                      multiple
                      //onChange={handleStatusReportChange}
                      style={{ 
                        /*display: "none"*//*background:"pink",*/
                        opacity: "0",
                        userSelect: "none",
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        cursor: "pointer"
                      }}
                      id="fileInput"
                      title="" 
                    />

                    <Typography variant="body2" sx={{ 
                      color: '#666', 
                      fontSize: '1rem', 
                      mt: 1.5,
                      mb: 1.5 
                    }}>
                      {/*statusReportPhotoURL*/}
                    </Typography>
                  </UploadBox>
                </Grid>

                {/* Shop Photo and Proof of Business Address */}
                {/* <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: '500' }}>
                    Shop Photo
                  </Typography>
                  <UploadBox>
                    <CloudUploadIcon sx={{ fontSize: '40px', color: '#666', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: '600', mb: 1, fontSize: '1rem' }}>
                      Add Photo of your shop (Interior & Exterior)
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                      Drag and drop file here to upload or choose file
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem', mt: 1.5 }}>
                      Format: JPG, PNG, PDF (Max 5MB)
                    </Typography>
                  </UploadBox>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem', mt: 1 }}>
                    Photo help us verify your business location and setup
                  </Typography>

                  <input
                    type="file"
                    multiple
                    onChange={handlePhotoOfShopIndChange}
                    style={{ opacity:"0",userSelect:"none",height:"11rem",width:"35rem",position:"absolute",top:"4rem",left:"1rem"}}
                    id="fileInput"
                    title="" 
                  />

                  <Typography variant="body2" sx={{ color: '#666', fontSize: '1rem', mt: 1.5,mb: 1.5 }}>
                    {photoOfShopIndPhotoURL}
                  </Typography>
                </Grid>
                */}

                {/*
                  <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: '500' }}>
                    Proof of Business Address
                  </Typography>
                  <UploadBox>
                    <CloudUploadIcon sx={{ fontSize: '40px', color: '#666', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: '600', mb: 1, fontSize: '1rem' }}>
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
                    onChange={handleUtilityBillIndChange}
                    style={{opacity:"0",userSelect:"none",height:"11rem",width:"35rem",position:"absolute",top:"4rem",left:"1rem"}}
                    id="fileInput"
                    title="" 
                  />

                  <Typography variant="body2" sx={{ color: '#666', fontSize: '1rem', mt: 1.5,mb: 1.5 }}>
                    {utilityBillIndPhotoURL}
                  </Typography>
                </Grid>
                */}

                <Grid item xs={12} md={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    gap={1.5} // space between elements
                  >
                    <Typography sx={{ fontSize: "1.3rem", fontWeight: 500 }}>
                      Settings
                    </Typography>
                
                    <FormControlLabel
                      control={<Switch 
                        sx={{
                          "& .Mui-checked": {
                            color: "#FFFFFF",
                          },
                          "& .Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "#629D23",
                          },
                        }}
                      />}
                      label="Available On Credit"
                    />
                
                    <FormControlLabel
                      control={<Switch
                        sx={{
                          "& .Mui-checked": {
                            color: "#FFFFFF",
                          },
                          "& .Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "#629D23",
                          },
                        }}
                      />}
                      label="Product is Active"
                    />
                  </Box>
                </Grid>

                {/* Buttons */}
                <Grid item xs={12}>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    mt: 3,
                    flexDirection: { xs: 'column', sm: 'row' }
                  }}>
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
                      Cancel
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                  
                      sx={{
                        py: 1.5,
                        px: 3,
                        fontSize: '1rem',
                        fontWeight: '600',
                        backgroundColor: '#629D23' /*'#0A6054'*//*'#90C434'*/,
                        color: 'white',
                        borderRadius: '8px',
                        '&:hover': {
                          backgroundColor: '#7FB02E',
                        },
                      }}
                    >
                      Add Product
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </StyledContainerSecond>
        </StyledContainer>
      </StyledRoot>
    </>
  );
};

export default AddNewProductPage
