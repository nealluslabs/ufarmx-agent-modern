import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Paper, Button, MenuItem, FormControl, Select, Box, CircularProgress } from '@mui/material';
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


import FeesImg from 'src/assets/images/money_2.png';


import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';
import AdditionalInfoCard from 'src/components/home/additional-info-card';
import CropDepositStats from 'src/components/home/crop-deposit-stats';
import CropStats from 'src/components/home/crop-stats';
import ScrollingCampaignCard from 'src/components/home/scrolling-campaign-card';
import FarmerStats from 'src/components/home/farmer-stats';
import { fetchFarmersFromPage,fetchAgentsFromPage, sectionFarmersFromPage,fetchLastThreeDeposits } from 'src/redux/actions/group.action';
import { saveCurrentFarmersToDisplay,saveFilteredFarmers,saveCurrentLocationFilter,saveCurrentCropTypeFilter,saveCurrentCropFilter,saveTotalPagesFarmers, saveTablesSet } from 'src/redux/reducers/group.slice';
import ApexChart from 'src/components/home/splineChart';
import ContainerCard from 'src/components/listcards/container-card-small';
import cropcompany from 'src/assets/images/cropcompany.jpeg';
import ContainerCardSmall from 'src/components/listcards/container-card-small';

import TeacherImg from 'src/assets/images/rec.png'
import StudentImg from 'src/assets/images/rec.png'

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const CHART_DATA = [50, 50];

export default function HomePageRegMgr() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

 
 
  useEffect(()=>{

   if(!user ){
    navigate('/login')
   }

  },[user])



 
  const[farmersFromDB,setFarmersFromDB] = useState([])
  const[loading,setLoading] = useState([])
  

  const[updatedCropDeposits,setUpdatedCropDeposits] = useState([])
  
  const[farmersAddedPerMonth,setFarmersAddedPerMonth] = useState([])
  const[allLandSize,setAllLandSize] = useState(0)
  const[totalLandForCurrentMonth,setTotalLandForCurrentMonth] = useState([])
  const[ loadedFarmersPerMonth,setLoadedFarmersPerMonth]= useState(false)

  const[agentsAddedPerMonth,setAgentsAddedPerMonth] = useState([])

  const { myGroups, isLoading,
    currentFarmersToDisplay,currentAgentsToDisplay,
    totalPagesFarmers,allFarmers,filteredFarmers,
    currentDepositsToDisplay,tablesSet
   } = useSelector((state) => state.group);
  //const { students } = useSelector((state) => state.student);


 // useEffect(() => {
 //
 //  if(!tablesSet){
 //   window.location.reload()
 //  }
 // }, [])

 

  useEffect(() => {
 
    dispatch(fetchLastThreeDeposits())
    dispatch(saveTablesSet(true))
  }, [])





  useEffect(()=>{


    const data = allFarmers && allFarmers
    
    // Function to count createdAt dates per month
    function countObjectsByMonth(data) {
      const currentDate = new Date();
      const results = new Array(8).fill(0); // Initialize an array with 8 zeros for 8 months
    
      data.forEach((item) => {
        const createdAtDate = new Date(item.createdAt);
        
        // Loop over the last 8 months (including the current month)
        for (let i = 0; i < 8; i++) {
          let comparisonDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
          
          if (
            createdAtDate.getFullYear() === comparisonDate.getFullYear() &&
            createdAtDate.getMonth() === comparisonDate.getMonth()
          ) {
            results[i]++;
          }
        }
      });
    
      return results;
    }
    
    const counts = countObjectsByMonth(data);
    const countsReverse = counts.reverse()
    
    //console.log("FARMERS ADDED PER MONTH IS --->",countsReverse)
    setFarmersAddedPerMonth(countsReverse)
 

  },[allFarmers])

  useEffect(()=>{


  function calculateTotalLand(allFarmers) {
    let totalLand = 0;
  
    allFarmers.forEach(item => {
      // Check if 'farm_size' or 'farmsize' exists in the object
      let farmSizeValue = item.farm_size || item.farmsize;
  
      if (farmSizeValue) {
        // Extract the number from the string, ignoring the non-numeric parts
        let numericValue = parseFloat(farmSizeValue.match(/[0-9]*\.?[0-9]+/)); 
        if (!isNaN(numericValue)) {
          totalLand += numericValue;
        }
      }
    });
  
    return totalLand;
  }


  const totalLand = calculateTotalLand(allFarmers);
  setAllLandSize(totalLand)

},[allFarmers])


