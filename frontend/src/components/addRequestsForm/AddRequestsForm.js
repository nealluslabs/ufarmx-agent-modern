import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Grid, Button, Avatar, FormControl, MenuItem, Select, Typography, Box, Menu,Paper} from '@mui/material';
import {  LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';

// components
import Iconify from '../iconify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signup, uploadImage } from 'src/redux/actions/auth.action';
import { addNewDeposit, addRequest, filterFarmersByName, filterProductsByName, updateFarmerInput, updateFormFields } from 'src/redux/actions/group.action';
// import { notifySuccessFxn } from 'src/utils/toast-fxn';
import { makeStyles } from '@mui/styles/node';
import { saveFarmerInFocus,clearFarmerInFocus } from 'src/redux/reducers/group.slice';
import { saveProductInFocus } from 'src/redux/reducers/group.slice';
// import uuidv4 from 'src/chat-src/utils/uuidv4';



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


export default function FarmersCreditAnalysisFormTwo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles(); 

 
  const { user } = useSelector((state) => state.auth);
 
  useEffect(()=>{

   if(!user ){
    navigate('/login')
   }

  },[user])
  

  useEffect(()=>{
  dispatch(clearFarmerInFocus())
  },[])


  
  const [loading, setLoading] = useState(false);



  const { myGroups, isLoading,
    currentFarmersToDisplay,
    currentAgentsToDisplay,
    totalPagesFarmers,
    allFarmers,
    allProducts,
    allRetailerProducts,
    productInFocus,
    farmerInFocus,
    formInFocus,
    loggedInAgent
   } = useSelector((state) => state.group);


 
  //console.log("Form IN FOCUS WHILE FILLING------->",formInFocus)
 
  //console.log("logged in agent------->",loggedInAgent)

  //console.log("farmer in focus------->",farmerInFocus)
  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [invoiceFile, setInvoiceFile] = useState({selectedFile: [], selectedFileName: []});

  const [file, setFile] = useState();
  const [invoiceName, setInvoiceName] = useState();

  const [picture, setPicture] = useState('');
  
  
  
  const handleselectedFile = event => {
  setSelectedFile({
  selectedFile: event.target.files[0],
  selectedFileName: event.target.files[0].name
  });
  setFile(URL.createObjectURL(event.target.files[0]));
  setPicture(event.target.files[0].name);
  };


  const handleInvoiceFile = event => {
    setInvoiceFile({
    selectedFile: event.target.files[0],
    selectedFileName: event.target.files[0].name
    });
    setInvoiceName(URL.createObjectURL(event.target.files[0]));
    
    };


  const [selectedFarmer,setSelectedFarmer] = useState('')
  const [selectedProduct,setSelectedProduct] = useState('')

  const [fields, setFields] = useState(formInFocus && formInFocus.fields);
const [formQuantity, setFormQuantity] = useState("");
const [farmersName, setFarmersName] = useState("");
const [formAmount, setFormAmount] = useState("");

//new logic to SELECT MULTIPLE PRODUCTS
const [selectedProducts, setSelectedProducts] = useState([]); 
// [{ productId, productName }]

const [formQuantities, setFormQuantities] = useState([]); 
// [{ productId, quantity }]

const parsePrice = (price) => {
  if (!price) return 0; // Return 0 if price is not defined

  // Remove "N" and commas, then parse the resulting string to an integer
  const cleanedPrice = price.replace(/[^\d.-]/g, ''); // Remove anything that's not a digit or a period (for decimals)
  return parseInt(cleanedPrice, 10) || 0; // Parse as integer, default to 0 if parse fails
};


const handleProductItemClick = (product) => {
  console.log("ABOUT TO SAVE--->", product);

  const price = parsePrice(product.localPrice || product.price);

  // 1️⃣ Check if product is already in selectedProducts or formQuantities
  const isProductInSelected = selectedProducts.some(p => p.productId === product._id);
  const isProductInFormQuantities = formQuantities.some(q => q.productId === product._id);

  // If the product is not already in selectedProducts or formQuantities
  if (!isProductInSelected && !isProductInFormQuantities) {

    // 2️⃣ Add to selectedProducts array
    setSelectedProducts(prev => [
      ...prev,
      {
        productId: product._id,
        productName: product.name || "",
        productPrice: price
      }
    ]);

    // 3️⃣ Add to formQuantities array with default quantity 1
    setFormQuantities(prev => [
      ...prev,
      {
        productId: product._id,
        quantity: 1,  // Default quantity for new products
        productPrice: price
      }
    ]);

    // 4️⃣ Update Total Amount — Add price * 1 for the new product
    setFormAmount(prev => Number(prev || 0) + price);

  } else {
    // Log a message if product is already added (optional)
    console.log("Product already selected or quantity already set.");
  }

  // 5️⃣ UI cleanup + search field update
  setSearchProductsValue(product.name || "");
  dispatch(saveProductInFocus(product));

  // 6️⃣ Close the dropdown
  setIsProductDropdownOpen(false);
};




   // Split the array into two halves
   const middleIndex = Math.ceil(formInFocus && formInFocus.fields &&  formInFocus.fields.length / 2);
   const firstHalf = formInFocus && formInFocus.fields && formInFocus.fields.slice(0, middleIndex+1);
   const secondHalf = formInFocus && formInFocus.fields && formInFocus.fields.slice(middleIndex+1);
 
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
 modifiedFirstHalf && modifiedFirstHalf.shift()
 modifiedFirstHalf && modifiedFirstHalf.shift()
 modifiedFirstHalf && modifiedFirstHalf.shift()

 const [anchorEl, setAnchorEl] = useState(null);
 const [searchValue, setSearchValue] = useState("");
 const [searchProductsValue, setSearchProductsValue] = useState("");


 const [randomVal, setRandomVal] = useState(0);



 const inputRef = useRef(null);
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    dispatch(filterFarmersByName(event.target.value,allFarmers))
    setSelectedFarmer(event.target.value);
    setIsDropdownOpen(event.target.value.trim() !== ""); // Show dropdown when typing
  };
  const handleInputChange2 = (event) => {
    setSearchProductsValue(event.target.value);
    dispatch(filterProductsByName(event.target.value,allRetailerProducts))
    setSelectedProduct(event.target.value);
    setIsProductDropdownOpen(event.target.value.trim() !== ""); // Show dropdown when typing
  };
