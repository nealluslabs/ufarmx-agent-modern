import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Paper, Button, MenuItem, FormControl, Select, Box ,Stack, AppBar, Toolbar, IconButton, CircularProgress} from '@mui/material';
import { useEffect, useState } from 'react';
import { fCurrency, fNumber } from '../utils/formatNumber';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EmptyRowCard from 'src/components/home/empty-row-card';
import SearchIcon from '@mui/icons-material/Search';
import { fetchUserData } from 'src/redux/actions/auth.action';
// @mui
import { useTheme, styled } from '@mui/material/styles';

import HomeCoolersCard from 'src/components/home/home-coolers-card';
import CustomSearchBar from 'src/components/global/CustomSearchBar';
import DashboardCard from 'src/components/home/dashboard-card';



import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';
import AdditionalInfoCard from 'src/components/home/additional-info-card';
import CropDepositStats from 'src/components/home/crop-deposit-stats';
import CropStats from 'src/components/home/crop-stats';
import HarvestStats from 'src/components/home/harvest-stats';
import { saveFarmerInFocus } from 'src/redux/reducers/group.slice';


import defaultFarmerPic from 'src/assets/images/farmer10.jpeg';

import corn from 'src/assets/images/no-image.jpg';
import maize from 'src/assets/images/corn.jpeg';
import potato from 'src/assets/images/potato.jpeg';
import plantain from 'src/assets/images/plantain.jpeg';
import onion from 'src/assets/images/onion.jpeg'
import okra from 'src/assets/images/okra.jpeg'
import gombo from 'src/assets/images/gombo.jpeg'
import bergine from 'src/assets/images/bergine.jpeg'
import eggplant from 'src/assets/images/bergine.jpeg'
import millet from 'src/assets/images/millet.jpeg'
import pepper from 'src/assets/images/pepper.jpeg'
import yam from 'src/assets/images/yam.jpeg'
import cocoyam from 'src/assets/images/cocoyam.jpeg'
import cabbage from 'src/assets/images/cabbage.jpeg'
import tomato from 'src/assets/images/tomato.jpeg'




//animals/produce
import chicken from 'src/assets/images/chicken.jpeg'
import sheep from 'src/assets/images/sheep.jpeg'
import cow from 'src/assets/images/cow.jpeg'
import donkey from 'src/assets/images/donkey.jpeg'
import goat from 'src/assets/images/goat.jpeg'
import horse from 'src/assets/images/horse.jpeg'

import noimage from 'src/assets/images/no-image.jpg'
import CropDepositStatsLong from 'src/components/home/crop-deposit-stats-long';
import AgentCard from 'src/components/home/agent-card';
import { fetchAgentById,fetchAllProductsForRequestInFocus, fetchProductsForRequestInFocus } from 'src/redux/actions/group.action';
import InputStats from 'src/components/home/input-stats';
import RequestInfoCard from 'src/components/home/request-info-card';
import FakeProductsStats from 'src/components/home/fake-products-stats';
import FakePaymentsStats from 'src/components/home/fake-payments-stats';
import RequestInfoTwoCard from 'src/components/home/request-info-two-card';
import CreditHistoryRequestCard from 'src/components/home/credit-history-request-card';
import RequestProductCard from 'src/components/home/request-product-card';
import CustomToggleSwitchRequests from 'src/components/buttons/CustomToggleSwitchRequests';


const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const CHART_DATA = [50, 50];

export default function FarmerRequestPage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [cropDisplay, setCropDisplay] = useState("Crops"); 
  const [loadingPage,setLoadingPage] = useState(false);

  const [aiForm,setAiForm] = useState(false)

  const [activeButton, setActiveButton] = useState('Requests');


const handleFertilizersClick = () => {
setActiveButton('Requests');

};
const handleSeedsClick = () => {
setActiveButton('Credit');

};
 
 
  useEffect(()=>{

   if(!user ){
    navigate('/login')
   }

  },[user])


  useEffect(()=>{
    setTimeout(()=>{
    setLoadingPage(true)
    }
    ,1500)
    },[])


  const handleToggle = (isCrops) => {
    setCropDisplay(isCrops);
  };


  const { myGroups, isLoading,farmerInFocus,requestInFocus,agentInFocus,currentDepositsToDisplay,productsForRequestInFocus } = useSelector((state) => state.group);
  //const { students } = useSelector((state) => state.student);
  
  //console.log("PRODUCTS FOR THIS REQUEST IS-->",requestInFocus)


