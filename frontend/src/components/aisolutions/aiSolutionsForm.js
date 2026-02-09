
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Grid, Button, Avatar, FormControl, MenuItem, Select, Typography, Divider, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../iconify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signup, uploadImage } from 'src/redux/actions/auth.action';
import { addNewAgent, addNewDeposit,addNewFarmer } from 'src/redux/actions/group.action';
import { notifySuccessFxn } from 'src/utils/toast-fxn';
import { makeStyles } from '@mui/styles/node';
import { v4 as uuidv4 } from 'uuid';
import { FaCaretRight } from 'react-icons/fa';
import { PiCaretRight } from 'react-icons/pi';

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


export default function AiSolutionsForm({setAiForm}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const inputContainer = {
    display: 'flex',
    alignItems: 'center',
  
  };


  const inputContainerBig = {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    width:'100%',
   
  };




  return(

  <>

    <div onClick={(e)=>{e.stopPropagation()}} 
     style={{position:"absolute",top:"-0%",left:"52%",backgroundColor:'#F5F5F5',/*backgroundColor:"#40255F",*/color:"black",zIndex:"200",width:"33rem",height:"129vh",padding:"50px",paddingTop:"20px",paddingBottom:"18px",fontFamily:"Libre Baskerville",border:"3px #F5F5F5 solid"}}> 

       
    
              <div style={{width:"100%",display:"flex",justifyContent:"flex-start",alignItems:"flex-start",marginBottom:"0rem" }}>
              
              <Typography  onClick={()=>{setAiForm(false)}} 
              variant="p" gutterBottom style={{cursor:"pointer",marginTop:"0rem",fontFamily:"Libre Baskerville, sans-serif", color:"black",display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
               <PiCaretRight />  Close
             </Typography>
              
              
              
           </div>




           <Grid container direction="row" sx={{mt:2}}>
            <Grid item xs={12} style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"column"}}>
              <p style={{ fontSize: '15px', width: '95%',position:"relative",top:"-0.3rem",marginBottom:"0.6rem"  }}>
                
              Quickly find solutions to your agricultural questions. 
              Whether it's about crop management or market trends,
               the chatbot serves as your reliable resource for
                up-to-date farming insights.
              </p>
             {/* <div style={inputContainerBig}>
                <TextField
                  name="email"
                  required
                  type="email"
                  placeholder=''
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />

                <textarea rows={2} 
                name="How well did the candidate align to the requirements for the role"
                placeholder='Ask Anything...'
                value={''}
                style={{borderRadius:"0.3rem",width:"100%",border:"1px solid #E0E0E0",padding:"1.5rem",fontFamily:"Arial",fontSize:"0.7rem",marginBottom:"1rem",color:"black"}}
                onChange={(e) => console.log(e.target.value)}
                
                >
                </textarea>





              </div>
              */}
            </Grid>

          </Grid>



          


       

       
          {/*<Divider style={{width:"100%",marginTop:"2rem",marginBottom:"3rem",border:"1.5px solid lightgrey"}}/>*/}
          <div style={{width:"75%",display:"flex",flexDirection:"column",gap:"0.8rem",alignItems:"flex-start",marginBottom:"2.5rem",userSelect:"none",opacity:"0"}}> 
           
           <div style={{fontSize:"0.75rem"}}>
            Do you recommend hiring this candidate* ?
           </div>

          
              <FormControl>
               {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
               <RadioGroup style={{color:"grey"}}
                 aria-labelledby="demo-radio-buttons-group-label"
                 defaultValue="Yes"
                 name="radio-buttons-group"
               >
                 <FormControlLabel  onClick={(e)=>{console.log(e.target.value)}}  value="Yes" control={<Radio  style={{color:"grey"}} />} label={<Typography style={{fontFamily:"Public Sans, sans-serif",}}>Yes</Typography>} />
                 <FormControlLabel onClick={(e)=>{console.log(e.target.value)}}  value="No" control={<Radio  style={{color:"grey"}}/>} label={<Typography style={{fontFamily:"Public Sans, sans-serif",}}>No</Typography>}/>
                 <FormControlLabel onClick={(e)=>{console.log(e.target.value)}}  value="Maybe" control={<Radio   style={{color:"grey"}}/>} label={<Typography style={{fontFamily:"Public Sans, sans-serif",}}>Maybe</Typography>} />
                 
                
               </RadioGroup>
             </FormControl>


        </div>

          <Grid container direction="row" sx={{mt:2}}>
            <Grid item xs={12} style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"column"}}>
              
              <div style={inputContainerBig}>
                {/*<TextField
                  name="email"
                  required
                  type="email"
                  placeholder=''
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />*/}

                <textarea rows={6} 
                name="Do you recomend hiring this candidate ?"
                placeholder='Ask Anything...'
                value={''}
                style={{backgroundColor:"#EBEBED",borderRadius:"0.3rem",width:"100%",border:"1px solid #E0E0E0",padding:"1.5rem",fontFamily:"Arial",fontSize:"0.7rem",marginBottom:"1rem",color:"black"}}
                onChange={(e) => console.log(e.target.value)}
                
                >
                </textarea>





              </div>
            </Grid>

          </Grid>



          

         




          <Grid item  xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"1rem"}} >
              
              <Button onClick={()=>{/*dispatch(updateCandidateToSelectionReviewed(candidateObj && candidateObj.id))*/;setAiForm(false)}} style={{width:"8rem",color:"black",paddingLeft:"0.8rem",paddingRight:"0.8rem",backgroundColor:"#e0dcdc", boxShadow:" 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",fontFamily:"Public Sans, sans-serif",fontSize:"0.7rem"}}>Send</Button>

             </Grid>

    </div>


</>
)
   }

