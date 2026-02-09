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





import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';
import AdditionalInfoCard from 'src/components/home/additional-info-card';
import CropDepositStats from 'src/components/home/crop-deposit-stats';
import CropStats from 'src/components/home/crop-stats';
import ScrollingCampaignCard from 'src/components/home/scrolling-campaign-card';
import FarmerStats from 'src/components/home/farmer-stats';
import { fetchFarmersFromPage,fetchAgentsFromPage, sectionFarmersFromPage,fetchLastThreeDeposits } from 'src/redux/actions/group.action';
import { saveCurrentFarmersToDisplay,saveFilteredFarmers,saveCurrentLocationFilter,saveCurrentCropTypeFilter,saveCurrentCropFilter,saveTotalPagesFarmers } from 'src/redux/reducers/group.slice';
import ContainerDashboardCard from 'src/components/home/container-dashboard-card';

import cropcompany from 'src/assets/images/cropcompany.jpeg';

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const CHART_DATA = [50, 50];

export default function ContainersPageRegMgr() {
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

  function formatDate(date) {
     const dated = new Date(date)
    const day = String(dated.getDate()).padStart(2, '0');
    const month = String(dated.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0 to 11
    const year = dated.getFullYear();
  
    return `${day}-${month}-${year}`;
  }


  const { myGroups, isLoading,
    currentFarmersToDisplay,currentAgentsToDisplay,
    totalPagesFarmers,allFarmers,filteredFarmers,
    currentDepositsToDisplay,
   } = useSelector((state) => state.group);
  //const { students } = useSelector((state) => state.student);



  useEffect(() => {
 
    dispatch(fetchLastThreeDeposits())
  }, [])


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
  
    //("farmers from DB state is now-->",farmersFromDB)
  
  


  },[])


  useEffect(()=>{
    /**THIS USE EFFECT IS TO CLEAR UP FILTERS ANYTIME THE PAGE IS RELOADED, FOR A FRESH START */
    /**THIS USE EFFECT HAS TO BE BEFORE THE PLACE WHERE WE SET FARMERS TO DISPLAY */
       
        
           dispatch(saveCurrentFarmersToDisplay(allFarmers && allFarmers.slice(0,5)))
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
   
     console.log("farmers from DB state is now-->",farmersFromDB)
   
   
 
 
   },[currentFarmersToDisplay])








  //console.log("current agents gotten is-->",currentAgentsToDisplay)

 // console.log("current farmers  gotten is-->",currentFarmersToDisplay)




  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');





  return (
    <>

      <Helmet>
        <title> UfarmX </title>
      </Helmet>

      <Container maxWidth="xl">
        
        {/* <SearchBox style={{ width: '100%' }} /> */}

   {/*console.log("farmers from DB is now-->",farmersFromDB)*/}
      
        <Grid container spacing={3} style={{scale:"0.9",position:"relative",left:"-1rem"}}>
        
        {/*1 */}
        <Grid container spacing={3} style={{}}>
          <Grid item xs={12} md={12} lg={6}>
            <div style={{ background: 'white'/*'#F8F8F8'*/, padding: '10px' }}>
            
   

       <ContainerDashboardCard image={cropcompany} headerOne={`Last Deposit: ${updatedCropDeposits &&updatedCropDeposits[0] && updatedCropDeposits[0].createdAt? formatDate(updatedCropDeposits[0].createdAt):` 01-01-2024`}`} headerTwo={'Profile'} value={''} type={'one'} farmName={`'41°24'12.2"N 2°10'26.5"E'`} farmerName={"Joe Thomas"} city={"Dakar, Senegal"} email={"default@gmail.com"} phoneNumber={"+221 555-380-1000"} />
            </div>
          </Grid>

          {/*2 */}
          <Grid item xs={8} md={12} lg={6}>
            <div style={{ background: 'white', padding: '10px' }}>
            <ContainerDashboardCard image={cropcompany} headerOne={`Last Deposit: ${updatedCropDeposits &&updatedCropDeposits[0] && updatedCropDeposits[0].createdAt? formatDate(updatedCropDeposits[0].createdAt):` 01-01-2024`}`} headerTwo={'Profile'} value={''} type={'one'}  farmName={`'41°24'12.2"N 2°10'26.5"E'`} farmerName={"Joe Thomas"} city={"Dakar, Senegal"} email={"default@gmail.com"} phoneNumber={"+221 555-380-1000"} />
            </div>
          </Grid>
 
      </Grid>


        <br />


         <Grid container spacing={2} sx={{background: 'white'/*,background: '#F8F8F8'*/, padding: '10px',marginTop:"2rem",width:"100%",position:"relative",left:"0.8rem"}}>
       
     
         <Grid container spacing={2} sx={{ padding: '10px'}}>
       
         <Grid item xs={3} sx={{mb: 0}}>
       <p style={{fontSize:"19px",fontWeight:"400",position:"relative",top:"-1.2rem",left:"2rem"}}>Recent Crops</p>
        </Grid>
      
      
   
   </Grid>
   

           <Grid item xs={12} md={12} lg={12} >
           <div style={{background:'white' /*'#F8F8F8'*/,  padding: '0px',marginTop:"-2.5rem",fontSize:"1rem !important",}}>
        { updatedCropDeposits && <CropDepositStats cropDeposits={updatedCropDeposits}/> }
           </div>
           </Grid>
           
         </Grid>




          
        
        </Grid>
      </Container>
    </>
  );
}
