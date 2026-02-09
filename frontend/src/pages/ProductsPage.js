import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, FormControl, Box, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMyGroups,fetchFarmersFromPage, filterFarmersByCrop, filterFarmersByLocation, filterFarmersByCropType, sectionFarmersFromPage } from 'src/redux/actions/group.action';
import { fetchUserData } from 'src/redux/actions/auth.action';
import { saveCurrentFarmersToDisplay,saveFilteredFarmers,saveCurrentLocationFilter,saveCurrentCropTypeFilter,saveCurrentCropFilter,saveTotalPagesFarmers } from 'src/redux/reducers/group.slice';

import { FaFilter } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";

import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';


import corn from 'src/assets/images/corn.jpeg';
import maize from 'src/assets/images/corn.jpeg';
import potato from 'src/assets/images/potato.jpeg';
import plantain from 'src/assets/images/plantain.jpeg';
import onion from 'src/assets/images/onion.jpeg'
import okra from 'src/assets/images/okra.jpeg'
import gombo from 'src/assets/images/gombo.jpeg'
import bergine from 'src/assets/images/bergine.jpeg'
import aubergine from 'src/assets/images/bergine.jpeg'
import eggplant from 'src/assets/images/bergine.jpeg'
import millet from 'src/assets/images/millet.jpeg'
import pepper from 'src/assets/images/pepper.jpeg'
import yam from 'src/assets/images/yam.jpeg'
import cocoyam from 'src/assets/images/cocoyam.jpeg'
import cabbage from 'src/assets/images/cabbage.jpeg'
import tomato from 'src/assets/images/tomato.jpeg'
import carrot from 'src/assets/images/carrot.jpg'


//animals/produce
import chicken from 'src/assets/images/chicken.jpeg'
import sheep from 'src/assets/images/sheep.jpeg'
import cow from 'src/assets/images/cow.jpeg'
import donkey from 'src/assets/images/donkey.jpeg'
import goat from 'src/assets/images/goat.jpeg'
import horse from 'src/assets/images/horse.jpeg'


/*import farmer1 from 'src/assets/images/jeansfarmer.jpeg';
import farmer2 from 'src/assets/images/farmer2.jpeg';
import farmer3 from 'src/assets/images/farmer3.jpeg';
import farmer4 from 'src/assets/images/farmer4.jpeg';
import farmer5 from 'src/assets/images/farmer5.jpeg';
import farmer6 from 'src/assets/images/farmer6.jpeg';
import farmer7 from 'src/assets/images/farmer7.jpeg';
import farmer8 from 'src/assets/images/farmer8.jpeg';
import farmer9 from 'src/assets/images/farmer9.jpeg';
import farmer10 from 'src/assets/images/farmer10.jpeg';*/

import noimage from 'src/assets/images/no-image.jpg';



import FarmerStatsLong from 'src/components/home/farmer-stats-long';
import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';
import FarmerStatsGpsLong from 'src/components/home/farmer-stats-gps-long';
import { FaPlus } from 'react-icons/fa6';
import ProduceStatsLong from 'src/components/home/produce-stats-long';
import ProduceStatsDetailedLong from 'src/components/home/produce-detailed-stats-long';


export default function ProductsPage() {
  const theme = useTheme();
  const { page } = useParams();
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);


 
  useEffect(()=>{

   if(!user ){
    navigate('/login')
   }

  },[user])



  const { 
    myGroups,
     isLoading,
     currentFarmersToDisplay,
    totalPagesFarmers,
    allFarmers,
    allProducts,
    filteredFarmers,
    currentLocationFilter,
    currentCropFilter,
    currentCropTypeFilter 
  } = useSelector((state) => state.group);

  //console.log("ALL PRODUCTS ON PRODUCTS PAGE IS--->",allProducts)
   
  //const { students } = useSelector((state) => state.student);


  const [selectedClass, setSelectedClass] = useState(/.*/ );
  const [selectedSection, setSelectedSection] = useState(/.*/ );
  const [selectedFilter, setSelectedFilter] = useState(''); /**not using regular expressions here */
  const [selectedLocation, setSelectedLocation] = useState(/.*/ );
  const [loadingPage,setLoadingPage] = useState(false)

  useEffect(()=>{
    setTimeout(()=>{
    setLoadingPage(true)
    }
    ,1500)
    },[])
    

 /* const forcedId =  []
  currentFarmersToDisplay.forEach((item,index)=>{
  
    forcedId.push({
      ...item,
      id:item.id ? item.id: item._id ? item._id: item.OriginalResponseId ? item.OriginalResponseId:item.name ? item.name: Math.random()
    })
      
  })
  console.log('FORCED ID IS-->',forcedId)*/

  const[farmersFromDB,setFarmersFromDB] = useState([])

  const farmer1 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863974/farmer8_l3ewpm.png"
  const farmer2 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863990/farmer2_icjojq.png"
  const farmer3 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863997/farmer5_ip0m4q.png"
  const farmer4 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863998/farmer7_zsvpiv.png"
  const farmer5 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863996/farmer3_ngfl1i.png"
  const farmer6 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866493/farmer1_ijfjvu.png"
  const farmer7 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866568/farmer10_bnpjqc.png"
  const farmer8 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866571/farmer9_l6pqj5.png"
  const farmer9 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866573/farmer4_mp8ffo.png"
  const farmer10 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866573/farmer6_fnwxhj.png"

