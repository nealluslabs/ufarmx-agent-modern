import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, FormControl, Box, Select, MenuItem, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyGroups } from 'src/redux/actions/group.action';
import { fetchUserData } from 'src/redux/actions/auth.action';

import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';

import CampaignCard from 'src/components/listcards/campaign-card';

import corn from 'src/assets/images/corn.jpeg';
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



import amfootball from 'src/assets/images/amfootball.jpeg'
import PitchCard from 'src/components/listcards/pitch-card';
import CropStats from 'src/components/home/crop-stats';
import CropDepositStatsLong from 'src/components/home/crop-deposit-stats-long';
import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';

import { FaFilter } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";


export default function DepositsFarmerPage() {
  const theme = useTheme();
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);


 
  useEffect(()=>{

   if(!user ){
    navigate('/login')
   }

  },[user])


  const { myGroups, isLoading,loggedInFarmer,currentDepositsToDisplay } = useSelector((state) => state.group);
  
  console.log("DEPOSITS PAGE, CURRENT DEPOSITS IS-->",currentDepositsToDisplay)


  const { students } = useSelector((state) => state.student);

 // useEffect(() => {
 //   dispatch(fetchMyGroups(user?.coolers));
 //   dispatch(fetchMyTransactions(user?.id));
 //   console.log("Transac Changed.");
 // }, [user])
