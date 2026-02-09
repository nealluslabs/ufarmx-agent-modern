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
import { addNewDeposit } from 'src/redux/actions/group.action';
import { notifySuccessFxn } from 'src/utils/toast-fxn';
import { makeStyles } from '@mui/styles/node';


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


export default function AddDepositForm() {
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

  const [quality,setQuality]=  useState('');
  const [quantity,setQuantity]=  useState('');
  const [containerNumber,setContainerNumber]=  useState('');
  const [containerName,setContainerName]=  useState('');
  const [farmerName,setFarmerName]=  useState('');
  const [product,setProduct]=  useState('');

  const [cost,setCost]=  useState('');
  const [dateOfArrival,setDateOfArrival]=  useState('');
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
  

  const userSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    const deposit = {
     dateOfArrival,
     additionalInfo, 
     farmerName,
      containerNumber,
      product,
      containerName,
       quality,
       quantity,
         cost};
    dispatch(addNewDeposit(deposit, navigate, setLoading)); 
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
      width: { xs: "100%", sm: "1100px" },
      display: "flex", 
      alignItems: "center",
      justifyContent: "center",
      gap: { xs: "2rem", sm: "4rem" },
      flexDirection: { xs: "column", sm: "row" }
    }}>  
      
    <Grid item xs={12} sm={5}> 
      <Stack spacing={3}>
      
      <FormControl sx={{ 
        minWidth: { xs: "100%", sm: 140 }, 
        background: 'white' 
      }}>
        <Select
          value={containerName}
          onChange={(e) => setContainerName(e.target.value)}
          displayEmpty
          label=""
          sx={{
            height: 45,
            minWidth: { xs: "100%", sm: 140 },
            p: 1,
          }}
        >
          <MenuItem value="">
            Container Name
          </MenuItem>
      <MenuItem value={'Container 1'}>Container 1</MenuItem>
      <MenuItem value={'Container 2'}>Container 2</MenuItem>
      <MenuItem value={'Container 3'}>Container 3</MenuItem>
      <MenuItem value={'Container 4'}>Container 4</MenuItem>
      
        </Select>
      </FormControl>


        <TextField 
          name="farmerName" 
          required 
          label="Farmer Name" 
          value={farmerName} 
          onChange={(e) => setFarmerName(e.target.value)} 
          InputProps={{ 
            style: {
              height: "3rem",
              paddingLeft: "1rem"
            }
          }}
        />
        
        <FormControl sx={{ 
          minWidth: { xs: "100%", sm: 140 }, 
          background: 'white' 
        }}>
        <Select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          displayEmpty
          label=""
          sx={{
            height: 45,
            minWidth: { xs: "100%", sm: 140 },
            p: 1,
          }}
        >
          <MenuItem value="">
            Product
          </MenuItem>
      <MenuItem value={'okra'}>okra</MenuItem>
      <MenuItem value={'potato'}>potato</MenuItem>
      <MenuItem value={'tomato'}>tomato</MenuItem>
      <MenuItem value={'onion'}>onion</MenuItem>
      
        </Select>
      </FormControl>


      <TextField 
        name="quality" 
        required 
        label="Quality" 
        value={quality} 
        onChange={(e) => setQuality(e.target.value)} 
        InputProps={{ 
          style: {
            height: "3rem",
            paddingLeft: "1rem"
          }
        }}
      />
        
        <div style={{position:"relative"}}>
        <TextField
            name="lname"
            placeholder="Photo"
            component="label"
            fullWidth
            value={picture}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
              style: {
                width: "100%",
                height: "3rem",
                backgroundColor: "white",
                border: "0px solid lightgrey",
                paddingLeft: { xs: "1rem", sm: "120px" }
              }
            }}
          />

          <div style={{
            backgroundColor: "white",
            height: "2.5rem",
            width: { xs: "5rem", sm: "6.3rem" },
            position: "absolute",
            top: "0.3rem",
            left: "0.2rem",
            zIndex: "2"
          }}></div>
          
                <input
                  type="file"
                  style={{ 
                    display: 'flex',
                    width: "100%",
                    position: "relative",
                    top: "-2rem",
                    left: "0.2rem",
                    opacity: !selectedFile.selectedFileName ? "0" : "0",
                    fontFamily: "Arial"
                  }}
                  onChange={handleselectedFile}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      paddingLeft: { xs: "1rem", sm: "120px" }
                    }
                  }}
                />
        
        </div>

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

    
    <Grid item xs={12} sm={5} sx={{ marginTop: { xs: "0", sm: "-1.5rem" } }}> 
      <Stack spacing={3}>
      
      <TextField 
        name="lname" 
        required 
        label="Container Number" 
        value={containerNumber} 
        onChange={(e) => setContainerNumber(e.target.value)} 
        InputProps={{ 
          style: {
            height: "3rem",
            paddingLeft: "1rem"
          }
        }}
      />
        <TextField 
          name="dateOfArrival" 
          required 
          label="Date of Arrival" 
          type="text"  
          value={dateOfArrival} 
          placeholder='' 
          onChange={(e) => setDateOfArrival(e.target.value)} 
          InputProps={{ 
            style: {
              height: "3rem",
              paddingLeft: "1rem"
            }
          }}
        />
        
      

        <TextField 
          name="quantity" 
          required 
          label="Quantity" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          InputProps={{ 
            style: {
              height: "3rem",
              paddingLeft: "1rem"
            }
          }}
        />
      
        <TextField 
          name="cost" 
          required 
          label="Cost"  
          value={cost} 
          onChange={(e) => setCost(e.target.value)} 
          InputProps={{ 
            style: {
              height: "3rem",
              paddingLeft: "1rem"
            }
          }}
        />
      
      
        
        <FormControl style={{ 
          minWidth: { xs: "100%", sm: 140 }, 
          background: "white",
          opacity: "0"
        }}> {/**this one does not show, it is for evening out the rows */}
        <Select
          value={countryState}
          disabled={true}
          onChange={(e) => setCountryState(e.target.value)}
          displayEmpty
          label=""
          sx={{
            height: 45,
            minWidth: { xs: "100%", sm: 140 },
            p: 1,
          }}
        >
          <MenuItem value="">
            Select State
          </MenuItem>
      <MenuItem value={'1'}>1</MenuItem>
      <MenuItem value={'2'}>2</MenuItem>
      <MenuItem value={'3'}>3</MenuItem>
      <MenuItem value={'4'}>4</MenuItem>
      
        </Select>
      </FormControl>
      
      
      
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
    
    {/*
      <center>
      <LoadingButton  size="large" type="button" 
      onClick={()=>{setPart2(true);setPart1(false)}}
      variant="contained" disabled={loading} style={{ width:"33rem",color: 'white',backgroundColor: '#21712E',borderRadius:"5rem",}}>
        {loading ? "Loading..." : "Register"}
      </LoadingButton>
      </center>
        */} 

