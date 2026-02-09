import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
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
  IconButton,
  CardMedia,
} from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
//import Bonlogo from "../../assets/images/logo.png";
import { updateProduceCrop, updateRetailerProduceItem, uploadPhotoOfShopInd,uploadUtilityBillInd } from 'src/redux/actions/group.action';
import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';

import defaultgray from 'src/assets/images/rain-grey2.png'

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
  // minWidth: '800px',
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

const EditProductPage = ({ formData, onInputChange, onBack, onContinue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {productInFocus } = useSelector((state) => state.group);
  const {user } = useSelector((state) => state.auth);



 useEffect(() => {
 
  if(!user){
   navigate('/login')
  }
  
  }, [user])

  console.log("LETS VIEW OUR USER--->",user)

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };



  const [name,setName] = useState('')
  const [price,setPrice] = useState('')
  const [category,setCategory] = useState('')
  const [isActive,setIsActive] = useState(true)
  const [availableOnCredit,setAvailableOnCredit] = useState('')
  const [description,setDescription] = useState('')
  const [nextHarvestDate,setNextHarvestDate] = useState('')
  const [nextHarvestQuantity,setNextHarvestQuantity] = useState('')
  const [quantity,setQuantity] = useState('')
  const [imageUrls,setImageUrls] = useState([])
  const [image,setImage] = useState('')

  const [loading,setLoading] = useState(false)

  const [selectedFile, setSelectedFile] = useState({selectedFile: null, selectedFileName: null});
  const [selectedFile2, setSelectedFile2] = useState({selectedFile: null, selectedFileName: null});
  const [selectedFile3, setSelectedFile3] = useState({selectedFile: null, selectedFileName: null});
  const [selectedFile4, setSelectedFile4] = useState({selectedFile: null, selectedFileName: null});
  const [selectedFile5, setSelectedFile5] = useState({selectedFile: null, selectedFileName: null});

 
 
 

  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);
  
  const handleselectedFile = event => {
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    setFile(URL.createObjectURL(event.target.files[0]));

    if(!primary){
      setPrimary(event.target.files[0])
    }
};


  const handleselectedFile2 = event => {
    setSelectedFile2({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    setFile2(URL.createObjectURL(event.target.files[0]));
};


const handleselectedFile3 = event => {
  setSelectedFile3({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name
  });
  setFile3(URL.createObjectURL(event.target.files[0]));
};


const handleselectedFile4 = event => {
  setSelectedFile4({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name
  });
  setFile4(URL.createObjectURL(event.target.files[0]));
};


const handleselectedFile5 = event => {
  setSelectedFile5({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name
  });
  setFile5(URL.createObjectURL(event.target.files[0]));
};

 
 
 
  useEffect(()=>{

   setName(productInFocus.name)
   setPrice(productInFocus.price)
  setNextHarvestDate(productInFocus.nextHarvestDate)
 setNextHarvestQuantity(productInFocus.nextHarvestQuantity)
 setQuantity(productInFocus.quantity)
 setImageUrls(productInFocus.imageUrls?productInFocus.imageUrls:[])
 setImage(productInFocus.image?productInFocus.image:'')
 setPrimary(productInFocus.image?productInFocus.image:'')


 setDescription(productInFocus.description?productInFocus.description:'')
 setIsActive(productInFocus.isActive? productInFocus.isActive:true)
 setCategory(productInFocus.category? productInFocus.category:'Fertilizers')
setAvailableOnCredit(productInFocus.availableOnCredit? productInFocus.availableOnCredit:false)
 
 
  },[productInFocus])
 
 // console.log("PRODUCT IN FOCUS IS---LOOK HERE --->",productInFocus)
 
 /**DONT DELETE THE USE EFFECT BELOW YOU NEED IT FOR FIRST ENTRY ONTO THIS PAGE */
 // useEffect(()=>{
 //
 //  setPrice()
 // setNextHarvestDate()
 //setNextHarvestQuantity()
 //setQuantity()
 //
 //
 // },[])
 /**DONT DELETE THE USE EFFECT ABOVE YOU NEED IT FOR FIRST ENTRY ONTO THIS PAGE - END */

      //I use primary to track the lead image now
      const [primary, setPrimary] = useState(false);
      let filesTracker = [selectedFile.selectedFile, selectedFile2.selectedFile,selectedFile3.selectedFile,selectedFile4.selectedFile,selectedFile5.selectedFile]
 
    const finalObject = 
     
    {
    ...productInFocus,
    name:name,
    quantity:quantity/*formValues1['Unit Quantity']*/,
    price:price/*formValues1['Price']*/,
     nextHarvestDate:nextHarvestDate/*formValues2['Price(Base)']*/,
     nextHarvestQuantity:nextHarvestQuantity/*formValues2['Price(High)']*/,
     status:isActive?"Active":"Inactive",
     availableOnCredit:availableOnCredit,
     description:description,
     category:category,
     leadFile:primary,
     files:[selectedFile2.selectedFile,selectedFile2.selectedFile,selectedFile3.selectedFile,selectedFile4.selectedFile,selectedFile5.selectedFile],//5 static images with primary image filtered out
    }
    





  const submitResponse = (updatedFields,retailerId) =>{
    console.log("PROCESS BEGUN FOR UPDATING PRODUCE--->",updatedFields)
    setLoading(true)
   

   dispatch(updateRetailerProduceItem(updatedFields,retailerId))
   //dispatch(addProduceCrop(updatedFields))
   

  setTimeout( ()=>{setLoading(false) },2500)
 
  }







  return (
    <>
      <Helmet>
        <title>Edit Product - UfarmX</title>
      </Helmet>

      <StyledRoot>
        <StyledContainer maxWidth="lg">
          {/*<StyledLogo>
            <img src={Bonlogo} height="42" alt="UfarmX Logo" />
       </StyledLogo>*/}
          
          <StyledContainerSecond>
            <Grid item xs={12} style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start",marginBottom:"0.2rem",marginTop:"0rem"}}>
              <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",width:"100%",textAlign:"left"}}>
                <h1 style={{fontWeight:"500",marginBottom:"0rem",fontSize:"1.2rem", marginTop: "20px"}}>Edit Product</h1>
                <div style={{fontSize:"0.9rem",fontWeight:"300",marginBottom:"1rem"}}>{"Update Your product details, images,pricing, and availability settings"}</div>
              </div>
            </Grid>

            {/* Business Details Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: '600', mb: 3, mt: 3, textAlign: 'left' }}>
                Basic Information
              </Typography>

              <Grid container spacing={3}>
                {/* Business Name and Store Name */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem',color:"#667085"}}>
                    Product Name
                  </Typography>
                  <TextField
                  sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                  InputProps={{
                    style: { height: '4rem' },
                  }}
                    fullWidth
                    name="name"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    placeholder=" "
                    variant="outlined"
                  />
                </Grid>
              

                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Category
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                    sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                      name="category"
                      value={category}
                      onChange={(e)=>{setCategory(e.target.value)}}
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
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Product / Service Description
                  </Typography>
                  <TextField
                  sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                  InputProps={{
                    style: { height: '4rem' },
                  }}
                    fullWidth
                    name="description"
                    value={description}
                    onChange={(e)=>{setDescription(e.target.value)}}
                    placeholder="Disease Resistant Variety ideal for organic farming"
                    variant="outlined"
                  />
                </Grid>

                {/* State and Local Government */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem',color:"#667085"}}>
                    Price (₦)
                  </Typography>
                  <TextField
                  sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                  InputProps={{
                    style: { height: '4rem' },
                  }}
                    fullWidth
                    name="price"
                    value={price}
                    onChange={(e)=>{setPrice(e.target.value)}}
                    placeholder=" "
                    variant="outlined"
                  />
                </Grid>


                  <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem',color:"#667085"}}>
                    Stock Quantity
                  </Typography>
                  <TextField
                  sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                  InputProps={{
                    style: { height: '4rem' },
                  }}
                    fullWidth
                    name="quantity"
                    value={quantity}
                    onChange={(e)=>{setQuantity(e.target.value)}}
                    placeholder=" "
                    variant="outlined"
                  />
                </Grid>

                {/* Nearest Landmark and Years in Business */}
               {/*
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
                    value={"formData.nearestLandmark"}
                    onChange={onInputChange}
                    placeholder="e.g Bank Building"
                    variant="outlined"
                  />
                </Grid>
                */}
                {/*
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' ,color:"#667085"}}>
                    Years in Business
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                    sx={{backgroundColor:"#F9FAFB",height:"4rem"}}
                      name="yearsInBusiness"
                      value={"formData.yearsInBusiness"}
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
                */}

                {/* Shop Ownership */}
                {/*
                <Grid item xs={12}>
                  <FormLabel component="legend" sx={{ mb: 2, color: '#333', fontSize: '1rem', fontWeight: '500' }}>
                    Is this your shop or rented?
                  </FormLabel>
                  <RadioGroup
                    row
                    name="shopOwnership"
                    value={"formData.shopOwnership"}
                    onChange={onInputChange}
                  >
                    <FormControlLabel
                      value="own"
                      control={<Radio sx={{ color:'#ccc, '&.Mui-checked': { color: '#ccc } }} />}
                      label="I own this shop"
                    />
                    <FormControlLabel
                      value="rent"
                      control={<Radio sx={{ color:'#ccc', '&.Mui-checked': { color:'#ccc' } }} />}
                      label="I rent this shop"
                    />
                  </RadioGroup>
                </Grid>
                */}

                {/* Shop Size */}
               {/*
                <Grid item xs={12}>
                  <FormLabel component="legend" sx={{ mb: 2, color: '#333', fontSize: '1rem', fontWeight: '500' }}>
                    Estimate size of your shop
                  </FormLabel>
                  <RadioGroup
                    row
                    name="shopSize"
                    value={"formData.shopSize"}
                    onChange={onInputChange}
                    sx={{ flexWrap: 'wrap' }}
                  >
                    <FormControlLabel
                      value="small"
                      control={<Radio sx={{ color: '#ccc', '&.Mui-checked': { color:'#ccc'  } }} />}
                      label="Small (can serve 10-50 farmers)"
                    />
                    <FormControlLabel
                      value="medium"
                      control={<Radio sx={{ color:'#ccc' , '&.Mui-checked': { color:'#ccc'  } }} />}
                      label="Medium (can serve 50-200 farmers)"
                    />
                    <FormControlLabel
                      value="large"
                      control={<Radio sx={{ color:'#ccc', '&.Mui-checked': { color:'#ccc'  } }} />}
                      label="Large (can serve 200+ farmers)"
                    />
                  </RadioGroup>
                </Grid>
                */}


                  {/* PRODUCT IMAGES (whole row) */}
        <Grid item xs={12} style={{position:"relative"}}>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: '500',color:"#667085"  }}>
            Product Images
          </Typography>



                <Grid item xs={12} md={12}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                    sx={{position:"relative"}}
                  >
                



                     <Box
                   sx={{
                     backgroundColor: "#F0F0F0",
                     height: "10rem",
                     width: "10rem",
                     borderRadius: "0.8rem",
                     position: "relative",
                     overflow: "hidden", // ensures image/input stay clipped inside
                   }}
                 >


                 <Box display="flex" alignItems="center"  gap={1} 
                 sx={{position:"absolute",scale:"0.7",right:"-1rem",zIndex:"1000",opacity:selectedFile.selectedFile && (primary === selectedFile.selectedFile)?1:image === primary ?1:"0.3",
                 "&:hover": {
                  opacity:selectedFile.selectedFile && (primary === selectedFile.selectedFile)?1: 0.8,
                },
                 }}
                 
                 >
                        {/* Primary Tag */}
                        <Box
                        onClick={()=>{
                          if(selectedFile.selectedFile){
                             setPrimary(selectedFile.selectedFile)
                          }
                          else{
                            notifyErrorFxn('Upload an Image first!')
                          }
                        }}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            
                            gap: 1,
                            padding: '6px 12px',
                            backgroundColor: '#f5f6f7',
                            borderRadius: '16px',
                          }}
                        >
                          <StarBorderOutlinedIcon fontSize="small" sx={{ color: '#5f6368' }} />
                          <Typography
                            variant="body2"
                            sx={{ color: '#5f6368', fontWeight: 500 }}
                          >
                            Primary
                          </Typography>
                        </Box>
                  
                        {/* Red Circular Delete Button */}
                        <IconButton
                          sx={{
                            backgroundColor: 'red',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: '#d00000',
                            },
                            width: 32,
                            height: 32,
                          }}
                        >
                          <CloseIcon
                          onClick={()=>{
                          
                            setPrimary(false)
                         
                        
                       }}
                          fontSize="small" />
                        </IconButton>
                    </Box>
                   {/* Image */}
                   {
                     <Box
                       component="img"
                       src={file?file:image?image:defaultgray} // file should be a valid image URL or base64 string
                       alt="IMG"
                       sx={{
                         width: "100%",
                         height: "100%",
                         objectFit: "cover",
                         borderRadius: "0.8rem",
                       }}
                     />
                   }
                 
                   {/* Input overlay */}
                   <input
                     type="file"
                     onChange={handleselectedFile}
                     style={{
                       position: "absolute",
                       inset: 0, // stretches input to fill parent
                       opacity: 0, // hidden but clickable
                       cursor: "pointer",
                     }}
                   />
                </Box>
               


              

                  <Box
                   sx={{
                     backgroundColor: "#F0F0F0",
                     height: "10rem",
                     width: "10rem",
                     borderRadius: "0.8rem",
                     position: "relative",
                     overflow: "hidden", // ensures image/input stay clipped inside
                   }}
                 >