//
 // useEffect(() => {
 //   dispatch(getStudents());
 //   dispatch(fetchUserData(user?.id));
 // }, [])



  const [selectedOption, setSelectedOption] = useState('');
  const [activeButton, setActiveButton] = useState('viewStudents');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleViewStudentsClick = () => {
    setActiveButton('viewStudents');
 
  };

  const handleAddStudentsClick = () => {
    setActiveButton('addStudents');
  };

  const [farmersFromDB,setFarmersFromDB] =  useState([]);
  const [updatedCropDeposits,setUpdatedCropDeposits] = useState([])



  useEffect(()=>{

    let newCropDeposits = []
 
    currentDepositsToDisplay && currentDepositsToDisplay.length &&  currentDepositsToDisplay.forEach((item,index)=>{
  
      newCropDeposits.push({
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
 
 
      setUpdatedCropDeposits(newCropDeposits)
  
    })
 
   },[currentDepositsToDisplay])
  

  useEffect(()=>{
   
    const cropsStatic = [

      {id:"0S91dTHhu7t0Zc6645Gb",cropName:"Corn",cropType:"Cash Crops",lastHarvest:"50",harvestDate:"01-01-2024"},
      {id:"75LPiOJKwtndeC67o5d3",cropName:"Potato",cropType:"Cash Crops",lastHarvest:"50",harvestDate:"01-01-2024"},
      {id:"8Gnbs3WPwJ7ZzzvHgORs",cropName:"Plantain",cropType:"Cash Crops",lastHarvest:"30",harvestDate:"01-01-2024"}
  
    ]
  

    let farmersFromDBArray = [ ]
  
   
    loggedInFarmer && loggedInFarmer.crop_types ? loggedInFarmer.crop_types.split(/\s+/).slice(0,3).forEach((item,index)=>{
   
      farmersFromDBArray.push(
      {id: index===0?"0S91dTHhu7t0Zc6645Gb":index===1?"75LPiOJKwtndeC67o5d3":index===2?"8Gnbs3WPwJ7ZzzvHgORs":Math.random(),
      cropName:item,
      cropType:"Cash Crops",
     lastHarvest:index===0?"20":index===1?"30":"50"
     ,harvestDate:"01-01-2024",
     image:  item.toLowerCase().includes("maize")?maize :
     item.toLowerCase().includes("potato")?potato :
     item.toLowerCase().includes("corn")?corn :
     item.toLowerCase().includes("gombo")?gombo :
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
    loggedInFarmer && loggedInFarmer.produce ? loggedInFarmer.produce.split(/\s+/).filter((plug)=>(plug !=="and"||plug !=="et" )).slice(0,3).forEach((item,index)=>{

      
      farmersFromDBArray.push(
        {id: index===0?"0S91dTHhu7t0Zc6645Gb":index===1?"75LPiOJKwtndeC67o5d3":index===2?"8Gnbs3WPwJ7ZzzvHgORs":Math.random(),
        cropName:item,
        cropType:"Cash Crops",
       lastHarvest:index===0?"20":index===1?"30":"50"
       ,harvestDate:"01-01-2024",
       image:item.toLowerCase().includes("maize")?maize :
       item.toLowerCase().includes("corn")?corn :
       item.toLowerCase().includes("gombo")?gombo :
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
       item.toLowerCase().includes("vacher")?cow :
       item.toLowerCase().includes("ane")?donkey :
       item.toLowerCase().includes("âne")?donkey :
       item.toLowerCase().includes("chiévres")?goat :
       item.toLowerCase().includes("cheval")?horse :
       corn
      }
  
        )


  })
   :
   loggedInFarmer && loggedInFarmer.what_crop_are_you_farming ? loggedInFarmer.what_crop_are_you_farming.split(/\s+/).filter((plug)=>(plug !=="and"||plug !=="et" )).slice(0,3).forEach((item,index)=>(


     
    farmersFromDBArray.push(
      {id: index===0?"0S91dTHhu7t0Zc6645Gb":index===1?"75LPiOJKwtndeC67o5d3":index===2?"8Gnbs3WPwJ7ZzzvHgORs":Math.random(),
      cropName:item,
      cropType:"Cash Crops",
     lastHarvest:index===0?"20":index===1?"30":"50",
      harvestDate:"01-01-2024",
      image:   item.toLowerCase().includes("maize")?maize :
      item.toLowerCase().includes("corn")?corn :
      item.toLowerCase().includes("gombo")?gombo :
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
  
   // console.log("farmers from DB ARRAY, WHICH I AM USING TO POPULATE CROP TABLE IS-->",farmersFromDBArray)
  



  },[loggedInFarmer])

  return (
<>

     <Helmet>
        <title> UfarmX </title>
      </Helmet>

      <Container maxWidth="xl" sx={{
        width: { xs: "95%", sm: "91%" },
        position: "relative",
        left: { xs: "0", sm: "-1.5rem" },
        padding: { xs: "0 10px", sm: "0" }
      }} >
      <Grid container spacing={2} alignItems="center" justifyContent="flex-end" sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: { xs: "space-between", sm: "flex-end" },
        paddingRight: "0rem",
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: "1rem", sm: "0" }
      }}> 
          
          <Grid item sx={{
            width: { xs: "100%", sm: "max-content" },
            display: 'flex',
            justifyContent: "flex-start", 
            alignItems: 'flex-start', 
            marginTop: { xs: "1rem", sm: "1.5rem" }, 
            marginBottom: { xs: "0", sm: "2rem" },
            borderRadius: "2rem",
            padding: "0.5rem"
          }}>
         
              <Box sx={{ width: '100%', marginTop: '0%'}}>
                <SmallCustomSearchBar   title={"Search Farmers"} />
              </Box>
           </Grid>

          
             <Grid item sx={{
               width: { xs: "100%", sm: "max-content" },
               display: 'flex',
               justifyContent: "flex-start", 
               alignItems: 'flex-start', 
               marginTop: { xs: "0", sm: "1.5rem" }, 
               marginBottom: { xs: "1rem", sm: "2rem" },
               backgroundColor: "#F9F9F9",
               borderRadius: "2rem",
               padding: "0.5rem"
             }}>
             

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
          <br/>
          
        <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <div style={{
                background: 'white',  
                padding: '10px',
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
              }}>
               {/*activeButton === 'viewStudents' &&  <ViewStudents students={students}/>*/}  
              
               {/*activeButton === 'addStudents' && <AddStudent />*/}

               <Grid container spacing={2} sx={{
                 background: '#F8F8F8', 
                 padding: '10px',
                 marginTop: { xs: "1rem", sm: "2.5rem" }
               }}>
       
       {/**here 2 */}
         <Grid container spacing={2} sx={{ 
           padding: '10px',
           flexDirection: { xs: "column", sm: "row" },
           gap: { xs: "1rem", sm: "0" }
         }}>
         <Grid item xs={12} sm={3} sx={{ mb: 0 }}>
       <p style={{
         fontSize: { xs: "20px", sm: "24px" },
         fontWeight: "600",
         position: "relative",
         top: { xs: "0", sm: "-1.2rem" },
         left: { xs: "0", sm: "2rem" },
         textAlign: { xs: "center", sm: "left" }
       }}>Crop Deposits</p>
        </Grid>
      
      
      
      <Grid xs={12} sm={2} item sx={{ mb: 0 }}>
    <FormControl sx={{ 
      minWidth: { xs: "100%", sm: 140 }, 
      background: 'white',
      opacity: "0" 
    }}>
         <Select
           value={selectedClass}
           disabled={true}
           onChange={(e) => setSelectedClass(e.target.value)}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: { xs: "100%", sm: 140 },
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
     
  

   
    <Grid xs={12} sm={2} item sx={{ mb: 0 }}>
    
    <FormControl sx={{ 
      minWidth: { xs: "100%", sm: 140 }, 
      background: 'white',
      opacity: "0" 
    }}>
         <Select
           value={selectedSection}
           disabled={true}
           onChange={(e) => setSelectedSection(e.target.value)}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: { xs: "100%", sm: 140 },
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

     <Box sx={{ 
       width: { xs: "100%", sm: "20%" }, 
       marginTop: { xs: "0", sm: "1.2%" }
     }}>
       <SmallCustomSearchBar   title={"Search Crop"} />
     </Box>
     
     <Box sx={{ 
       flexGrow: 1,
       display: "flex",
       justifyContent: { xs: "center", sm: "flex-start" }
     }}>
       <Button
         variant="contained"
         style={{ 
           height: '45px', 
           minWidth: '45px', 
           backgroundColor: '#000000',  
           marginTop: { xs: "1rem", sm: "9.5%" } 
         }}
       >
         <SearchIcon />
       </Button>
     </Box>

     <Grid item sx={{ mb: 0, width: { xs: "100%", sm: "auto" } }}>
    <FormControl sx={{ 
      minWidth: { xs: "100%", sm: 140 }, 
      background: 'white' 
    }}>
         <Select
           value={selectedFilter}
           onChange={(e) => setSelectedFilter(e.target.value)}
           displayEmpty
           label=""
           sx={{
             height: 45,
             minWidth: { xs: "100%", sm: 120 },
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

           <Grid item xs={12} md={12} lg={12} >
           <div style={{
             background: '#F8F8F8',  
             padding: '10px',
             marginTop: { xs: "0", sm: "-2.5rem" }
           }}>
        { updatedCropDeposits && updatedCropDeposits.length ?  <CropDepositStatsLong cropDeposits={updatedCropDeposits}/>
          :
          
          <center style={{
            fontSize: { xs: "1rem", sm: "1.3rem" },
            fontWeight: "800"
          }}>
            No Deposits for this farmer
          </center>
      }
           </div>
           </Grid>
           
         </Grid>



{/* OLD FORMAT FOR DISPLAY WITH BIG CARD ICONS - DONT DELETE JUST YET, THERE IS A LOT OF LOGIC HERE
 
  loggedInFarmer && loggedInFarmer.crop_types ? loggedInFarmer.crop_types.split(/\s+/).slice(0,3).map((item,index)=>( 
    

    <PitchCard pic={
      item.toLowerCase().includes("maize")?maize :
      item.toLowerCase().includes("potato")?potato :
      item.toLowerCase().includes("corn")?corn :
      item.toLowerCase().includes("gombo")?gombo :
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
    collection={item} name={'Harvest Quantity: 20'} uni={'Harvest date:01-01-2024'}/>
   
  ))
  
  :

  loggedInFarmer && loggedInFarmer.produce ? loggedInFarmer.produce.split(/\s+/).filter((plug)=>(plug !=="and"||plug !=="et" )).slice(0,3).map((item,index)=>( 
   
    <PitchCard pic={
      item.toLowerCase().includes("maize")?maize :
      item.toLowerCase().includes("corn")?corn :
      item.toLowerCase().includes("gombo")?gombo :
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
      item.toLowerCase().includes("vacher")?cow :
      item.toLowerCase().includes("ane")?donkey :
      item.toLowerCase().includes("âne")?donkey :
      item.toLowerCase().includes("chiévres")?goat :
      item.toLowerCase().includes("cheval")?horse :
      corn
    } 
    collection={item} name={'Harvest Quantity: 20'} uni={'Harvest date:01-01-2024'}/>
   
  ))

  :


  loggedInFarmer && loggedInFarmer.what_crop_are_you_farming ? loggedInFarmer.what_crop_are_you_farming.split(/\s+/).filter((plug)=>(plug !=="and"||plug !=="et" )).slice(0,3).map((item,index)=>( 
   
    <PitchCard pic={

      item.toLowerCase().includes("maize")?maize :
      item.toLowerCase().includes("corn")?corn :
      item.toLowerCase().includes("gombo")?gombo :
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


    collection={item} name={'Harvest Quantity: 20'} uni={'Harvest date:01-01-2024'}/>
   
  ))

  :
   
   
   <>
               <PitchCard pic={corn} collection={'CORN'} name={'Harvest Quantity: 20'} uni={'Harvest date:01-01-2024'}/>
               <PitchCard pic={potato} collection={'POTATO'} name={'Harvest Quantity: 50'}  uni={'Harvest date:01-01-2024'}/>
              
               <PitchCard pic={plantain} collection={'PLANTAIN'} name={'Harvest Quantity: 30'}  uni={'Harvest date:01-01-2024'}/>

   </>
*/}

              
                </div>
            </Grid>
            
          </Grid>
      </Container>
    </>
  );
}