useEffect(()=>{

function calculateTotalLandForCurrentMonth(allFarmers) {
  let totalLand = 0;
  const currentMonth = new Date().getMonth(); // Get the current month (0 = January, 11 = December)

  allFarmers.forEach(item => {
    // Check if 'farm_size' or 'farmsize' exists in the object
    let farmSizeValue = item.farm_size || item.farmsize;

    // Parse the 'createdAt' property and get the month
    if (item.createdAt) {
      const itemDate = new Date(item.createdAt);
      const itemMonth = itemDate.getMonth();

      // Only proceed if the item's month matches the current month
      if (itemMonth === currentMonth && farmSizeValue) {
        // Extract the number from the string, ignoring the non-numeric parts
        let numericValue = parseFloat(farmSizeValue.match(/[0-9]*\.?[0-9]+/));
        if (!isNaN(numericValue)) {
          totalLand += numericValue;
        }
      }
    }
  });

  return totalLand;
}

const totalLand = calculateTotalLandForCurrentMonth(allFarmers);
 setTotalLandForCurrentMonth(totalLand)

},[allFarmers])



  useEffect(()=>{


    const data = currentAgentsToDisplay && currentAgentsToDisplay
    
    // Function to count createdAt dates per month
    function countObjectsByMonth(data) {
      const currentDate = new Date();
      const results = new Array(8).fill(0); // Initialize an array with 8 zeros for 8 months
    
      data.forEach((item) => {
        const createdAtDate = new Date(item.createdAt);
        
        // Loop over the last 8 months (including the current month)
        for (let i = 0; i < 8; i++) {
          let comparisonDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
          
          if (
            createdAtDate.getFullYear() === comparisonDate.getFullYear() &&
            createdAtDate.getMonth() === comparisonDate.getMonth()
          ) {
            results[i]++;
          }
        }
      });
    
      return results;
    }
    
    const counts = countObjectsByMonth(data);
    
    //console.log("AGENTS ADDED PER MONTH IS -->",counts)
    setAgentsAddedPerMonth(counts)
 

  },[currentAgentsToDisplay])




  useEffect(() => {
/*CHANGING DEPOSITS TO SOMETHING THAT  CROP DEPOSIT COMPONENT CAN DEAL WITH */
  let newCropDeposits = []

  currentDepositsToDisplay &&  currentDepositsToDisplay.forEach((item,index)=>{

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

  })

  setUpdatedCropDeposits(newCropDeposits)



}, [currentDepositsToDisplay])



