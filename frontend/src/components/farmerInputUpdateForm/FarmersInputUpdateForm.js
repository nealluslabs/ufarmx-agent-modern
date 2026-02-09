import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Grid, Button, Avatar, FormControl, MenuItem, Select, Typography, Box, Menu,Paper} from '@mui/material';
import {  LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// components
import Iconify from '../iconify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signup, uploadImage } from 'src/redux/actions/auth.action';
import { addNewDeposit, filterFarmersByName, submitNewResponse, updateFarmerInput, updateFarmerSingleInput, updateFormFields } from 'src/redux/actions/group.action';
import { notifySuccessFxn } from 'src/utils/toast-fxn';
import { makeStyles } from '@mui/styles/node';
import { saveFarmerInFocus } from 'src/redux/reducers/group.slice';
import uuidv4 from 'src/uuidv4';



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
       
        color:"black"
      },
      '& .MuiInputBase-input::placeholder': {
      
        color:"black"
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: 'grey',
        color:"black"
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: 'grey',
        color:"black"
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'grey',
        color:"black"
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


export default function FarmersInputUpdateForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  
  const [loading, setLoading] = useState(false);



 
  const { user } = useSelector((state) => state.auth);
 
  useEffect(()=>{

   if(!user ){
    navigate('/login')
   }

  },[user])




  const { myGroups, isLoading,
    currentFarmersToDisplay,
    currentAgentsToDisplay,
    totalPagesFarmers,
    allFarmers,
    filteredFarmers,
    currentDepositsToDisplay,
    inputToUpdateInFocus,
    farmerInFocus,
    formInFocus,
    loggedInAgent
   } = useSelector((state) => state.group);



  //console.log("INPUT TO UPDATE IN FOCUS IS------>",inputToUpdateInFocus)
 
  //console.log("logged in agent------->",loggedInAgent)

  //console.log("farmer in focus------->",farmerInFocus)

  
  const [picture, setPicture] = useState('');

 
  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [file, setFile] = useState();

  const [selectedFarmer,setSelectedFarmer] = useState('')

 

 const [anchorEl, setAnchorEl] = useState(null);
 const [searchValue, setSearchValue] = useState("");



 const inputRef = useRef(null);
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    dispatch(filterFarmersByName(event.target.value,allFarmers))
    setSelectedFarmer(event.target.value);
    setIsDropdownOpen(event.target.value.trim() !== ""); // Show dropdown when typing
  };


  console.log("FARMER IN FOCUS--->",farmerInFocus)
  

  const handleItemClick = (farmer) => {
    console.log("ABOUT TO SAVE--->",farmerInFocus)
    
    setSelectedFarmer( farmer.name
      ? farmer.name
      : farmer.firstName && farmer.lastName
      ? `${farmer.firstName} ${farmer.lastName}`
      : farmer.firstName || farmer.lastName || "");

    setSelectedFarmer(farmer.user_id);
    setSearchValue(
      farmer.name
        ? farmer.name
        : farmer.firstName && farmer.lastName
        ? `${farmer.firstName} ${farmer.lastName}`
        : farmer.firstName || farmer.lastName || ""
    );
    dispatch(saveFarmerInFocus(farmer))
   setIsDropdownOpen(false);
  
  };

  const handleBlur = (event) => {
    // Close dropdown when clicking outside
    if (!inputRef.current.contains(event.relatedTarget)) {
      setIsDropdownOpen(false);
    }
  };





  const initialFormObject = formInFocus && formInFocus.fields &&formInFocus.fields.reduce((acc, curr) => {
    acc[curr.prompt] = ''; // Initialize each value to an empty string
    return acc;
  }, {});

  // State to manage form values
  const [formValues, setFormValues] = useState(initialFormObject);


  const [amountSpent,setAmountSpent] = useState(inputToUpdateInFocus.amountSpent)
  const [estHarvestDate,setEstHarvestDate] = useState(inputToUpdateInFocus.estHarvestDate)
  const [estSales,setEstSales] = useState(inputToUpdateInFocus.estSales)
  const [amountMade,setAmountMade] = useState(inputToUpdateInFocus.amountMade)
  const [actHarvestDate,setActHarvestDate] = useState(inputToUpdateInFocus.actHarvestDate)
  const [estReturns,setEstReturns] = useState(inputToUpdateInFocus.estReturns)
  const [actReturns,setActReturns] = useState(inputToUpdateInFocus.actReturns)

   const inputObject =
   {
    _id:inputToUpdateInFocus._id,
    id:inputToUpdateInFocus.id,
    amountSpent:amountSpent,
    estHarvestDate:estHarvestDate,
    estSales:estSales,
    amountMade:amountMade,
   actHarvestDate:actHarvestDate,
   estReturns:estReturns,
  actReturns:actReturns,

   }