console.log('all Retailer Products==========>>>>>>>>',allRetailerProducts)
console.log('filterProductsByName============>>>>>>>>>>',filterProductsByName)

 // console.log("FARMER IN FOCUS--->",farmerInFocus)
  

  const handleItemClick = (farmer) => {
    //console.log("ABOUT TO SAVE--->",farmerInFocus)
    
    setSelectedFarmer( farmer.name
      ? farmer.name
      : farmer.firstName && farmer.lastName
      ? `${farmer.firstName} ${farmer.lastName}`
      : farmer.firstName || farmer.lastName || "");
    setFarmersName( farmer.name
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




  const handleDeleteSelectedProduct = (productId) => {

    // 1️⃣ Get the price & quantity of product being removed
    const qtyObj = formQuantities.find(q => q.productId === productId);
    if (qtyObj) {
      const removeAmount = qtyObj.productPrice * Number(qtyObj.quantity || 0);
  
      // 2️⃣ Subtract from total
      setFormAmount(prev => Math.max(0, Number(prev) - removeAmount));
    }
  
    // 3️⃣ Remove from selectedProducts
    setSelectedProducts(prev =>
      prev.filter(p => p.productId !== productId)
    );
  
    // 4️⃣ Remove from formQuantities
    setFormQuantities(prev =>
      prev.filter(q => q.productId !== productId)
    );
  };
  


  const handleCreateRequest = async () => {
  if (!farmerInFocus || !productInFocus|| selectedProducts && !selectedProducts.length) {
    alert("Select farmer and product first!");
    return;
  }

  const requestPayload = {
    totalAmount: formAmount,
    //unitQuantity: formQuantity,
    farmerName: farmersName,
    phone: farmerInFocus.phone?farmerInFocus.phone:farmerInFocus && farmerInFocus.phone_number?farmerInFocus.phone_number:farmerInFocus && farmerInFocus.phoneNumber && farmerInFocus.phoneNumber,
    locationName: farmerInFocus.locationName,
    products:selectedProducts &&  [...selectedProducts.map((item)=>(item.productId))],
    quantities:formQuantities && formQuantities,
    retailer_farmer_id: farmerInFocus.retailer_farmer_id,
    farmerId:farmerInFocus.farmerId,
    retailer_id:user && (user._id||user.id),
    name:user && (user.email||user.companyEmail),
    retailerEmail:user && (user.email||user.companyEmail),
    status: 'Pending',
    paymentDueDate:null
  };

// addRequest
  try {
    setLoading(true);
     dispatch(addRequest(requestPayload,selectedFile && selectedFile.selectedFile,invoiceFile && invoiceFile.selectedFile ));
     setTimeout(()=>{
      //RESET ALL VALUES TO ZERO EMPTY
     setSearchValue('')
     setSearchProductsValue('')

     dispatch(clearFarmerInFocus())

     setFormAmount('')
     setFormQuantities([])
     setSelectedProducts([])
    setSelectedFile({selectedFile: [], selectedFileName: []})
    setInvoiceFile({selectedFile: [], selectedFileName: []})
    
    }
      
      
      ,2000)
    // alert("Request successfully created!");
    setLoading(false);
  } catch (err) {
    setLoading(false);
    notifyErrorFxn("Error creating request", err);
    console.log("Error creating request:", err);
    // alert("Error creating request");
  }
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

  // const inputObject =
  // {
  //  id:uuidv4(),
  //  amountSpent:formValues1 && formValues1['Amount Spent'] && formValues1['Amount Spent'],
  //  estHarvestDate:formValues1 && formValues1['Est. Harvest'] && formValues1['Est. Harvest'],
  //  estSales:formValues2 && formValues2['Est. Sales'] && formValues2['Est. Sales'],
  //  amountMade:formValues2 &&formValues2['Amount Made'] && formValues2['Amount Made'],
  // actHarvestDate:formValues2 && formValues2['Act. Harvest'] && formValues2['Act. Harvest'],
  // estReturns:formValues2 && formValues2['Act. Returns'] && formValues2['Act. Returns'],
  //actReturns:formValues2 && formValues2['Act. Returns'] && formValues2['Act. Returns'] ,
//
  // }
//
//console.log("LOOK FOR INPUT OBJECT HERE --->",inputObject)

//   const finalObject = 
//    
//   {
//   ...farmerInFocus,
//    inputs:farmerInFocus && farmerInFocus.inputs?[...farmerInFocus.inputs,inputObject]:[inputObject]
//   }



   
 

  const handleChange1 = (promptKey) => (e) => {
    setFormValues1({
      ...formValues1,
      [promptKey]: e.target.value,
    });

   // console.log("INPUT OBJECT--->",inputObject)
   //console.log("FORM VALUES 1 --->",formValues1)
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
   // console.log("PROCESS BEGUN--->")
    setLoading(true)
   

   dispatch(updateFarmerInput(updatedFields))

  setTimeout( ()=>{setLoading(false) },2500)
 
  }
 


 
  const storeRandomNumber = () => {
    setLoading(true);
    const minDelay = 10000; // 10 seconds
    const maxDelay = 15000; // 15 seconds
    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    setTimeout(() => {
      navigate('/dashboard/credit-score')
      const min = 7.5;
      const max = 9.8;
      const random = Math.random() * (max - min) + min;
      const rounded = Math.round(random * 10) / 10;

      // Simulating storage
      setRandomVal(farmerInFocus && farmerInFocus.riskScore?farmerInFocus.riskScore:rounded);
      setLoading(false)
    }, delay);
  }


 

  return (
    <>
      <form >


<>
 
     <Grid container spacing={2} sx={{width: "100%", maxWidth: "1100px", display: "flex", alignItems: "center", justifyContent: "center", gap: {xs: "1rem", sm: "4rem"}, margin: "0 auto", padding: "0 1rem"}}>  
    
    
    {/* <Grid item xs={10}style={{width:"900px",display:"flex",alignItems:"flex-end", justifyContent:"flex-start"}}>
          <Typography color="textPrimary" variant="h4" component="p" style={{ color: '#0A6054',position:"relative" }}>
            Form Fields
          </Typography>
      
  </Grid> */}
    



   { 
   
   <>

     <Grid item xs={12} sm={fields && fields.length < 2 ? 12 : 5}> 
       <Stack spacing={3} sx={{
         minHeight: "100%",
         paddingTop: "0rem", 
         display: "flex", 
         alignItems: {xs: "center", sm: "flex-start"},
         justifyContent: "flex-start",
         marginLeft: {xs: "0rem", sm: "0rem"},
         marginTop:"5.8rem",
         width: "100%"
       }}  >
   

 {/* USE THIS WHEN U HAVE TO PUT DATE FIELD FOR DATE OF ARRIVAL
 promptKey === "Date d'Arrivée" ||promptKey === "Date of Arrival"  ?
      
        <TextField
        type="date"
          key={promptKey}
          label={promptKey}
          value={formValues1[promptKey]}
          onChange={handleChange1(promptKey)}
          sx={{ color: 'black',width:{xs:"16rem",sm:"100%"},"& .MuiInputBase-root": { height: '3rem', paddingLeft: '1rem' } }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '3rem', paddingLeft: '1rem', color: 'black' },
          }}
        />
        :*/}





{
  <Grid xs={12} item sx={{marginBottom: "0rem", marginRight: {xs: "0rem", sm: "1rem"}, marginBottom: "0rem", width: "100%"}}>
     <Box sx={{ position: "relative", width: "100%", minWidth: {xs: "auto", sm: "27.2rem"} }}>
     <TextField
        fullWidth
        variant="outlined"
        value={searchValue}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => setTimeout(()=>{setIsDropdownOpen(false)},300 )}
        //onBlur={handleBlur}
        placeholder="Search Farmer"
        sx={{ color: "black", width: "100%" }}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          style: { height: "3rem", paddingLeft: "1rem", color: "black", fontSize: "0.65rem", fontFamily: "Poppins" },
        }}
        inputRef={inputRef}
      />
      {isDropdownOpen  && (
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
          {currentFarmersToDisplay && currentFarmersToDisplay.slice(0,20).map((item) => (
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
        )}
     </Box>
</Grid>
}



{
  <Grid xs={12} item sx={{marginBottom: "0rem", marginRight: {xs: "0rem", sm: "1rem"}, marginBottom: "0rem", width: "100%"}}>
     <Box sx={{ position: "relative", width: "100%", minWidth: {xs: "auto", sm: "27.2rem"} }}>
     <TextField
        fullWidth
        variant="outlined"
        value={farmerInFocus && farmerInFocus.farmerId?farmerInFocus.farmerId:""}
      
        placeholder="Farmer ID"
        sx={{ color: "black", width: "100%" }}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          style: { height: "3rem", paddingLeft: "1rem", color: "black", fontSize: "0.65rem", fontFamily: "Poppins" },
        }}
        
      />
     
     </Box>
</Grid>
}

{
  <Grid xs={12} item sx={{marginRight: {xs: "0rem", sm: "1rem"}, marginBottom: "0rem", width: "100%"}}>
     <Box sx={{ position: "relative", width: "100%", minWidth: {xs: "auto", sm: "27.2rem"} }}>
     <TextField
        fullWidth
        variant="outlined"
        value={farmerInFocus && farmerInFocus.phone?farmerInFocus.phone:farmerInFocus && farmerInFocus.phone_number?farmerInFocus.phone_number:farmerInFocus && farmerInFocus.phoneNumber && farmerInFocus.phoneNumber?farmerInFocus.phoneNumber:""}
      
        placeholder="Phone Number"
        sx={{ color: "black", width: "100%" }}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          style: { height: "3rem", paddingLeft: "1rem", color: "black", fontSize: "0.65rem", fontFamily: "Poppins" },
        }}
        
      />
     
     </Box>
</Grid>
}




{
  <Grid xs={12} item sx={{marginBottom: "0rem", marginRight: {xs: "0rem", sm: "1rem"}, marginBottom: "0rem", width: "100%"}}>
     <Box sx={{ position: "relative", width: "100%", minWidth: {xs: "auto", sm: "27.2rem"} }}>
     <TextField
        fullWidth
        variant="outlined"
        value={farmerInFocus && farmerInFocus.locationName? farmerInFocus.locationName:farmerInFocus && farmerInFocus.location? farmerInFocus.location:""}
      
        placeholder="Location"
        sx={{ color: "black", width: "100%" }}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          style: { height: "3rem", paddingLeft: "1rem", color: "black", fontSize: "0.65rem", fontFamily: "Poppins" },
        }}
        
      />
     
     </Box>
