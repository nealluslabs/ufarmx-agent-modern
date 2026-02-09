import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Paper, Button, MenuItem, FormControl, Select, Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { fCurrency, fNumber } from '../utils/formatNumber';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EmptyRowCard from 'src/components/home/empty-row-card';
import SearchIcon from '@mui/icons-material/Search';
import { fetchUserData } from 'src/redux/actions/auth.action';

import AgentStatsLong from "src/components/home/agent-stats-long"

// @mui
import { useTheme, styled } from '@mui/material/styles';

import CustomSearchBar from 'src/components/global/CustomSearchBar';
import DashboardCard from 'src/components/home/dashboard-card';



import noimage from 'src/assets/images/no-image.jpg'

import FeesImg from 'src/assets/images/money_2.png';
import TeacherImg from 'src/assets/images/rec.png'
import StudentImg from 'src/assets/images/rec.png'



import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';

import FarmerStats from 'src/components/home/farmer-stats';
import { fetchFarmersFromPage,fetchAgentsFromPage, sectionFarmersFromPage,fetchLastThreeDeposits } from 'src/redux/actions/group.action';
import { saveCurrentFarmersToDisplay,saveFilteredFarmers,saveCurrentLocationFilter,saveCurrentCropTypeFilter,saveCurrentCropFilter,saveTotalPagesFarmers, saveTablesSet } from 'src/redux/reducers/group.slice';
import ApexChart from 'src/components/home/splineChart';
import ContainerCard from 'src/components/listcards/container-card-small';
import cropcompany from 'src/assets/images/cropcompany.jpeg';
import ContainerCardSmall from 'src/components/listcards/container-card-small';
import FakeFormsStatsLong2 from 'src/components/home/FakeFormsStatsLong2';
import RequestsStats from 'src/components/home/fake-forms-stats-long';

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const CHART_DATA = [50, 50];