useEffect(()=>{

  dispatch(fetchAgentsFromPage(1))
 setTimeout(setLoadedFarmersPerMonth(true),0)
},[])


  useEffect(()=>{

    dispatch(sectionFarmersFromPage(1,allFarmers,filteredFarmers,"home"))

  },[])


  useEffect(()=>{

   /**THIS DISPATCH SECTION FROM FARMERS PAGE,  IS FOR INITIAL LOAD, USUALLY AFTER LOGIN, WITHOUT HAVING SELECTED A PAGE */

    dispatch(sectionFarmersFromPage(1,allFarmers,filteredFarmers,"home")) 


    let farmersFromDBArray = []
  
   allFarmers && allFarmers.slice(0,5).forEach((item,index)=>(
  
     
      farmersFromDBArray.push({...item,
        id:item.id ? item.id: item._id ? item._id: item.OriginalResponseId ? item.OriginalResponseId:item.name ? item.name: Math.random()
      
      })
    ))

    setFarmersFromDB(farmersFromDBArray)
  
    console.log("farmers from DB state is now-->",farmersFromDB)
  
  


  },[])


  useEffect(()=>{
    /**THIS USE EFFECT IS TO CLEAR UP FILTERS ANYTIME THE PAGE IS RELOADED, FOR A FRESH START */
    /**THIS USE EFFECT HAS TO BE BEFORE THE PLACE WHERE WE SET FARMERS TO DISPLAY */
       
        
           dispatch(saveCurrentFarmersToDisplay(allFarmers && allFarmers))
           /*dispatch(saveFilteredFarmers(allFarmers && allFarmers.slice(0,10)))*/
           dispatch(saveTotalPagesFarmers(Math.ceil(allFarmers.length/10)))
         //  console.log('FARMERS CLEARED UP!');
     
      },
      [])


  useEffect(()=>{

    /**THIS DISPATCH SECTION FROM FARMERS PAGE,  IS FOR INITIAL LOAD, USUALLY AFTER LOGIN, WITHOUT HAVING SELECTED A PAGE */
 
     /*dispatch(sectionFarmersFromPage(1,allFarmers,filteredFarmers)) */
 
 
     let farmersFromDBArray = []
   
    allFarmers && allFarmers.slice(0,5).forEach((item,index)=>(
   
      
       farmersFromDBArray.push({...item,
         id:item.id ? item.id: item._id ? item._id: item.OriginalResponseId ? item.OriginalResponseId:item.name ? item.name: Math.random()
       
       })
     ))
 
     setFarmersFromDB(farmersFromDBArray)


     if(!farmersFromDBArray){
      setLoading(true)

      setTimeout(()=>{
        setLoading(false)
      },4000)
    }
   
     //console.log("farmers from DB state is now-->",farmersFromDB)
   
   
 
 
   },[currentFarmersToDisplay])








 //console.log("current agents gotten is-->",currentAgentsToDisplay)

 // console.log("current farmers  gotten is-->",currentFarmersToDisplay)
