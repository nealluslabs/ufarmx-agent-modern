import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Paper, Button, MenuItem, FormControl, Select, Box, CircularProgress
  
 } from '@mui/material';


import {
 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  
} from '@mui/material';




import { useEffect, useState } from 'react';
import { fCurrency, fNumber } from '../utils/formatNumber';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EmptyRowCard from 'src/components/home/empty-row-card';
import SearchIcon from '@mui/icons-material/Search';
import { fetchUserData } from 'src/redux/actions/auth.action';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import defaultFarmerPic from 'src/assets/images/farmer10.jpeg';




import CustomToggleSwitchVendors from 'src/components/buttons/CustomToggleSwitchVendors';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { MdShowChart } from 'react-icons/md';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import CustomToggleSwitchCreditScore from 'src/components/buttons/CustomToggleSwitchCreditScore';
import FarmerIntroOnlyCard from 'src/components/home/farmer-intro-only-card';



const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const CHART_DATA = [50, 50];

export default function CreditScorePage() {
  const theme = useTheme();


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
 
 
  useEffect(()=>{

   if(!user ){
    navigate('/login')
   }

  },[user])

 
  const[farmersFromDB,setFarmersFromDB] = useState([
   // {
   // img:tomato, crop:"Tomato",  id:"0", depositDate:"May 18, 2025",qualityGrade:"Grade A",status:"In Storage",quantity:"500 Kg"
   // },
   // {
   //     img:maize, crop:"Maize",  id:"1",  depositDate:"May 18, 2025",qualityGrade:"Grade A",status:"In Storage",quantity:"250 Kg"
   // },
   //  {
   //     img:cucumber,  crop:"Cucumber", id:"2", depositDate:"May 18, 2025",qualityGrade:"Grade B",status:"In Storage",quantity:"500 Kg"
   // },
   // {
   //     img:carrot,  crop:"Carrot", id:"3", depositDate:"May 20, 2025",qualityGrade:"Grade B",status:"In Storage",quantity:"250 Kg"
   // },
   // {
   //     img:bellpepper,  crop:"Bell Pepper", id:"4", depositDate:"May 21, 2025",qualityGrade:"Grade A",status:"In Storage",quantity:"500 Kg"
   // },
   // {
   //     img:potato,   crop:"Potato",id:"5", depositDate:"May 22, 2025",qualityGrade:"Grade A",status:"In Storage",quantity:"255 Kg"
   // },
   // {
   //     img:lemon,  crop:"Lemon",  id:"6",depositDate:"May 23, 2025",qualityGrade:"Grade B",status:"In Storage",quantity:"150 Kg"
   // },
   // {
   //     img:avocado,  crop:"Avocado", id:"7", depositDate:"May 24, 2025",qualityGrade:"Grade B",status:"In Storage",quantity:"100 Kg"
   // },
  ])
  const[loading,setLoading] = useState([])

  const[updatedCropDeposits,setUpdatedCropDeposits] = useState([])
  
  const[farmersAddedPerMonth,setFarmersAddedPerMonth] = useState([])
  const[allLandSize,setAllLandSize] = useState(0)
  const[totalLandForCurrentMonth,setTotalLandForCurrentMonth] = useState([])
  const[ loadedFarmersPerMonth,setLoadedFarmersPerMonth]= useState(false)

  const[agentsAddedPerMonth,setAgentsAddedPerMonth] = useState([])

  const [activeButton, setActiveButton] = useState('Fertilizers');

  const handleFertilizersClick = () => {
  setActiveButton('Fertilizers');
  };
  
  const handleSeedsClick = () => {
  setActiveButton('Seeds');
  };

  const handleEquipmentClick = () => {
    setActiveButton('Equipment');
    };

    const handleServicesClick = () => {
      setActiveButton('Services');
      };
  

  const { myGroups, isLoading,
    currentFarmersToDisplay,currentAgentsToDisplay,
    totalPagesFarmers,allFarmers,filteredFarmers,
    currentDepositsToDisplay,tablesSet,farmerInFocus
   } = useSelector((state) => state.group);
  //const { students } = useSelector((state) => state.student);


 // useEffect(() => {
 //
 //  if(!tablesSet){
 //   window.location.reload()
 //  }
 // }, [])

 

  useEffect(() => {
 
   
    //dispatch(saveTablesSet(true))
  }, [])




  useEffect(()=>{


  function calculateTotalLand(allFarmers) {
    let totalLand = 0;
  
    allFarmers && allFarmers.forEach(item => {
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


  const totalLand = calculateTotalLand(allFarmers);
  setAllLandSize(totalLand)

},[allFarmers])



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


  const riskScore = farmerInFocus?.riskScore;
 
  const creditScoreFactors = {};
  
  if (riskScore !== undefined && riskScore !== null) {
    const base = riskScore * 10; // convert to percentage (e.g., 7 -> 70)
    const total = base * 5;      // total should sum to this (e.g., 7 -> 350%)
    
    const min = base * 0.97; 
    const max = base * 1.03;
  
   // Step 1: generate random positive weights
  const weights = Array.from({ length: 5 }, () => Math.random());
  const weightSum = weights.reduce((a, b) => a + b, 0);

  // Step 2: scale weights so that total matches desired sum
  let rawValues = weights.map(w => (w / weightSum) * total);

  // Step 3: clamp each value to [min, max] while keeping total close
  rawValues = rawValues.map(v => Math.min(Math.max(v, min), max));

  // Step 4: optional small re-normalization to make sum exact again
  const sumAfterClamp = rawValues.reduce((a, b) => a + b, 0);
  const scaleFactor = total / sumAfterClamp;
  rawValues = rawValues.map(v => v * scaleFactor);
  
    // Assign to keys with "%" string
    const keys = ["paymentHistory", "farmPerformance", "financialStability", "marketEngagement", "creditUtil"];
    keys.forEach((key, idx) => {
      creditScoreFactors[key] = `${rawValues[idx].toFixed(0)}%`;
    });
  }

let overview ={}
   
if (riskScore !== undefined && riskScore !== null) {
  const base = riskScore * 10; // convert to percentage (e.g., 7 -> 70)
  const total = base * 5;      // total should sum to this (e.g., 7 -> 210%)

  const min = base * 0.97;
  const max = base * 1.03;

  const count = 5;
  const values = [];

  // Step 1: Start with min for each slot
  for (let i = 0; i < count; i++) {
    values.push(min);
  }

  // Step 2: Distribute the "remaining" total randomly
  let remaining = total - min * count;

  for (let i = 0; i < count; i++) {
    if (remaining <= 0) break;

    // Maximum we can add to this slot without going above `max`
    const maxAdd = max - min;

    // Random portion of what's left (but not above maxAdd)
    const add = Math.min(Math.random() * remaining, maxAdd);

    values[i] += add;
    remaining -= add;
  }

  // Step 3: If there's any remainder left (due to rounding), add it safely
  let idx = 0;
  while (remaining > 0.0001) {
    const canAdd = max - values[idx];
    const add = Math.min(remaining, canAdd);
    values[idx] += add;
    remaining -= add;
    idx = (idx + 1) % count;
  }

  // Step 4: Shuffle to avoid predictable distribution
  values.sort(() => Math.random() - 0.5);

  // Step 5: Assign to overview keys with "%" formatting
  const keys = ["one", "two", "three", "four", "five"];
  keys.forEach((key, idx) => {
    overview[key] = `${values[idx].toFixed(0)}%`;
  });
}





  return (
    <>

      <Helmet>
        <title> UfarmX </title>
      </Helmet>

      <Container maxWidth="xl" style={{scale:"0.9",position:"relative",top:"-3rem",left:"-2rem"}}>
        
        {/* <SearchBox style={{ width: '100%' }} /> */}


   <Grid item xs={12} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"2rem",width:"100%"}}>

     <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
     
     <h1 style={{fontWeight:"500",marginBottom:"0rem"}}>Credit Score</h1>
     {/*<div>{new Date().toDateString()}</div>*/}

     <div style={{display:"flex",gap:"20px",justifyContent:"flex-start"}}>
     {/*<Button
          variant="contained"
          style={{ minHeight: '60px', width:'175px', backgroundColor: '#0A6054',borderRadius:"10px" ,fontSize:"18px",fontWeight:"300"}}
        >
            <FaArrowUpLong style={{marginRight:"10px",fontSize:"18px"}}/> 
          Deposit
        </Button>*/}


       {/*
       <Button
          variant="contained"
          style={{ minHeight: '60px', width:'175px', backgroundColor: '#0A6054',borderRadius:"10px",fontSize:"18px",fontWeight:"300"}}
        >
          
        View Credit Score
        </Button>
    */}
    </div>
     
     </div>

    </Grid> 
      
        <Grid container spacing={3} style={{width:"113%",marginTop:"1rem"}}>
        
 <Grid container spacing={2} sx={{marginBottom:"1.5rem"}}>
    
         <Grid container spacing={2} style={{marginTop:"2rem"}}>
           <div style={{ background: 'transparent', paddingLeft: '2rem',width:"94%",margin:"0 auto",position:"relative",left:"-2.5rem" }}>
              <FarmerIntroOnlyCard data={farmerInFocus && farmerInFocus} headerOne={'Statistics'} headerTwo={'Profile'} value={''} type={'one'} image={farmerInFocus &&farmerInFocus.photo ?farmerInFocus.photo:farmerInFocus && farmerInFocus.take_a_picture ?farmerInFocus.take_a_picture:farmerInFocus && farmerInFocus.image?farmerInFocus.image:defaultFarmerPic} index={farmerInFocus && farmerInFocus.index} farmName={''/*'Jenkins Farm'*/} farmerName={farmerInFocus && farmerInFocus.farmerName?farmerInFocus.farmerName:farmerInFocus && farmerInFocus.firstName && farmerInFocus.lastName?farmerInFocus.firstName + " " + farmerInFocus.lastName:"Joe Thomas"} city={farmerInFocus.location?farmerInFocus.location:"Dakar, Senegal"} email={"default@gmail.com"} agentId={farmerInFocus && farmerInFocus.agentAddedId} farmerId={farmerInFocus && farmerInFocus.farmerId} phoneNumber={farmerInFocus && farmerInFocus.phone_number?farmerInFocus.phone_number:"+221 555-380-1000"} />
            </div>
          </Grid>

        <br />
         
 <Grid item xs={12} md={7} lg={7}>
                 <Paper
             elevation={3}
             sx={{
               borderRadius: '1.5rem',
               backgroundColor: '#F3F3F3',
               boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
               p: 3,
               height:"28rem"
             }}
           >
             <Box sx={{ width: '100%' ,fontFamily:"Poppins"}}>
               <Typography variant="h4" fontWeight={700} color="#141B34" style={{fontFamily:"Poppins"}}>
                 Your Credit Score
               </Typography>
               <Typography variant="body2" sx={{ fontFamily:"Poppins" ,fontSize: '12px', color: '#5F5F5F', mt: 0.5 ,}}>
                 Based on your performance
               </Typography>




                               <Box display="flex" mt={4} gap={3}>
                  {/* Left Box - Flex 1 */}
                  <Box flex={1} display="flex" flexDirection="column" alignItems="center" sx={{position:"relative",top:"-1rem"}}>
                    <Typography variant="h3" fontWeight={700} color="#141B34" style={{fontFamily:"Poppins",
                       color: farmerInFocus && farmerInFocus.riskScore?
                          
                       (farmerInFocus.riskScore< 4?
                       "#DF2007"
                       :
                     farmerInFocus.riskScore >=4 && farmerInFocus.riskScore <7?
                      "#ED9E0B"
                      :
                     "#0A9C36"
                        )
                       :
                       '#0A9C36',
                    }}>
                     { farmerInFocus && farmerInFocus.riskScore?farmerInFocus.riskScore:"7.5"}
                    </Typography>
                    <Typography sx={{ color: '#5F5F5F', fontSize: '14px', mb: 1,fontFamily:"Poppins" }}>out of 10</Typography>
                    <Button
                      variant="contained"
                      sx={{
                        fontFamily:"Poppins",
                        backgroundColor: farmerInFocus && farmerInFocus.riskScore?
                          
                        (farmerInFocus.riskScore< 4?
                        "#DF2007"
                        :
                      farmerInFocus.riskScore >=4 && farmerInFocus.riskScore <7?
                       "#ED9E0B"
                       :
                      "#0A9C36"
                         )
                        :
                        '#0A9C36',
                        borderRadius: '2rem',
                        color: 'white',
                        textTransform: 'none',
                        paddingX: 3,
                        fontWeight: 400,
                        fontSize: '0.875rem',
                        '&:hover': {
                          backgroundColor: '#db8e04',
                        },
                      }}
                    >
                      {
                     farmerInFocus && farmerInFocus.riskScore?
                    ( farmerInFocus.riskScore< 4?
                      "Poor"
                      :
                    farmerInFocus.riskScore >=4 && farmerInFocus.riskScore <7?
                     "Good"
                     :
                    "Excellent"
                     
                    )
                     : 
                     "Good"
                      }
                    </Button>
                  </Box>
                
                  {/* Right Box - Flex 7 */}
                  <Box flex={7}>
                    {/* Labels above progress bar */}
                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                     {/* <Typography sx={{ fontSize: '12px', color: '#5F5F5F',fontFamily:"Poppins" }}>
                        Poor (300 - 579)
                    </Typography>*/}
                      {/*<Typography sx={{ fontSize: '12px', color: '#5F5F5F',fontFamily:"Poppins" }}>
                        Excellent (7 - 9.8)
                      </Typography>*/}
                    </Box>
                
                    {/* Progress bar */}
                    <Box
                      sx={{
                        height: 10,
                        width: '100%',
                        backgroundColor: '#E3DDDD',
                        borderRadius: 5,
                        overflow: 'hidden',
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: farmerInFocus && farmerInFocus.riskScore?
                          
                          (farmerInFocus.riskScore< 4?
                          "20%"
                          :
                        farmerInFocus.riskScore >=4 && farmerInFocus.riskScore <7?
                         "50%"
                         :
                        "85%"
                           )
                          :
                          '#0A9C36',
                          height: '100%',
                          backgroundColor: farmerInFocus && farmerInFocus.riskScore?
                          
                          (farmerInFocus.riskScore< 4?
                          "#DF2007"
                          :
                        farmerInFocus.riskScore >=4 && farmerInFocus.riskScore <7?
                         "#ED9E0B"
                         :
                        "#0A9C36"
                           )
                          :
                          '#0A9C36',
                        }}
                      />
                    </Box>
                
                    {/* Text below progress bar */}
                    <Box display="flex" alignItems="center">

                     {farmerInFocus && farmerInFocus.riskScore> 4 &&
                      <ArrowUpward fontSize="small" sx={{ color: farmerInFocus && farmerInFocus.riskScore?
                          
                          (farmerInFocus.riskScore< 4?
                          "#DF2007"
                          :
                          farmerInFocus.riskScore >=4 && farmerInFocus.riskScore <7?
                         "#ED9E0B"
                         :
                        "#0A9C36"
                           )
                          :
                          '#0A9C36', mr: 0.5 }} />
                          }


                  {farmerInFocus && farmerInFocus.riskScore<= 4 &&
                      <ArrowDownward fontSize="small" sx={{ color: farmerInFocus && farmerInFocus.riskScore?
                          
                          (farmerInFocus.riskScore< 4?
                          "#DF2007"
                          :
                        farmerInFocus.riskScore >=4 && farmerInFocus.riskScore <7?
                         "#DF2007"
                         :
                        "#DF2007"
                           )
                          :
                          '#DF2007', mr: 0.5 }} />
                          }


                      <Typography sx={{ color: farmerInFocus && farmerInFocus.riskScore?
                          
                          (farmerInFocus.riskScore< 4?
                          "#DF2007"
                          :
                        farmerInFocus.riskScore >=4 && farmerInFocus.riskScore <7?
                         "#ED9E0B"
                         :
                        "#0A9C36"
                           )
                          :
                          '#0A9C36', fontSize: '14px',fontFamily:"Poppins" }}>
                       
                       
                       {farmerInFocus &&  farmerInFocus.riskScore< 4?
                       "0.2 point(s) this year"
                       :
                       "1.1 point(s) this year"
                         }

                      </Typography>
                    </Box>
                  </Box>
                </Box>
       
                     <Box
                      sx={{
                        backgroundColor: 'white',
                        width: '100%',
                        textAlign: 'right',
                        mt: 4,
                        pl: 2,
                        pr: 2,
                        pt: 2,
                        pb: 2,
                        borderRadius: '1rem',
                        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      <Box display="flex" alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
                        <Box display="flex" alignItems="center">
                          <Box sx={{ mr: 1 }}>
                          <MdShowChart />
                          </Box>
                          <Typography variant="h6" fontWeight={500} color="#141B34" fontFamily="Poppins">
                           { 
                           
                            farmerInFocus && farmerInFocus.riskScore?
                          
                          (farmerInFocus.riskScore< 4?
                          "Small Setback"
                          :
                        farmerInFocus.riskScore >=4 && farmerInFocus.riskScore <7?
                         "Good Progress"
                         :
                        "Good Progress"
                           )
                          :
                          'Good Progress'}
                          </Typography>
                        </Box>
                      </Box>
                    
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'Poppins',
                          fontSize: '14px',
                          color: '#5F5F5F',
                          textAlign: 'left',
                        }}
                      >


                     { farmerInFocus && farmerInFocus.riskScore?
                          
                          (farmerInFocus.riskScore< 4?
                          "Your credit score has decreased by 0.2 points this year. Don't be discouraged—continue making timely payments and improving farm performance to get back on track."
                          :
                        farmerInFocus.riskScore >=4 && farmerInFocus.riskScore <7?
                         "Your credit score has improved by 1.1 point(s) this year. Keep up the good work with consistent payments and farm performance"
                         :
                        " Your credit score has improved by 1.1 point(s) this year. Keep up the good work with consistent payments and farm performance."
                           )
                          :
                          ' Your credit score has improved by 1.1 point(s) this year. Keep up the good work with consistent payments and farm performance.'
                          }

                       
                      </Typography>
                    </Box>
             </Box>
           </Paper>
          </Grid>

         
        


          <Grid item xs={12} md={4} lg={4}>
                 <Paper
             elevation={3}
             sx={{
               borderRadius: '1.5rem',
               backgroundColor: '#F3F3F3',
               boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
               p: 3,
               height:"25rem"
             }}
           >
             <Box sx={{ width: '100%' ,fontFamily:"Poppins"}}>
               <Typography variant="h4" fontWeight={700} color="#141B34" style={{fontFamily:"Poppins"}}>
                 Credit Benefits
               </Typography>
               <Typography variant="body2" sx={{ fontSize: '12px', color: '#5F5F5F', mt: 0.5 }} style={{fontFamily:"Poppins"}}>
                 Latest events affecting your score
               </Typography>
       
               <Box mt={3} display="flex" flexDirection="column" gap={2} style={{fontFamily:"Poppins"}}>
                 {[{title:'Equipment Loans',detail:'up to N500,000'}, {title:'Seasonal Credit',detail:'6.5% APR'}, {title:'Vendor Credit',detail:'Up to 1 Year terms'}, {title:'Premium Rates',detail:'Need 7.5+ Credit Score'}].map((label, index) => (
                   <Box key={index} display="flex" alignItems="flex-start" style={{fontFamily:"Poppins"}}>
                     
                     <IoCheckmarkCircleOutline  style={{ color: '#0A9C36', marginRight:"8px",marginTop:"0px",fontSize:"25px" }} />

                     <Box>
                       <Typography sx={{ fontWeight: 600, color: '#141B34', lineHeight: 1.2 }} style={{fontFamily:"Poppins"}}>
                         {label.title}
                       </Typography>
                       <Typography sx={{ fontWeight: 300, color: '#5F5F5F', fontSize: '14px', mt: '2px' }} style={{fontFamily:"Poppins"}}>
                         {label.detail}
                       </Typography>
                     </Box>
                   </Box>
                 ))}
               </Box>
             </Box>
           </Paper>
          </Grid>

        
        </Grid> 
        <br />

        <br />

        <Grid item /*xs={6}*/ style={{flexDirection:"column" ,width:"max-content",display: 'flex',justifyContent:"space-between", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",backgroundColor:'transparent'/*"#F9F9F9"*/,borderRadius:"2rem",padding:"0.5rem",width:"98%",position:"relative",left:"0%" }}>
           {/* <Box sx={{ width: '100%' }}>
              <Button
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '180px',
                  backgroundColor: '#2DA840',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  marginRight: '4px',
                }}
                // onClick={handleOne}
              >
               Crops
              </Button>
              &nbsp; &nbsp;

              <Button
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '180px',
                  backgroundColor: '#21712E',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  marginRight: '4px',
                }}
                // onClick={handleOne}
              >
               Deposits
              </Button>

              </Box>*/}


             

             {/* <CustomSearchBar  title="Search products"/>*/}

             <span style={{marginTop:"10px",marginLeft:"-10px"}}>  <CustomToggleSwitchCreditScore activeButton={activeButton} setActiveButton={setActiveButton} handleFertilizersClick={handleFertilizersClick} handleSeedsClick={handleSeedsClick}  handleEquipmentClick={handleEquipmentClick}  handleServicesClick={handleServicesClick} /></span>
          </Grid>


{activeButton === "Fertilizers" && 
    <Grid container spacing={1} sx={{marginBottom:"1.5rem",position:"relative",left:"0rem"}}>
    <Grid item xs={12} md={5.5} lg={5.5} >
    <Paper
             elevation={3}
             sx={{
               borderRadius: '1.5rem',
               backgroundColor: '#F3F3F3',
               boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
               p: 3,
               height:"28rem"
               
               
             }}
           >
             <Box sx={{ width: '100%' ,fontFamily:"Poppins"}}>
               <Typography variant="h4" fontWeight={700} color="#141B34" style={{fontFamily:"Poppins"}}>
                 Score Breakdown
               </Typography>
               <Typography variant="body2" sx={{ fontSize: '12px', color: '#5F5F5F', mt: 0.5 }} style={{fontFamily:"Poppins"}}>
                 Key Factors affecting your credit score
               </Typography>
       
               
               <Box mt={3} display="flex" flexDirection="column" gap={2}>
                 {[{title:'Financial & Market Access',detail:'High Impact'}].map((label, index) => (
                   <Box style={{fontFamily:"Poppins"}} key={index} display="flex" alignItems="flex-start" justifyContent="space-between">
                  <Box style={{fontFamily:"Poppins"}} key={index} display="flex" alignItems="flex-start">
                     
                     <IoCheckmarkCircleOutline  style={{ color: '#0A9C36', marginRight:"8px",marginTop:"0px",fontSize:"25px" }} />

                     <Box>
                       <Typography sx={{ fontWeight: 600, color: '#141B34', lineHeight: 1.2 }} style={{fontFamily:"Poppins"}}>
                         {label.title}
                       </Typography>
                       <Typography sx={{ fontWeight: 300, color: '#5F5F5F', fontSize: '14px', mt: '2px' }} style={{fontFamily:"Poppins"}}>
                         {label.detail}
                       </Typography>
                     </Box>
                   </Box>

                     <Box sx={{width:"20%"}}>
                            {/* Labels above progress bar */}
                    <Box display="flex" justifyContent="flex-end" mb={0.5}>
                  
                      <Typography sx={{ fontSize: '12px', color: '#5F5F5F',fontFamily:"Poppins" }}>
                        {overview && overview.one}
                      </Typography>
                    </Box>
                
                    {/* Progress bar */}
                    <Box
                      sx={{
                        height: 10,
                        width: '100%',
                        backgroundColor: '#E3DDDD',
                        borderRadius: 5,
                        overflow: 'hidden',
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          borderRadius: 5,

                         width: overview.one,
                          height: '100%',
                          backgroundColor: farmerInFocus && parseFloat(overview.one)?
                          
                          (parseFloat(overview.one)< 40?
                          "#DF2007"
                          :
                        parseFloat(overview.one) >=40 && parseFloat(overview.one) <70?
                        "#ED9E0B"
                         :
                        "#0A9C36"
                           )
                          :
                          '#0A9C36',
                        }}
                      />
                    </Box>


             
                    </Box>


                  </Box>

                 )
                 
                 
                 )}




               <Box mt={0} display="flex" flexDirection="column" gap={2}>
                 {[{title:'Behavioral & Historical Data ',detail:'High Impact'}].map((label, index) => (
                   <Box style={{fontFamily:"Poppins"}} key={index} display="flex" alignItems="flex-start" justifyContent="space-between">
                  <Box style={{fontFamily:"Poppins"}} key={index} display="flex" alignItems="flex-start">
                     
                     <IoCheckmarkCircleOutline  style={{ color: '#0A9C36', marginRight:"8px",marginTop:"0px",fontSize:"25px" }} />

                     <Box>
                       <Typography sx={{ fontWeight: 600, color: '#141B34', lineHeight: 1.2 }} style={{fontFamily:"Poppins"}}>
                         {label.title}
                       </Typography>
                       <Typography sx={{ fontWeight: 300, color: '#5F5F5F', fontSize: '14px', mt: '2px' }} style={{fontFamily:"Poppins"}}>
                         {label.detail}
                       </Typography>
                     </Box>
                   </Box>

                     <Box sx={{width:"20%"}}>
                            {/* Labels above progress bar */}
                    <Box display="flex" justifyContent="flex-end" mb={0.5}>
                  
                      <Typography sx={{ fontSize: '12px', color: '#5F5F5F',fontFamily:"Poppins" }}>
                        {overview && overview.two}
                      </Typography>
                    </Box>
                
                    {/* Progress bar */}
                    <Box
                      sx={{
                        height: 10,
                        width: '100%',
                        backgroundColor: '#E3DDDD',
                        borderRadius: 5,
                        overflow: 'hidden',
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          borderRadius: 5,

                         width: overview.two,
                          height: '100%',
                          backgroundColor: farmerInFocus && parseFloat(overview.two)?
                          
                          (parseFloat(overview.two)< 40?
                          "#DF2007"
                          :
                        parseFloat(overview.two) >=40 && parseFloat(overview.two) <70?
                        "#ED9E0B"
                         :
                        "#0A9C36"
                           )
                          :
                          '#0A9C36',
                        }}
                      />
                    </Box>


             
                    </Box>


                  </Box>

                 )
                 
                 
                 )}
                 
     
                 
                 {[{title:'Crop & Production Data',detail:'Medium Impact'}].map((label, index) => (
                  <Box style={{fontFamily:"Poppins"}} key={index} display="flex" alignItems="flex-start" justifyContent="space-between">
                 <Box style={{fontFamily:"Poppins"}} key={index} display="flex" alignItems="flex-start">
                    
                    <IoCheckmarkCircleOutline  style={{ color: '#0A9C36', marginRight:"8px",marginTop:"0px",fontSize:"25px" }} />

                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#141B34', lineHeight: 1.2 }} style={{fontFamily:"Poppins"}}>
                        {label.title}
                      </Typography>
                      <Typography sx={{ fontWeight: 300, color: '#5F5F5F', fontSize: '14px', mt: '2px' }} style={{fontFamily:"Poppins"}}>
                        {label.detail}
                      </Typography>
                    </Box>
                  </Box>

                    <Box sx={{width:"20%"}}>
                           {/* Labels above progress bar */}
                   <Box display="flex" justifyContent="flex-end" mb={0.5}>
                 
                     <Typography sx={{ fontSize: '12px', color: '#5F5F5F',fontFamily:"Poppins" }}>
                       {overview && overview.three}
                     </Typography>
                   </Box>
               
                   {/* Progress bar */}
                   <Box
                     sx={{
                       height: 10,
                       width: '100%',
                       backgroundColor: '#E3DDDD',
                       borderRadius: 5,
                       overflow: 'hidden',
                       mb: 1,
                     }}
                   >
                     <Box
                       sx={{
                         borderRadius: 5,

                        width: overview.three,
                         height: '100%',
                         backgroundColor: farmerInFocus && parseFloat(overview.three)?
                         
                         (parseFloat(overview.three)< 40?
                         "#DF2007"
                         :
                       parseFloat(overview.three) >=40 && parseFloat(overview.three) <70?
                       "#ED9E0B"
                        :
                       "#0A9C36"
                          )
                         :
                         '#0A9C36',
                       }}
                     />
                   </Box>


            
                   </Box>


                 </Box>

                )
                
                
                )}
                
                
                
                
                {[{title:'Farm Characteristics & Mitigation',detail:'Medium Impact'}].map((label, index) => (
                  <Box style={{fontFamily:"Poppins"}} key={index} display="flex" alignItems="flex-start" justifyContent="space-between">
                 <Box style={{fontFamily:"Poppins"}} key={index} display="flex" alignItems="flex-start">
                    
                    <IoCheckmarkCircleOutline  style={{ color: '#0A9C36', marginRight:"8px",marginTop:"0px",fontSize:"25px" }} />

                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#141B34', lineHeight: 1.2 }} style={{fontFamily:"Poppins"}}>
                        {label.title}
                      </Typography>
                      <Typography sx={{ fontWeight: 300, color: '#5F5F5F', fontSize: '14px', mt: '2px' }} style={{fontFamily:"Poppins"}}>
                        {label.detail}
                      </Typography>
                    </Box>
                  </Box>

                    <Box sx={{width:"20%"}}>
                           {/* Labels above progress bar */}
                   <Box display="flex" justifyContent="flex-end" mb={0.5}>
                 
                     <Typography sx={{ fontSize: '12px', color: '#5F5F5F',fontFamily:"Poppins" }}>
                       {overview && overview.four}
                     </Typography>
                   </Box>
               
                   {/* Progress bar */}
                   <Box
                     sx={{
                       height: 10,
                       width: '100%',
                       backgroundColor: '#E3DDDD',
                       borderRadius: 5,
                       overflow: 'hidden',
                       mb: 1,
                     }}
                   >
                     <Box
                       sx={{
                         borderRadius: 5,

                        width: overview.four,
                         height: '100%',
                         backgroundColor: farmerInFocus && parseFloat(overview.four)?
                         
                         (parseFloat(overview.four)< 40?
                         "#DF2007"
                         :
                       parseFloat(overview.four) >=40 && parseFloat(overview.four) <70?
                       "#ED9E0B"
                        :
                       "#0A9C36"
                          )
                         :
                         '#0A9C36',
                       }}
                     />
                   </Box>


            
                   </Box>


                 </Box>

                )
                
                
                )}


                   
                {[{title:'Demographics & Identity',detail:'Low Impact'}].map((label, index) => (
                  <Box style={{fontFamily:"Poppins"}} key={index} display="flex" alignItems="flex-start" justifyContent="space-between">
                 <Box style={{fontFamily:"Poppins"}} key={index} display="flex" alignItems="flex-start">
                    
                    <IoCheckmarkCircleOutline  style={{ color: '#0A9C36', marginRight:"8px",marginTop:"0px",fontSize:"25px" }} />

                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#141B34', lineHeight: 1.2 }} style={{fontFamily:"Poppins"}}>
                        {label.title}
                      </Typography>
                      <Typography sx={{ fontWeight: 300, color: '#5F5F5F', fontSize: '14px', mt: '2px' }} style={{fontFamily:"Poppins"}}>
                        {label.detail}
                      </Typography>
                    </Box>
                  </Box>

                    <Box sx={{width:"20%"}}>
                           {/* Labels above progress bar */}
                   <Box display="flex" justifyContent="flex-end" mb={0.5}>
                 
                     <Typography sx={{ fontSize: '12px', color: '#5F5F5F',fontFamily:"Poppins" }}>
                       {overview && overview.five}
                     </Typography>
                   </Box>
               
                   {/* Progress bar */}
                   <Box
                     sx={{
                       height: 10,
                       width: '100%',
                       backgroundColor: '#E3DDDD',
                       borderRadius: 5,
                       overflow: 'hidden',
                       mb: 1,
                     }}
                   >
                     <Box
                       sx={{
                         borderRadius: 5,

                        width: overview.five,
                         height: '100%',
                         backgroundColor: farmerInFocus && parseFloat(overview.five)?
                         
                         (parseFloat(overview.five)< 40?
                         "#DF2007"
                         :
                       parseFloat(overview.five) >=40 && parseFloat(overview.five) <70?
                       "#ED9E0B"
                        :
                       "#0A9C36"
                          )
                         :
                         '#0A9C36',
                       }}
                     />
                   </Box>


            
                   </Box>


                 </Box>

                )
                
                
                )}
               </Box>
             </Box>
            </Box>
           </Paper>
          </Grid>



          <Grid item xs={12} md={5.5} lg={5.5}>
                 <Paper
             elevation={3}
             sx={{
               borderRadius: '1.5rem',
               backgroundColor: '#F3F3F3',
               boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
               p: 3,
               height:"28rem"
               
             }}
           >
             <Box sx={{ width: '100%' ,fontFamily:"Poppins sans-serif"}}>
               <Typography variant="h4" fontWeight={700} color="#141B34" style={{fontFamily:"Poppins"}}>
                 Recent Activity
               </Typography>
               <Typography variant="body2" sx={{ fontSize: '12px', color: '#5F5F5F', mt: 0.5 }} style={{fontFamily:"Poppins"}}>
                 Latest events affecting your score
               </Typography>
       
               <Box mt={3} display="flex" flexDirection="column" gap={2} sx={{width:"max-content"}}>
                 {[{title:'Equipment Loan Payment - N80,000',detail:'2 weeks ago'}, {title:'Premium Maize Harvest - 1,200kg',detail:'1 month ago'}, {title:'Reached Excellent Credit Tier',detail:"2 months ago"}].map((label, index) => (
                   <Box key={index} display="flex" alignItems="flex-start">
                     
                     <IoCheckmarkCircleOutline  style={{ color: '#0A9C36', marginRight:"8px",marginTop:"0px",fontSize:"25px" }} />

                     <Box>
                       <Typography sx={{ fontWeight: 600, color: '#141B34', lineHeight: 1.2 }} style={{fontFamily:"Poppins"}}>
                         {label.title}
                       </Typography>
                       <Typography sx={{ fontWeight: 300, color: '#5F5F5F', fontSize: '14px', mt: '2px' }} style={{fontFamily:"Poppins"}}>
                         {label.detail}
                       </Typography>
                     </Box>
                   </Box>
                 ))}
               </Box>
             </Box>
           </Paper>
          </Grid>

       </Grid>
   }





{activeButton === "Equipment" && 
    <Grid container spacing={1} sx={{marginBottom:"1.5rem",position:"relative",left:"0rem",width:"100%",height:"30.5rem"}}>
       <Paper
elevation={3}
sx={{
  borderRadius: '1.5rem',
  backgroundColor: '#F3F3F3',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  p: 3,
  
  width:"100%"
  ,height:"30.5rem"
}}
>
<Box sx={{ width: '100%' ,fontFamily:"Poppins"}}>
  <Typography variant="h4" fontWeight={700} color="#141B34" style={{fontFamily:"Poppins"}}>
    Credit Score History
  </Typography>
  <Typography variant="body2" sx={{ fontFamily:"Poppins" ,fontSize: '12px', color: '#5F5F5F', mt: 0.5 ,}}>
  Track your credit score changes over time
  </Typography>




    

        <Box
         sx={{
           backgroundColor: 'white',
           width: '100%',
           textAlign: 'right',
           mt: 4,
           pl: 2,
           pr: 2,
           pt: 2,
           pb: 2,
           borderRadius: '1rem',
           boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.05)',
         }}
       >
        {/*INSERT CODE BELOW */}

        <TableContainer component={Box} sx={{ boxShadow: 'none' }}>
  <Table sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
    <TableHead>
      <TableRow>
        {['Month', 'Score Change', 'Rating'].map((header, index) => (
          <TableCell
            key={index}
            sx={{
              fontWeight: 600,
              fontSize: '12px',
              fontFamily:"Poppins",
              color: '#141B34',
              backgroundColor:"#FFF",
              borderBottom: '0px solid #E0E0E0',
              borderRight: 'none',
              paddingY: 1,
              paddingX: 2,
            }}
          >
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {[
        { month: 'May 2025', change: 1.4, score: 8.7 },
        { month: 'Apr 2025', change: -1.1, score: 7.3 },
        { month: 'Mar 2025', change: 0.9, score: 8.2 },
        { month: 'Feb 2025', change: -0.5, score: 7.8 },
        { month: 'Jan 2025', change: 1.2, score: 7.6 },
        { month: 'Dec 2024', change: 0.3, score: 6.4 },
      ].map((row, index) => (
        <TableRow key={index}>
          <TableCell
            sx={{
              fontSize: '12px',
              color: '#141B34',
              fontFamily:"Poppins",
              borderBottom: '1px solid #E0E0E0',
              borderRight: 'none',
              paddingY: 1,
              paddingX: 2,
            }}
          >
            {row.month}
          </TableCell>
          <TableCell
            sx={{
              fontSize: '12px',
              color: '#141B34',
              fontFamily:"Poppins",
              borderBottom: '1px solid #E0E0E0',
              borderRight: 'none',
              paddingY: 1,
              paddingX: 2,
            }}
          >
            {row.score}
          </TableCell>
          <TableCell
            sx={{
              fontSize: '12px',
              fontWeight: 500,
              borderBottom: '1px solid #E0E0E0',
              borderRight: 'none',
              paddingY: 1,
              paddingX: 2,
              position:"relative",
              fontFamily:"Poppins",
              top:"0.62rem",
              color: row.change >= 0 ? '#0A6054' : '#D32F2F',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {row.change >= 0 ? (
              <>
                <ArrowUpward sx={{ fontSize: 16 }} />
                +{row.change}
              </>
            ) : (
              <>
                <ArrowDownward sx={{ fontSize: 16 }} />
                {row.change}
              </>
            )}
          </TableCell>
          <TableCell
            sx={{
              borderBottom: '1px solid #E0E0E0',
              borderRight: 'none',
              paddingY: 1,
              paddingX: 2,
            }}
          >
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: '#ED9E0B',
                borderRadius: '2rem',
                color: 'white',
                textTransform: 'none',
                fontSize: '12px',
                fontFamily:"Poppins",
                fontWeight: 500,
                paddingX: 2,
                '&:hover': {
                  backgroundColor: '#db8e04',
                },
              }}
            >
              Good
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

         {/*INSERT CODE ABOVE */}

       </Box>
</Box>
</Paper>

  </Grid> 

   }




{activeButton === "Services" && 
    <Grid container spacing={1} sx={{marginBottom:"1.5rem",position:"relative",left:"0rem",width:"100%",height:"30.5rem"}}>
<Paper
  elevation={3}
  sx={{
    borderRadius: '1.5rem',
    backgroundColor: '#F3F3F3',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    p: 3,
    width: "100%"
    ,height:"30.5rem"
  }}
>
  <Box sx={{ width: '100%', fontFamily: "Poppins" }}>
    <Typography variant="h4" fontWeight={700} color="#141B34" style={{ fontFamily: "Poppins" }}>
    Improvement Recommendations
    </Typography>
    <Typography
      variant="body2"
      sx={{ fontFamily: "Poppins", fontSize: '12px', color: '#5F5F5F', mt: 0.5 }}
    >
     Personalized tips to boost your credit score
    </Typography>

    {/* Parent container for 4 boxes */}
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        mt: 4,
        gap: 2
      }}
    >
      {/* Box 1 */}
      <Box
        sx={{
          backgroundColor: 'white',
          width: { xs: '100%', sm: '48%' },
          textAlign: 'right',
          p: 2,
          borderRadius: '1rem',
          boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
         
          <Typography variant="h6" fontWeight={500} color="#141B34" fontFamily="Poppins">
            Good Progress
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Poppins',
            fontSize: '14px',
            color: '#5F5F5F',
            textAlign: 'left',
          }}
        >
          Pay down existing credit to below 30% of available limits
        </Typography>



        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Poppins',
            fontSize: '14px',
            color: '#5F5F5F',
            textAlign: 'left',
            mt:0.6
          }}
        >
          High Impact 1 - 2 months
        </Typography>
      </Box>

      {/* Box 2 */}
      <Box
        sx={{
          backgroundColor: 'white',
          width: { xs: '100%', sm: '48%' },
          textAlign: 'right',
          p: 2,
          borderRadius: '1rem',
          boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
          <Box sx={{ mr: 1 }}>
            <MdShowChart />
          </Box>
          <Typography variant="h6" fontWeight={500} color="#141B34" fontFamily="Poppins">
           Increase Farm Diversification
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Poppins',
            fontSize: '14px',
            color: '#5F5F5F',
            textAlign: 'left',
          }}
        >
         Add 1-2 new crop varieties to reduce risk and improve stability
        </Typography>



        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Poppins',
            fontSize: '14px',
            color: '#5F5F5F',
            textAlign: 'left',
            mt:0.6
          }}
        >
          Medium Impact - Next Season
        </Typography>
      </Box>

      {/* Box 3 */}
      <Box
        sx={{
          backgroundColor: 'white',
          width: { xs: '100%', sm: '48%' },
          textAlign: 'right',
          p: 2,
          borderRadius: '1rem',
          boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
          <Box sx={{ mr: 1 }}>
            <MdShowChart />
          </Box>
          <Typography variant="h6" fontWeight={500} color="#141B34" fontFamily="Poppins">
            Build Emergency Fund
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Poppins',
            fontSize: '14px',
            color: '#5F5F5F',
            textAlign: 'left',
          }}
        >
          Save 3-6 months of operating expenses for financial stability
        </Typography>


        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Poppins',
            fontSize: '14px',
            color: '#5F5F5F',
            textAlign: 'left',
            mt:0.6
          }}
        >
          Medium Impact - 6 - 12 Months
        </Typography>
      </Box>

      {/* Box 4 */}
      <Box
        sx={{
          backgroundColor: 'white',
          width: { xs: '100%', sm: '48%' },
          textAlign: 'right',
          p: 2,
          borderRadius: '1rem',
          boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="flex-start" sx={{ mb: 1 }}>
          <Box sx={{ mr: 1 }}>
            <MdShowChart />
          </Box>
          <Typography variant="h6" fontWeight={500} color="#141B34" fontFamily="Poppins">
          Establish Regular Deposits
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Poppins',
            fontSize: '14px',
            color: '#5F5F5F',
            textAlign: 'left',
          }}
        >
         Maintain consistent monthly deposits to show stable income.
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Poppins',
            fontSize: '14px',
            color: '#5F5F5F',
            textAlign: 'left',
            mt:0.6
          }}
        >
          Low Impact - Ongoing
        </Typography>
      </Box>
    </Box>
  </Box>
</Paper>


  </Grid> 

   }





