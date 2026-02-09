import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Grid, Button, Avatar, FormControl, MenuItem, Select } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../iconify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signup, uploadImage } from 'src/redux/actions/auth.action';
import { addNewAgent,addNewAdmin, addNewDeposit,addNewFarmer } from 'src/redux/actions/group.action';
import { notifySuccessFxn } from 'src/utils/toast-fxn';
import { makeStyles } from '@mui/styles/node';
import { v4 as uuidv4 } from 'uuid';


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
        color: 'black',
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


export default function AddAdminForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  
  const [loading, setLoading] = useState(false);
  const [sname, setSName] = useState('');
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [sport, setSport] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [countryState, setCountryState] = useState('');

  const [farmSize,setFarmSize]=  useState('');
  const [phone,setPhone]=  useState('');
  const [lastName,setLastName]=  useState('');
  const [containerName,setContainerName]=  useState('');
  const [firstName,setFirstName]=  useState('');
  const [produce,setProduce]=  useState('');
  const [market,setMarket]=  useState('');
  const [chemicals,setChemicals]=  useState('');
  const [organicFarmingInterest,setOrganicFarmingInterest]=  useState('');
  const [insurance,setInsurance]=  useState('');
  const [role,setRole]=  useState('');

  const [familySize,setFamilySize]=  useState('');
  const [age,setAge]=  useState('');
  const [additionalInfo,setAdditionalInfo]=  useState('');
  

  
  const [picture, setPicture] = useState('');

 const [part1, setPart1] = useState(true);
 const [part2, setPart2] = useState(false);



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
  
const generatedString =uuidv4()

  const userSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    const adminInfo = {
     
     role,
     country,
     firstName,
      lastName,
      email,
     password:"123456",
     is_active:true,
      phone,
         };
    dispatch(addNewAdmin(adminInfo, navigate, setLoading)); 

    setTimeout(()=>{setLoading(false)},4000)
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
        { 
          <>
            <Grid container spacing={2} sx={{ 
              width: "100%", 
              maxWidth: { xs: "100%", md: "1100px" },
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              gap: { xs: "1rem", md: "4rem" },
              margin: "0 auto",
              padding: { xs: "0 1rem", md: "0" }
            }}>  
              
              <Grid item xs={12} md={5}> 
                <Stack spacing={3}>
                  <TextField 
                    name="firstName" 
                    required 
                    label="First Name" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    InputProps={{ style: { height: "3rem", paddingLeft: "1rem" } }}
                  />

                  <FormControl sx={{ minWidth: { xs: "100%", md: 140 }, background: 'white' }}>
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      displayEmpty
                      label=""
                      sx={{
                        height: 45,
                        minWidth: { xs: "100%", md: 140 },
                        p: 1,
                      }}
                    >
                      <MenuItem disabled={true} value="">
                        Role
                      </MenuItem>
                      <MenuItem value={'Admin'}>Admin</MenuItem>
                      <MenuItem value={'SuperAdmin'}>SuperAdmin</MenuItem>
                    </Select>
                  </FormControl>
                  {/* 
                    <FormControl sx={{ minWidth: 140, background: 'white' }}>
                      <Select
                        value={produce}
                        onChange={(e) => setProduce(e.target.value)}
                        displayEmpty
                        label=""
                        sx={{
                          height: 45,
                          minWidth: 140,
                          p: 1,
                        }}
                      >
                        <MenuItem value="">
                          Produce
                        </MenuItem>
                        <MenuItem value={'okra'}>okra</MenuItem>
                        <MenuItem value={'potato'}>potato</MenuItem>
                        <MenuItem value={'tomato'}>tomato</MenuItem>
                        <MenuItem value={'onion'}>onion</MenuItem>
                      </Select>
                    </FormControl>
                  */}

                  {/*<TextField name="location" required label="Location" value={location} onChange={(e) => setLocation(e.target.value)} InputProps={{ style:{height:"3rem",paddingLeft:"1rem"}}}/>*/}

                  {/*<TextField name="farmSize" required label="Farm size" value={farmSize} onChange={(e) => setFarmSize(e.target.value)} InputProps={{ style:{height:"3rem",paddingLeft:"1rem"}}}/>*/}
                  
                  <div style={{ position: "relative", width: "100%" }}>
                    <TextField
                      name="Email"
                      placeholder="Email Address"
                      component="label"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={classes.searchInput}
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          width: "100%",
                          height: "3rem",
                          backgroundColor: "white",
                          border: "0px solid lightgrey",
                          paddingLeft: "20px"
                        }
                      }}
                    />
                  </div>
                </Stack>
              </Grid> 

              <Grid item xs={12} md={5} sx={{ marginTop: { xs: "0rem", md: "0rem" } }}> 
                <Stack spacing={3}>
                  <TextField 
                    name="lname" 
                    required 
                    label="Last Name" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    InputProps={{ style: { height: "3rem", paddingLeft: "1rem" }}}
                  />
                  {/*<TextField name="age" required label="Age" type="text"  value={age} placeholder='' onChange={(e) => setAge(e.target.value)} InputProps={{ style:{height:"3rem",paddingLeft:"1rem"}}}/>*/}

                  <TextField 
                    name="phone" 
                    required 
                    label="Phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    InputProps={{ style: { height: "3rem", paddingLeft: "1rem" }}}
                  />
                  
                  {/*<TextField name="familySize" required label="Family size"  value={familySize} onChange={(e) => setFamilySize(e.target.value)} InputProps={{ style:{height:"3rem",paddingLeft:"1rem"}}}/>*/}

                  <FormControl sx={{ minWidth: { xs: "100%", md: 140 }, background: 'white' }}>
                    <Select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      displayEmpty
                      label=""
                      sx={{
                        height: 45,
                        minWidth: { xs: "100%", md: 140 },
                        p: 1,
                      }}
                    >
                      <MenuItem value="">
                        Select Location
                      </MenuItem>
                      <MenuItem value={'Senegal'}>Senegal</MenuItem>
                      <MenuItem value={'Nigeria'}>Nigeria</MenuItem>
                      <MenuItem value={'Cameroon'}>Cameroon</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Grid> 
            </Grid>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 5 }}>
            </Stack>
          </>
        }  

        { 
          <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 5 }}>
            </Stack>
      
            <center>
              <LoadingButton 
                size="large" 
                type="submit" 
                variant="contained" 
                disabled={false} 
                sx={{ 
                  width: { xs: "100%", md: "33rem" },
                  maxWidth: "90%",
                  color: 'white',
                  backgroundColor: '#21712E',
                  borderRadius: "5rem",
                }}
              >
                {loading ? "Loading..." : "Submit"}
              </LoadingButton>
            </center>
          </>
        }  
      </form>
    </>
  );
}