<Box display="flex" alignItems="center"  gap={1} 
                 sx={{position:"absolute",scale:"0.7",right:"-1rem",zIndex:"1000",opacity:selectedFile2.selectedFile && (primary === selectedFile2.selectedFile)?1:"0.3",
                 "&:hover": {
                  opacity:selectedFile2.selectedFile && (primary === selectedFile2.selectedFile)?1: 0.8,
                },
                 }}
                 
                 >
                        {/* Primary Tag */}
                        <Box
                        onClick={()=>{
                          if(selectedFile2.selectedFile){
                             setPrimary(selectedFile2.selectedFile)
                          }
                          else{
                            notifyErrorFxn('Upload an Image first!')
                          }
                        }}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            
                            gap: 1,
                            padding: '6px 12px',
                            backgroundColor: '#f5f6f7',
                            borderRadius: '16px',
                          }}
                        >
                          <StarBorderOutlinedIcon fontSize="small" sx={{ color: '#5f6368' }} />
                          <Typography
                            variant="body2"
                            sx={{ color: '#5f6368', fontWeight: 500 }}
                          >
                            Primary
                          </Typography>
                        </Box>
                  
                        {/* Red Circular Delete Button */}
                        <IconButton
                          sx={{
                            backgroundColor: 'red',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: '#d00000',
                            },
                            width: 32,
                            height: 32,
                          }}
                        >
                          <CloseIcon 
                          onClick={()=>{
                          
                            setPrimary(false)
                         
                        
                       }}
                          fontSize="small" />
                        </IconButton>
                    </Box>
                   {/* Image */}
                   {
                     <Box
                       component="img"
                       src={file2?file2:imageUrls && imageUrls[0] ? imageUrls[0]:defaultgray} // file should be a valid image URL or base64 string
                       alt="IMG"
                       sx={{
                         width: "100%",
                         height: "100%",
                         objectFit: "cover",
                         borderRadius: "0.8rem",
                       }}
                     />
                   }
                 
                   {/* Input overlay */}
                   <input
                     type="file"
                     onChange={handleselectedFile2}
                     style={{
                       position: "absolute",
                       inset: 0, // stretches input to fill parent
                       opacity: 0, // hidden but clickable
                       cursor: "pointer",
                     }}
                   />
                </Box>


                <Box
                 sx={{
                   backgroundColor: "#F0F0F0",
                   height: "10rem",
                   width: "10rem",
                   borderRadius: "0.8rem",
                   position: "relative",
                   overflow: "hidden", // ensures image/input stay clipped inside
                 }}
               >

