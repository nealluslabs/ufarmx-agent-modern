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

import TeacherImg from '../assets/images/rec.png';


import farmer1 from 'src/assets/images/jeansfarmer.jpeg';
import farmer2 from 'src/assets/images/farmer2.jpeg';
import farmer3 from 'src/assets/images/farmer3.jpeg';
import farmer4 from 'src/assets/images/farmer4.jpeg';
import cropcompany from 'src/assets/images/cropcompany.jpeg'

import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';
import AdditionalInfoCard from 'src/components/home/additional-info-card';
import CropDepositStats from 'src/components/home/crop-deposit-stats';
import CropStats from 'src/components/home/crop-stats';
import ScrollingCampaignCard from 'src/components/home/scrolling-campaign-card';
import FarmerStats from 'src/components/home/farmer-stats';
import { fetchFarmersFromPage,fetchAgentsFromPage, fetchFarmersForOneAgent } from 'src/redux/actions/group.action';
import ContainerHomeCard from 'src/components/home/container-home-card';

import FeesImg from 'src/assets/images/money_2.png';
import ApexChart from 'src/components/home/splineChart';
import ContainerCardSmall from 'src/components/listcards/container-card-small';

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const CHART_DATA = [50, 50];

export default function HomePageAgent() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);


 
  useEffect(()=>{

   if(!user ){
    navigate('/login')
   }

  },[user])


  const { loggedInAgent } = useSelector((state) => state.group);
  
 
  const[farmersFromDB,setFarmersFromDB] = useState([])
  const[loading,setLoading] = useState(false)
  const[farmersAddedPerMonth,setFarmersAddedPerMonth] = useState([])
  const[ loadedFarmersPerMonth,setLoadedFarmersPerMonth]= useState(false)
  const[allLandSize,setAllLandSize] = useState(0)
  const[totalLandForCurrentMonth,setTotalLandForCurrentMonth] = useState([])
  const[updatedCropDeposits,setUpdatedCropDeposits] = useState([])

  const { myGroups, isLoading,
          currentFarmersToDisplay,
          allFarmersForThisAgent,
          currentAgentsToDisplay,
          totalPagesFarmers } = useSelector((state) => state.group);



 // useEffect(() => {
 //   if(!loggedInAgent||loggedInAgent &&  !loggedInAgent.firstName){
 //    return navigate("/login");
 //   }
 //  }, [])

  //console.log("HOME PAGE, LOGGED IN AGENT IS-->",loggedInAgent)


  useEffect(()=>{
    //console.log("logged in agent is-->",loggedInAgent)
 
   setLoading(true)
    dispatch(fetchFarmersForOneAgent(loggedInAgent && loggedInAgent.user_id))
  
   setTimeout(()=>{setLoading(false)},6000)
  },[])


  useEffect(()=>{

    dispatch(fetchAgentsFromPage(1))
   setTimeout(setLoadedFarmersPerMonth(true),0)
  },[])
  


  useEffect(()=>{

    function calculateTotalLandForCurrentMonth(allFarmersForThisAgent) {
      let totalLand = 0;
      const currentMonth = new Date().getMonth(); // Get the current month (0 = January, 11 = December)
    
      allFarmersForThisAgent.forEach(item => {
        // Check if 'farm_size' or 'farmsize' exists in the object
        let farmSizeValue = item.farm_size || item.farmsize||item.size_of_farm ;
    
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
    
    const totalLand = calculateTotalLandForCurrentMonth(allFarmersForThisAgent);
     setTotalLandForCurrentMonth(totalLand)
    
    },[allFarmersForThisAgent])
    


  useEffect(()=>{


    let farmersFromDBArray = [ ]
  
    allFarmersForThisAgent && allFarmersForThisAgent.slice(0,4).forEach((item,index)=>(
  
     
      farmersFromDBArray.push({
        ...item,
        id:item._id?item._id: "8Gnbs3WPwJ7ZzzvHgORs",
        farmerName:item.name?item.name: "Kayode Moses",
        cropType:"Cash Crops",
        location:index%2==0?"Oyo Nigeria":"Dakar Sénégal",
        lastHarvest:"30",
        image:/*item.photo?item.photo:*/index === 0?farmer1:index=== 1?farmer2:index === 2?farmer3:farmer4,
        onboardDate:item.createdAt && new Date(item.createdAt) ?
        
        `${String(new Date(item.createdAt).getDate()).padStart(2, '0')}-${String(new Date(item.createdAt).getMonth() + 1).padStart(2, '0')}-${new Date(item.createdAt).getFullYear()}`
       
        :
  
        "01-01-2024",
      })
    ))

    setFarmersFromDB(farmersFromDBArray)
  
   // console.log("farmers from DB state is now-->",farmersFromDB)
  



  },[allFarmersForThisAgent])


  //console.log("current agents  gotten is-->",currentAgentsToDisplay)

  //console.log("current farmers  gotten is--->",allFarmersForThisAgent)


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

  
  useEffect(()=>{


    const data = allFarmersForThisAgent && allFarmersForThisAgent
    
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
 

  },[allFarmersForThisAgent])

  useEffect(()=>{


  function calculateTotalLand(allFarmersForThisAgent) {
    let totalLand = 0;
  
    allFarmersForThisAgent.forEach(item => {
      // Check if 'farm_size' or 'farmsize' exists in the object
      let farmSizeValue = item.farm_size || item.farmsize||item.size_of_farm ;
  
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


  const totalLand = calculateTotalLand(allFarmersForThisAgent);
  setAllLandSize(totalLand)

},[allFarmersForThisAgent])


  return (
          <>
            <Helmet>
              <title>UfarmX</title>
            </Helmet>

            <Container maxWidth="xl" sx={{ px: { xs: 0, md: 3 } }}>
              {/* Header Section */}
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  mb: { xs: 2, md: 4 },
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 500, mb: 0.5 }}
                  >
                    Welcome {loggedInAgent?.firstName ?? 'User'} 👋
                  </Typography>
                  <Typography variant="body2">{new Date().toDateString()}</Typography>
                </Box>
              </Grid>

              {/* Dashboard Cards */}
              <Grid
                container
                spacing={2}
                sx={{
                  mt: 1,
                  position: 'relative',
                  width: '100%',
                  transform: { xs: 'scale(1)', md: 'scale(0.9)' },
                }}
              >
                <Grid item xs={12} md={6}>
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
                      header="Farmer"
                      value={currentFarmersToDisplay?.length ?? '0'}
                      img={TeacherImg}
                      additions={
                        farmersAddedPerMonth
                          ? farmersAddedPerMonth[farmersAddedPerMonth.length - 1]
                          : '0'
                      }
                    />
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
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
                      header="Farm"
                      value={allLandSize ? allLandSize.toLocaleString() : '0'}
                      additions={totalLandForCurrentMonth}
                      img={FeesImg}
                    />
                  </Paper>
                </Grid>
              </Grid>

              {/* Chart + Container Section */}
              <Grid
                container
                spacing={2}
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'space-between' },
                  gap: { xs: 2, md: 0 },
                  mt: { xs: 2, md: 3 },
                }}
              >
                {/* Chart */}
                <Grid item xs={12} md={8}>
                  <Box sx={{ width: '100%' }}>
                    {loadedFarmersPerMonth &&
                      farmersAddedPerMonth?.length > 0 && (
                        <ApexChart pointsData={farmersAddedPerMonth} />
                      )}
                  </Box>
                </Grid>

                {/* Containers */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ width: '100%' }}>
                    <Paper
                      elevation={0}
                      sx={{
                        background: 'white',
                        p: 2,
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        borderRadius: '1rem',
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={600}>
                        Containers
                      </Typography>

                      <ContainerCardSmall
                        pic={cropcompany}
                        collection="VELIGNARA"
                        about="Dakar, Senegal"
                        signed={`Last Deposit: ${
                          updatedCropDeposits?.[0]?.depositDate.replace(/\//g, '-') ?? ''
                        }`}
                        containerName="Velignara"
                      />

                      <ContainerCardSmall
                        pic={cropcompany}
                        collection="VELIGNARA"
                        about="Dakar, Senegal"
                        signed="Last Deposit: 01-01-2024"
                        containerName="Velignara"
                      />
                    </Paper>
                  </Box>
                </Grid>
              </Grid>

              {/* Farmers Section */}
              <Grid
                container
                spacing={2}
                sx={{
                  background: '#F8F8F8',
                  p: { xs: 2, sm: 3 },
                  mt: { xs: 2, md: 3 },
                  borderRadius: '1rem',
                }}
              >
                {/* Filters and Search */}
                <Grid
                  container
                  spacing={2}
                  sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'stretch', sm: 'center' },
                    justifyContent: { xs: 'center', sm: 'space-between' },
                    mb: { xs: 2, md: 0 },
                  }}
                >
                  <Grid item xs={12} sm="auto">
                    <Typography
                      sx={{
                        fontSize: { xs: '1.2rem', sm: '1.5rem' },
                        fontWeight: 600,
                        ml: { xs: 0, sm: 2 },
                      }}
                    >
                      Farmers
                    </Typography>
                  </Grid>

                  {/* Hidden placeholders */}
                  <Grid item xs={12} sm={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <FormControl sx={{ minWidth: 140, opacity: 0 }}>
                      <Select disabled displayEmpty size="small">
                        <MenuItem value="">Select Type</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <FormControl sx={{ minWidth: 140, opacity: 0 }}>
                      <Select disabled displayEmpty size="small">
                        <MenuItem value="">Select Class</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Search + Button */}
                  <Grid item xs={12} sm={3}>
                    <SmallCustomSearchBar title="Search Crop" />
                  </Grid>

                  <Grid item xs={12} sm="auto">
                    <Button
                      variant="contained"
                      sx={{
                        height: 45,
                        width: { xs: '100%', sm: 45 },
                        backgroundColor: '#000',
                      }}
                    >
                      <SearchIcon />
                    </Button>
                  </Grid>

                  {/* Filter Dropdown */}
                  <Grid
                    item
                    xs={12}
                    sm="auto"
                    sx={{ display: { xs: 'none', md: 'flex' } }}
                  >
                    <FormControl fullWidth size="small" sx={{ minWidth: 140 }}>
                      <Select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="">Filter By</MenuItem>
                        <MenuItem value={1}>Option 1</MenuItem>
                        <MenuItem value={2}>Option 2</MenuItem>
                        <MenuItem value={3}>Option 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Farmers List / Stats */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      background: 'white',
                      p: { xs: 2, sm: 3 },
                      borderRadius: '1rem',
                      mt: { xs: 1, sm: 0 },
                    }}
                  >
                    {farmersFromDB?.length ? (
                      <FarmerStats farmers={farmersFromDB} />
                    ) : loading ? (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          py: { xs: 4, sm: 6 },
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Typography
                        align="center"
                        sx={{
                          color: 'text.secondary',
                          py: { xs: 2, sm: 4 },
                        }}
                      >
                        No farmers fetched for this agent.
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </>

  );
}
