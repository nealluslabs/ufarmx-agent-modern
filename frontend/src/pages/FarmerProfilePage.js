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
import { fetchAgentById } from 'src/redux/actions/group.action';
import InputStats from 'src/components/home/input-stats';


const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const CHART_DATA = [50, 50];

export default function FarmerProfilePage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [cropDisplay, setCropDisplay] = useState(true); 
  const [loadingPage,setLoadingPage] = useState(false);

  const [aiForm,setAiForm] = useState(false)
 
 
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


  const { myGroups, isLoading,farmerInFocus,agentInFocus,currentDepositsToDisplay } = useSelector((state) => state.group);
  //const { students } = useSelector((state) => state.student);
  
  //console.log("farmer in focus is PROFILE PAGE INPUTS-->",farmerInFocus)



  const [updatedInputs,setUpdatedInputs] = useState([])
  const [fakeHarvests,setFakeHarvests] =  useState([]);


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



  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');


  let updatedCropDeposits = []
  //console.log("crop deposits --->",currentDepositsToDisplay)
  //console.log("FARMER IN FOCUS IS --->",farmerInFocus && farmerInFocus)
  //console.log("CURRENT DEPOSITS TO DISPLAY--->",currentDepositsToDisplay.map((item)=>(item.nom_de_lagriculteur)))

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
  //console.log("AGENT IN FOCUS IS-->",agentInFocus)

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
  
    //console.log("farmers from DB ARRAY, WHICH I AM USING TO POPULATE CROP TABLE IS-->",farmersFromDBArray)
  



  },[farmerInFocus])





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
       {   
           <>    

         <span style={{color:"grey"}}>Farmers </span>
      
         <span>{`/ ${farmerInFocus && farmerInFocus.name?farmerInFocus.name:farmerInFocus && farmerInFocus.firstName &&farmerInFocus.lastName ?farmerInFocus.firstName + " " + farmerInFocus.lastName :'' }`}</span>
      
         </>

         }       
        {/* Welcome {user?.firstName + " " + user?.lastName}🖐🏽 */}
        </Typography>
             
      
        <Grid container spacing={3}>

     
          <Grid container spacing={2} style={{marginTop:"2rem"}}>
           <div style={{ background: 'transparent', paddingLeft: '2rem',width:"97%",margin:"0 auto",position:"relative",left:"0.2rem" }}>
              <AdditionalInfoCard data={farmerInFocus && farmerInFocus} headerOne={'Statistics'} headerTwo={'Profile'} value={''} type={'one'} image={farmerInFocus &&farmerInFocus.photo ?farmerInFocus.photo:farmerInFocus && farmerInFocus.take_a_picture ?farmerInFocus.take_a_picture:farmerInFocus && farmerInFocus.image?farmerInFocus.image:defaultFarmerPic} index={farmerInFocus && farmerInFocus.index} farmName={''/*'Jenkins Farm'*/} farmerName={farmerInFocus && farmerInFocus.farmerName?farmerInFocus.farmerName:farmerInFocus && farmerInFocus.firstName && farmerInFocus.lastName?farmerInFocus.firstName + " " + farmerInFocus.lastName:"Joe Thomas"} city={farmerInFocus.location?farmerInFocus.location:"Dakar, Senegal"} email={"default@gmail.com"} agentId={farmerInFocus && farmerInFocus.agentAddedId} farmerId={farmerInFocus && farmerInFocus.farmerId} phoneNumber={farmerInFocus && farmerInFocus.phone_number?farmerInFocus.phone_number:"+221 555-380-1000"} setAiForm={setAiForm} aiForm={aiForm}/>
            </div>
          </Grid>

        <br />

          <Grid item xs={12} md={12} lg={12}>
            <div style={{ background: '#FFFFFF', padding: '10px',width:"100%",margin:"0 auto",position:"relative",left:"-1rem" }}>
              <AgentCard params={agentInFocus} headerOne={'Statistics'} headerTwo={'Agent'} value={''} type={'two'}  farmName={'Jenkins Farm'} farmerName={agentInFocus && agentInFocus.firstName && agentInFocus.lastName?agentInFocus.firstName + " " + agentInFocus.lastName :"Djibril Cisse"} city={agentInFocus.location?agentInFocus.location:"Dakar, Senegal"} email={agentInFocus.email? agentInFocus.email:"-"} phoneNumber={agentInFocus.phoneNumber? agentInFocus.phoneNumber:agentInFocus.phone_number? agentInFocus.phone_number:"+221 555-123-1000"}  image={noimage}/>
            </div>
          </Grid>



         <Grid container spacing={2} sx={{background: '#FFFFFF', padding: '10px',width:"98.5%",margin:"0 auto",marginTop:"2rem",position:"relative",left:"-0.3rem"}}>
       
       {/**here 2 */}
         <Grid container spacing={2} sx={{ padding: '10px'}}>
         <Grid item xs={12} sx={{mb: 0,mt:0,padding:"1rem"}}>
       <p style={{fontSize: '19.23px',fontWeight:"300",position:"relative",top:"-1.7rem",left:"2rem"}}>Farm Produce, Harvests, Deposits and Inputs</p>
        </Grid>