useEffect(()=>{

 if(requestInFocus.products && requestInFocus.products.length){
    dispatch(fetchProductsForRequestInFocus(requestInFocus.products))
 }


},[requestInFocus])


useEffect(()=>{

 setProductsForThisRequest(productsForRequestInFocus)

 //console.log("PRODUCTS FOR THIS REQUEST IS-->",productsForRequestInFocus)
 
 },[productsForRequestInFocus])
 



//console.log("PRODUCTS GOTTEN BACK FOR REQUEST IN FOCUS--->",productsForRequestInFocus)

  const [updatedInputs,setUpdatedInputs] = useState([])
  const [fakeHarvests,setFakeHarvests] =  useState([]);
  const [productsForThisRequest, setProductsForThisRequest] = useState(productsForRequestInFocus)




    useEffect(()=>{


      const inputsReplicated = farmerInFocus && farmerInFocus.inputs? farmerInFocus.inputs.map((item)=>(
        {_id:item._id,
          id:item.id,
          amountSpent:item.amountSpent,
          crop:"Maize",
          estHarvestDate:item.estHarvestDate,
          actHarvestDate:item.actHarvestDate && item.actHarvestDate,
          amountMade:item.amountMade,
          estReturns:item.estReturns,
          actReturns:item.actReturns,
          estSales:item.estSales && item.estSales,
          gain:true
        }
      )):[]


      if(farmerInFocus && farmerInFocus.inputs && farmerInFocus.inputs.length === 0){
  
      setUpdatedInputs([
        ...inputsReplicated,
        {id:"1",crop:"Maize",estSales:"$920",estHarvestDate:"11-10-2024",amountSpent:"$900",actHarvestDate:"11-11-2024",amountMade:"$992.51",estReturns:"11%",actual:"19%",actReturns:"19%",gain:true},
      ])
    }
    else{
      setUpdatedInputs([
        ...inputsReplicated
        /*{id:"1",crop:"Maize",estSales:"$920",estHarvestDate:"11-10-2024",amountSpent:"$900",actHarvestDate:"11-11-2024",amountMade:"$992.51",estReturns:"11%",actual:"19%",actReturns:"19%",gain:true},*/
      ])

    }
  
    },[farmerInFocus])
  
  


    useEffect(()=>{


      const harvestsReplicated = farmerInFocus && farmerInFocus.inputs? farmerInFocus.inputs.map((item)=>(
        {...item,
          harvestDate:item.harvestEnd?item.harvestEnd:" 04-12-2025"
        }
      )):[]


      if(farmerInFocus && !farmerInFocus.harvests||farmerInFocus && farmerInFocus.harvests &&  farmerInFocus.harvests.length === 0){
  
      setFakeHarvests([
        ...harvestsReplicated,
        {id:"1",cropName:"Maize",harvestQuantity:"2 tons",harvestStart:"09-08-2025", harvestEnd:"09-09-2025",harvestDate:"09-09-2025"},
      ])
    }
    else{
      setFakeHarvests([
        ...harvestsReplicated,
        /*{id:"1",crop:"Maize",estSales:"$920",estHarvestDate:"11-10-2024",amountSpent:"$900",actHarvestDate:"11-11-2024",amountMade:"$992.51",estReturns:"11%",actual:"19%",actReturns:"19%",gain:true},*/
      ])

    }
  
    },[farmerInFocus])
  


    
  
  const cropsStatic = [

    {id:"0S91dTHhu7t0Zc6645Gb",cropName:"Corn",cropType:"Cash Crops",lastHarvest:"50",harvestDate:"01-01-2024"},
    {id:"75LPiOJKwtndeC67o5d3",cropName:"Potato",cropType:"Cash Crops",lastHarvest:"50",harvestDate:"01-01-2024"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",cropName:"Plantain",cropType:"Cash Crops",lastHarvest:"30",harvestDate:"01-01-2024"}

  ]




  const cropDeposits = [
    {id:"0S91dTHhu7t0Zc6645Gb" ,cropName:"Corn",companyName:"Container #1",depositDate:"01-01-2024",lName:"Steven",earnings:"$90"},
    {id:"75LPiOJKwtndeC67o5d3",cropName:"Potato",companyName:"Container #2",depositDate:"01-01-2024",lName:"Kenneth",earnings:"$80"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",cropName:"Plantain",companyName:"Container #3",depositDate:"01-01-2024",lName:"Stones",earnings:"$70"},
    
  ]

  const fakeProducts = farmerInFocus && farmerInFocus.requests? 
   [...farmerInFocus.requests,{id:"8Gnbs3WPwJ7ZzzvHgORb",name:" ",quantity:"TOTAL",price:"96,000"}]:[  //price 96,000 gets replaced by my reduce function below

    {id:"0S91dTHhu7t0Zc6645Gb",name:"Knapsack Sprayer",quantity:"1",price:"50,000",},
    {id:"75LPiOJKwtndeC67o5d3",name:"Fertilizer",quantity:"1",price:"16,000"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",name:"Cassava Stems",quantity:"2",price:"30,000"},
    {id:"8Gnbs3WPwJ7ZzzvHgORb",name:" ",quantity:"TOTAL",price:"96,000"},

  ]


  fakeProducts.forEach((item, index, arr) => {
    if (item.quantity === "TOTAL") {
      const total = arr
        .slice(0, index) // take all items before TOTAL
        .reduce((sum, product) => {
          const numericPrice = parseInt(product.price && product.price.replace(/,/g, ""), 10);
          return sum + numericPrice;
        }, 0);
  
      // format back with commas
      item.price = total.toLocaleString();
    }
  });

  

  const fakePayments = farmerInFocus && farmerInFocus.repayments? 
   farmerInFocus.repayments:
  [
    {id:"0S91dTHhu7t0Zc6645Gb" ,date:"01-01-2025",method:"Cash",amount:"20,000"},
    {id:"75LPiOJKwtndeC67o5d3",date:"01-01-2025",method:"Cash",amount:"20,000"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",date:"01-01-2025",method:"Cash",amount:"20,000"},
    
    
  ]



  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');


  let updatedCropDeposits = []
 // console.log("crop deposits --->",currentDepositsToDisplay)
 // console.log("FARMER IN FOCUS IS --->",farmerInFocus && farmerInFocus)
 // console.log("CURRENT DEPOSITS TO DISPLAY--->",currentDepositsToDisplay.map((item)=>(item.nom_de_lagriculteur)))

  currentDepositsToDisplay.filter((item)=>( item.nom_de_lagriculteur.includes(farmerInFocus.firstName?farmerInFocus.firstName:farmerInFocus.name &&farmerInFocus.name ))).forEach((item,index)=>{

    updatedCropDeposits.push({
      ...item,
      id:item._id,
      quality:item.tat?item.tat:item.quality &&item.quality,
      cropName:item.type_de_culture?item.type_de_culture :item.product && item.product ,
      companyName: item.nom_de_lagriculteur?item.nom_de_lagriculteur :item.farmerName && item.farmerName,
      depositDate:item.date_darrive?item.date_darrive :item.dateOfArrival ?item.dateOfArrival: new Date(item.createdAt).toLocaleDateString(),
      earnings:item.quantit?item.quantit:0,
      photo:item.joindre_photo_1?item.joindre_photo_1:item.joindre_photo_2?item.joindre_photo_2:null,
      index:index

    })

  })


  const [farmersFromDB,setFarmersFromDB] =  useState([]);
 

  useEffect(()=>{
   
  dispatch(fetchAgentById(farmerInFocus && farmerInFocus.agent_user_id))
 // console.log("AGENT IN FOCUS IS-->",agentInFocus)

  },[farmerInFocus])

  useEffect(()=>{
   
 

    let farmersFromDBArray = [ ]
  
   
    farmerInFocus && farmerInFocus.crop_types ? farmerInFocus.crop_types.split(/\s+/)./*slice(0,3).*/forEach((item,index)=>{
   
      farmersFromDBArray.push(
      {id: index===0?"0S91dTHhu7t0Zc6645Gb":index===1?"75LPiOJKwtndeC67o5d3":index===2?"8Gnbs3WPwJ7ZzzvHgORs":Math.random(),
      cropName:item,
      cropType:"Cash Crops",
     lastHarvest:index===0?"20":index===1?"30":"50"
     ,harvestDate:"01-01-2024",
     harvestStart:"19-09-2025", //try to remove harvest start and harvest end once you have gotten real farmer harvest datas
     harvestEnd:"19-10-2025",
     image:  item.toLowerCase().includes("maize")?maize :
     item.toLowerCase().includes("potato")?potato :
     item.toLowerCase().includes("corn")?corn :
     item.toLowerCase().includes("gumbo")?gombo :
     item.toLowerCase().includes("okra")?okra :
     item.toLowerCase().includes("okro")?okra :
     item.toLowerCase().includes("tomat")?tomato :
     item.toLowerCase().includes("millet")?millet :
     item.toLowerCase().includes("yam")?yam :
     item.toLowerCase().includes("cocoyam")?cocoyam :
     item.toLowerCase().includes("onion")?onion :
     item.toLowerCase().includes("oignon")?onion :
     item.toLowerCase().includes("pepper")?pepper :
     item.toLowerCase().includes("bergine")?bergine :
     item.toLowerCase().includes("cabbage")?cabbage :
     corn
    }

      )

   })
    :
    farmerInFocus && farmerInFocus.produce ? farmerInFocus.produce.split(/\s+/).filter((plug)=>(plug !=="and"||plug !=="et" ))./*slice(0,3).*/forEach((item,index)=>{

      
      farmersFromDBArray.push(
        {id: index===0?"0S91dTHhu7t0Zc6645Gb":index===1?"75LPiOJKwtndeC67o5d3":index===2?"8Gnbs3WPwJ7ZzzvHgORs":Math.random(),
        cropName:item,
        cropType:"Cash Crops",
       lastHarvest:index===0?"20":index===1?"30":"50"
       ,harvestDate:"01-01-2024",
       harvestStart:"19-09-2025", //try to remove harvest start and harvest end once you have gotten real farmer harvest data
       harvestEnd:"19-10-2025",
       image:item.toLowerCase().includes("maize")?maize :
       item.toLowerCase().includes("corn")?corn :
       item.toLowerCase().includes("gumbo")?gombo :
       item.toLowerCase().includes("okra")?okra :
       item.toLowerCase().includes("okro")?okra :
       item.toLowerCase().includes("tomat")?tomato :
       item.toLowerCase().includes("millet")?millet :
       item.toLowerCase().includes("yam")?yam :
       item.toLowerCase().includes("cocoyam")?cocoyam :
       item.toLowerCase().includes("onion")?onion :
       item.toLowerCase().includes("oignon")?onion :
       item.toLowerCase().includes("pepper")?pepper :
       item.toLowerCase().includes("bergine")?bergine :
       item.toLowerCase().includes("cabbage")?cabbage :
       item.toLowerCase().includes("chicken")?chicken :
       item.toLowerCase().includes("ulet")?chicken :
       item.toLowerCase().includes("mouton")?sheep:
       item.toLowerCase().includes("vache")?cow :
       item.toLowerCase().includes("ane")?donkey :
       item.toLowerCase().includes("âne")?donkey :
       item.toLowerCase().includes("chiévres")?goat :
       item.toLowerCase().includes("chèvres")?goat :
       item.toLowerCase().includes("cheval")?horse :
       corn
      }
  
        )


  })
   :
   farmerInFocus && farmerInFocus.what_crop_are_you_farming ? farmerInFocus.what_crop_are_you_farming.split(/\s+/).filter((plug)=>(plug !=="and"||plug !=="et" ))./*slice(0,3).*/forEach((item,index)=>(


     
    farmersFromDBArray.push(
      {id: index===0?"0S91dTHhu7t0Zc6645Gb":index===1?"75LPiOJKwtndeC67o5d3":index===2?"8Gnbs3WPwJ7ZzzvHgORs":Math.random(),
      cropName:item,
      cropType:"Cash Crops",
     lastHarvest:index===0?"20":index===1?"30":"50",
      harvestDate:"01-01-2024",
      harvestStart:"19-09-2025",  //try to remove harvest start and harvest end once you have gotten real farmer harvest data
       harvestEnd:"19-10-2025",
      image:   item.toLowerCase().includes("maize")?maize :
      item.toLowerCase().includes("corn")?corn :
      item.toLowerCase().includes("gumbo")?gombo :
      item.toLowerCase().includes("okra")?okra :
      item.toLowerCase().includes("okro")?okra :
      item.toLowerCase().includes("tomat")?tomato :
      item.toLowerCase().includes("millet")?millet :
      item.toLowerCase().includes("yam")?yam :
      item.toLowerCase().includes("cocoyam")?cocoyam :
      item.toLowerCase().includes("onion")?onion :
      item.toLowerCase().includes("oignon")?onion :
      item.toLowerCase().includes("pepper")?pepper :
      item.toLowerCase().includes("bergine")?bergine :
      item.toLowerCase().includes("cabbage")?cabbage :
      corn
     
    }

      )


    ))
   :
   farmersFromDBArray = [ ...cropsStatic]


    setFarmersFromDB(farmersFromDBArray)

    //setFakeHarvests(farmerInFocus.harvests && farmerInFocus.harvests)
  
   // console.log("farmers from DB ARRAY, WHICH I AM USING TO POPULATE CROP TABLE IS-->",farmersFromDBArray)
  



  },[farmerInFocus])


function formatMongoDate(mongoDateStr) {
  const date = new Date(mongoDateStr);

  // Month names (short)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12; // Convert 0 -> 12

  return `${month} ${day} ${year} at ${hours}:${minutes} ${ampm}`;
}


  return (
    <>

      <Helmet>
        <title> UfarmX </title>
      </Helmet>

      {!loadingPage?
<center style={{display:"flex",justifyContent:"center",alignItems:"center",height:"90vh"}}>
<CircularProgress/>
</center>
:

      <Container style={{scale:"0.93",position:"relative",left:"-1rem",top:"-2.2rem",width:"97%"}} maxWidth="xl" onClick={()=>{setAiForm(false)}}>
        
        {/* <SearchBox style={{ width: '100%' }} /> */}


        <Typography variant="" sx={{color: 'lightgrey', fontSize: '14px' }}>
          
           <div style={{display:"flex",justifyContent:"center",flexDirection:"column",gap:"0.3rem"}}>    

         <span style={{color:"grey"}}>{farmerInFocus && farmerInFocus.farmer_id?`#${farmerInFocus.farmer_id}`:farmerInFocus && farmerInFocus._id?`#${farmerInFocus._id.slice(0,5)}`:" "}  </span>
      
         <span>
         {formatMongoDate(farmerInFocus.createdAt  && farmerInFocus.createdAt)}
          </span>
      
         </div>

                
        {/* Welcome {user?.firstName + " " + user?.lastName}🖐🏽 */}
        </Typography>
             
      
        <Grid container spacing={3}>

     
        <Grid container spacing={2} style={{marginTop:"2rem"}}>
           <div style={{ background: 'transparent', paddingLeft: '2rem',width:"104%",margin:"0 auto",position:"relative",left:"0rem" }}>
             {/*<RequestInfoCard data={farmerInFocus && farmerInFocus} headerOne={'Statistics'} headerTwo={'Profile'} value={''} type={'one'} image={farmerInFocus &&farmerInFocus.photo ?farmerInFocus.photo:farmerInFocus && farmerInFocus.take_a_picture ?farmerInFocus.take_a_picture:farmerInFocus && farmerInFocus.image?farmerInFocus.image:defaultFarmerPic} index={farmerInFocus && farmerInFocus.index} farmName={''} farmerName={farmerInFocus && farmerInFocus.farmerName?farmerInFocus.farmerName:farmerInFocus && farmerInFocus.firstName && farmerInFocus.lastName?farmerInFocus.firstName + " " + farmerInFocus.lastName:"Joe Thomas"} city={farmerInFocus.location?farmerInFocus.location:"Dakar, Senegal"} email={"default@gmail.com"} agentId={farmerInFocus && farmerInFocus.agentAddedId} farmerId={farmerInFocus && farmerInFocus.farmerId} phoneNumber={farmerInFocus && farmerInFocus.phone_number?farmerInFocus.phone_number:"+221 555-380-1000"} setAiForm={setAiForm} aiForm={aiForm}/> */}
            <RequestInfoTwoCard/>
            </div> 
          </Grid>


         <Grid container spacing={2} sx={{display:"none",background: '#FFFFFF', padding: '10px',width:"98.5%",margin:"0 auto",marginTop:"2rem",position:"relative",left:"-0.3rem"}}>
       
       {/**here 2 
         <Grid container spacing={2} sx={{ padding: '10px'}}>
         <Grid item xs={12} sx={{mb: 0,mt:0,padding:"1rem"}}>
       <p style={{fontSize: '19.23px',fontWeight:"300",position:"relative",top:"-1.7rem",left:"2rem"}}>Products & Payments Made</p>
        </Grid>


        <Grid item xs={12} sx={{mb: 0}}>
        
        <Box display="flex" position="relative" style={{position:"relative",top:"-4.2rem",left:"-1.4rem",backgroundColor:"#F5F5F5",width:"105%" }} mb={3}>
        
        <Box
          onClick={() => handleToggle("Crops")}
          sx={{
            padding: '10px 20px',
            fontSize: '19.23px',
            cursor: 'pointer',
            position:"relative",
            left:"2rem",
            color: cropDisplay === "Crops" ? 'green' : 'grey',
            fontWeight: cropDisplay  === "Crops" ? 'bold' : 'normal',
            transition: 'color 0.3s ease',
          }}
        >
          Products
        </Box>


        <Box
          onClick={() => handleToggle("Harvests")}
          sx={{
            padding: '10px 20px',
            fontSize: '19.23px',
            cursor: 'pointer',
            position:"relative",
            left:"2rem",
            color: cropDisplay === "Harvests" ? 'green' : 'grey',
            fontWeight: cropDisplay === "Harvests" ? 'bold' : 'normal',
            transition: 'color 0.3s ease',
          }}
        >
          Payments
        </Box>
     
     

       
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left:"2rem",
            height: '4px',
            backgroundColor: 'green',
            width: '7rem',
            
            transition: 'transform 0.3s ease',
            transform: cropDisplay ==="Crops" ? 'translateX(0)' :( cropDisplay ==="Harvests"? 'translateX(120%)':  cropDisplay ==="Crop Deposits"?'translateX(240%)':'translateX(360%)' ) ,
          }}
        >

        </Box>
       


      </Box>



        </Grid>
      
   
   </Grid>
   here */}


      {/*cropDisplay === "Crops" ? 
        <Grid item xs={12} md={12} lg={12} >
           <div style={{background: '#FFFFFF',  padding: '10px',marginTop:"-6.5rem"}}>
           <FakeProductsStats crops={fakeProducts}/> 
           </div>
           </Grid>

         :
       cropDisplay === "Harvests" ? 
        <Grid item xs={12} md={12} lg={12} >
           <div style={{background: '#FFFFFF',  padding: '10px',marginTop:"-6.5rem"}}>
          <FakePaymentsStats crops={fakePayments}/> 
           </div>
           </Grid>

          :
          cropDisplay === "Crop Deposits"?
           <Grid item xs={12} md={12} lg={12}  >
           <div style={{background: '#FFFFFF',  padding: '10px',marginTop:"-6.5rem"}}>
         {updatedCropDeposits.length ? <CropDepositStatsLong cropDeposits={updatedCropDeposits}/> 
         :
          "No Deposits for this farmer"
         
         }
           </div>
           </Grid>
           :
         
           <Grid item xs={12} md={12} lg={12}  >
           <div style={{background: '#FFFFFF',  padding: '10px',marginTop:"-6.5rem"}}>
         {updatedInputs.length ? <InputStats inputs={updatedInputs}/> 
         :
          "No Inputs for this farmer"
         
         }
           </div>
           </Grid>

        */} 
       
         </Grid>
          <div style ={{marginTop:"1rem",marginBottom:"1rem"}}>
         <CustomToggleSwitchRequests activeButton={activeButton} setActiveButton={setActiveButton} handleFertilizersClick={handleFertilizersClick} handleSeedsClick={handleSeedsClick} />
         </div>
        
         {activeButton === "Credit" &&
         <CreditHistoryRequestCard/>  
       }
       
       {activeButton === "Requests" &&
        <>
        <RequestProductCard requestProducts={productsForThisRequest?productsForThisRequest:[]} />
        <br/>
        </>
         
      } 


 
        </Grid>
      </Container>
  }
    </>

  );
}
