import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Paper, Button, MenuItem, FormControl, Select, Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { fCurrency, fNumber } from '../utils/formatNumber';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EmptyRowCard from 'src/components/home/empty-row-card';
import SearchIcon from '@mui/icons-material/Search';
import { fetchUserData } from 'src/redux/actions/auth.action';
// @mui
import { useTheme, styled } from '@mui/material/styles';


import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';

import FarmerStatsLong from 'src/components/home/farmer-stats-long';

import ResponsesStatsLong from 'src/components/home/responses-stats-long';

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const CHART_DATA = [50, 50];

export default function AgentProfilePage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { page } = useParams();

  const { user } = useSelector((state) => state.auth);


 
  useEffect(()=>{

   if(!user ){
    navigate('/login')
   }

  },[user])


  const { agentInFocus } = useSelector((state) => state.group);
  
 
  const[farmersFromDB,setFarmersFromDB] = useState([])
  const[responsesFromDB,setResponsesFromDB] = useState([])

  const[loading,setLoading] = useState(false)


  const { myGroups,
          isLoading,
         currentFarmersForThisAgent,
         currentAgentsToDisplay,
         totalPagesFarmersForThisAgent,
         allResponsesAdmin,
         allFarmersForThisAgent,
         filteredFarmersForThisAgent 
        } = useSelector((state) => state.group);

  //const { students } = useSelector((state) => state.student);


  //useEffect(() => {
  //  if(!agentInFocus||agentInFocus &&  !agentInFocus.firstName){
  //   return navigate("/dashboard/deposits");
  //  }
  // }, [])

  //console.log("AGENT PROFILE PAGE,  AGENT IN FOCUS IS-->",agentInFocus)




//  useEffect(() => {
//
//   
//     
//      dispatch(fetchFarmersFromPage(1))
//      dispatch(fetchAgentsFromPage(1))
//     
//
//  }, [])