console.log("OUR INITIAL INPUT OBJECT IS--->",inputObject)

   const finalObject = 
   farmerInFocus.inputs && farmerInFocus.inputs.length === 0 ?

    {
      ...farmerInFocus,
      inputs:[{...inputObject,id:uuidv4()}]
    }

   :
   {
   ...farmerInFocus,
    inputs:farmerInFocus.inputs.map((item,index)=>(item.id === inputToUpdateInFocus.id ?inputObject:item ))
   }



   
 

 // const handleChange1 = (promptKey) => (e) => {
 //   setFormValues1({
 //     ...formValues1,
 //     [promptKey]: e.target.value,
 //   });
//
 //   console.log("INPUT OBJECT--->",inputObject)
 //  console.log("FORM VALUES 1 --->",formValues1)
 // };

 // const handleChange2 = (promptKey) => (e) => {
 //   setFormValues2({
 //     ...formValues2,
 //     [promptKey]: e.target.value,
 //   });
//
 //   console.log("INPUT OBJECT--->",inputObject)

  // console.log("FORM VALUES 2 --->",formValues2)
  //};



  

 // const handlePromptChange = (id, newPrompt) => {
 //   
 //   const updatedFields = fields.map((field) => {
 //     if (field.id === id) {
 //       return { ...field, name: newPrompt }; 
 //     }
 //     return field; 
 //   });