{activeButton === "Seeds" && 
    <Grid container spacing={1} sx={{marginBottom:"1.5rem",position:"relative",left:"0rem",width:"100%",height:"30.5rem"}}>

<Paper
  elevation={3}
  sx={{
    borderRadius: '1.5rem',
    backgroundColor: '#F3F3F3',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    p: 3,
    width: "100%",
    height:"30.5rem"
  }}
>
  <Box sx={{ width: '100%', fontFamily: "Poppins" }}>
    <Typography variant="h4" fontWeight={700} color="#141B34" style={{ fontFamily: "Poppins" }}>
      Credit Score Factors
    </Typography>
    <Typography
      variant="body2"
      sx={{ fontFamily: "Poppins", fontSize: '12px', color: '#5F5F5F', mt: 0.5 }}
    >
      Detailed breakdown of what affects your agricultural credit score
    </Typography>

    {/* Parent container for 2 boxes */}
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        mt: 4,
        gap: 2
      }}
    >
      {/* Box 1 */}
      <Box
        sx={{
          backgroundColor: 'white',
          width: { xs: '100%', sm: '48%' },
          textAlign: 'left',
          p: 2,
          borderRadius: '1rem',
          boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Progress Bar 1 */}
        <Typography sx={{ fontSize: '14px', fontWeight: 600, mb: 0.5,fontFamily:"Poppins" }}>
          Payment History
        </Typography>
        <Typography sx={{ fontSize: '12px', color: '#5F5F5F',mt: 0.2,mb: 0.8,fontFamily:"Poppins" }}>
          High Impact
        </Typography>
        <Box sx={{ position: 'relative', width: '92%', backgroundColor: '#E3DDDD', height: 10, borderRadius: 5, mb: 0.5 }}>
          <Box sx={{ width: creditScoreFactors.paymentHistory, height: '100%', 
             backgroundColor: farmerInFocus && parseFloat(creditScoreFactors.paymentHistory)?
                          
             (parseFloat(creditScoreFactors.paymentHistory)< 40?
              "#DF2007"
             :
           parseFloat(creditScoreFactors.paymentHistory) >=40 && parseFloat(creditScoreFactors.paymentHistory) <70?
           "#ED9E0B" 
            :
           "#0A9C36"
              )
             :
             '#0A9C36',
          borderRadius: 5, }} />
          <Box sx={{ position: 'absolute', top: '-2px', right: '-40px', fontSize: '12px',fontFamily:"Poppins" }}>{" "}{creditScoreFactors.paymentHistory}</Box>
        </Box>
        <Typography sx={{ fontSize: '12px', color: '#5F5F5F', mb: 2,mt:1,fontFamily:"Poppins" }}>
          Consistent on-time payments for farm supplies and loans
        </Typography>

        {/* Progress Bar 2 */}
        <Typography sx={{ fontSize: '14px', fontWeight: 600, mb: 0.5 ,fontFamily:"Poppins"}}>
          Farm Performance
        </Typography>
        <Typography sx={{ fontSize: '12px', color: '#5F5F5F',mt: 0.2,mb: 0.8,fontFamily:"Poppins" }}>
          High Impact
        </Typography>
        <Box sx={{ position: 'relative', width: '92%', backgroundColor: '#E3DDDD', height: 10, borderRadius: 5, mb: 0.5 }}>
          <Box sx={{ width: creditScoreFactors.farmPerformance, height: '100%',
               backgroundColor: farmerInFocus && parseFloat(creditScoreFactors.farmPerformance)?
                          
               (parseFloat(creditScoreFactors.farmPerformance)< 40?
               "#DF2007"
               :
             parseFloat(creditScoreFactors.farmPerformance) >=40 && parseFloat(creditScoreFactors.farmPerformance) <70?
             "#ED9E0B"
              :
             "#0A9C36"
                )
               :
               '#0A9C36',
           borderRadius: 5, }} />
        <Box sx={{ position: 'absolute', top: '-2px', right: '-40px', fontSize: '12px',fontFamily:"Poppins" }}>{" "}{creditScoreFactors.farmPerformance}</Box>
        </Box>
        <Typography sx={{ fontSize: '12px', color: '#5F5F5F', mb: 2,mt:1,fontFamily:"Poppins" }}>
          Strong crop yields and deposit consistency
        </Typography>

        {/* Progress Bar 3 */}
        <Typography sx={{ fontSize: '14px', fontWeight: 600, mb: 0.5 ,fontFamily:"Poppins"}}>
          Financial Stability
        </Typography>
        <Typography sx={{ fontSize: '12px', color: '#5F5F5F', mt: 0.2,mb: 0.8 ,fontFamily:"Poppins"}}>
          Medium Impact
        </Typography>
        <Box sx={{ position: 'relative', width: '92%', backgroundColor: '#E3DDDD', height: 10, borderRadius: 5, mb: 0.5 }}>
          <Box sx={{ width: creditScoreFactors.financialStability, height: '100%',
               backgroundColor: farmerInFocus && parseFloat(creditScoreFactors.financialStability)?
                          
               (parseFloat(creditScoreFactors.financialStability)< 40?
               "#DF2007"
               :
             parseFloat(creditScoreFactors.financialStability) >=40 && parseFloat(creditScoreFactors.financialStability) <70?
             "#ED9E0B"
              :
             "#0A9C36"
                )
               :
               '#0A9C36',
           borderRadius: 5, }} />
          <Box sx={{ position: 'absolute', top: '-2px', right: '-40px', fontSize: '12px',fontFamily:"Poppins" }}>{" "}{creditScoreFactors.financialStability}</Box>
        </Box>
        <Typography sx={{ fontSize: '12px', color: '#5F5F5F',mt:1,fontFamily:"Poppins" }}>
        Stable income but room for improvement in savings
        </Typography>
      </Box>

      {/* Box 2 */}
      <Box
        sx={{
          backgroundColor: 'white',
          width: { xs: '100%', sm: '48%' },
          textAlign: 'left',
          p: 2,
          borderRadius: '1rem',
          boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Progress Bar 1 */}
        <Typography sx={{ fontSize: '14px', fontWeight: 600, mb: 0.5,fontFamily:"Poppins" }}>
          Market Engagement
        </Typography>
        <Typography sx={{ fontSize: '12px', color: '#5F5F5F', mt: 0.2,mb: 0.8 ,fontFamily:"Poppins"}}>
          Medium Impact
        </Typography>
        <Box sx={{ position: 'relative', width: '92%', backgroundColor: '#E3DDDD', height: 10, borderRadius: 5, mb: 0.5 }}>
          <Box sx={{ width: creditScoreFactors.marketEngagement, height: '100%',
               backgroundColor: farmerInFocus && parseFloat(creditScoreFactors.marketEngagement)?
                          
               (parseFloat(creditScoreFactors.marketEngagement)< 40?
               "#DF2007"
               :
             parseFloat(creditScoreFactors.marketEngagement) >=40 && parseFloat(creditScoreFactors.marketEngagement) <70?
             "#ED9E0B"
              :
             "#0A9C36"
                )
               :
               '#0A9C36',
           borderRadius: 5,fontFamily:"Poppins" }} />
          <Box sx={{ position: 'absolute', top: '-2px', right: '-40px', fontSize: '12px' ,fontFamily:"Poppins"}}>{" "}{creditScoreFactors.marketEngagement}</Box>
        </Box>
        <Typography sx={{ fontSize: '12px', color: '#5F5F5F', mb: 2 ,mt:1,fontFamily:"Poppins"}}>
        Regular market participation with growing vendor relationships
        </Typography>

        {/* Progress Bar 2 */}
        <Typography sx={{ fontSize: '14px', fontWeight: 600, mb: 0.5,fontFamily:"Poppins" }}>
          Credit Utilization
        </Typography>
        <Typography sx={{ fontSize: '12px', color: '#5F5F5F', mt: 0.2,mb: 0.8 ,fontFamily:"Poppins"}}>
          Low Impact
        </Typography>
        <Box sx={{ position: 'relative', width: '92%', backgroundColor: '#E3DDDD', height: 10, borderRadius: 5, mb: 0.5 }}>
          <Box sx={{ width: creditScoreFactors.creditUtil, height: '100%',
              backgroundColor: farmerInFocus && parseFloat(creditScoreFactors.creditUtil)?
                          
              (parseFloat(creditScoreFactors.creditUtil)< 40?
              "#DF2007"
              :
            parseFloat(creditScoreFactors.creditUtil) >=40 && parseFloat(creditScoreFactors.creditUtil) <70?
            "#ED9E0B"
             :
            "#0A9C36"
               )
              :
              '#0A9C36',
          borderRadius: 5, }} />
          <Box sx={{ position: 'absolute', top: '-2px', right: '-40px', fontSize: '12px' ,fontFamily:"Poppins"}}>{creditScoreFactors.creditUtil}</Box>
        </Box>
        <Typography sx={{ fontSize: '12px', color: '#5F5F5F',mt:1,fontFamily:"Poppins" }}>
        High utilization of available credit limits
        </Typography>
      </Box>
    </Box>
  </Box>
</Paper>

  </Grid> 

   }




        
       

          
         
       
          
        
        </Grid>
      </Container>
    </>
  );
}
