import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../iconify';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from 'src/redux/actions/auth.action';

import { fetchAgentByPhone } from 'src/redux/actions/group.action';

// ----------------------------------------------------------------------

export default function LoginFormAgent() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); 

  const userSignin = (e) => {
    e.preventDefault();
    setLoading(true);
    const user = { email, password };
   // dispatch(signin(user, navigate, setLoading));
   console.log("about to login, phone number-->",user.email)
    dispatch(fetchAgentByPhone( user.email,navigate, setLoading))
    setTimeout(()=>{setLoading(false)},2000)
  }

  return (
    <>
     <form  onSubmit={userSignin}>
      <Stack spacing={3}>
        <TextField required name="email" type="text" label="Email address/Phone Number" 
        
        InputProps={{
          style:{height:"3rem",padding:"10px"},
         
        }}
        
        onChange={(e) => setEmail(e.target.value)}/>

        <TextField
          name="password"
          label="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            style:{height:"3rem",padding:"10px"},
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
        {
        <>
        <Checkbox name="remember" label="Remember me" />
        <div >
          Remember Me
        </div> 

        </>
        
        }

      </Stack>

      <LoadingButton  fullWidth size="large" type="submit" disabled={loading} style={{backgroundColor: '#21712E',borderRadius:"5rem", color: 'white'}}>
        {loading ? "Loading..." : "Submit"}
      </LoadingButton>
      </form>
    </>
  );
}