<Box display="flex" alignItems="center"  gap={1} 
                 sx={{position:"absolute",scale:"0.7",right:"-1rem",zIndex:"1000",opacity:selectedFile3.selectedFile && (primary === selectedFile3.selectedFile)?1:"0.3",
                 "&:hover": {
                  opacity:selectedFile3.selectedFile && (primary === selectedFile3.selectedFile)?1: 0.8,
                },
                 }}
                 
                 >
                        {/* Primary Tag */}
                        <Box
                        onClick={()=>{
                          if(selectedFile3.selectedFile){
                             setPrimary(selectedFile3.selectedFile)
                          }
                          else{
                            notifyErrorFxn('Upload an Image first!')
                          }
                        }}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            
                            gap: 1,
                            padding: '6px 12px',
                            backgroundColor: '#f5f6f7',
                            borderRadius: '16px',
                          }}
                        >
                          <StarBorderOutlinedIcon fontSize="small" sx={{ color: '#5f6368' }} />
                          <Typography
                            variant="body2"
                            sx={{ color: '#5f6368', fontWeight: 500 }}
                          >
                            Primary
                          </Typography>
                        </Box>
                  
                        {/* Red Circular Delete Button */}
                        <IconButton
                          sx={{
                            backgroundColor: 'red',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: '#d00000',
                            },
                            width: 32,
                            height: 32,
                          }}
                        >
                          <CloseIcon 
                           onClick={()=>{
                          
                            setPrimary(false)
                         
                        
                       }}
                          fontSize="small" />
                        </IconButton>
                    </Box>
                 {/* Image */}
                 {
                   <Box
                     component="img"
                     src={file3?file3:imageUrls && imageUrls[1] ? imageUrls[1]:defaultgray} // file should be a valid image URL or base64 string
                     alt="IMG"
                     sx={{
                       width: "100%",
                       height: "100%",
                       objectFit: "cover",
                       borderRadius: "0.8rem",
                     }}
                   />
                 }
               
                 {/* Input overlay */}
                 <input
                   type="file"
                   onChange={handleselectedFile3}
                   style={{
                     position: "absolute",
                     inset: 0, // stretches input to fill parent
                     opacity: 0, // hidden but clickable
                     cursor: "pointer",
                   }}
                 />
              </Box>



              <Box
                 sx={{
                   backgroundColor: "#F0F0F0",
                   height: "10rem",
                   width: "10rem",
                   borderRadius: "0.8rem",
                   position: "relative",
                   overflow: "hidden", // ensures image/input stay clipped inside
                 }}
               >