export default function HomePage() {
  const theme = useTheme();


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const[responsesFromDB,setResponsesFromDB] = useState([])
 
  useEffect(()=>{
    console.log("USER FOR AGENT IS--->",user)

   if(!user ){
    navigate('/login')
   }

  },[user])

 
  const[farmersFromDB,setFarmersFromDB] = useState([])
  const[agentsFromDB,setAgentsFromDB] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(false);
  
  const[loading,setLoading] = useState(false)

  const[updatedCropDeposits,setUpdatedCropDeposits] = useState([])
  
  const[farmersAddedPerMonth,setFarmersAddedPerMonth] = useState([])
  const[allLandSize,setAllLandSize] = useState(0)
  const[totalLandForCurrentMonth,setTotalLandForCurrentMonth] = useState([])
  const[ loadedFarmersPerMonth,setLoadedFarmersPerMonth]= useState(false)

  const[agentsAddedPerMonth,setAgentsAddedPerMonth] = useState([])

  const { myGroups, isLoading,
    currentFarmersToDisplay,currentAgentsToDisplay,
    totalPagesFarmers,allFarmers,filteredFarmers,
    currentDepositsToDisplay,tablesSet,
         allRequests,
   } = useSelector((state) => state.group);
  //const { students } = useSelector((state) => state.student);


 // useEffect(() => {
 //
 //  if(!tablesSet){
 //   window.location.reload()
 //  }
 // }, [])

 useEffect(()=>{


  let agentsFromDBArray = [ ]

  currentAgentsToDisplay && currentAgentsToDisplay.forEach((item,index)=>(

   
    agentsFromDBArray.push({
      id:item._id?item._id: "8Gnbs3WPwJ7ZzzvHgORs",
      fullName:item.firstName && item.lastName  ?item.firstName + " " + item.lastName :item.firstName?item.firstName:item.lastName?item.lastName:item.name_first__last?item.name_first__last :"No Name",
      email:"default@ufarmx.com",
      phone:item.phoneNumber?item.phoneNumber:"+2348160005203",
      location:index%2==0?"Oyo Nigeria":"Dakar Sénégal",
      user_id:item.user_id,
      agentId:item.agentId,
      index:index,
      lastHarvest:"30",
      image:noimage/*index === 0?agent1:index=== 1?agent2:index === 2?agent3:index === 3?agent4:index === 4?agent5:index === 5?agent6:index === 6?agent7:index === 7?agent8:index === 8?agent9:index === 9?agent9:agent9*/ ,
      onboardDate:item.createdAt && new Date(item.createdAt) ?
      
      `${String(new Date(item.createdAt).getDate()).padStart(2, '0')}-${String(new Date(item.createdAt).getMonth() + 1).padStart(2, '0')}-${new Date(item.createdAt).getFullYear()}`
     
      :

      "01-01-2024",
    })
  ))


  console.log("agents from DB ARRAY-->",agentsFromDBArray)





  if(selectedLocation){

    //console.log("selected location is-->",selectedLocation)

    agentsFromDBArray = agentsFromDBArray.filter((item)=>(
        item.location.includes(selectedLocation) || item.location.includes(selectedLocation.toLocaleLowerCase())
    ))
  }


  setAgentsFromDB(agentsFromDBArray)

 




},[])

  //useEffect(() => {
  //  /*THIS USE EFFECT IS IMPORTANT TO ASSGIN AN ID SO MUI DATA GRID WILL ACCEPT THE DATA */
  //const forcedId =  []
  //allRequests &&  allRequests.filter((item)=>(item.retailer_id === user._id)).forEach((item,index)=>{
  //  forcedId.push({
  //    ...item,
  //    id:item._id,
  //    riskScore: parseFloat((Math.random() * (9 - 3) + 3).toFixed(1)), // e.g. 5.7
  //    total: (Math.random() * (50000 - 5000) + 5000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  //    items:3
  //  })
  //})
//
  //setResponsesFromDB(forcedId)
//
 //// console.log("WHAT WE ARE PRESENTING FOR REQUESTS-->",allRequests);
  ////console.log("ALL REQUESTS-->",allRequests);
//
  //}, [allRequests])
 

  useEffect(() => {
 
    dispatch(fetchLastThreeDeposits())
    dispatch(saveTablesSet(true))
  }, [])


  useEffect(()=>{


    const data = allFarmers && allFarmers

   // console.log("all farmers is---->",allFarmers)
    
    // Function to count createdAt dates per month
    function countObjectsByMonth(data) {
      const currentDate = new Date();
      const results = new Array(8).fill(0); // Initialize an array with 8 zeros for 8 months
    
      data && data.forEach((item) => {
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
  
    allFarmers && allFarmers.forEach(item => {
      // Check if 'farm_size' or 'farmsize' exists in the object
      let farmSizeValue = item.farm_size || item.farmsize||item.size_of_farm||item.farmSize ;
  
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

  allFarmers && allFarmers.forEach(item => {
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

const totalLand = calculateTotalLandForCurrentMonth(allFarmers);
 setTotalLandForCurrentMonth(totalLand)

},[allFarmers])



  useEffect(()=>{


    const data = currentAgentsToDisplay && currentAgentsToDisplay
    
    // Function to count createdAt dates per month
    function countObjectsByMonth(data) {
      const currentDate = new Date();
      const results = new Array(8).fill(0); // Initialize an array with 8 zeros for 8 months
    
     data && data.forEach((item) => {
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
  
   // console.log("farmers from DB state is now-->",farmersFromDB)
  
  


  },[])


  useEffect(()=>{
    /**THIS USE EFFECT IS TO CLEAR UP FILTERS ANYTIME THE PAGE IS RELOADED, FOR A FRESH START */
    /**THIS USE EFFECT HAS TO BE BEFORE THE PLACE WHERE WE SET FARMERS TO DISPLAY */
       
        
           dispatch(saveCurrentFarmersToDisplay(allFarmers && allFarmers))
           /*dispatch(saveFilteredFarmers(allFarmers && allFarmers.slice(0,10)))*/
           dispatch(saveTotalPagesFarmers(Math.ceil(allFarmers.length/10)))
          // console.log('FARMERS CLEARED UP!');
     
      },
      [])




      useEffect(() => {
        /*THIS USE EFFECT IS IMPORTANT TO ASSGIN AN ID SO MUI DATA GRID WILL ACCEPT THE DATA */
    
        const forcedId =  []

      //sort requests in order of updatedAt here
   //   const sortedRequests = [...allRequests].filter((item)=>(item.retailer_id === user._id)).sort(
   //     (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
   //   ) 
//
   //   
   //   sortedRequests &&  sortedRequests.forEach((item,index)=>{
   //    /*   console.log("Names are ", item);
   //     if(item.title === "Farmer Credit Analysis") {
   //       forcedId.push({
   //         ...item,
   //         title:"Kareem Balikis",
   //         id:item.id ? item.id: item._id ? item._id: item.OriginalResponseId ? item.OriginalResponseId:item.name ? item.name: Math.random()
   //       })
   // 
   // 
   //       forcedId.push({
   //         ...item,
   //         title:"Sikir Adeta",
   //         id: Math.random()
   // 
   //     }*/
   //     forcedId.push({
   //       ...item,
   //       id:item._id,
   //       riskScore: parseFloat((Math.random() * (9 - 3) + 3).toFixed(1)), // e.g. 5.7
   //       total: (Math.random() * (50000 - 5000) + 5000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
   //       items:3
   //     })
   //   })
   // 
   //   setResponsesFromDB(forcedId)
    
     // console.log("WHAT WE ARE PRESENTING FOR REQUESTS-->",allRequests);
      //console.log("ALL REQUESTS-->",allRequests);
    
      }, [allRequests])


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
   
    // console.log("farmers from DB state is now-->",farmersFromDB)
   
   
 
 
   },[currentFarmersToDisplay]) 








  //console.log("current agents gotten is-->",currentAgentsToDisplay)

  //console.log("current farmers  gotten is-->",currentFarmersToDisplay)

  //console.log("CURRENT DEPOSITS TO DISPLAY-->",currentDepositsToDisplay)


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

      <Container maxWidth="xl" style={{scale:"0.9",position:"relative",top:"-3rem",left:"-2rem"}}>
        
        {/* <SearchBox style={{ width: '100%' }} /> */}


   <Grid item xs={12} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"2rem"}}>

     <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}}>
     
     <h1 style={{fontWeight:"500",marginBottom:"0rem"}}>Welcome {user && user.firstName?user.firstName:user && user.companyName?user.companyName: "User"} 👋</h1>
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
              <DashboardCard
                header={'Balance'}
                value={ user && user.availableBalance ?`₦ ${Math.abs(Number(user.availableBalance || 0)).toLocaleString()}` :0} // currentAgentsToDisplay.length{/*"N23,500,000"*/}
                img={StudentImg}
                additions={agentsAddedPerMonth ?agentsAddedPerMonth[0]:'0'} 
              />
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
              <DashboardCard header={'Farmer'} value={ currentFarmersToDisplay ?currentFarmersToDisplay.length :'0'} img={TeacherImg} additions={farmersAddedPerMonth ?farmersAddedPerMonth[farmersAddedPerMonth.length-1]:'0'} />
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


        {/* <Grid  xs={12} container spacing={0} style={{display:"flex",justifyContent:"space-between",gap:"0rem"}}> */}
          {/* <Grid item xs={8} style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",backgroundColor:"transparent",borderRadius:"2rem",padding:"0.5rem",position:"relative" }}> */}
            {/* <Box sx={{ width: '100%' }}> */}
             {/* {loadedFarmersPerMonth &&farmersAddedPerMonth && farmersAddedPerMonth.length > 0 &&  <ApexChart pointsData={farmersAddedPerMonth && farmersAddedPerMonth}/>} */}

            {/* </Box> */}

         
          {/* </Grid> */}


          {/* <Grid item xs={4} style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",backgroundColor:"transparent",borderRadius:"2rem",padding:"0.5rem",position:"relative"}}> */}
            
            {/* <Box sx={{ width: '100%' }> */}
            {/* <div style={{background: 'white', height:"23.5rem", padding: '10px',display:"flex",flexDirection:"column",gap:"1rem"}}> */}
            {/* <div>Containers</div> */}

               {/* <ContainerCardSmall pic={cropcompany} collection={'VELIGNARA'} about={"Dakar, Senegal"} signed={`Last Deposit: ${updatedCropDeposits &&updatedCropDeposits[0] && updatedCropDeposits[0].depositDate.replace(/\//g, '-')}`} containerName={'Velignara'}/> */}
               {/* <ContainerCardSmall pic={cropcompany} collection={'VELIGNARA'} about={"Dakar, Senegal"} signed={"Last Deposit: 01-01-2024"} containerName={'Velignara'}/> */}
               
              
              
                {/* </div> */}

            {/* </Box> */}

         
          {/* </Grid> */}
    
     {/* </Grid> */}


          <Grid container spacing={2} sx={{padding: '10px', marginTop: 4, marginLeft:{xs:"0.1rem"} }}>
       
       {/**here 2 */}
         <Grid container spacing={2} sx={{ padding: '10px', itemAlign:"center"}}>


           {/* REQUESTS here */}
       {/* 
           <Grid container spacing={2} sx={{ marginBottom: '2rem', width: '100%', backgroundColor: 'white', padding: '0.7rem', borderRadius: '1rem' }} >

           <Grid item xs={1} sx={{mb: 0}}>
       <p style={{fontSize:"24px",fontWeight:"600",position:"relative",top:"-1.2rem",left:"2rem"}}>Requests</p>
        </Grid>


   <Grid item xs={12} md={12} lg={12} >
           <div style={{background: 'white',  padding: '0px',marginTop:"-2.5rem"}}>

       
        { 
        
       responsesFromDB.length > 0 ?  <RequestsStats  forms={responsesFromDB}/> 
       :
       <center style={{marginTop:"2rem",marginBottom:"2rem"}}>
          No Requests to display.
       </center>

          }
           </div>
           </Grid>
   
           </Grid>
        */}
              

   {/**IT ENDS HERE - REQUESTS */}
           <Grid container spacing={2} sx={{ marginBottom: '2rem',marginTop: '1rem', width: '100%', backgroundColor: 'white', padding: '0.7rem', borderRadius: '1rem' }} >
         <Grid item xs={1} sx={{mb: 0, }}>
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
{/* <Box item xs={1}> */}

    {/* <Box sx={{ width: '20%', marginRight: '1.5rem', marginTop: '2.2%',}}>
       <SmallCustomSearchBar   title={"Search Crop"} />
          </Box>*/}
     
    {/*
     <Box sx={{ flexGrow: 1}}>
       <Button
         variant="contained"
         style={{ height: '45px', minWidth: '45px', backgroundColor: '#000000',  marginTop: '10.5%' }}
       >
         <SearchIcon />
       </Button>
     </Box>
     */}
{/* </Box> */}
  {/*
     <Grid item sx={{mb: 0}}>
    <FormControl sx={{ minWidth: 140, background: 'white', marginTop: '2.2rem' }}>
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
          */}

             <Grid item xs={12} md={12} lg={12} >
           <div style={{background:'white' /*'#F8F8F8'*/,  padding: '10px',marginTop:"-2.5rem"}}>
        { 
        
        farmersFromDB && farmersFromDB.length?  
        <FarmerStats  farmers={farmersFromDB}/> 
        // <AgentStatsLong farmers={agentsFromDB} />
        :
       
        loading===true?
        <center style={{marginTop:"6rem"}}>
        <CircularProgress/>
        </center>
        : 
        "No farmers for this retailer."


          }
           </div>
           </Grid>
   </Grid>
  

     

 


          </Grid>




           
         </Grid>



         {/* <Grid container spacing={2} sx={{background:'white', padding: '10px',marginTop:"2rem"}}> */}
       
       {/**here 2 */}
         {/* <Grid container spacing={2} sx={{ padding: '10px'}}>
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
   </Grid> */}
   {/*here */}

           {/* <Grid item xs={12} md={12} lg={12} >
           <div style={{background:'white',  padding: '10px',marginTop:"-2.5rem",fontSize:"1rem !important",}}>
        { updatedCropDeposits && <CropDepositStats cropDeposits={updatedCropDeposits}/> }
           </div>
           </Grid> */}
           
         {/* </Grid> */}




          
        
        </Grid>
      </Container>
    </>
  );
}
