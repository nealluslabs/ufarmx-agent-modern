import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Grid, Button, Avatar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../iconify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signup, uploadImage } from 'src/redux/actions/auth.action';
import { notifySuccessFxn } from 'src/utils/toast-fxn';
import { makeStyles } from '@mui/styles/node';
import { addNewRetailer } from 'src/redux/actions/group.action';


const schema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required')
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '4rem',
      paddingRight: '4rem',
    },
    searchInput: {
      background: 'white',
      border: '1px solid #00000026',
      padding: '0px',
      borderRadius: '8px',
      // marginRight: theme.spacing(2),
      width: '100%',
      minWidth: '100%',
      '& .MuiInputBase-input': {
        color: 'grey',
      },
      '& .MuiInputBase-input::placeholder': {
        color: 'grey',
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: 'grey',
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: 'grey',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'grey',
      },
    },
    searchButton: {
      color: '#fff',
      padding: '15px',
      minWidth: '45%',
      backgroundColor: 'black',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  }));


export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  
  const [loading, setLoading] = useState(false);
  const [sname, setSName] = useState('');
  const [fname, setFName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');

  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [sport, setSport] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [countryState, setCountryState] = useState('');

  const [age, setAge] = useState('');
  const [familySize, setFamilySize] = useState('');
  const [crops, setCrops] = useState('');
  const [harvestPurpose, setHarvestPurpose] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [market, setMarket] = useState('');
  const [harvestSize, setHarvestSize] = useState('');
  const [chemicalsUsed, setChemicalsUsed] = useState('');
  const [organicInterest, setOrganicInterest] = useState('');
  const [picture, setPicture] = useState('');

 const [part1, setPart1] = useState(true);
 const [part2, setPart2] = useState(false);


 const [firstName,setFirstName] =  useState('');
 const  [ lastName,setLastName ] = useState('')
 const  [ middlename,setMiddlename] = useState('')
 const  [ nearestLandmark,setNearestLandmark] = useState('')
 const  [ yearsInBusiness,setYearsInBusiness] = useState('')
 const  [ gender,setGender] = useState('')
 const  [ shopOwned,setShopOwned] = useState('')
 const  [ sizeOfShop,setSizeOfShop] = useState('')
 const  [ nationality,setNationality] = useState('')
 const  [ localGovernment,setLocalGovernment] = useState('')
 const  [ dob,setDob] = useState('')
 const  [ address,setAddress] = useState('')
 const  [ utilityType,setUtilityType] = useState('')
 const  [ meansOfId,setMeansOfId] = useState('')
 const  [ nin,setNin] = useState('')
 const  [ idDocument,setIdDocument] = useState('')
 const  [ certificateOfIncorporation,setCertificateOfIncorporation] = useState('')
 const  [ statusReport,setStatusReport] = useState('')
 const  [ idNumber,setIdNumber] = useState('')
 const  [ memart,setMemart] = useState('')
 const  [ photoId,setPhotoId] = useState('')
 const  [ utilityBill,setUtilityBill] = useState('')
 const  [ meterNumber,setMeterNumber] = useState('')
    



  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [file, setFile] = useState();

  const handleselectedFile = event => {
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    setFile(URL.createObjectURL(event.target.files[0]));
    setPicture(event.target.files[0].name);
};


const handleChange = (e) => {
  
 
 //setPicture(e.target.value)

}
  

  const userSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    const user = {companyName, 
      companyEmail,
      companyAddress,
       phoneNumber,
     
    firstName,
    lastName,
    middlename,
    nearestLandmark,
    yearsInBusiness,
    gender,
    shopOwned,
    sizeOfShop,
    nationality,
    localGovernment,
    dob,
    address,
    utilityType,
    meansOfId,
    nin,
    idDocument,
    certificateOfIncorporation,
    statusReport,
    idNumber,
    memart,
    photoId,
    utilityBill,
    meterNumber,
    password,
      };



      
    //dispatch(signup(user, navigate, setLoading)); 

    dispatch(addNewRetailer(user, navigate)); 
  }


  // const userSignup = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const user = {fname, lname, email, password};
  //   dispatch(uploadImage(user, selectedFile.selectedFile, navigate, setLoading)); 
  // }

  return (
    <>
      <form onSubmit={userSignup}>

{ part1 &&
<>

     <Grid container xs={12} spacing={2} style={{width:"1100px",display:"flex", alignItems:"center",justifyContent:"center",gap:"4rem"}}>  
      
     <Grid item xs={5} > 
       <Stack spacing={3} >
       
        <TextField name="companyName" required label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
        <TextField name="phoneNumber" required label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
       {/* <TextField name="country" required label="Country" type="text" onChange={(e) => setCountry(e.target.value)}/>*/}
        
        {/*<div style={{position:"relative"}}>
        <TextField
            name="lname"
            placeholder="Profile Picture"
            component="label"
            fullWidth
            value={picture}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,

                
              style:{
               
                width:"100%",
                height:"3rem",
                backgroundColor:"white",
                border:"0px solid lightgrey",

                paddingLeft:"120px"
              }
            }}
          />

          <div style={{backgroundColor:"white",height:"2.5rem",width:"6.3rem",position:"absolute",top:"0.3rem",left:"0.2rem",zIndex:"2"}}></div>
           
                <input
                  type="file"
                  style={{ display: 'flex',width:"100%",position:"relative",top:"-2rem",left:"0.2rem",opacity:!selectedFile.selectedFileName?"0":"0",fontFamily:"Arial" }}
                  onChange={handleselectedFile}

                  InputProps={{
                    disableUnderline: true,
      
                      
                    style:{
                    
                      paddingLeft:"120px"
                    }
                  }}

                   />
        
        </div>*/}

        {/*<TextField
          name="password"
          label="Password"
          required
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />*/}
          {/* <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          >
          <Avatar
              alt="Profile Picture"
              src={file}
              sx={{ width: 56, height: 56 }}
            />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <center>
              <Button
              // fullWidth
              variant="contained"
              component="label"
              style={{backgroundColor: 'black', height:"40px", width: '100%',  fontSize:"15px"}}
            >
              UPLOAD PROFILE PIC
              <input
              type="file"
              style={{ display: 'none' }}
              // hidden
              required
              onChange={handleselectedFile}
              />
            </Button>
            <p>{selectedFile?.selectedFileName}</p>
            </center>
          </Grid> */}
        
      </Stack>
      </Grid> 

     
     <Grid item xs={5}> 
      <Stack spacing={3} >
       
      <TextField name="companyAddress" required label="Company Address" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)}/>
        <TextField name="companyEmail" required label="Company Email" value={companyEmail}  type="email" onChange={(e) => setCompanyEmail(e.target.value)}/>
        {/*<TextField name="state" required label="State" value={countryState} onChange={(e) => setCountryState(e.target.value)}/>*/}
        {/*<TextField name="age" required label="Age" value={age} onChange={(e) => setAge(e.target.value)}/>*/}
       
       
       {/* <TextField
          name="password"
          label="Password"
          required
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />*/}

          {/* <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          >
          <Avatar
              alt="Profile Picture"
              src={file}
              sx={{ width: 56, height: 56 }}
            />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <center>
              <Button
              // fullWidth
              variant="contained"
              component="label"
              style={{backgroundColor: 'black', height:"40px", width: '100%',  fontSize:"15px"}}
            >
              UPLOAD PROFILE PIC
              <input
              type="file"
              style={{ display: 'none' }}
              // hidden
              required
              onChange={handleselectedFile}
              />
            </Button>
            <p>{selectedFile?.selectedFileName}</p>
            </center>
          </Grid> */}
        
      </Stack>
      </Grid> 
     
     
      </Grid> 


      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 5 }}>
     
      </Stack>
  
       <center>
     {/* <LoadingButton  size="large" type="button" 
       onClick={()=>{setPart2(true);setPart1(false)}}
      variant="contained" disabled={loading} style={{ width:"33rem",color: 'white',backgroundColor: '#21712E',borderRadius:"5rem",}}>
        {loading ? "Loading..." : "Register"}
      </LoadingButton>*/}


      <LoadingButton /*onClick={(e)=>{setLoading(true);userSignin(e) }}*/ fullWidth size="large" type="submit" variant={'contained'} disabled={loading} style={{width:"33rem", backgroundColor: '#0A6054',color: 'white',
           border: '1px solid black',borderRadius:"0.5rem", color: 'white',fontWeight:"400"}}>
        {loading ? "Loading..." : "Register"}
      </LoadingButton>
      </center>
 
 </>

  }  