<Box display="flex" alignItems="center"  gap={1} 
                 sx={{position:"absolute",scale:"0.7",right:"-1rem",zIndex:"1000",opacity:selectedFile4.selectedFile && (primary === selectedFile4.selectedFile)?1:"0.3",
                 "&:hover": {
                  opacity:selectedFile4.selectedFile && (primary === selectedFile4.selectedFile)?1: 0.8,
                },
                 }}
                 
                 >
                        {/* Primary Tag */}
                        <Box
                        onClick={()=>{
                          if(selectedFile4.selectedFile){
                             setPrimary(selectedFile4.selectedFile)
                          }
                          else{
                            notifyErrorFxn('Upload an Image first!')
                          }
                        }}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            
                            gap: 1,
                            padding: '6px 12px',
                            backgroundColor: '#f5f6f7',
                            borderRadius: '16px',
                          }}
                        >
                          <StarBorderOutlinedIcon fontSize="small" sx={{ color: '#5f6368' }} />
                          <Typography
                            variant="body2"
                            sx={{ color: '#5f6368', fontWeight: 500 }}
                          >
                            Primary
                          </Typography>
                        </Box>
                  
                        {/* Red Circular Delete Button */}
                        <IconButton
                          sx={{
                            backgroundColor: 'red',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: '#d00000',
                            },
                            width: 32,
                            height: 32,
                          }}
                        >
                          <CloseIcon 
                          onClick={()=>{
                          
                            setPrimary(false)
                         
                        
                       }}
                          
                          fontSize="small" />
                        </IconButton>
                    </Box>
                 {/* Image */}
                 {
                   <Box
                     component="img"
                     src={file4?file4:imageUrls && imageUrls[2] ? imageUrls[2]:defaultgray} // file should be a valid image URL or base64 string
                     alt="IMG"
                     sx={{
                       width: "100%",
                       height: "100%",
                       objectFit: "cover",
                       borderRadius: "0.8rem",
                     }}
                   />
                 }
               
                 {/* Input overlay */}
                 <input
                   type="file"
                   onChange={handleselectedFile4}
                   style={{
                     position: "absolute",
                     inset: 0, // stretches input to fill parent
                     opacity: 0, // hidden but clickable
                     cursor: "pointer",
                   }}
                 />
              </Box>


                    <Box
                 sx={{
                   backgroundColor: "#F0F0F0",
                   height: "10rem",
                   width: "10rem",
                   borderRadius: "0.8rem",
                   position: "relative",
                   overflow: "hidden", // ensures image/input stay clipped inside
                 }}
               >