<Grid item xs={12} sx={{ mb: 0 }}>
  <Box 
    display="flex" 
    position="relative" 
    sx={{
      position: "relative",
      top: { xs: "0rem", md: "-4.2rem" },
      left: { xs: "0rem", md: "-1.4rem" },
      backgroundColor: "#F5F5F5",
      width: { xs: "100%", md: "105%" },
      overflowX: { xs: "auto", md: "visible" },
      flexDirection: { xs: "column", sm: "row" },
      alignItems: { xs: "flex-start", sm: "center" }
    }} 
    mb={3}
  >
    <Box
      onClick={() => handleToggle("Crops")}
      sx={{
        padding: { xs: '8px 16px', sm: '10px 20px' },
        fontSize: { xs: '16px', sm: '19.23px' },
        cursor: 'pointer',
        position: "relative",
        left: { xs: "0rem", sm: "2rem" },
        color: cropDisplay === "Crops" ? 'green' : 'grey',
        fontWeight: cropDisplay === "Crops" ? 'bold' : 'normal',
        transition: 'color 0.3s ease',
        width: { xs: "100%", sm: "auto" },
        textAlign: { xs: "left", sm: "center" }
      }}
    >
      Crops
    </Box>

    <Box
      onClick={() => handleToggle("Harvests")}
      sx={{
        padding: { xs: '8px 16px', sm: '10px 20px' },
        fontSize: { xs: '16px', sm: '19.23px' },
        cursor: 'pointer',
        position: "relative",
        left: { xs: "0rem", sm: "2rem" },
        color: cropDisplay === "Harvests" ? 'green' : 'grey',
        fontWeight: cropDisplay === "Harvests" ? 'bold' : 'normal',
        transition: 'color 0.3s ease',
        width: { xs: "100%", sm: "auto" },
        textAlign: { xs: "left", sm: "center" }
      }}
    >
      Harvests
    </Box>

    <Box
      onClick={() => handleToggle("Crop Deposits")}
      sx={{
        padding: { xs: '8px 16px', sm: '10px 20px' },
        fontSize: { xs: '16px', sm: '19.23px' },
        cursor: 'pointer',
        position: "relative",
        left: { xs: "0rem", sm: "2rem" },
        color: cropDisplay === "Crop Deposits" ? 'green' : 'grey',
        fontWeight: cropDisplay === "Crop Deposits" ? 'bold' : 'normal',
        transition: 'color 0.3s ease',
        width: { xs: "100%", sm: "auto" },
        textAlign: { xs: "left", sm: "center" }
      }}
    >
      Crop Deposits
    </Box>

    <Box
      onClick={() => handleToggle("Inputs")}
      sx={{
        padding: { xs: '8px 16px', sm: '10px 20px' },
        fontSize: { xs: '16px', sm: '19.23px' },
        cursor: 'pointer',
        position: "relative",
        left: { xs: "0rem", sm: "2rem" },
        color: cropDisplay === "Inputs" ? 'green' : 'grey',
        fontWeight: cropDisplay === "Inputs" ? 'bold' : 'normal',
        transition: 'color 0.3s ease',
        width: { xs: "100%", sm: "auto" },
        textAlign: { xs: "left", sm: "center" }
      }}
    >
      Inputs
    </Box>

    {/* Green underline for active item */}
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: { xs: "0rem", sm: "2rem" },
        height: '4px',
        backgroundColor: 'green',
        width: { xs: '25%', sm: '7rem' },
        transition: 'transform 0.3s ease',
        transform: cropDisplay === "Crops" 
          ? 'translateX(0)' 
          : cropDisplay === "Harvests" 
          ? { xs: 'translateX(100%)', sm: 'translateX(100%)' }
          : cropDisplay === "Crop Deposits" 
          ? { xs: 'translateX(200%)', sm: 'translateX(240%)' }
          : { xs: 'translateX(300%)', sm: 'translateX(360%)' },
      }}
    />
  </Box>