const ProduceStatsArray = 

[
  {id:0, produce:"mai",quantity:0,name:"Maize",harvestDate:"14/06/2025",harvestQuantity:"2.7",price:"70"},
{id:1, produce:"tomat",quantity:0,name:"Tomato",harvestDate:"15/06/2025",harvestQuantity:"2.8",price:"120"},
{id:2, produce:"potato",quantity:0,name:"Potato",harvestDate:"16/06/2025",harvestQuantity:"2.3",price:"160"},
{id:3, produce:"Onion",quantity:0,name:"Onion",harvestDate:"18/06/2025",harvestQuantity:"2.4",price:"130"},
{id:4, produce:"yam",quantity:0,name:"Yam",harvestDate:"19/06/2025",harvestQuantity:"2.6",price:"90"},
{id:5, produce:"beans",quantity:0,name:"Beans",harvestDate:"20/06/2025",harvestQuantity:"2.6",price:"110"},
]

const imageArray = [
 
  {image:maize,imageName:"maize"},
  {image:tomato,imageName:"tomato"},
  {image:potato,imageName:"potato"},
  {image:onion,imageName:"onion"},
  {image:sheep,imageName:"sheep"},
  {image:onion,imageName:"onion"},
  {image:gombo,imageName:"gombo"},
  {image:millet,imageName:"millet"},
  {image:okra,imageName:"okra"},
  {image:cocoyam,imageName:"cocoyam"},
  {image:pepper,imageName:"pepper"},
  {image:pepper,imageName:"sweet pepper"},
  {image:pepper,imageName:"chilli pepper"},
  {image:bergine,imageName:"bergine"},
  {image:chicken,imageName:"chicken"},
  {image:cabbage,imageName:"cabbage"},
  {image:cow,imageName:"cow"},
  {image:donkey,imageName:"donkey"},
  {image:goat,imageName:"goat"},
  {image:horse,imageName:"horse"},
  {image:cow,imageName:"cow"},
  {image:cow,imageName:"corn"},
  {image:corn,imageName:"corn"},
  {image:carrot,imageName:"carrot"},
  {image:aubergine,imageName:"aubergine"},

  ]

  useEffect(() => {
    /*THIS USE EFFECT IS IMPORTANT TO ASSGIN AN ID SO MUI DATA GRID WILL ACCEPT THE DATA */
  const forcedId =  []
  let farmers = currentFarmersToDisplay
  const produceAndQuantity = [
   {id:0, produce:"mai",quantity:0,name:"Maize",image:maize,price:950},
 {id:1, produce:"tomat",quantity:0,name:"Tomato",image:tomato,price:15000},
 {id:2, produce:"potato",quantity:0,name:"Potato",image:potato,price:950},
 {id:3, produce:"Onion",quantity:0,name:"Onion",image:onion,price:10000},
 {id:4, produce:"mouton",quantity:0,name:"Sheep",image:sheep,price:950},
 {id:5, produce:"oignon",quantity:0,name:"Oignon",image:onion,price:1000},
 
 {id:6, produce:"gumbo",quantity:0,name:"Gumbo",image:gombo,price:950},
 {id:7, produce:"millet",quantity:0,name:"Mllet",image:millet,price:950},
 {id:8, produce:"Okra",quantity:0,name:"Okra",image:okra,price:1000},
 {id:9, produce:"cocoyam",quantity:0,name:"Cocoyam",image:cocoyam,price:950},
 {id:10, produce:"pepper",quantity:0,name:"Pepper",image:pepper,price:1500},
 {id:11, produce:"bergine",quantity:0,name:"Aubergine",image:bergine,price:1200},
  
 {id:12, produce:"ulet",quantity:0,name:"Poulet",image:chicken,price:950},
 {id:13, produce:"cabbage",quantity:0,name:"Cabbage",image:cabbage,price:950},
 {id:14, produce:"vache",quantity:0,name:"Vache",image:cow,price:950},
 
 {id:15, produce:"âne",quantity:0,name:"Donkey",image:donkey,price:950},
 {id:16, produce:"chiévres",quantity:0,name:"Chievres",image:goat,price:950},
 {id:17, produce:"cheval",quantity:0,name:"Horse",image:horse,price:950},
 {id:18, produce:"milk",quantity:0,name:"Milk",image:cow,price:950},
 {id:19, produce:"meat",quantity:0,name:"Meat",image:cow,price:950},
 {id:21, produce:"mang",quantity:0,name:"Mango",image:corn,price:950},
 {id:22, produce:"eggs",quantity:0,name:"Eggs",image:corn,price:950},
 {id:23, produce:"crabs",quantity:0,name:"Crabs",image:corn,price:950},
 {id:24, produce:"rico",quantity:0,name:"Apricots",image:corn,price:950},
 {id:25, produce:"riz",quantity:0,name:"Rice",image:corn,price:950},
 {id:26, produce:"egg plant",quantity:0,name:"Egg plant",image:bergine,price:1200},
 

  ];



   // Iterate through each farmer document, look at const above
   for (const farmer of farmers) {
    //console.log("treating a farmer now")
      // Determine the value of the "Produce" field by checking multiple fallback options
      const produce = farmer.produce || farmer.farmingCrop || farmer.what_crop_are_you_farming || farmer.crop_types || '';
      const produceItems = produce  ? (produce.includes(',') ? produce.split(',').filter((item)=>(item !== " "||item !=="and"||item !=="et"||item !==0||item !=="etc" )) : produce.split(' ').filter((item)=>(item !== " "||item !=="and"||item !=="et"||item !==0||item !=="etc" )))
      : [''];


      const priceArray = [
        { Onion: 10000 },
        { Oignon: 10000 },
        { tomat: 15000 },
        { bergine: 1200 },
        { Carrot: 500 },
        { pepper: 1500 },
        { poivron: 1500 },
        { Gombo: 1000 },
        { Okra: 1000 },
        { Piment: 5000 },
      ];

      
      // For each produce item, create a new row with farmer details
      produceItems.forEach((item,index) => {

        const matchingPriceObj = priceArray.find((priceObj) => {
          const key = Object.keys(priceObj)[0];
          const regex = new RegExp(key, "i"); // Case-insensitive match
          return regex.test(item);
        });


          forcedId.push({
              index:index,
              price:item ===  matchingPriceObj ? Object.values(matchingPriceObj)[0] || 950 : 950,
              id:farmer.id ? farmer.id: farmer._id ? farmer._id: farmer.OriginalResponseId ? farmer.OriginalResponseId:farmer.name ? farmer.name: Math.random(),
              farmerId: farmer.farmerId || '',
              firstName: farmer.firstName || '',
              lastName: farmer.lastName || '',
              location: farmer.location || '',
              age: farmer.age || '',
              familySize: farmer.family_size || farmer.familySize || '',
              noOfSpouse: farmer.noOfSpouse || '',
              noOfChildren: farmer.noOfChildren || '',
              governmentId: farmer.identification || farmer.government || farmer.governmentId || '',
              produce: item.trim(), // Add the produce item from the split
              farmSize: farmer.farm_size || farmer.farmSize ||item.size_of_farm || '',
              sale: farmer.productSoldTo || farmer.market || farmer.where_do_you_sell || '',
              problem: farmer.problem || farmer.challenges || '',
              quantity: farmer.quantity || farmer.harvest_size || farmer.harvestSize || farmer.production_level||'',
              organic: farmer.organicFarmingInterest || farmer.do_you_farm_organically_or_use_chemicals || '',
              chemicals: farmer.chemicals || '',
             
          });
      });
  } 


  

// Step 1: Collect unique produces
//forcedId.forEach((item) => {
//  let existingEntry = produceAndQuantity.find((entry) => entry.produce === item.produce);
//  
//  if (existingEntry) {
//    // Step 3: Aggregate the quantities for matching produce
//    existingEntry.quantity += typeof(item.quantity) === "number" 
//    ? item.quantity
//    : !isNaN(item.quantity.trim()) // Check if the string is just a number
//    ? Number(item.quantity.trim())
//    : /\d+/.test(item.quantity) && /(tons|tonnes)/i.test(item.quantity) 
//    ? item.quantity.match(/\d+/g).reduce((sum, num) => sum + Number(num), 0)
//    : 0 
//  } else {
//    // Step 2: Add new unique produce entry
//    produceAndQuantity.push({
//      id: item.id,  
//      produce: item.produce,
//
//      
//      quantity: typeof(item.quantity) === "number" 
//      ? item.quantity
//      : !isNaN(item.quantity.trim()) 
//      ? Number(item.quantity.trim())
//      : /\d+/.test(item.quantity) && /(tons|tonnes)/i.test(item.quantity)
//      ? item.quantity.match(/\d+/g).reduce((sum, num) => sum + Number(num), 0)
//      : 0
//    });
//  }
//});



// Iterate through each forcedId object
forcedId.forEach((item) => {
  // Check if the produce in forcedId matches any item in produceAndQuantity
  let matchingEntry = produceAndQuantity.find((entry) =>
    item.produce.toLowerCase().includes(entry.produce.toLowerCase()) // Case-insensitive check
  );

  if (matchingEntry) {
    // Update the quantity by adding the matching forcedId quantity
    matchingEntry.quantity +=  typeof(item.quantity) === "number" //trying to extract numbers from the varied formats item.quantity may come in
    ? item.quantity
    : !isNaN(item.quantity.trim()) // Check if the string is just a number
    ? Number(item.quantity.trim())
    : /\d+/.test(item.quantity) && /(ton|tons|tonnes)/i.test(item.quantity) // Check for numbers followed by "tons" or "tonnes"
    ? item.quantity.match(/\d+/g).reduce((sum, num) => sum + Number(num), 0)
    : 0 // If no numbers are found, assign 0
  }
});



//console.log("PRODUCE AND QUANTITY ARRAY IS HERE------>",produceAndQuantity);


  {/*
 "Mai"
 "Tomat"
 "Potato"
 "Onion"
 "mouton"
 "Oignon"
 
 "gumbo"
 "Millet"
 "Okra"
 "Cocoyam"
 "Pepper"
 "bergine"
  
 "ulet"
 "Cabbage"
 "vache"
 
 "âne"
 "chiévres"
 "cheavel"
*/}


  //setFarmersFromDB(produceAndQuantity.filter((item)=>(item.quantity > 0)))

setFarmersFromDB(allProducts.map((product)=>({...product,id:product._id,image: imageArray.filter((item)=>(item.imageName.includes(product.name.toLowerCase())))?imageArray.filter((item)=>(item.imageName.includes(product.name.toLowerCase())))[0] && imageArray.filter((item)=>(item.imageName.includes(product.name.toLowerCase() )))[0].image :corn    })))

  }, [currentFarmersToDisplay,allProducts])