<Box display="flex" alignItems="center"  gap={1} 
                 sx={{position:"absolute",scale:"0.7",right:"-1rem",zIndex:"1000",opacity:selectedFile5.selectedFile && (primary === selectedFile5.selectedFile)?1:"0.3",
                 "&:hover": {
                  opacity:selectedFile5.selectedFile && (primary === selectedFile5.selectedFile)?1: 0.8,
                },
                 }}
                 
                 >
                        {/* Primary Tag */}
                        <Box
                        onClick={()=>{
                          if(selectedFile5.selectedFile){
                             setPrimary(selectedFile5.selectedFile)
                          }
                          else{
                            notifyErrorFxn('Upload an Image first!')
                          }
                        }}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            
                            gap: 1,
                            padding: '6px 12px',
                            backgroundColor: '#f5f6f7',
                            borderRadius: '16px',
                          }}
                        >
                          <StarBorderOutlinedIcon fontSize="small" sx={{ color: '#5f6368' }} />
                          <Typography
                            variant="body2"
                            sx={{ color: '#5f6368', fontWeight: 500 }}
                          >
                            Primary
                          </Typography>
                        </Box>
                  
                        {/* Red Circular Delete Button */}
                        <IconButton
                          sx={{
                            backgroundColor: 'red',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: '#d00000',
                            },
                            width: 32,
                            height: 32,
                          }}
                        >
                          <CloseIcon
                          onClick={()=>{
                          
                               setPrimary(false)
                            
                           
                          }}
                           fontSize="small" />
                        </IconButton>
                    </Box>
                 {/* Image */}
                 {
                   <Box
                     component="img"
                     src={file5?file5:imageUrls && imageUrls[3] ? imageUrls[3]:defaultgray} // file should be a valid image URL or base64 string
                     alt="IMG"
                     sx={{
                       width: "100%",
                       height: "100%",
                       objectFit: "cover",
                       borderRadius: "0.8rem",
                     }}
                   />
                 }
               
                 {/* Input overlay */}
                 <input
                   type="file"
                   onChange={handleselectedFile5}
                   style={{
                     position: "absolute",
                     inset: 0, // stretches input to fill parent
                     opacity: 0, // hidden but clickable
                     cursor: "pointer",
                   }}
                 />
              </Box>

              </Box> 
                </Grid>

               
                <Box
                 sx={{
                   display: 'inline-flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   gap: 1,
                   backgroundColor: '#FFFFFF', // grey background from image
                   borderRadius: '16px',
                   padding: '6px 12px',
                   fontSize: 14,
                   margin:"0 auto",
                   width:"100%"
                 }}
               >
                <Box
                sx={{ backgroundColor: '#F5F6F7',width:"max-content", alignItems: 'center',
                justifyContent: 'center',gap: 1,borderRadius: '16px', display: 'inline-flex',marginTop:"1rem",
                padding: '6px 12px'}}
                >
                  <UploadFileOutlinedIcon fontSize="small" sx={{ color: '#5f6368' }} />
                  <Typography variant="body2" sx={{ color: '#5f6368', fontWeight: 500 }}>
                    Upload Images {/*({filesTracker.filter(file => file && file.toString().trim() !== "").length }/5)*/}
                  </Typography>
                 </Box>
               </Box>
               

          {/*<UploadBox>
            <CloudUploadIcon sx={{ fontSize: '40px', color: '#666', mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: '600', mb: 1, fontSize: '1rem',color:"#667085" }}>
              Upload Images (0/5)
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
              Drag and drop file here to upload or choose file
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.75rem', mt: 0.5 }}>
              Upload up to 5 images
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem', mt: 1.5 }}>
              Format: JPG, PNG, PDF (Max 5MB)
            </Typography>
           


            <input
                type="file"
                multiple
                //onChange={handleStatusReportChange}
                style={{ /opacity:"0",userSelect:"none",height:"11rem",width:"72rem",position:"absolute",top:"4rem",left:"1rem"}}
                id="fileInput"
                title="" 
              />


            <Typography variant="body2" sx={{ color: '#666', fontSize: '1rem', mt: 1.5,mb: 1.5 }}>
             {}
            </Typography>
          </UploadBox>
          */}
        </Grid>

        <Grid item xs={12} md={12}>
           <Box
             display="flex"
             flexDirection="column"
             alignItems="flex-start"
             gap={1.5}
           >
             <Box display="flex" alignItems="flex-start">
               <Typography sx={{ color: "#667085", fontSize: "1rem", mr: 1 }}>•</Typography>
               <Typography sx={{ color: "#667085", fontSize: "1rem" }}>
                 The primary image will be shown in the product listings
               </Typography>
             </Box>
         
             <Box display="flex" alignItems="flex-start">
               <Typography sx={{ color: "#667085", fontSize: "1rem", mr: 1 }}>•</Typography>
               <Typography sx={{ color: "#667085", fontSize: "1rem" }}>
                 Click the star icon to set image as primary
               </Typography>
             </Box>
         
             <Box display="flex" alignItems="flex-start">
               <Typography sx={{ color: "#667085", fontSize: "1rem", mr: 1 }}>•</Typography>
               <Typography sx={{ color: "#667085", fontSize: "1rem" }}>
                 You can upload up to 5 images per product
               </Typography>
             </Box>
           </Box>
        </Grid>


                <Grid item xs={12} md={12}>
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
                        checked={availableOnCredit} // switch reflects state
                        onChange={(e) => setAvailableOnCredit(e.target.checked)} 
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
                        checked={isActive} // switch reflects state
                        onChange={(e) => setIsActive(e.target.checked)} 
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
                      Cancel
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={()=>{submitResponse(finalObject,user && user._id)}}
                      sx={{
                        py: 1.5,
                        px: 3,
                        fontSize: '1rem',
                        fontWeight: '600',
                        backgroundColor:'#629D23' /*'#0A6054'*//*'#90C434'*/,
                        color: 'white',
                        borderRadius: '8px',
                        '&:hover': {
                          backgroundColor: '#7FB02E',
                        },
                      }}
                    >
                      Save Changes
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

export default EditProductPage