</Grid>
      
      
      
       <Grid xs={2} item sx={{mb: 0,display:{xs:'none'}}}>
    <FormControl sx={{ minWidth: 140, background: 'white',display:{xs:'none'} }}>
         <Select
           value={selectedClass}
           onChange={(e) => setSelectedClass(e.target.value)}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: 140,
             p: 1,
           }}
         >
           <MenuItem value="">
             Select Type
           </MenuItem>
       <MenuItem value={'JSS 1'}>1</MenuItem>
       <MenuItem value={'JSS 2'}>2</MenuItem>
       <MenuItem value={'JSS 3'}>3</MenuItem>
       <MenuItem value={'SS 1'}>4</MenuItem>
      
         </Select>
       </FormControl>
     </Grid>
  
    <Grid xs={2} item sx={{mb: 0,display:{xs:'none'}}}>
    <FormControl sx={{ minWidth: 140, background: 'white',display:{xs:'none'} }}>
         <Select
           value={selectedSection}
           onChange={(e) => setSelectedSection(e.target.value)}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: 140,
             p: 1,
           }}
         >
           <MenuItem value="">
             Select Class
           </MenuItem>
           <MenuItem value={1}>1</MenuItem>
           <MenuItem value={2}>2</MenuItem>
           <MenuItem value={3}>3</MenuItem>
          
         </Select>
       </FormControl>
     </Grid>
     &nbsp; &nbsp;

     <Box sx={{ width: '20%', marginTop: '1.2%',display:{xs:'none'}}}>
       <SmallCustomSearchBar   title={"Search Crop"} />
     </Box>
     
     <Box sx={{ flexGrow: 1,display:{xs:'none'}}}>
       <Button
         variant="contained"
         style={{ height: '45px', minWidth: '45px', backgroundColor: '#000000',  marginTop: '9.5%' }}
       >
         <SearchIcon />
       </Button>
     </Box>

     <Grid item sx={{mb: 0, display:{xs:'none'}}}>
    <FormControl sx={{ minWidth: 140, background: 'white' }}>
         <Select
           value={selectedFilter}
           onChange={(e) => setSelectedFilter(e.target.value)}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: 120,
             p: 1,
           }}
         >
           <MenuItem value="">
             Filter By
           </MenuItem>
           <MenuItem value={1}>Option 1</MenuItem>
           <MenuItem value={2}>Option 2</MenuItem>
           <MenuItem value={3}>Option 3</MenuItem>
         </Select>
       </FormControl>
     </Grid>
   </Grid>
   {/*here */}


      {cropDisplay === "Crops" ? 
        <Grid item xs={12} md={12} lg={12} >
           <div style={{background: '#FFFFFF',  padding: '10px',marginTop:"-6.5rem"}}>
          <CropStats crops={farmersFromDB}/> 
           </div>
           </Grid>

         :
       cropDisplay === "Harvests" ? 
        <Grid item xs={12} md={12} lg={12} >
           <div style={{background: '#FFFFFF',  padding: '10px',marginTop:"-6.5rem"}}>
          <HarvestStats crops={fakeHarvests}/> 
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

        }   
         </Grid>




          
        
        </Grid>
      </Container>
  }
    </>

  );
}
