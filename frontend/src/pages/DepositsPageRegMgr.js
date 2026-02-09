import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, FormControl, Box, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAgentsFromPage, fetchFarmersFromPage, fetchMyGroups } from 'src/redux/actions/group.action';
import { fetchUserData } from 'src/redux/actions/auth.action';

import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';

import  noimage from 'src/assets/images/no-image.jpg';






import FarmerStatsLong from 'src/components/home/farmer-stats-long';
import Paginate from 'src/components/buttons/Paginate';
import AgentStatsLong from 'src/components/home/agent-stats-long';
import PaginateAgents from 'src/components/buttons/PaginateAgents';
import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';
import { CiFilter } from 'react-icons/ci';
import { FaPlus } from "react-icons/fa";



export default function DepositsPageRegMgr() {
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

 
  const { myGroups, isLoading,currentFarmersToDisplay,currentAgentsToDisplay,totalPagesFarmers ,totalPagesAgents} = useSelector((state) => state.group);
  //const { students } = useSelector((state) => state.student);

  const[farmersFromDB,setFarmersFromDB] = useState([])
  const[agentsFromDB,setAgentsFromDB] = useState([])

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(false);
  const [loadingPage,setLoadingPage] = useState(false)



      useEffect(()=>{
      setTimeout(()=>{
      setLoadingPage(true)
      }
      ,1500)
      },[])
      

  //console.log("currentAgents to display ARE-->",currentAgentsToDisplay)


  useEffect(() => {

    if(page){
    
     dispatch(fetchAgentsFromPage(page))

     }
     else{
   
      dispatch(fetchAgentsFromPage(1))

     }

  }, [page])



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


    //console.log("agents from DB ARRAY-->",agentsFromDBArray)





    if(selectedLocation){

      //console.log("selected location is-->",selectedLocation)

      agentsFromDBArray = agentsFromDBArray.filter((item)=>(
          item.location.includes(selectedLocation) || item.location.includes(selectedLocation.toLocaleLowerCase())
      ))
    }


    setAgentsFromDB(agentsFromDBArray)
  
   
  



  },[page,currentAgentsToDisplay,selectedLocation])



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

      {!loadingPage?
<center style={{display:"flex",justifyContent:"center",alignItems:"center",height:"90vh"}}>
<CircularProgress/>
</center>
:

      <Container style={{scale:"0.9",position:"relative",top:"-5rem",left:"-2rem"}} maxWidth="xl" >
        
          {/* <CustomToggleSwitch activeButton={activeButton} setActiveButton={setActiveButton} handleViewStudentsClick={handleViewStudentsClick} handleAddStudentsClick={handleAddStudentsClick}/>*/}

          <Grid container spacing={2} alignItems="center" justifyContent="flex-end" style={{marginTop:"0.3rem",paddingRight:"0rem"}}> 
     {/*<CustomToggleSwitch activeButton={activeButton} setActiveButton={setActiveButton} handleViewStudentsClick={handleViewStudentsClick} handleAddStudentsClick={handleAddStudentsClick}/>*/}
  
     <Grid container spacing={2} alignItems="center" justifyContent="flex-start" style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",marginTop:"0.3rem",paddingRight:"0rem"}}> 
       
     <Grid item xs={12} style={{display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",left:"0.6rem"}}>

<div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}}>

<h1 style={{fontWeight:"500",marginBottom:"0rem",position:"relative",left:"0.5rem"}}>Agents</h1>
<div style={{position:"relative",left:"0.5rem"}}>View and manage all agents</div>

</div>


   <Button
   onClick={()=>{navigate('/dashboard/add-agent')}}
         variant={'contained'}
         style={{
           minHeight: '50px',
           maxWidth: '150px',
           backgroundColor: '#0A6054',
           // backgroundColor: '#FFFFFF',

           color: 'white',
           border: '1px solid black',
           fontWeight:"400",
           fontSize:"1.2rem",
           borderRadius: '5px',
           marginRight: '12px',
         }}
         
       >
        <FaPlus   style={{marginRight:"0.3rem"}}/>
        New Agent
       </Button>

</Grid>



</Grid>



<Grid container spacing={2} alignItems="center" justifyContent="flex-end" style={{display:"flex",alignItems:"flex-end",justifyContent:"flex-end",paddingRight:"0rem",position:"relative",left:"0.6rem"}}> 

<Grid item  style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",borderRadius:"2rem",padding:"0.5rem" }}>

    <Box sx={{ width: '100%', marginTop: '0%'}}>
      <SmallCustomSearchBar   title={"Search Agents"} />
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
    

      <Grid item /*xs={6}*/ style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "0rem", marginBottom: "0rem",backgroundColor:"#F9F9F9",borderRadius:"2rem",padding:"0.5rem" }}>
         {/*   <Box sx={{ width: '100%'}}>
       
         //     <Button
         //     onClick={()=>{navigate('/dashboard/add-agent')}}
         //       variant={'contained'}
         //       style={{
         //         minHeight: '50px',
         //         minWidth: '180px',
         //         backgroundColor: '#2DA840',
         //         color: '#fff',
         //         border: 'none',
         //         borderRadius: '20px',
         //         marginRight: '4px',
         //       }}
         //       onClick={handleOne}
         //     >
         //      Add Agent
         //     </Button>


         //     <Button
         //       variant={'contained'}
         //       style={{
         //         minHeight: '50px',
         //         minWidth: '180px',
         //         backgroundColor: '#21712E',
         //         color: '#fff',
         //         border: 'none',
         //         borderRadius: '20px',
         //         marginRight: '4px',
         //       }}
         //       // onClick={handleOne}
         //     >
         //      Filter
         //     </Button>



            </Box> 
                */}

         
          </Grid>
     

          </Grid>

   

          <Grid item xs={12} md={12} lg={12} >
           <div style={{background: 'white', padding: '0px',marginTop:"-2.5rem",width:"100%"}}> 

            
                {/**here 2 */}
                <Grid container spacing={2} sx={{ padding: '10px',width:"100%"}}>
                  {/*<Grid item xs={3} sx={{mb: 0}}>
                <p style={{fontSize:"24px",fontWeight:"600",position:"relative",top:"-1.2rem",left:"2rem"}}>Farmers</p>
                 </Grid>*/}


                 <Grid xs={2} item sx={{mb: 0}}>
             <FormControl sx={{ minWidth: 140, background: 'white'}}>
                  <Select
                    value={selectedLocation}
                   
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    displayEmpty
                    label=""
                    sx={{
                      height: 45,
                      minWidth: 140,
                      p: 1,
                    }}
                  >
                    <MenuItem value={false}>
                      Select Location
                    </MenuItem>
                    <MenuItem value={"Sénégal"}>Sénégal</MenuItem>
                    <MenuItem value={"Nigeria"}>Nigeria</MenuItem>
                    <MenuItem value={"Cameroon"}>Cameroon</MenuItem>
                    <MenuItem value={false}>
                      Clear Filter
                    </MenuItem>
                   
                  </Select>
                </FormControl>
                  </Grid> 
               
               
               
                <Grid xs={2} item sx={{mb: 0}}>
             <FormControl sx={{ minWidth: 140, background: 'white',opacity:"0" }}>
                  <Select
                  disabled={"true"}
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
                      Select Crop Type
                    </MenuItem>
                <MenuItem value={'Cash Crops'}>Cash Crops</MenuItem>
                <MenuItem value={'Forage Crops'}>Forage Crops</MenuItem>
                <MenuItem value={'Fibre Crops'}>Fibre Crops</MenuItem>
                <MenuItem value={'Oil Crops'}>Oil Crops</MenuItem>
               
                  </Select>
                </FormControl>
              </Grid>
           
             <Grid xs={2} item sx={{mb: 0}}>
             <FormControl sx={{ minWidth: 140, background: 'white',opacity:"0",display:"none" }}>
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
                      Select Crop
                    </MenuItem>
                    <MenuItem value={"Maize"}>Maize</MenuItem>
                    <MenuItem value={"Tomato"}>Tomato</MenuItem>
                    <MenuItem value={"Potato"}>Potato</MenuItem>
                   
                  </Select>
                </FormControl>
              </Grid>
              &nbsp; &nbsp;
         
          {/*<div style={{opacity:"0"}}>
              <Box sx={{ width: '20%', marginTop: '1.2%',}}>
                <SmallCustomSearchBar   title={"Search Crop"} />
              </Box>
            
              
              <Box sx={{ flexGrow: 1}}>
                <Button
                  variant="contained"
                  style={{ height: '45px', minWidth: '45px', backgroundColor: '#000000',  marginTop: '6.5%' }}
                >
                  <SearchIcon />
                </Button>
              </Box>
              </div>
           */}

          
             {/*
              <Grid item sx={{mb: 0}}>
             <FormControl sx={{ minWidth: 140, background: 'white' }}>
                  <Select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    displayEmpty
                    disabled={true}
                    label=""s
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
            </Grid>
            {/*here */}
        { agentsFromDB && agentsFromDB.length ?
        
          <AgentStatsLong farmers={agentsFromDB}/> 

              :
              <center style={{marginTop:"2rem"}}>
              <CircularProgress/>
              </center>
            

          }
           </div>
           </Grid>
 
           {/*<PaginateAgents style={{position:"relative"}} pages={totalPagesAgents} page={page} isAdmin={true}/>*/}
          
    
    
    {/* OLD AGENT FORMAT
      
      <Grid container spacing={2}>
            <Grid item xs={8} md={12} lg={12}>
              <div style={{background: 'white',  padding: '10px',display:"flex",flexDirection:"column",gap:"1rem"}}>
               

               <CampaignCard pic={agent1} collection={'AHMED MUSA'} about={"Container #1"} signed={"+221 610-000-1000 | Ahmed@Ufarmx.com"}/>
               <CampaignCard pic={agent2} collection={'DJIBRIL CISSE'} about={"Container #1"} signed={"+221 610-000-1000 | Djibril@Ufarmx.com"}/>
              
               <CampaignCard pic={agent3} collection={'KAYODE MUTIU'} about={"Container #1"} signed={"+221 610-000-1000 | Kayode@Ufarmx.com"}/>
                </div>
            </Grid>
            
          </Grid>
      */}


      </Container>
}
    </>
  );
}
