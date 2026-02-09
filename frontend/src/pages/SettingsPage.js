
import { useEffect, useState } from 'react';
import { 
  Grid, 
  TextField, 
  Button, 
  FormControlLabel, 
  Checkbox, 
  Typography, 
  Container,
  Box,
  FormLabel,
  Radio
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import Bonlogo from "../assets/images/logo.png";
import { useNavigate } from 'react-router-dom';
import { addNewRetailer } from 'src/redux/actions/group.action';
import { updateNewPasswordForRetailer } from 'src/redux/actions/auth.action';
import { saveFirstName,saveLastName,saveEmail,savePassword } from 'src/redux/reducers/group.slice';
import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';

// Styled components
const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  display: 'flex',
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  // maxWidth: '100vw',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '100%',
  // backgroundColor: 'red',
  // maxWidth: '600px',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  justifyContent: 'flex-start',
  position: 'relative',
  marginLeft:"10%",
}));

const StyledContainerSecond = styled(Container)(({ theme }) => ({
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  justifyContent: 'flex-start',
  width: '100%',
  // minWidth: '800px',
  // marginLeft:"-10rem",

}));



const ForgotPasswordPage = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const {user} =useSelector((state) => state.auth);


 useEffect(() => {
 
  if(!user){
   navigate('/login')
  }
  
  }, [user])
  

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));


     // Dispatch actions based on field name
  if (name === "firstName") {
    dispatch(saveFirstName(value));
  } else if (name === "lastName") {
    dispatch(saveLastName(value));
  } else if (name === "email") {
    dispatch(saveEmail(value));
  } else if (name === "password") {
    dispatch(savePassword(value));
  }
  };

  const [eightCharacters, setEightCharacters]  = useState(false);
  const [lowerCaseCharacters, setLowerCaseCharacters] = useState(false);
  const [upperCaseCharacters, setUpperCaseCharacters] = useState(false);
  const [specialCharacters, setSpecialCharacters] = useState(false);
  const [numberCharacters, setNumberCharacters] = useState(false);
  const [matchesConfirmPassword, setMatchesConfirmPassword] = useState(false);

  useEffect(() => {
    setEightCharacters(formData.password.length >= 8);
    setLowerCaseCharacters(/[a-z]/.test(formData.password));
    setUpperCaseCharacters(/[A-Z]/.test(formData.password));
    setSpecialCharacters(/[!@#$%^&*(),.?":{}|<>]/.test(formData.password));
    setNumberCharacters(/[0-9]/.test(formData.password));
    setMatchesConfirmPassword(formData.password !== '' && formData.password === formData.confirmPassword);
  }, [formData.password, formData.confirmPassword]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
   // console.log('Form submitted:', formData);
   
    if(

           !eightCharacters||
      !lowerCaseCharacters||
      !upperCaseCharacters||
      !specialCharacters||
      !numberCharacters||
      !matchesConfirmPassword
    ){
   notifyErrorFxn("Make sure your password passes all checks before submitting!")
    }
    else{
      //console.log("OKAY SO WHAT IS USER? -->",user)
    dispatch(updateNewPasswordForRetailer({...user,newPassword:formData.password},user.token,
      setEightCharacters,
      setLowerCaseCharacters,
      setUpperCaseCharacters,
      setSpecialCharacters,
      setNumberCharacters,
      setMatchesConfirmPassword,
      setFormData
    ))
    }
  };

  return (
    <>
      <Helmet>
        <title>Settings - UfarmX</title>
      </Helmet>

      <StyledRoot>
        <StyledContainer maxWidth="sm">
         {/* <StyledLogo>
            <img src={Bonlogo} height="42" alt="UfarmX Logo" />
          </StyledLogo>
       */}  
          
          <StyledContainerSecond>
            {/*<Grid item xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"2rem",marginTop:"3rem"}}>
              <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",textAlign:"center"}}>
               <h1 style={{fontWeight:"500",marginBottom:"0rem",fontSize:"2rem", marginTop: "20px"}}>
                    Settings
                </h1>
              

                <h2 style={{fontWeight:"400",marginBottom:"0rem",fontSize:"1.5rem", marginTop: "32px"}}>
                   Reset Password
                </h2>
              </div>
            </Grid>*/}



            <Grid item xs={12} style={{display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",marginBottom:"2rem", left: '-1rem'}}>
     
     <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",position:"relative",left: '-2rem'}}>
     
     <h2 style={{fontWeight:"500",fontSize:"2rem",marginBottom:"0rem"}}>Settings</h2>
     <div>Create, edit and manage your Settings</div>
     
     </div>
     
     
       {/*
        <Button
        onClick={()=>{}}
              variant={'contained'}
              style={{
                minHeight: '50px',
                maxWidth: '170px',
                backgroundColor: '#0A6054',
                
                color: 'white',
                border: '1px solid black',
                fontWeight:"400",
                fontSize:"1.1rem",
                borderRadius: '5px',
                marginRight: '12px',
              }}
              
            >
             <FaPlus   style={{marginRight:"0.1rem"}}/>
             New Request
         </Button>
            */ }
     
     </Grid>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2,ml:-4,width:"100%" }}>
              {/* First Name and Last Name Row */}
              {/*
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <FormLabel component="legend" sx={{ mb: 1, color: '#333', fontSize: '0.9rem', fontWeight: '500' }}>
                    First Name
                  </FormLabel>
                  <TextField
                 
                    fullWidth
                    name="firstName"
                    placeholder="e.g John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                     InputProps={{ style:{height:"4rem"}}}
                    sx={{
                      backgroundColor:"#F9FAFB",
                      height:"4rem",
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#90C434',
                          backgroundColor:"#F9FAFB"
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#90C434',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormLabel component="legend" sx={{ mb: 1, color: '#333', fontSize: '0.9rem', fontWeight: '500' }}>
                    Last Name
                  </FormLabel>
                  <TextField
                    fullWidth
                    name="lastName"
                    placeholder="e.g Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    InputProps={{ style:{height:"4rem"}}}
                    sx={{
                      backgroundColor:"#F9FAFB",
                      height:"4rem",
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#90C434',
                          backgroundColor:"#F9FAFB"
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#90C434',
                      },
                    }}
                  />
                </Grid>
              </Grid>
               */}
              {/* Email Row */}
              {/*
              <Grid container sx={{ mb: 2 }}>
                <Grid item xs={12}>
                  <FormLabel component="legend" sx={{ mb: 1, color: '#333', fontSize: '0.9rem', fontWeight: '500' }}>
                    Email Address
                  </FormLabel>
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    placeholder="email@domain.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    InputProps={{ style:{height:"4rem"}}}
                    sx={{

                      backgroundColor:"#F9FAFB",
                      height:"4rem",
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#90C434',
                          backgroundColor:"#F9FAFB"
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#90C434',
                      },
                    }}
                  />
                </Grid>
              </Grid>
                  */}

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  {/* Password */}
                  <Grid item xs={12} sm={6}>
                    <FormLabel component="legend" sx={{ mb: 1, color: '#333', fontSize: '0.9rem', fontWeight: 500 }}>
                      Password
                    </FormLabel>
                    <TextField
                      fullWidth
                      name="password"
                      type="password"
                      placeholder="********"
                      value={formData.password}
                      onChange={handleInputChange}
                      variant="outlined"
                      required
                      InputProps={{ style: { height: '4rem', paddingLeft: 14,  } }}
                      sx={{
                        backgroundColor: '#F9FAFB',
                        // width: '100%',
                        //  width: '100vh',
                        height: '4rem',
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: '#90C434',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#90C434',
                        },
                      }}
                    />
                  </Grid>

                  {/* Confirm Password */}
                  <Grid item xs={12} sm={6}>
                    <FormLabel
                      component="legend"
                      sx={{ mb: 1, color: '#333', fontSize: '0.9rem', fontWeight: 500 }}
                    >
                      Confirm Password
                    </FormLabel>
                    <TextField
                      fullWidth
                      width
                      name="confirmPassword"
                      type="password"
                      placeholder="********"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      variant="outlined"
                      required
                      InputProps={{ style: { height: '4rem',paddingLeft: 14, } }}
                      sx={{
                        backgroundColor: '#F9FAFB',
                        //  width: '100%',
                        height: '4rem',
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: '#90C434',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#90C434',
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Password Requirements */}
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={eightCharacters}
                            sx={{ color: '#ccc', '& .MuiSvgIcon-root': { fontSize: 20 } }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                            Have at least 8 characters
                          </Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={upperCaseCharacters}
                            sx={{ color: '#ccc', '& .MuiSvgIcon-root': { fontSize: 20 } }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                            Have UPPER-case
                          </Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={lowerCaseCharacters}
                            sx={{ color: '#ccc', '& .MuiSvgIcon-root': { fontSize: 20 } }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                            Have lower-case
                          </Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={numberCharacters}
                            sx={{ color: '#ccc', '& .MuiSvgIcon-root': { fontSize: 20 } }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                            Have at least one number
                          </Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={specialCharacters}
                            sx={{ color: '#ccc', '& .MuiSvgIcon-root': { fontSize: 20 } }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                            Have special character (e.g. @&$!)
                          </Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={matchesConfirmPassword}
                            sx={{ color: '#ccc', '& .MuiSvgIcon-root': { fontSize: 20 } }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                            Match with confirm Password
                          </Typography>
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>


              {/* Terms and Conditions Checkbox */}
             {/*
              <FormControlLabel
                control={
                  <Checkbox
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    sx={{
                      color: '#90C434',
                      '&.Mui-checked': {
                        color: '#90C434',
                      },
                      '& .MuiSvgIcon-root': {
                        borderRadius: '50%',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                    By registering your details, you agree and accept to ufarmx{' '}
                    <span style={{ color: '#629D23', textDecoration: 'underline', cursor: 'pointer' }}>
                      Terms & Conditions, Privacy policy
                    </span>{' '}
                    and Cookie Policy.
                  </Typography>
                }
                sx={{ mb: 3, alignItems: 'flex-start' }}
              />
              */}

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 2,
                  py: 1.5,
                  // width: '100%',
                  fontSize: '1rem',
                  fontWeight: '600',
                  backgroundColor: '#90C434',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#7FB02E',
                  },
                }}
              >
                Reset
              </Button>

              {/* Login Link */}
              {/*
              <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', fontSize: '1.1rem' }}>
                Remebered your password?{' '}
                <a href="/login">
                  <span style={{ color: '#90C434', textDecoration: 'underline', cursor: 'pointer' }}>
                   Login Here.
                  </span>
                </a>

              </Typography>
              */}

            </Box>
          </StyledContainerSecond>

         {/* <div style={{ 
            padding: '20px', 
            textAlign: 'center', 
            color: '#666', 
            fontSize: '0.9rem' 
          }}>
            <p>@2025 UfarmX inc. All rights reserved</p>
          </div>*/}
        </StyledContainer>
      </StyledRoot>
    </>
  );
};

export default ForgotPasswordPage;
