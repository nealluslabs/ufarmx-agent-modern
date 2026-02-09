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
import { addNewDeposit, addProduceCrop, filterFarmersByName,filterProductsByName, submitNewResponse, updateFarmerInput, updateFormFields, updateProduceCrop } from 'src/redux/actions/group.action';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { makeStyles } from '@mui/styles/node';
import { saveProductInFocus } from 'src/redux/reducers/group.slice';
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


export default function AddNewProductForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  
  const [loading, setLoading] = useState(false);



  const { myGroups, isLoading,
    currentFarmersToDisplay,
    currentAgentsToDisplay,
    totalPagesFarmers,
    allFarmers,
    allProducts,
    currentProductsToDisplay,
    filteredFarmers,
    currentDepositsToDisplay,
    productInFocus,
    formInFocus,
    loggedInAgent
   } = useSelector((state) => state.group);


  const {user} =useSelector((state) => state.auth);

 useEffect(() => {
 
  if(!user){
   navigate('/login')
  }
  
  }, [user])
  //console.log("Form IN FOCUS WHILE FILLING------->",formInFocus)
 
  //console.log("logged in agent------->",loggedInAgent)

  //console.log("product in focus------->",productInFocus)

  const [age, setAge] = useState('');

  
  


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

  const [selectedFarmer,setSelectedFarmer] = useState('')

  const [fields, setFields] = useState(formInFocus && formInFocus.fields);

  


   // Split the array into two halves
   const middleIndex = Math.ceil(formInFocus && formInFocus.fields &&  formInFocus.fields.length / 2);
   const firstHalf = formInFocus && formInFocus.fields && formInFocus.fields.slice(0, middleIndex);
   const secondHalf = formInFocus && formInFocus.fields && formInFocus.fields.slice(middleIndex);
 
   // Create form objects for each half
   const initialFormObject1 =firstHalf && firstHalf.reduce((acc, curr) => {
     acc[curr.prompt] = ''; // Initialize each value to an empty string
     return acc;
   }, {});
 
   const initialFormObject2 =secondHalf && secondHalf.reduce((acc, curr) => {
     acc[curr.prompt] = ''; // Initialize each value to an empty string
     return acc;
   }, {});
 
   // State to manage form values for both halves
   const [formValues1, setFormValues1] = useState(initialFormObject1);
   const [formValues2, setFormValues2] = useState(initialFormObject2);

   
  const modifiedFirstHalf = formValues1 && Object.keys(formValues1)

 modifiedFirstHalf && modifiedFirstHalf.shift()

 const [anchorEl, setAnchorEl] = useState(null);
 const [searchValue, setSearchValue] = useState("");



 const inputRef = useRef(null);
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    //dispatch(filterFarmersByName(event.target.value,allFarmers))

    dispatch(filterProductsByName(event.target.value,allProducts))
   
    setSelectedFarmer(event.target.value);
    setIsDropdownOpen(event.target.value.trim() !== ""); // Show dropdown when typing
  };


 // console.log("PRODUCT IN FOCUS--->",productInFocus)
  
  //console.log("CURRENT PRODUCE TO DISPLAY IS--->",currentProductsToDisplay)



  const handleItemClick = (farmer) => {
    console.log("ABOUT TO SAVE--->",productInFocus)
    
    setSelectedFarmer(farmer.name
      ? farmer.name
      : farmer.firstName && farmer.lastName
      ? `${farmer.firstName} ${farmer.lastName}`
      : farmer.firstName || farmer.lastName || "");

    setSelectedFarmer(farmer._id);
    setSearchValue(
      farmer.name
        ? farmer.name
        : farmer.firstName && farmer.lastName
        ? `${farmer.firstName} ${farmer.lastName}`
        : farmer.firstName || farmer.lastName || ""
    );
    dispatch(saveProductInFocus(farmer))
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

  const oldFinalObject = 
    
   {
    form_id:formInFocus &&formInFocus._id,
    agent_user_id:loggedInAgent?loggedInAgent.user_id:user?user && user.user_id && user.user_id:null,
    admin_user_id:formInFocus &&formInFocus.user_id,
    last_updated_by:formInFocus &&formInFocus.user_id,
    is_deleted:false,
    responseObject:{
      ...formValues1,
      ...formValues2,

    }
   }

 //  const inputObject =
 //  {
 //   id:uuidv4(),
 //   amountSpent:formValues1['Price'],
 //   estHarvest:formValues1['Est. Harvest'],
 //   estSales:formValues2['Est. Sales'],
 //   amountMade:formValues2['Amount Made'],
 //  actHarvest:formValues2['Act. Harvest'],
 //  estReturns:formValues2['Act. Returns'],
 // actReturns:formValues2['Act. Returns'],
//
 //  }

 const [productName,setProductName] = useState('')
 const [price,setPrice] = useState('')
 const [nextHarvestDate,setNextHarvestDate] = useState('')
 const [nextHarvestQuantity,setNextHarvestQuantity] = useState('')
 const [unitQuantity,setUnitQuantity] = useState('')

 const [teacherPassportFile,setTeacherPassportFile] = useState('')


   const handleTeacherPassportFile = (event) => {
    setTeacherPassportFile({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name,
    });
  };



 useEffect(()=>{
  
  setPrice(productInFocus.localPrice)
 setNextHarvestDate(productInFocus.nextHarvestDate)
setNextHarvestQuantity(productInFocus.nextHarvestQuantity)
setUnitQuantity(productInFocus.unitQuantity)


 },[productInFocus])

 console.log("PRODUCT IS LOOK HERE --->",productInFocus)

/**DONT DELETE THE USE EFFECT BELOW YOU NEED IT FOR FIRST ENTRY ONTO THIS PAGE */
 useEffect(()=>{

  setPrice()
 setNextHarvestDate()
setNextHarvestQuantity()
setUnitQuantity()


 },[])
/**DONT DELETE THE USE EFFECT ABOVE YOU NEED IT FOR FIRST ENTRY ONTO THIS PAGE */

   const finalObject = 
    
   {
   name:productName,
   unitQuantity:unitQuantity/*formValues1['Unit Quantity']*/,
   localPrice:price/*formValues1['Price']*/,
    nextHarvestDate:nextHarvestDate/*formValues2['Price(Base)']*/,
    nextHarvestQuantity:nextHarvestQuantity/*formValues2['Price(High)']*/,

   }



  const handleChange1 = (promptKey) => (e) => {
    setFormValues1({
      ...formValues1,
      [promptKey]: e.target.value,
    });

   // console.log("INPUT OBJECT--->",inputObject)
   console.log("FORM VALUES 1 --->",formValues1)
  };

  const handleChange2 = (promptKey) => (e) => {
    setFormValues2({
      ...formValues2,
      [promptKey]: e.target.value,
    });

   // console.log("INPUT OBJECT--->",inputObject)

  // console.log("FORM VALUES 2 --->",formValues2)
  };



  

  const handlePromptChange = (id, newPrompt) => {
    
    const updatedFields = fields.map((field) => {
      if (field.id === id) {
        return { ...field, name: newPrompt }; 
      }
      return field; 
    });

    
    setFields(updatedFields);
  };

  const submitResponse = (updatedFields) =>{
    //console.log("PROCESS BEGUN FOR UPDATING PRODUCE--->",updatedFields)
    setLoading(true)

let productFound = false
const nameToBeAdded = updatedFields.name && updatedFields.name

        const nameRegex = nameToBeAdded ? new RegExp(nameToBeAdded, 'i') : null;

allProducts.forEach((product)=>{

 // console.log("PRODUCT MATCH IS RUNNING-->")
      if( //CHECK EACH PRODUCT'S NAME FOR PRODUCT BEING ADDED
      product.otherNames &&   product.otherNames.some((item)=>(
        nameRegex.test(item)) 
      )
    
    ||
    nameRegex.test(product.name)
      ){
       //console.log("PRODUCT MATCH IS TRUE-->",product)
        productFound = true
      }
    }
)



//console.log("PRODUCT MATCH IS ENDED-->",productFound)
   
if(productFound){
  notifyErrorFxn("This product already exists, please change the product name")
  setLoading(false)
  return
}
   else{
   dispatch(addProduceCrop(updatedFields))
   }
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
    



   {
   
   <>

     <Grid item sm={fields && fields.length < 2 ?12:5 }  xs={12}  > 
       <Stack spacing={3}  sx={{minHeight:"100%",paddingTop:"0rem", display:"flex", alignItems:"flex-start",justifyContent:"flex-start",marginLeft:{xs:"27.5rem",sm:"0rem"}}}  >
   






{
  <Grid xs={2} item style={{marginBottom: "0rem",marginRight:"1rem",marginBottom:"0.8rem"}}  onBlur={() => setTimeout(()=>{setIsDropdownOpen(false)},200) }>
     <Box sx={{ position: "relative", minWidth: "27.2rem" }} >
     <TextField
        fullWidth
        key={"product Name"}
        label={"Product Name"}
        variant="outlined"
        value={productName}
        onChange={(e)=>{setProductName(e.target.value)}}
        //onFocus={() => setIsDropdownOpen(true)}
       
        placeholder=""
        sx={{ color: "black", maxWidth: { xs: "16rem", sm: "100%" } }}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          style: { height: "3rem", paddingLeft: "1rem", color: "black" },
        }}
        //inputRef={inputRef}
      />
      {/*isDropdownOpen  && (
           <Paper
          elevation={3}
          sx={{
            position: "absolute",
            width: "100%",
            maxHeight: 200,
            overflowY: "auto",
            mt: 1,
            zIndex: 10,
            background: "white",
            borderRadius: "5px",
          }}
        >
          {currentProductsToDisplay && currentProductsToDisplay.map((item) => (
            <Box
              key={item._id}
              sx={{
                padding: "10px",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
              onClick={() => handleItemClick(item)}
              tabIndex={0} // Allows blur detection
            >
              {item.name
                ? item.name
                : item.firstName && item.lastName
                ? `${item.firstName} ${item.lastName}`
                : item.firstName || item.lastName || ""}
            </Box>
          ))}
        </Paper>
        )*/}
     </Box>
</Grid>
}




{
      
    
<>

<TextField
          key={"price"}
          label={"Price"}
          value={price}
          onChange={(e)=>{setPrice(e.target.value)} /*handleChange1(promptKey)*/}
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
          key={"unit Quantity"}
          label={"Unit Quantity"}
          value={unitQuantity}
          onChange={(e)=>{setUnitQuantity(e.target.value)} /*handleChange1(promptKey)*/}
          sx={{ color: 'black',maxWidth:{xs:"16rem",sm:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black' },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />

{/*
<TextField
          key={promptKey}
          label={promptKey}
          value={productInFocus && productInFocus.nextHarvestDate?nextHarvestDate:"formValues1[promptKey]"}
          onChange={(e)=>{setNextHarvestDate(e.target.value)} }
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
          key={promptKey}
          label={promptKey}
          value={productInFocus && productInFocus.nextHarvestQuantity?nextHarvestQuantity:"formValues1[promptKey]"}
          onChange={(e)=>{setNextHarvestQuantity(e.target.value)} }
          sx={{ color: 'black',maxWidth:{xs:"16rem",sm:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black' },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        */}


</>

      }

        
  
      </Stack>
      </Grid> 
      
    
      <Grid item xs={12} sm={5}> 
       <Stack spacing={3}  sx={{position:"relative",top:"1.5rem",gap:"1.3rem",minHeight:"100%",paddingTop:"0rem", display:"flex", alignItems:"flex-start",justifyContent:"flex-start",marginLeft:{xs:"27.5rem",sm:"0rem"}}}  >
       
      


       {/*fields.slice(Math.floor(fields.length/2), fields.length   ).map((item) => (
        <TextField 
        style={{color:"black"}}
        InputLabelProps={{ shrink: true }} 
        InputProps={{ style:{height:"3rem",paddingLeft:"1rem",color:"black"}}}
        onChange={(e) => handlePromptChange(item.id, e.target.value)}
           key={item.prompt}
          label={item.prompt}
          value={item.name}
          variant="outlined"
        />
      ))*/}



       
{
      
<>
<TextField
          key={"next Harvest Date"}
          label={"Next Harvest Date"}
          value={nextHarvestDate}
          onChange={(e)=>{setNextHarvestDate(e.target.value);/*console.log("NEXT HARVEST DATE-->",e.target.value)*/ } /*handleChange1(promptKey)*/}
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
          key={"next Harvest Quantity"}
          label={"Next Harvest Quantity"}
          value={nextHarvestQuantity}
          onChange={(e)=>{setNextHarvestQuantity(e.target.value);/*console.log("NEXT HARVEST QUANTITY-->",e.target.value)*/} /*handleChange1(promptKey)*/}
          sx={{ color: 'black',maxWidth:{xs:"16rem",sm:"100%"} }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black' },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />



<span style={{position:"relative",top:"-2.5rem"}}>
<TextField
          key={"product image"}
          label={"Product Image"}
          value={teacherPassportFile.selectedFileName}
          placeholder={"click to select an image"}
         // onChange={(e)=>{setNextHarvestQuantity(e.target.value);console.log("NEXT HARVEST QUANTITY-->",e.target.value)} }
         // sx={{ color: 'black',maxWidth:{xs:"30rem",sm:"100%"} }}
          style={{minWidth:"100%"}}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '4rem', paddingLeft: '1rem', color: 'black' },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />


           
              <input type="file" style={{ display: 'block',opacity:"0",position:"absolute",height:"3rem",width:"16rem",top:"0.75rem" }} onChange={handleTeacherPassportFile} />
   </span>   
       
</>
     }


        
  
      </Stack>
      </Grid> 

   </>   
   
   
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