{ part2 &&
<>

     <Grid container xs={12} spacing={2} style={{width:"1100px",display:"flex", alignItems:"center",justifyContent:"center",gap:"4rem"}}>  
      
     <Grid item xs={5} > 
       <Stack spacing={3} >
       
        
        <TextField name="farmSize" required label="Size of Farm" value={farmSize} onChange={(e) => setFarmSize(e.target.value)}/>

        <TextField name="harvestPurpose" required label="What do you do with harvest?" value={harvestPurpose} onChange={(e) => setHarvestPurpose(e.target.value)}/>
        <TextField name="harvestSize" required label="Typical Harvest Size" value={harvestSize} onChange={(e) => setHarvestSize(e.target.value)}/>
        
        <TextField name="organicFarmingInterest" required label="Are you interested in organic farming?" value={organicInterest} onChange={(e) => setOrganicInterest(e.target.value)}/>
       

      
          {/* <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          >
          <Avatar
              alt="Profile Picture"
              src={file}
              sx={{ width: 56, height: 56 }}
            />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <center>
              <Button
              // fullWidth
              variant="contained"
              component="label"
              style={{backgroundColor: 'black', height:"40px", width: '100%',  fontSize:"15px"}}
            >
              UPLOAD PROFILE PIC
              <input
              type="file"
              style={{ display: 'none' }}
              // hidden
              required
              onChange={handleselectedFile}
              />
            </Button>
            <p>{selectedFile?.selectedFileName}</p>
            </center>
          </Grid> */}
        
      </Stack>
      </Grid> 

     
     <Grid item xs={5}> 
      <Stack spacing={3} >
       
      <TextField name="familySize" required label="Family Size" value={familySize} onChange={(e) => setFamilySize(e.target.value)}/>
        <TextField name="crops" required label="Last Name" value={crops} onChange={(e) => setCrops(e.target.value)}/>
        <TextField name="market" required label="Who do you sell to?" value={market} onChange={(e) => setMarket(e.target.value)}/>
        <TextField name="chemicalsUsed" required label="What chemicals do you use?" value={chemicalsUsed} onChange={(e) => setChemicalsUsed(e.target.value)}/>
        
      
          {/* <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          >
          <Avatar
              alt="Profile Picture"
              src={file}
              sx={{ width: 56, height: 56 }}
            />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <center>
              <Button
              // fullWidth
              variant="contained"
              component="label"
              style={{backgroundColor: 'black', height:"40px", width: '100%',  fontSize:"15px"}}
            >
              UPLOAD PROFILE PIC
              <input
              type="file"
              style={{ display: 'none' }}
              // hidden
              required
              onChange={handleselectedFile}
              />
            </Button>
            <p>{selectedFile?.selectedFileName}</p>
            </center>
          </Grid> */}
        
      </Stack>
      </Grid> 
     
     
      </Grid> 


      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 5 }}>
     
      </Stack>
  
       <center>
      <LoadingButton  onClick={()=>{navigate('/dashboard/home')}} size="large" type="button" variant="contained" disabled={loading} style={{ width:"33rem",color: 'white',backgroundColor: '#21712E',borderRadius:"5rem",}}>
       
        {loading ? "Loading..." : "Submit"}
      </LoadingButton>
      </center>
 
 </>

  }  


      </form>
    </>
  );
}
