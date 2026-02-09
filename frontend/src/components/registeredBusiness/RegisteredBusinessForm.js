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
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Bonlogo from "../../assets/images/logo.png";
import { useDispatch } from 'react-redux';
import { uploadRetailerRegistrationDoc, uploadStatusReportDoc,uploadMemartDoc } from 'src/redux/actions/group.action';

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
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  justifyContent: 'center',
  width: '100%',
  minWidth: '1200px',
  marginLeft:"-12rem",
  
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

const RegisteredBusinessForm = ({ companyData = {}, onInputChange, onBack, onContinue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [localFormData, setLocalFormData] = useState(companyData);

  const [cacfile, setCacFile] = useState(null);
  const [photoURL, setPhotoURL] = useState('');


  const [statusReportfile, setStatusReportFile] = useState(null);
  const [statusReportPhotoURL, setStatusReportPhotoURL] = useState('');


  const [Memartfile, setMemartFile] = useState(null);
  const [MemartPhotoURL, setMemartPhotoURL] = useState('');

  



  const handleInputChange = (event) => {
    const { name, value } = event.target;
   // console.log('Input changed:', name, value); // Debug log
    
    // Update local state as fallback
    setLocalFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Also call parent's onChange if provided
    if (onInputChange) {
      onInputChange({ name, value });
    }
  };


  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCacFile(file);
      setPhotoURL(file.name);
     
      
      dispatch(uploadRetailerRegistrationDoc(file))
     // console.log("photoURL isOOO-->",photoURL)
    }
  };


  const handleStatusReportChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStatusReportFile(file);
      setStatusReportPhotoURL(file.name);
     
      
      dispatch(uploadStatusReportDoc(file))
     // console.log("photoURL is OOO-->",photoURL)
    }
  };


  const handleMemartChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMemartFile(file);
      setMemartPhotoURL(file.name);
     
      
      dispatch(uploadMemartDoc(file))
     // console.log("photoURL is OOO-->",photoURL)
    }
  };



  // Use local state if parent data is not provided
  const formData = Object.keys(companyData).length > 0 ? companyData : localFormData;

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

  const renderCompanyForm = () => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: '500', mb: 3, mt: 3, textAlign: 'left' }}>
        Company Registration Details
      </Typography>

      <Grid container spacing={3}>
        {/* Business Name and CAC Registration Number (same row) */}
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
            onChange={handleInputChange}
            placeholder="e.g Adebowale Farms Ltd"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
            CAC Registration Number
          </Typography>
          <TextField
           sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
           InputProps={{
            style: { height: '4rem' },
          }}
            fullWidth
            name="cacNumber"
            value={formData.cacNumber || ''}
            onChange={handleInputChange}
            placeholder="e.g RC261526"
            variant="outlined"
          />
        </Grid>

        {/* Tax Identification Number and Business Registration Date (same row) */}
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
            Tax Identification Number (TIN)
          </Typography>
          <TextField
          sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
          InputProps={{
            style: { height: '4rem' },
          }}
            fullWidth
            name="taxId"
            value={formData.taxId || ''}
            onChange={handleInputChange}
            placeholder="e.g 8348393"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
            Business Registration Date
          </Typography>
          <TextField
          sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
            fullWidth
            name="businessRegistrationDate"
            type="date"
            value={formData.businessRegistrationDate || ''}
            onChange={handleInputChange}
            variant="outlined"
            InputProps={{
              style: { height: '4rem' },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        {/* Business Address (whole row) */}
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
            Business Address
          </Typography>
          <TextField
          sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
            fullWidth
            InputProps={{
              style: { height: '4rem' },
            }}
            name="businessAddress"
            value={formData.businessAddress || ''}
            onChange={handleInputChange}
            placeholder="e.g Suite 10, Ademokoya, Street Sango, Lagos State"
            variant="outlined"
          />
        </Grid>

        {/* State and Local Government (same row) */}
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
            State
          </Typography>
          <FormControl fullWidth>
            <Select
            sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
              name="state"
              value={formData.state || ''}
              onChange={handleInputChange}
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
              <MenuItem value="Rivers">Rivers</MenuItem>
              <MenuItem value="Oyo">Oyo</MenuItem>
              <MenuItem value="Delta">Delta</MenuItem>
              <MenuItem value="Kaduna">Kaduna</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
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
              onChange={handleInputChange}
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
              <MenuItem value="Ikoyi">Ikoyi</MenuItem>
              <MenuItem value="Lekki">Lekki</MenuItem>
              <MenuItem value="Surulere">Surulere</MenuItem>
              <MenuItem value="Yaba">Yaba</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* City and Phone Number (same row) */}
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
            City
          </Typography>
          <TextField
          sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
          InputProps={{
            style: { height: '4rem' },
          }}
            fullWidth
            name="city"
            value={formData.city || ''}
            onChange={handleInputChange}
            placeholder="e.g Lagos"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
            Phone Number
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
             InputProps={{
              style: { height: '4rem' },
            }}
              sx={{ width: '120px',backgroundColor:"#F9FAFB",height:"4rem"}}
              name="countryCode"
              value={formData.countryCode || '+234'}
              onChange={handleInputChange}
              placeholder="+234"
              variant="outlined"
            />
            <TextField
            sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
            InputProps={{
              style: { height: '4rem' },
            }}
              fullWidth
              name="phoneNumber"
              value={formData.phoneNumber || ''}
              onChange={handleInputChange}
              placeholder="e.g 8012345678"
              variant="outlined"
            />
          </Box>
        </Grid>

        {/* Certificate of Incorporation and Business Application Form (same row) */}
        <Grid item xs={12} md={6} style={{position:"relative"}}>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: '500',color:"#667085"  }}>
            Certificate of Incorporation
          </Typography>
          <UploadBox>
            <CloudUploadIcon sx={{ fontSize: '40px', color: '#666', mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: '600', mb: 1, fontSize: '1rem',color:"#667085"  }}>
              Upload your CAC Certificate
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
                onChange={handleChange}
                style={{ /*display: "none"*//*background:"pink",*/opacity:"0",userSelect:"none",height:"11rem",width:"36rem",position:"absolute",top:"4.5rem",left:"1rem"}}
                id="fileInput"
                title="" 
              />


            <Typography variant="body2" sx={{ color: '#666', fontSize: '1rem', mt: 1.5,mb: 1.5 }}>
             {photoURL}
            </Typography>
          </UploadBox>
        </Grid>

        <Grid item xs={12} md={6} style={{position:"relative"}}>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: '500',color:"#667085"  }}>
            Business Application Form / Status Report
          </Typography>
          <UploadBox>
            <CloudUploadIcon sx={{ fontSize: '40px', color: '#666', mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: '600', mb: 1, fontSize: '1rem',color:"#667085"  }}>
              Upload your Status Report
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
              Drag and drop file here to upload or choose file
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem', mt: 1.5 }}>
              Format: JPG, PNG, PDF (Max 5MB)
            </Typography>
           {/* <Typography variant="body2" sx={{ color: '#666', fontSize: '0.75rem', mt: 0.5 }}>
              Please upload all pages of your CAC Application Form
            </Typography>*/}



            <input
                type="file"
                multiple
                onChange={handleStatusReportChange}
                style={{ /*display: "none"*//*background:"pink",*/opacity:"0",userSelect:"none",height:"11rem",width:"36rem",position:"absolute",top:"4.5rem",left:"1rem"}}
                id="fileInput"
                title="" 
              />


            <Typography variant="body2" sx={{ color: '#666', fontSize: '1rem', mt: 1.5,mb: 1.5 }}>
             {statusReportPhotoURL}
            </Typography>
          </UploadBox>
        </Grid>

        {/* MEMART (whole row) */}
        <Grid item xs={12} style={{position:"relative"}}>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: '500',color:"#667085"  }}>
            MEMART
          </Typography>
          <UploadBox>
            <CloudUploadIcon sx={{ fontSize: '40px', color: '#666', mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: '600', mb: 1, fontSize: '1rem',color:"#667085" }}>
              Upload your MEMART
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
              Drag and drop file here to upload or choose file
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem', mt: 1.5 }}>
              Format: JPG, PNG, PDF (Max 5MB)
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.75rem', mt: 0.5 }}>
              Please upload all pages of your MEMART Document
            </Typography>


            <input
                type="file"
                multiple
                onChange={handleMemartChange}
                style={{ /*display: "none"*//*background:"pink",*/opacity:"0",userSelect:"none",height:"11rem",width:"72rem",position:"absolute",top:"4rem",left:"1rem"}}
                id="fileInput"
                title="" 
              />


            <Typography variant="body2" sx={{ color: '#666', fontSize: '1rem', mt: 1.5,mb: 1.5 }}>
             {MemartPhotoURL}
            </Typography>
          </UploadBox>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <>
      <Helmet>
        <title>Company Information - UfarmX</title>
      </Helmet>

      <StyledRoot>
        <StyledContainer maxWidth="md">
          <StyledLogo>
            <img src={Bonlogo} height="42" alt="UfarmX Logo" />
          </StyledLogo>
          
          <StyledContainerSecond>
            <Grid item xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"2rem",marginTop:"3rem"}}>
              <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",textAlign:"center"}}>
                <h1 style={{fontWeight:"500",marginBottom:"0rem",fontSize:"2rem", marginTop: "20px"}}>Complete Your Profile</h1>
                <div style={{fontSize:"0.9rem",fontWeight:"300",marginBottom:"1rem"}}>Welcome! Let's set up your retailer account</div>
              </div>
            </Grid>

            {renderCompanyForm()}

            {/* Buttons */}
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
                  '&:hover': {
                    backgroundColor: '#7FB02E',
                  },
                }}
              >
                Continue
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

export default RegisteredBusinessForm;