//
 //   
 //   setFields(updatedFields);
 // };

  const submitResponse = (finalObject) =>{
    //console.log("PROCESS OF UPDATING ONE PARTICULAR RESPONSE HAS BEGUN--->",finalObject)
    setLoading(true)
   

   dispatch(updateFarmerSingleInput(finalObject))

  setTimeout( ()=>{setLoading(false) },2500)
 
  }
 

 

  const handleselectedFile = event => {
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    setFile(URL.createObjectURL(event.target.files[0]));
    setPicture(event.target.files[0].name);
};

 



 

  return (
    <>
      <form >


<>
 
     <Grid container xs={12} spacing={2} style={{width:"1100px",display:"flex", alignItems:"center",justifyContent:"center",gap:"4rem"}}>  
    
    
    {/* <Grid item xs={10}style={{width:"900px",display:"flex",alignItems:"flex-end", justifyContent:"flex-start"}}>
          <Typography color="textPrimary" variant="h4" component="p" style={{ color: '#0A6054',position:"relative" }}>
            Form Fields
          </Typography>
      
  </Grid> */}
    



   { inputToUpdateInFocus ?
   
   <>

     <Grid item sm={5 }  xs={12} sx={{}} > 
       <Stack spacing={3}  sx={{marginTop:"-4.6rem",gap:"0.1rem",minHeight:"100%",paddingTop:"0rem", display:"flex", alignItems:"flex-start",justifyContent:"flex-start",marginLeft:{xs:"27.5rem",sm:"0rem"}}}  >
   



      
    


        <TextField
          key={"amountSpent"}
          label={"Amount Spent"}
          value={amountSpent}
          onChange={(e)=>{setAmountSpent(e.target.value)}}
          sx={{ color: 'black',maxWidth:{xs:"16rem",sm:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black' },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />



       <TextField
          key={"estHarvest Date"}
          label={"Est. Harvest Date"}
          value={estHarvestDate}
          onChange={(e)=>{setEstHarvestDate(e.target.value)}}
          sx={{ color: 'black',maxWidth:{xs:"16rem",sm:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black' },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />


  <TextField
          key={"estSales"}
          label={"Est. Sales"}
          value={estSales}
          onChange={(e)=>{setEstSales(e.target.value)}}
          sx={{ color: 'black',maxWidth:{xs:"16rem",sm:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black' },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />



      

        
  
      </Stack>
      </Grid> 
      
    
      <Grid item xs={12} sm={5}> 
       <Stack spacing={3}  sx={{minHeight:"100%",paddingTop:"0rem", display:"flex", alignItems:"flex-start",justifyContent:"flex-start",marginLeft:{xs:"27.5rem",sm:"0rem"}}}  >
       
      


       

       <TextField
          key={"amountMade"}
          label={"Amount Made"}
          value={amountMade}
          onChange={(e)=>{setAmountMade(e.target.value)}}
          sx={{ color: 'black',maxWidth:{xs:"16rem",sm:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black' },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />

  <TextField
          key={"actHarvestDate"}
          label={"Act. HarvestDate"}
          value={actHarvestDate}
          onChange={(e)=>{setActHarvestDate(e.target.value)}}
          sx={{ color: 'black',maxWidth:{xs:"16rem",sm:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black' },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />


<TextField
          key={"estReturns"}
          label={"Est. Returns"}
          value={estReturns}
          onChange={(e)=>{setEstReturns(e.target.value)}}
          sx={{ color: 'black',maxWidth:{xs:"16rem",sm:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black' },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />


<TextField
          key={"actReturns"}
          label={"Act. Returns"}
          value={actReturns}
          onChange={(e)=>{setActReturns(e.target.value)}}
          sx={{ color: 'black',maxWidth:{xs:"16rem",sm:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black' },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />


        
  
      </Stack>
      </Grid> 

   </>   
   
     :

     <Grid item xs={12} > 
       <Stack spacing={3} >
       
     No Input Selected.
  
      </Stack>
      </Grid> 
  }
     
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

   




{ 
<>
   {/*

     <Grid container xs={12} spacing={2} style={{width:"1100px",display:"flex", alignItems:"center",justifyContent:"center",gap:"4rem"}}>  
      
     <Grid item xs={12} > 
       <Stack spacing={3} >
       
        

       <label for="Produce" style={{marginBottom:"0.6rem",position:"relative",left:"5%"}}> Produce</label>
       <textarea  name="Produce" rows={12} style={{width:"90%",margin:"0 auto",padding:"2rem",border:"1px solid lightgrey"}} value={additionalInfo}  onChange={(e) => setAdditionalInfo(e.target.value)} >

       </textarea>

      
        
      </Stack>
      </Grid> 

     
     
     
     
      </Grid> 
  */}


      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 5 }}>
     
      </Stack>
  
     
       <center>
     
      
       <LoadingButton 
        
        onClick={()=>{navigate(-1)}}
        size="large" type="button" variant="contained" disabled={loading} sx={{ width:"100%",maxWidth:{xs:"20rem",sm:"29rem"},color: '#21712E', border:"1px solid #21712E",backgroundColor: '#F2F4F7',borderRadius:"0.5rem",marginRight:"1rem",fontWeight:"400"}}>
       
        
       { "Back"}
      </LoadingButton>



      {<LoadingButton 
        
        onClick={()=>{ submitResponse(finalObject) }}
        size="large" type="button" variant="contained" disabled={loading} sx={{marginRight:{xs:"0rem",sm:"0rem",md:"0rem"},color: 'white',backgroundColor: '#0A6054',width:"100%",maxWidth:{xs:"20rem",sm:"29rem"},borderRadius:"0.5rem",fontWeight:"400"}}>
       
       {loading ? "Loading..." : "Submit"}
      </LoadingButton>}
     

      </center>

      
 </>

  }  


      </form>
    </>
  );
}