//useEffect(()=>{
//  /**THIS USE EFFECT IS FOR INITIAL LOAD, USUALLY AFTER LOGIN, WITHOUT HAVING SELECTED A PAGE */
//if(!page){
//  dispatch(sectionFarmersFromPageForThisAgent(1,allFarmersForThisAgent,filteredFarmersForThisAgent))
//}else{
//  dispatch(sectionFarmersFromPageForThisAgent(page,allFarmersForThisAgent,filteredFarmersForThisAgent))
//}
//
//},[page])


  useEffect(()=>{


    let responsesFromDBArray = [


    ]
  
    allResponsesAdmin && allResponsesAdmin.forEach((item,index)=>(
  
     
      responsesFromDBArray.push({...item,

        id:item._id?item._id:item.id?item.id: item.OriginalResponseId?item.OriginalResponseId :Math.random(),
      
      })
    ))

    setResponsesFromDB(responsesFromDBArray)

    if(!responsesFromDBArray){
      setLoading(true)

      setTimeout(()=>{
        setLoading(false)
      },4000)
    }
  
    //console.log("responses from DB FOR THIS PARTICULAR AGENT state is now-->",responsesFromDB)
  

  },[allResponsesAdmin])



  useEffect(()=>{


    let farmersFromDBArray = [


    ]
  
    currentFarmersForThisAgent && currentFarmersForThisAgent.forEach((item,index)=>(
  
     
      farmersFromDBArray.push({...item,

        id:item._id?item._id:item.id?item.id: item.OriginalResponseId?item.OriginalResponseId :Math.random(),
      
      })
    ))

    setFarmersFromDB(farmersFromDBArray)

    if(!farmersFromDBArray){
      setLoading(true)

      setTimeout(()=>{
        setLoading(false)
      },4000)
    }
  
   // console.log("farmers from DB FOR THIS PARTICULAR AGENT state is now-->",farmersFromDB)
  

  },[currentFarmersForThisAgent])





  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');


 


  return (
    <>

      <Helmet>
        <title> UfarmX </title>
      </Helmet>

      <Container sx={{scale:"0.9",position:"relative",top:{md:"0rem", xs: '1rem'}}} maxWidth="xl">
        
       
  
      
      <Grid container spacing={3}>
        <Grid container spacing={2} sx={{ background: 'white' /*'#F8F8F8'*/, padding: '10px' }}>
          {/**here 2 */}
          <Grid container spacing={2} sx={{ padding: '10px', alignItems: 'center' }}>
            <Grid item xs={12} sm={3} sx={{ mb: 0 }}>
              <p style={{ 
                fontSize: { xs: "20px", sm: "24px" }, 
                fontWeight: "600", 
                position: "relative", 
                top: { xs: "0rem", sm: "-1.2rem" }, 
                left: { xs: "0rem", sm: "2rem" },
                textAlign: { xs: "center", sm: "left" },
                marginBottom: { xs: "1rem", sm: "0" }
              }}>Responses</p>
            </Grid>
            
            <Grid item xs={6} sm={2} sx={{ mb: 0 }}>
              <FormControl sx={{ minWidth: { xs: "100%", sm: 140 }, background: 'white', width: "100%" }}>
                <Select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  displayEmpty
                  label=""
                  sx={{
                    height: 45,
                    minWidth: { xs: "100%", sm: 140 },
                    p: 1,
                    width: "100%"
                  }}
                >
                  <MenuItem value="">
                    Select Type
                  </MenuItem>
                  <MenuItem value={'1'}>1</MenuItem>
                  <MenuItem value={'2'}>2</MenuItem>
                  <MenuItem value={'3'}>3</MenuItem>
                  <MenuItem value={'4'}>4</MenuItem>
                </Select>
              </FormControl>
            </Grid>
        
            <Grid item xs={6} sm={2} sx={{ mb: 0 }}>
              <FormControl sx={{ minWidth: { xs: "100%", sm: 140 }, background: 'white', width: "100%" }}>
                <Select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  displayEmpty
                  label=""
                  sx={{
                    height: 45,
                    minWidth: { xs: "100%", sm: 140 },
                    p: 1,
                    width: "100%"
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
            
            <Grid item xs={8} sm={3} sx={{ mb: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                width: "100%", 
                flexGrow: 1
              }}>
                <SmallCustomSearchBar title={"Search Crop"} />
              </Box>
              
              <Box sx={{ flexShrink: 0 }}>
                <Button
                  variant="contained"
                  sx={{ 
                    height: '45px', 
                    minWidth: '45px', 
                    backgroundColor: '#000000',
                    width: "45px"
                  }}
                >
                  <SearchIcon />
                </Button>
              </Box>
            </Grid>

            <Grid item xs={4} sm={2} sx={{ mb: 0 }}>
              <FormControl sx={{ minWidth: { xs: "100%", sm: 140 }, background: 'white', width: "100%" }}>
                <Select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  displayEmpty
                  label=""
                  sx={{
                    height: 45,
                    minWidth: { xs: "100%", sm: 120 },
                    p: 1,
                    width: "100%"
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

          <Grid item xs={12} md={12} lg={12}>
            <div style={{ 
              background: 'white' /*'#F8F8F8'*/,  
              padding: '10px',
              marginTop: { xs: "0rem", sm: "-2.5rem" }
            }}>
              { 
                responsesFromDB && responsesFromDB.length ?
                  <ResponsesStatsLong farmers={responsesFromDB}/> 
                :
                  <center style={{ marginTop: { xs: "2rem", sm: "6rem" }, marginTop: "2rem" }}>
                    {
                      loading ?  
                        <CircularProgress/>
                      : 
                        "No Responses for this agent!"
                    }
                  </center>
              }
            </div>
          </Grid>
        </Grid>
        
        <br />
        <br />
        <br />

        <Grid container spacing={2} sx={{ background: 'white' /*'#F8F8F8'*/, padding: '10px' }}>
          {/**here 2 */}
          <Grid container spacing={2} sx={{ padding: '10px', alignItems: 'center' }}>
            <Grid item xs={12} sm={3} sx={{ mb: 0 }}>
              <p style={{ 
                fontSize: { xs: "20px", sm: "24px" }, 
                fontWeight: "600", 
                position: "relative", 
                top: { xs: "0rem", sm: "-1.2rem" }, 
                left: { xs: "0rem", sm: "2rem" },
                textAlign: { xs: "center", sm: "left" },
                marginBottom: { xs: "1rem", sm: "0" }
              }}>Farmers</p>
            </Grid>
            
            <Grid item xs={6} sm={2} sx={{ mb: 0 }}>
              <FormControl sx={{ minWidth: { xs: "100%", sm: 140 }, background: 'white', width: "100%" }}>
                <Select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  displayEmpty
                  label=""
                  sx={{
                    height: 45,
                    minWidth: { xs: "100%", sm: 140 },
                    p: 1,
                    width: "100%"
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
        
            <Grid item xs={6} sm={2} sx={{ mb: 0 }}>
              <FormControl sx={{ minWidth: { xs: "100%", sm: 140 }, background: 'white', width: "100%" }}>
                <Select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  displayEmpty
                  label=""
                  sx={{
                    height: 45,
                    minWidth: { xs: "100%", sm: 140 },
                    p: 1,
                    width: "100%"
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
            
            <Grid item xs={8} sm={3} sx={{ mb: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                width: "100%", 
                flexGrow: 1
              }}>
                <SmallCustomSearchBar title={"Search Crop"} />
              </Box>
              
              <Box sx={{ flexShrink: 0 }}>
                <Button
                  variant="contained"
                  sx={{ 
                    height: '45px', 
                    minWidth: '45px', 
                    backgroundColor: '#000000',
                    width: "45px"
                  }}
                >
                  <SearchIcon />
                </Button>
              </Box>
            </Grid>

            <Grid item xs={4} sm={2} sx={{ mb: 0 }}>
              <FormControl sx={{ minWidth: { xs: "100%", sm: 140 }, background: 'white', width: "100%" }}>
                <Select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  displayEmpty
                  label=""
                  sx={{
                    height: 45,
                    minWidth: { xs: "100%", sm: 120 },
                    p: 1,
                    width: "100%"
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

          <Grid item xs={12} md={12} lg={12}>
            <div style={{ 
              background: 'white' /*'#F8F8F8'*/,  
              padding: '10px',
              marginTop: { xs: "0rem", sm: "-2.5rem" }
            }}>
              { 
                farmersFromDB && farmersFromDB.length ?
                  <FarmerStatsLong farmers={farmersFromDB}/> 
                :
                  <center style={{ marginTop: { xs: "2rem", sm: "6rem" }, marginTop: "2rem" }}>
                    {
                      loading ?  
                        <CircularProgress/>
                      : 
                        "No Farmers for this agent!"
                    }
                  </center>
              }
            </div>
          </Grid>
        </Grid>
      </Grid>
      </Container>
    </>
  );
}