//
 // console.log("CURRENT DEPOSITS TO DISPLAY-->",currentDepositsToDisplay)


  const students = [
    {id:"0S91dTHhu7t0Zc6645Gb" ,class:"Sophomore",paymentStatus:"Clark University",fName:"Norman ",lName:"Steven",amount:"$9,700"},
    {id:"75LPiOJKwtndeC67o5d3",class:"Senior",paymentStatus:"Morehouse College",fName:"Grace ",lName:"Kenneth",amount:"$8,000"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",class:"Freshman",paymentStatus:"Mercer University",fName:"Chris ",lName:"Stones",amount:"$7,700"},
    {id:"amfootball",class:"Junior",paymentStatus:"Bradley University",fName:"Kennedy ",lName:"Fisher",amount:"$6,500"}
  ]



  const crops = [
    {id:"0S91dTHhu7t0Zc6645Gb", cropName:"Corn",cropType:"Cash Crops",lastHarvest:"20",harvestDate:"01-01-2024"},
    {id:"75LPiOJKwtndeC67o5d3",cropName:"Potato",cropType:"Cash Crops",lastHarvest:"50",harvestDate:"01-01-2024"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",cropName:"Plantain",cropType:"Cash Crops",lastHarvest:"30",harvestDate:"01-01-2024"},
   
  ]



  const farmers = [
    {id:"0S91dTHhu7t0Zc6645Gb", farmerName:"John Jenkins",cropType:"Cash Crops",location:"Dakar Senegal", lastHarvest:"20",onboardDate:"01-01-2024"},
    {id:"75LPiOJKwtndeC67o5d3",farmerName:"Didier Deschamps",cropType:"Cash Crops",location:"Dakar Senegal",lastHarvest:"50",onboardDate:"01-01-2024"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",farmerName:"Kayode Moses",cropType:"Cash Crops",location:"Oyo Nigeria",lastHarvest:"30",onboardDate:"01-01-2024"},
   
  ]






  const cropDeposits = [
    {id:"0S91dTHhu7t0Zc6645Gb" ,cropName:"Corn",companyName:"Container #1",depositDate:"01-01-2024",lName:"Steven",earnings:"$90"},
    {id:"75LPiOJKwtndeC67o5d3",cropName:"Potato",companyName:"Container #2",depositDate:"01-01-2024",lName:"Kenneth",earnings:"$80"},
    {id:"8Gnbs3WPwJ7ZzzvHgORs",cropName:"Plantain",companyName:"Container #3",depositDate:"01-01-2024",lName:"Stones",earnings:"$70"},
    
  ]



  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');



  // useEffect(() => {
  //   if(user?.id == undefined){
  //    return navigate("/login");
  //   }
  //  }, [])

 // useEffect(() => {
 //   dispatch(fetchMyTransactions(user?.id));
 //   console.log('Transac Changed.');
 // }, [user]);

//  useEffect(() => {
//    dispatch(getStudents());
//    dispatch(fetchUserData(user?.id));
//  }, []);

 { /*const myCoolerGroups = myGroups?.length ? (
    myGroups
      .slice(0, 3)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((group) => {
        return (
          <HomeCoolersCard
            groupId={group.groupId}
            name={group.groupName}
            fee={fCurrency(group.amount)}
            count={`${group.members.length} OF ${group.noOfSavers} SAVERS`}
            img={group.imageUrl}
            members={group.members}
            //isMember={group.members.includes(user?.id)}
            startDate={group.startDate}
          />
        );
      })
  ) : (
    <>
      <EmptyRowCard msg={'Coolers you have joined will appear here.'} />
    </>
  );*/}

  return (
    <>

      <Helmet>
        <title> UfarmX </title>
      </Helmet>

      <Container maxWidth="xl"   sx={{
        scale: { xs: '1', md: '0.9' },
        position: 'relative',
        top: { xs: 0, md: '-3rem' },
        left: { xs: 0, md: '-2rem' },
        px: { xs: 1, sm: 2, md: 4 },
      }}
  >
        
        {/* <SearchBox style={{ width: '100%' }} /> */}

         <Grid item xs={12}     sx={{
      display: 'flex',
      justifyContent: { xs: 'center', sm: 'space-between' },
      alignItems: 'center',
      mb: '2rem',
      flexDirection: { xs: 'column', sm: 'row' },
      textAlign: { xs: 'center', sm: 'left' },
      gap: { xs: 1, sm: 0 },
    }}>
         
         <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}}>
         
         <h1 style={{fontWeight:"500",marginBottom:"0rem"}}>Welcome {user && user.firstName?user.firstName:"User"} 👋</h1>
         <div>{new Date().toDateString()}</div>
         
         </div>
         
         </Grid> 
      
        <Grid container spacing={3}>
         {/* <Grid item xs={12} md={12} lg={6}>
            <div style={{ background:'white', padding: '10px',position:"relative",left:"-2rem" }}>
           

       <CampaignCard headerOne={'Statistics'} headerTwo={'Profile'} value={''} type={'one'} image={noimage} farmName={'Super Admin'} farmerName={"Joe Thomas"} city={"Dakar, Senegal"} email={"default@gmail.com"} phoneNumber={"+221 555-380-1000"} />
            </div>
          </Grid> */}

         {/* <Grid item xs={8} md={12} lg={6}>
            <div style={{ background: 'white', padding: '10px',position:"relative",left:"0rem" }}>
              <ScrollingCampaignCard scrollItems={currentAgentsToDisplay} headerOne={'Statistics'} headerTwo={'Agents'} value={''} type={'two'}  farmName={'Jenkins Farm'} farmerName={"Djibril Cisse"} city={"Dakar, Senegal"} email={"default@ufarmx.com"} phoneNumber={"+221 555-123-1000"}  image={redboy}/>
            </div>
          </Grid> */}


          {/*
          <Grid container spacing={2} style={{marginTop:"2rem"}}>
          <div style={{ background: '#F8F8F8', padding: '10px',width:"100%" }}>
              <AdditionalInfoCard headerOne={'Statistics'} headerTwo={'Agent'} value={''} type={'two'}  farmName={'Jenkins Farm'} farmerName={"Djibril Cisse"} city={"Dakar, Senegal"} email={"djibril@ufarmx.com"} phoneNumber={"+221 555-123-1000"}  image={redboy}/>
            </div>
          </Grid>
            */}
 <Grid container spacing={2}>
          {/* First Grid Item */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                height: 'max-content',
                border: '1px solid #F8F8F8',
                backgroundColor: '#F8F8F8',
                borderRadius: '10px',
              }}
            >
              <DashboardCard header={'Farmer'} value={ currentFarmersToDisplay ?currentFarmersToDisplay.length :'0'} img={TeacherImg} additions={farmersAddedPerMonth ?farmersAddedPerMonth[farmersAddedPerMonth.length-1]:'0'} />
            </Paper>
          </Grid>

          {/* Second Grid Item */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                height: 'max-content',
                border: '1px solid #F8F8F8',
                backgroundColor: '#F8F8F8',
                borderRadius: '10px',
              }}
            >
              <DashboardCard
                header={'Agent'}
                value={ currentAgentsToDisplay ?currentAgentsToDisplay.length :'0'}
                img={StudentImg}
                additions={agentsAddedPerMonth ?agentsAddedPerMonth[0]:'0'} 
              />
            </Paper>
          </Grid>

        

          {/* Fourth Grid Item */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                height: 'max-content',
                border: '1px solid #F8F8F8',
                backgroundColor: '#F8F8F8',
              
                borderRadius: '10px',
              }}
            >
              <DashboardCard header={'Farm'} value={allLandSize?allLandSize.toLocaleString():'0'} additions={totalLandForCurrentMonth &&  totalLandForCurrentMonth} img={FeesImg}  />
            </Paper>
          </Grid>
        </Grid>
        <br />

        <br />

        <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'space-between' }, gap: { xs: 2, md: 0 }, }} >
          {/* Left Chart Section */}
          <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', mt: { xs: 2, md: 3 }, mb: { xs: 2, md: 4 }, backgroundColor: 'transparent', borderRadius: '1rem', p: { xs: 1, md: 2 }, width: '100%',}}  >
            <Box sx={{ width: '100%' }}>
              {loadedFarmersPerMonth && (
                <ApexChart
                  pointsData={farmersAddedPerMonth && farmersAddedPerMonth}
                />
              )}
            </Box>
          </Grid>

          {/* Right Container Cards Section */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              mt: { xs: 0, md: 3 },
              mb: { xs: 2, md: 4 },
              backgroundColor: 'transparent',
              borderRadius: '1rem',
              p: { xs: 1, md: 2 },
              width: '100%',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <div
                style={{
                  background: 'white',
                  height: 'auto',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <div style={{ fontWeight: 600 }}>Containers</div>

                <ContainerCardSmall
                  pic={cropcompany}
                  collection={'VELIGNARA'}
                  about={'Dakar, Senegal'}
                  signed={`Last Deposit: ${
                    updatedCropDeposits &&
                    updatedCropDeposits[0] &&
                    updatedCropDeposits[0].depositDate.replace(/\//g, '-')
                  }`}
                  containerName={'Velignara'}
                />

                <ContainerCardSmall
                  pic={cropcompany}
                  collection={'VELIGNARA'}
                  about={'Dakar, Senegal'}
                  signed={'Last Deposit: 01-01-2024'}
                  containerName={'Velignara'}
                />
              </div>
            </Box>
          </Grid>
        </Grid>


          <Grid container spacing={2} sx={{background: 'white'/*'#F8F8F8'*/, padding: '10px'}}>
       
       {/**here 2 */}
         <Grid container spacing={2} sx={{ padding: '10px'}}>
         <Grid item xs={3} sx={{mb: 0}}>
       <p style={{fontSize:"24px",fontWeight:"600",position:"relative",top:"-1.2rem",left:"2rem"}}>Farmers</p>
        </Grid>
      
      
      
       <Grid xs={2} item sx={{mb: 0}}>
    <FormControl sx={{ minWidth: 140, background: 'white',opacity:"0"  }}>
         <Select
           value={selectedClass}
           disabled={true}
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
  
    <Grid xs={2} item sx={{mb: 0}}>
    <FormControl sx={{ minWidth: 140, background: 'white',opacity:"0"  }}>
         <Select
           disabled={true}
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
<Box sx={{display: {xs: 'none', sm: 'block'}}}>

     <Box sx={{ width: '20%', marginTop: '1.2%',}}>
       <SmallCustomSearchBar   title={"Search Crop"} />
     </Box>
     
     <Box sx={{ flexGrow: 1}}>
       <Button
         variant="contained"
         style={{ height: '45px', minWidth: '45px', backgroundColor: '#000000',  marginTop: '9.5%' }}
       >
         <SearchIcon />
       </Button>
     </Box>
</Box>

     <Grid item sx={{mb: 0}}>
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

           <Grid item xs={12} md={12} lg={12} >
           <div style={{background:'white' /*'#F8F8F8'*/,  padding: '10px',marginTop:"-2.5rem"}}>
        { 
        
        farmersFromDB && farmersFromDB.length?  
        <FarmerStats  farmers={farmersFromDB}/> 
        :
       
        loading?
        <center style={{marginTop:"6rem"}}>
        <CircularProgress/>
        </center>
        : 
        "No farmers fetched."


          }
           </div>
           </Grid>
           
         </Grid>




         <Grid container spacing={2} sx={{background:'white' /*'#F8F8F8'*/, padding: '10px',marginTop:"2rem"}}>
       
       {/**here 2 */}
         <Grid container spacing={2} sx={{ padding: '10px'}}>
         <Grid item xs={3} sx={{mb: 0}}>
       <p style={{fontSize:"24px",fontWeight:"600",position:"relative",top:"-1.2rem",left:"2rem"}}>Crop Deposits</p>
        </Grid>
      
      
      
       <Grid xs={2} item sx={{mb: 0}}>
    <FormControl sx={{ minWidth: 140, background: 'white',opacity:"0" }}>
         <Select
           value={selectedClass}
           disabled={true}
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
  
    <Grid xs={2} item sx={{mb: 0}}>
    <FormControl sx={{ minWidth: 140, background: 'white',opacity:"0"  }}>
         <Select
           disabled={true}
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
<Box sx={{display: {xs: 'none', sm: 'block'}}}>

     <Box sx={{ width: '20%', marginTop: '1.2%',}}>
       <SmallCustomSearchBar   title={"Search Crop"} />
     </Box>
     
     <Box sx={{ flexGrow: 1}}>
       <Button
         variant="contained"
         style={{ height: '45px', minWidth: '45px', backgroundColor: '#000000',  marginTop: '9.5%' }}
       >
         <SearchIcon />
       </Button>
     </Box>
</Box>

     <Grid item sx={{mb: 0}}>
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

           <Grid item xs={12} md={12} lg={12} >
           <div style={{background:'white' /*'#F8F8F8'*/,  padding: '10px',marginTop:"-2.5rem",fontSize:"1rem !important",}}>
        { updatedCropDeposits && <CropDepositStats cropDeposits={updatedCropDeposits}/> }
           </div>
           </Grid>
           
         </Grid>




          
        
        </Grid>
      </Container>
    </>
  );
}
