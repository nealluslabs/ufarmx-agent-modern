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
import SuperAdminStatsLong from 'src/components/home/superadmin-stats-long';
import AdminStatsLong from 'src/components/home/admin-stats-long';


export default function AdminsPage() {
  const theme = useTheme();
  const { page } = useParams();
    
 
  const dispatch = useDispatch();
  


  const navigate = useNavigate();
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
     allAdmins,
     allSuperAdmins,
    totalPagesFarmers,
    allFarmers,
    filteredFarmers,
    currentLocationFilter,
    currentCropFilter,
    currentCropTypeFilter 
  } = useSelector((state) => state.group);
   
  const { students } = useSelector((state) => state.student);


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

  const[adminsFromDB,setAdminsFromDB] = useState([])
  const[superAdminsFromDB,setSuperAdminsFromDB] = useState([])




  useEffect(() => {
    /*THIS USE EFFECT IS IMPORTANT TO ASSGIN AN ID SO MUI DATA GRID WILL ACCEPT THE DATA */
  const forcedId1 =  []
  const forcedId2 =  []

  //console.log("ALL SUPERADMINS-->",allSuperAdmins)
  //console.log("ALL  ADMINS-->",allAdmins)

    allAdmins.forEach((item,index)=>{
  
    forcedId1.push({
      ...item,
      index:index,
      id:item.id ? item.id: item._id ? item._id: item.OriginalResponseId ? item.OriginalResponseId:item.name ? item.name: Math.random()
    })
      
  })


  allSuperAdmins.forEach((item,index)=>{
  
    forcedId2.push({
      ...item,
      index:index,
      id:item.id ? item.id: item._id ? item._id: item.OriginalResponseId ? item.OriginalResponseId:item.name ? item.name: Math.random()
    })
      
  })

  setAdminsFromDB(forcedId1)
  setSuperAdminsFromDB(forcedId2)

 

  }, [currentFarmersToDisplay])



console.log("admins from db is --->",allAdmins)


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
         //('FARMERS CLEARED UP!');
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

{ superAdminsFromDB.length < 0 || adminsFromDB.length < 0 || !loadingPage?

     <center style={{display:"flex",justifyContent:"center",alignItems:"center",height:"90vh"}}>
      <CircularProgress/>
     </center>
  :  
    <>
      <Container maxWidth="xl" style={{scale:"0.9",position:"relative",top:"-1rem",left:"-2rem"}} >
      
   
     <Grid container spacing={2} alignItems="center" justifyContent="flex-start" style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",marginTop:"0.3rem",paddingRight:"0rem"}}> 
       
     <Grid item xs={12} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>

<div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}}>

<h1 style={{fontWeight:"500",marginBottom:"0rem"}}>SuperAdmins</h1>
<div>List of Super Admins</div>

</div>


   <Button
    onClick={()=>{navigate('/dashboard/add-superadmin')}}
         variant={'contained'}
         style={{
           minHeight: '50px',
           maxWidth: '150px',
           backgroundColor: '#0A6054',
           // backgroundColor: '#FFFFFF',

           color: 'white',
           border: '1px solid black',
           fontWeight:"400",
           fontSize:"0.8rem",
           borderRadius: '5px',
           marginRight: '12px',
         }}
         
       >
        <FaPlus   style={{marginRight:"0.1rem"}}/>
        New SuperAdmin
       </Button>

</Grid>

          </Grid>
        
          

          <Grid container spacing={2} alignItems="center" justifyContent="flex-end" style={{display:"flex",alignItems:"flex-end",justifyContent:"flex-end",paddingRight:"0rem"}}> 
          
          <Grid item  style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",borderRadius:"2rem",padding:"0.5rem" }}>
         
              <Box sx={{ width: '100%', marginTop: '0%'}}>
                <SmallCustomSearchBar   title={"Search Farmers"} />
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
               
           

           

    
                 </Grid>

        
            {/*here */}



        { 
        
       superAdminsFromDB.length > 0 ?
          <SuperAdminStatsLong  farmers={superAdminsFromDB}/> 
          :
          <center style={{marginTop:"6rem"}}>
           No SuperAdmins To Display
          </center>
          }
           </div>
           </Grid>
 


      </Container>


      <Container maxWidth="xl" style={{scale:"0.9",position:"relative",top:"-5rem",left:"-2rem"}} >
      
   
      <Grid container spacing={2} alignItems="center" justifyContent="flex-start" style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",marginTop:"0.3rem",paddingRight:"0rem"}}> 
        
      <Grid item xs={12} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
 
 <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}}>
 
 <h1 style={{fontWeight:"500",marginBottom:"0rem"}}>Admins</h1>
   <div>List of Admins</div>
 
 </div>
 
 
    <Button
    onClick={()=>{navigate('/dashboard/add-admin')}}
          variant={'contained'}
          style={{
            minHeight: '50px',
            maxWidth: '150px',
            backgroundColor: '#0A6054',
            // backgroundColor: '#FFFFFF',
 
            color: 'white',
            border: '1px solid black',
            fontWeight:"400",
            fontSize:"1.1rem",
            borderRadius: '5px',
            marginRight: '12px',
          }}
          
        >
         <FaPlus   style={{marginRight:"0.1rem"}}/>
         New Admin
        </Button>
 
 </Grid>
 
           </Grid>
         
           
 
           <Grid container spacing={2} alignItems="center" justifyContent="flex-end" style={{display:"flex",alignItems:"flex-end",justifyContent:"flex-end",paddingRight:"0rem"}}> 
           
           <Grid item  style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",borderRadius:"2rem",padding:"0.5rem" }}>
          
               <Box sx={{ width: '100%', marginTop: '0%'}}>
                 <SmallCustomSearchBar   title={"Search Farmers"} />
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
                
            
 
            
 
     
                  </Grid>
 
         
             {/*here */}
 
 
 
         { 
         
        adminsFromDB.length > 0 ?
           <AdminStatsLong  farmers={adminsFromDB}/> 
           :
           <center style={{marginTop:"6rem"}}>
            No Admins To Display
           </center>
           }
            </div>
            </Grid>
  
 
 
       </Container>
 
   </>

  






    }


    </>
  );
}