//useEffect(()=>{
//  /**THIS USE EFFECT IS FOR INITIAL LOAD, USUALLY AFTER LOGIN, WITHOUT HAVING SELECTED A PAGE */
//if(!page){
//  dispatch(sectionFarmersFromPage(1,allFarmers,filteredFarmers,"farmers"))
//}
//else{
//  dispatch(sectionFarmersFromPage(page,allFarmers,filteredFarmers,"farmers"))
//}
//
//
//
//},[page,selectedClass,selectedLocation,selectedSection])




useEffect(()=>{
  /**THIS USE EFFECT IS TO CLEAR UP FILTERS ANYTIME THE PAGE IS RELOADED, FOR A FRESH START */
  /**THIS USE EFFECT HAS TO BE BELOW THE PAGE ONE SO THAT */
     
        // dispatch(sectionFarmersFromPage(1,[],allFarmers))
     return ()=>{
      dispatch(saveCurrentCropTypeFilter(/.*/));
        dispatch(saveCurrentLocationFilter(/.*/));
        dispatch(saveCurrentCropFilter(/.*/));
      dispatch(saveCurrentFarmersToDisplay(allFarmers && allFarmers/*.slice(0,10)*/  ))
      dispatch(saveFilteredFarmers(allFarmers && allFarmers/*.slice(0,10)*/ ))
         dispatch(saveTotalPagesFarmers(Math.ceil(allFarmers.length/10)))
        // console.log('FARMERS CLEARED UP!');
      }
    },[])




  const [selectedOption, setSelectedOption] = useState('');
  const [activeButton, setActiveButton] = useState('viewStudents');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleViewStudentsClick = () => {
    setActiveButton('viewStudents');
 
  };

  const handleAddStudentsClick = () => {
    setActiveButton('addStudents');
  };

  return (
    <>

     <Helmet>
        <title> UfarmX </title>
      </Helmet>

{totalPagesFarmers < 0  || !loadingPage?
     <center style={{display:"flex",justifyContent:"center",alignItems:"center",height:"90vh"}}>
      <CircularProgress/>
     </center>
  :
      <Container maxWidth="xl" style={{scale:"0.9",position:"relative",top:"-5rem",left:"-2rem"}} >
      
   
     <Grid container spacing={2} alignItems="center" justifyContent="flex-start" style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",marginTop:"0.3rem",paddingRight:"0rem"}}> 
       
     <Grid item xs={12} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>

<div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}}>