</>

  }  




{ 
<>

    <Grid container spacing={2} sx={{
      width: { xs: "100%", sm: "1100px" },
      display: "flex", 
      alignItems: "center",
      justifyContent: "center",
      gap: { xs: "2rem", sm: "4rem" }
    }}>  
      
    <Grid item xs={12}> 
      <Stack spacing={3}>
      
        
        { /*<TextField name="farmSize" multiline rows={12} required label="Size of Farm" value={farmSize}  InputProps={{ style:{height:"20rem",paddingLeft:"1rem"}}}/> */}
      <label htmlFor="additional-comments" style={{
        marginBottom: "0.6rem",
        position: "relative",
        left: { xs: "0", sm: "5%" }
      }}> Additional Comments</label>
      <textarea  
        id="additional-comments"
        name="additional-comments" 
        rows={12} 
        style={{
          width: { xs: "100%", sm: "90%" },
          margin: "0 auto",
          padding: "2rem",
          border: "1px solid lightgrey"
        }} 
        value={additionalInfo}  
        onChange={(e) => setAdditionalInfo(e.target.value)} 
      >

      </textarea>

      
        
      </Stack>
      </Grid> 

    
    
    
    
      </Grid> 


      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 5 }}>
    
      </Stack>
  
      <center>
      <LoadingButton 
        size="large" 
        type="submit" 
        variant="contained" 
        disabled={loading} 
        sx={{ 
          width: { xs: "90%", sm: "33rem" },
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