</Grid>
}



{
    <Grid xs={12} item sx={{marginBottom: "0rem", marginRight: {xs: "0rem", sm: "1rem"}, width: "100%"}}>
     <Box sx={{ position: "relative", width: "100%", minWidth: {xs: "auto", sm: "27.2rem"} }}>

         <TextField
          key={"offer-letter"}
          label={" Upload Offer Letter"}
          //onChange={(e) => setFormAmount(e.target.value)}
          disabled
          value={selectedFile && selectedFile.selectedFileName}
          sx={{ color: 'black', width: "100%",position:"relative",top:"-0.8rem",
          '& .Mui-disabled': {
            WebkitTextFillColor: 'black', // ensures black text on disabled field
          },
           }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: "3rem", paddingLeft: "1rem", color: "black", fontSize: "0.65rem", fontFamily: "Poppins", WebkitTextFillColor: 'black' },
            
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />

          <input
          type="file"
          style={{ display: 'block',backgroundColor:"white",opacity:"0",width:"27.2rem",height:"3.6rem" ,position:"absolute",top:"-0.5rem"}}
          onChange={handleselectedFile}
          />



     </Box>
     </Grid>
}


{
    <Grid xs={12} item sx={{marginBottom: "0rem", marginRight: {xs: "0rem", sm: "1rem"}, width: "100%"}}>
     <Box sx={{ position: "relative", width: "100%", minWidth: {xs: "auto", sm: "27.2rem"} }}>

         <TextField
          key={"invoice"}
          label={" Upload Invoice"}
          //onChange={(e) => setFormAmount(e.target.value)}
          disabled
          value={invoiceFile && invoiceFile.selectedFileName}
          sx={{ color: 'black', width: "100%",position:"relative",top:"-0.8rem",
          '& .Mui-disabled': {
            WebkitTextFillColor: 'black', // ensures black text on disabled field
          },
           }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: "3rem", paddingLeft: "1rem", color: "black", fontSize: "0.65rem", fontFamily: "Poppins", WebkitTextFillColor: 'black' },
            
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />

          <input
          type="file"
          style={{ display: 'block',backgroundColor:"white",opacity:"0",width:"27.2rem",height:"3.6rem" ,position:"absolute",top:"-0.5rem"}}
          onChange={handleInvoiceFile}
          />



     </Box>
     </Grid>
}
  
      </Stack>
      </Grid> 

    
      <Grid item xs={12} sm={fields && fields.length < 2 ? 12 : 5}> 
       <Stack  sx={{
         position: "relative",
         top: {xs: "0rem", sm: "-1.5rem"},
         minHeight: "100%",
         paddingTop: "0rem", 
         display: "flex", 
         alignItems: {xs: "center", sm: "flex-start"},
         justifyContent: "flex-start",
         gap: "0.55rem",
         marginLeft: {xs: "0rem", sm: "0rem"},
         width: "100%",
         marginTop:"-6rem"
       }}  >

   {
  <Grid xs={12} item sx={{marginTop: "8rem", marginRight: {xs: "0rem", sm: "1rem"}, width: "100%"}}>
     <Box sx={{ position: "relative", width: "100%", minWidth: {xs: "auto", sm: "27.2rem"} }}>
     <TextField
        fullWidth
        variant="outlined"
        value={searchProductsValue}
        onChange={handleInputChange2}
        onFocus={() => setIsProductDropdownOpen(true)}
        onBlur={() => setTimeout(()=>{setIsProductDropdownOpen(false)},300 )}
        //onBlur={handleBlur}
        placeholder="Search Products"
        sx={{ color: "black", width: "100%" }}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          style: { height: "3rem", paddingLeft: "1rem", color: "black", fontSize: "0.65rem", fontFamily: "Poppins" },
        }}
        inputRef={inputRef}
      />
      {isProductDropdownOpen  && (
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
          {allRetailerProducts && allRetailerProducts.slice(0,10).map((item) => (
            <Box
              key={item.product_id}
              sx={{
                padding: "10px",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
              onClick={() => handleProductItemClick(item)}
              tabIndex={0} // Allows blur detection
            >
              {item.name
                ? item.name
                : item.name || ""}
            </Box>
          ))}
        </Paper>
        )}
     </Box>
</Grid>
}

  {
    <Grid xs={12} item sx={{marginBottom: "0rem", marginRight: {xs: "0rem", sm: "1rem"},  width: "100%"}}>
     <Box sx={{ position: "relative", width: "100%", minWidth: {xs: "auto", sm: "27.2rem"}, overflowY:"scroll",maxHeight:"200px",height:"200px",marginBottom:"0.5rem" }}>
    

   <p style={{fontSize:"0.8rem"}}>Products Selected </p>

{selectedProducts.map((product) => {
  const quantityObj = formQuantities.find(q => q.productId === product.productId);

  return (
    <Grid
      key={product.productId}
      xs={10.5}
      item
      sx={{ marginBottom: "1rem", marginRight: { xs: "0rem", sm: "1rem" }, width: "100%" }}
    >
      <Box sx={{ display: "flex", gap: "1rem", width: "100%" }}>
        
        {/* Product Name (readonly) */}
        <TextField
          label="Product"
          value={product.productName}
          InputProps={{
            readOnly: true,
            style: {
              height: "3rem",
              paddingLeft: "1rem",
              fontSize: "0.75rem"
            }
          }}
          sx={{ width: "60%" }}
          InputLabelProps={{ shrink: true }}
        />

        {/* Quantity Input + Delete Icon */}
        <Box sx={{ width: "40%", position: "relative" }}>
          
          {/* "X" Delete Icon */}
          <Box
            onClick={() => handleDeleteSelectedProduct(product.productId)}
            sx={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              background: "grey",
              color: "white",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              fontSize: "0.75rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              zIndex: 2,
              "&:hover": { background: "#d9363e" }
            }}
          >
            ×
          </Box>

          <TextField
  label="Quantity"
  value={quantityObj?.quantity || ""}
  onChange={(e) => {
    const newQty = Number(e.target.value || 0);
    const oldQty = Number(quantityObj?.quantity || 0);
    const price = Number(quantityObj?.productPrice || 0);

    const difference = newQty - oldQty;
    
    // 1️⃣ Update total amount using difference
    setFormAmount(prev => Number(prev) + (difference * price));

    // 2️⃣ Update quantity state
    setFormQuantities(prev =>
      prev.map(q =>
        q.productId === product.productId
          ? { ...q, quantity: newQty }
          : q
      )
    );
  }}
  InputProps={{
    style: {
      height: "3rem",
      paddingLeft: "1rem",
      fontSize: "0.75rem"
    }
  }}
  sx={{ width: "100%" }}
  InputLabelProps={{ shrink: true }}
/>

        </Box>

      </Box>
    </Grid>
  );
})}


     </Box>
     </Grid>
}