<h1 style={{fontWeight:"500",marginBottom:"0rem"}}>Products</h1>
<div>View all products</div>

</div>

    
     <Button
   onClick={()=>{navigate('/dashboard/add-new-product')}}
         variant={'contained'}
         style={{
           minHeight: '50px',
           minWidth: '160px',
           backgroundColor: '#0A6054',
        

           color: 'white',
           border: '1px solid black',
           fontWeight:"400",
           fontSize:"1rem",
           borderRadius: '5px',
           marginRight: '12px',
         }}
         
       >
        <FaPlus   style={{marginRight:"0.1rem"}}/>
        New Product
       </Button>
      


</Grid>


       {/*
          <Button
              onClick={()=>{navigate('/dashboard/add-farmer')}}
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '180px',
                  backgroundColor: '#2DA840',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  marginRight: '4px',
                  position:"relative",
                  bottom:"4px"
                }}
               
              >
               Add Farmer
              </Button>
      

       <Grid item  style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",backgroundColor:"#F9F9F9",borderRadius:"2rem",padding:"0.5rem" }}>
            <Box sx={{ width: '100%'}}>
             

              <Button
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '180px',
                  backgroundColor: '#21712E',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  marginRight: '4px',
                }}
                
              >
               Filter
              </Button>

            </Box>

         
          </Grid>
     
      */}
          </Grid>
        
          

          <Grid container spacing={2} alignItems="center" justifyContent="flex-end" style={{display:"flex",alignItems:"flex-end",justifyContent:"flex-end",paddingRight:"0rem",position:"relative",left:"0.6rem"}}> 
          
          <Grid item  style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",borderRadius:"2rem",padding:"0.5rem" }}>
         
              <Box sx={{ width: '100%', marginTop: '0%'}}>
                <SmallCustomSearchBar   title={"Search Products"} />
              </Box>
           </Grid>

          
             <Grid item  style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",backgroundColor:"#F9F9F9",borderRadius:"2rem",padding:"0.5rem" }}>
             

               <Box sx={{ width: '100%'}}>
            
                 <Button
                   variant={'contained'}
                   style={{
                     minHeight: '50px',
                     minWidth: '140px',
                    // backgroundColor: '#21712E',
                      backgroundColor: '#FFFFFF',

                     color: 'black',
                     border: '1px solid black',
                     fontWeight:"400",
                     fontSize:"1.3rem",
                     borderRadius: '5px',
                     marginRight: '4px',
                   }}
                   
                 >
                  <CiFilter  style={{marginRight:"0.5rem"}}/>
                  Filters
                 </Button>
   
               </Box>
   
            
             </Grid>



          </Grid>
          <br/>
          


          <Grid item xs={12} md={12} lg={12} >
           <div style={{background: 'white', padding: '10px',paddingLeft:"0",paddingRight:"0",marginTop:"-2.5rem",width:"100%"}}>

           
              
                {/**here 2 */}
                  <Grid container spacing={2} sx={{ padding: '10px'}}>
                  {/*<Grid item xs={3} sx={{mb: 0}}>
                <p style={{fontSize:"24px",fontWeight:"600",position:"relative",top:"-1.2rem",left:"2rem"}}>Farmers</p>
                 </Grid>*/}

               {
               
                 <Grid xs={2} item sx={{mb: 0}}>
             <FormControl sx={{ minWidth: 140, background: 'white' }}>
                  <Select
                    value={selectedLocation}
                    onChange={(e) => {setSelectedLocation(e.target.value); dispatch(filterFarmersByLocation(e.target.value,allFarmers,filteredFarmers,page,currentLocationFilter,currentCropFilter,currentCropTypeFilter ))  }}
                    displayEmpty
                    label=""
                    sx={{
                      height: 45,
                      minWidth: 140,
                      p: 1,
                    }}
                  >
                    <MenuItem value="">
                      Select Location
                    </MenuItem>
            
                    <MenuItem value={"Sénégal"}>Sénégal</MenuItem>
                    <MenuItem value={"Nigeria"}>Nigeria</MenuItem>
                    <MenuItem value={"Cameroon"}>Cameroon</MenuItem>
                    <MenuItem value={/.*/ }>Clear Filter</MenuItem>
                   
                  </Select>
                </FormControl>
              </Grid>
                }
               

      {  
                <Grid xs={2} item sx={{mb: 0}}>
             <FormControl sx={{ minWidth: 140, background: 'white' }}>
                  <Select
                    value={selectedClass}
                    onChange={(e) => {setSelectedClass(e.target.value);dispatch(filterFarmersByCropType(e.target.value,allFarmers,filteredFarmers,page,currentLocationFilter,currentCropFilter,currentCropTypeFilter)) }  }
                    displayEmpty
                    label=""
                    sx={{
                      height: 45,
                      minWidth: 140,
                      p: 1,
                    }}
                  >
                    <MenuItem value="">
                      Select Crop Type
                    </MenuItem>
                <MenuItem value={'Cash Crops'}>Cash Crops</MenuItem>
                <MenuItem value={'Forage Crops'}>Forage Crops</MenuItem>
                <MenuItem value={'Fibre Crops'}>Fibre Crops</MenuItem>
                <MenuItem value={'Oil Crops'}>Oil Crops</MenuItem>
                <MenuItem value={/.*/ }>
                      Clear Filter
                    </MenuItem>
               
                  </Select>
                </FormControl>
              </Grid>
             } 
           

        {   
            <Grid xs={2} item sx={{mb: 0}}>
            <FormControl sx={{ minWidth: 140, background: 'white' }}>
                 <Select
                   value={selectedSection}
                   onChange={(e) => {setSelectedSection(e.target.value) ; dispatch(filterFarmersByCrop(e.target.value,allFarmers,filteredFarmers,page,currentLocationFilter,currentCropFilter,currentCropTypeFilter))  } }
                   displayEmpty
                   label=""
                   sx={{
                     height: 45,
                     minWidth: 140,
                     p: 1,
                   }}
                 >
                   <MenuItem value="" disabled={true}>
                     Select Crop
                   </MenuItem>
                   <MenuItem value={/.*/ }>
                     Clear Filter
                   </MenuItem>
                   <MenuItem value={"Mai"}>Maize</MenuItem>
                   <MenuItem value={"Tomat"}>Tomato</MenuItem>
                   <MenuItem value={"Potato"}>Potato</MenuItem>
                   <MenuItem value={"Onion"}>Onions</MenuItem>
                   <MenuItem value={"mouton"}>Sheep</MenuItem>
                   <MenuItem value={"Oignon"}>Onions(French)</MenuItem>
                  
                   <MenuItem value={"gumbo"}>Gumbo</MenuItem>
                   <MenuItem value={"Millet"}>Millet</MenuItem>
                   <MenuItem value={"Okra"}>Okra</MenuItem>
                   <MenuItem value={"Cocoyam"}>Cocoyam</MenuItem>
                   <MenuItem value={"Pepper"}>Pepper</MenuItem>
                   <MenuItem value={"bergine"}>Aubergine</MenuItem>
                   
                   <MenuItem value={"ulet"}>Chicken</MenuItem>
                   <MenuItem value={"Cabbage"}>Cabbage</MenuItem>
                   <MenuItem value={"vache"}>Cow</MenuItem>
                  
                   <MenuItem value={"âne"}>Donkey </MenuItem>
                   <MenuItem value={"chiévres"}>Goat</MenuItem>
                   <MenuItem value={"cheavel"}>Horse</MenuItem>
        
        
        
               
                  
                 </Select>
               </FormControl>
             </Grid>
        
        }
            </Grid>

        
            {/*here */}



        { 
        
       farmersFromDB.length > 0 ?
          <ProduceStatsLong  farmers={farmersFromDB}/> 
          :
          <center style={{marginTop:"6rem"}}>
           No Products To Display
          </center>
          }
           </div>
           </Grid>
 
           


      </Container>





    }


    </>
  );
}