{
    <Grid xs={12} item sx={{marginBottom: "0rem", marginRight: {xs: "0rem", sm: "1rem"}, width: "100%"}}>
     <Box sx={{ position: "relative", width: "100%", minWidth: {xs: "auto", sm: "27.2rem"} }}>

<TextField
          key={"amount"}
          label={"Amount"}
          //onChange={(e) => setFormAmount(e.target.value)}
          disabled
          value={formAmount}
          sx={{ color: 'black', width: "100%",
          '& .Mui-disabled': {
            WebkitTextFillColor: 'black', // ensures black text on disabled field
          },
           }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: "3rem", paddingLeft: "1rem", color: "black", fontSize: "0.65rem", fontFamily: "Poppins", WebkitTextFillColor: 'black' },
            
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />
     </Box>
     </Grid>
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
       <Stack 
         direction={{ xs: "column", sm: "row" }} 
         spacing={2} 
         alignItems="center" 
         justifyContent="center"
         sx={{ width: "100%", maxWidth: "1100px", margin: "0 auto", padding: "0 1rem" }}
       >
      
       <LoadingButton 
        
        onClick={()=>{navigate(-1)}}
        size="large" type="button" variant="contained" disabled={loading} sx={{ 
          width: {xs: "100%", sm: "auto"},
          minWidth: {xs: "auto", sm: "12rem"},
          color: '#21712E', 
          border: "1px solid #21712E",
          backgroundColor: '#F2F4F7',
          borderRadius: "0.5rem",
          marginRight: {xs: "0rem", sm: "1rem"},
          marginBottom: {xs: "1rem", sm: "0rem"},
          fontWeight: "400"
        }}>
       
        
       { "Back"}
      </LoadingButton>



      {<LoadingButton 
        
        onClick={ handleCreateRequest }
        size="large" type="button" variant="contained" disabled={loading} sx={{
          marginRight: {xs: "0rem", sm: "0rem", md: "0rem"},
          color: 'white',
          backgroundColor: '#0A6054',
          width: {xs: "100%", sm: "auto"},
          minWidth: {xs: "auto", sm: "12rem"},
          borderRadius: "0.5rem",
          fontWeight: "400"
        }}>
       
       {loading ? "Loading..." : "Submit"}
      </LoadingButton>}
      </Stack>

 { /*    <TextField
  value={loading ? "Calculating..." : randomVal ? randomVal : "Eligibility"}
  sx={{
    maxWidth: { xs: "16rem", sm: "26rem" },
    marginTop: "32px",
    '& .MuiInputBase-root': {
      color: 'black',
      textAlign: 'center',
      justifyContent: 'center', // horizontally center text
    },
    '& .MuiInputBase-input': {
      textAlign: 'center',      // center input text
      padding: 0,
      height: '3rem',
      lineHeight: '3rem',
      color: 'black',
    },
    '& .Mui-disabled': {
      WebkitTextFillColor: 'black', // ensures black text on disabled field
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'gray', // optional: set border color if needed
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'black',
      opacity: 1,
    },
  }}
  InputLabelProps={{ shrink: true }}
  InputProps={{
    style: {
      height: '3rem',
      width: '26rem',
      margin: '29px auto',
      paddingLeft: '1rem',
      justifyContent: 'center', // horizontal alignment
    },
  }}
  variant="outlined"
  placeholder="Eligibility"
  fullWidth
  margin="normal"
  disabled
/> */}
     

      </center>

      
 </>

  }  


      </form>
    </>
  );
}
