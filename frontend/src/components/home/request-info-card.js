//import * as React from 'react';
import {useState,useEffect} from 'react';
import Typography from '@mui/material/Typography';
// import Title from './title';
import { Box, Button, Divider, Grid, MenuItem, Modal, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { fCurrency } from 'src/utils/formatNumber';
import PieChartOne from './pie-chart-one';
import PieChartTwo from './pie-chart-two';
import redboy from 'src/assets/images/redboy.jpeg';
import fakeMaps from 'src/assets/images/fake-maps.jpeg';

import { fetchSpecificResponse } from 'src/redux/actions/group.action';

// MUI Pencil Icon
import CreateIcon from '@mui/icons-material/Create';

import farmer1 from 'src/assets/images/jeansfarmer.jpeg';
import farmer2 from 'src/assets/images/farmer2.jpeg';
import farmer3 from 'src/assets/images/farmer3.jpeg';
import farmer4 from 'src/assets/images/farmer4.jpeg';
import farmer5 from 'src/assets/images/farmer5.jpeg';
import farmer6 from 'src/assets/images/farmer6.jpeg';
import farmer7 from 'src/assets/images/farmer7.jpeg';
import farmer8 from 'src/assets/images/farmer8.jpeg';
import farmer9 from 'src/assets/images/farmer9.jpeg';
import farmer10 from 'src/assets/images/farmer10.jpeg';
import { FaChevronDown, FaEnvelope,  FaIdCard, FaMapMarker, FaMapMarkerAlt, FaWallet } from 'react-icons/fa';
import { MdOutlineMultilineChart, MdOutlineScoreboard } from "react-icons/md";
import { MdSmartphone } from 'react-icons/md';
import axios from 'axios';
import AiSolutionsForm from '../aisolutions/aiSolutionsForm';
import { saveFarmerInFocus, saveTotalPagesAgents } from 'src/redux/reducers/group.slice';
import { updateRequestDetails } from 'src/redux/actions/group.action';
import { IoAnalyticsSharp } from 'react-icons/io5';
import { BsSpeedometer } from 'react-icons/bs';

function preventDefault(event) {
  event.preventDefault();
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "85%",
  height:"85%",

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function RequestInfoCard({data,type,image,agentId,agentAddedId,farmerId,farmerName,farmName,phoneNumber,email,city,index,setAiForm,aiForm}) {
  const { user } = useSelector((state) => state.auth);
  const { requestInFocus } = useSelector((state) => state.group);
  console.log("REQUEST IN FOCUS IS -->",requestInFocus)

  const [currentRequest,setCurrentRequest] = useState(requestInFocus && requestInFocus)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const updateRequestStatus = (requestObject)=>{
    console.log("UPDATING THE STATUS  OF THE REQUEST HAS BEGUN -->")
  dispatch(updateRequestDetails(requestObject))

  }

 
console.log("IMAGE IN REQUEST CARD IS__>",image)


  const [mapsLocation,setMapsLocation] = useState(' ')
 const [open,setOpen] =useState(false)

 const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const fiveMonthsFromNow = new Date();
fiveMonthsFromNow.setMonth(fiveMonthsFromNow.getMonth() + 5);


const twoMonthsFromNow = new Date();
twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 5);


  const date =data.onboardDate && !isNaN(new Date(data.onboardDate).getTime())? new Date():(data.createdAt?new Date(data.createdAt):new Date());
  const approvedDate = data.onboardDate && !isNaN(new Date(data.onboardDate).getTime())
  ? twoMonthsFromNow
  : (data.createdAt ? new Date(data.createdAt) : twoMonthsFromNow);

  const dueDate =data.onboardDate && !isNaN(new Date(data.onboardDate).getTime())
  ? fiveMonthsFromNow
  : (data.createdAt ? new Date(data.createdAt) : fiveMonthsFromNow);


  return (
    <>
      <Grid container alignItems="center" style={{ padding: '10px',backgroundColor:"transparent" }} onClick={()=>{setAiForm(false)}}>

     {aiForm &&
        <AiSolutionsForm setAiForm={setAiForm} />
         }



      <Grid xs={12} sm={12}  container alignItems="center" sx={{borderRadius:"1rem",display:"flex",gap:"1rem",width:"100%",alignItems:"flex-start",justifyContent:"flex-start"}}>
       
      {/**hiding the part of the farmer's grid with the name for now - sep 3 2025 - dagogo */}
      <Grid xs={6.7} sm={6.7} style={{display:"none",flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"flex-start",backgroundColor:"#FFF",borderRadius:"1rem"}}>
        <Grid item xs={12} sm={12} style={{ textAlign: 'center',height:"10.5rem",display:"flex" ,justifyContent:"flex-start",position:"relative",bottom:"0.3rem",left:"-1rem"}}>
          
          <img src={image && image}

           onError={({ currentTarget }) => {
             currentTarget.onerror = null; 
             currentTarget.src=index === 0 ? farmer1 : index === 1 ? farmer2: index === 2 ? farmer3: index === 3 ?farmer4 : index === 4 ?farmer5 : index === 5 ?farmer6 : index === 6 ?farmer7 : index === 7 ? farmer8: index === 8 ? farmer9: index === 9 ?farmer10 :farmer10 ;
           }} 
          
          style={{position:"relative",top:"1.3rem",marginLeft:"2rem",marginBottom:"1rem",height:"8rem",width:"8rem",borderRadius:"50%"}} alt="farmer image"/>
       
         
         
        </Grid>


       <Grid xs={8} sm={8} style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center",justifyContent:"flex-start",backgroundColor:"#FFF"}}>

       <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"flex-start",justifyContent:"center",gap:"1rem",position:"relative"}}>
           
           <Box sx={{display:"flex",flexDirection:"column",justifyContent:"flex-start",textAlign:"left",width:"max-content",position:"relative",left:{xs:"-1rem",sm:"1rem"},top:{md:"-0.6rem",sm:"-1rem"},scale:{sm:"0.75",md:"0.8"}}}>
           
        


           <Typography variant="h4" sx={{fontFamily:"Poppins",fontWeight:"500",color:"black"}}> 
          {data.name}
           </Typography>

           <div style={{fontSize:"0.8rem"/*{sm:"0.8rem",md:"0.4rem",lg:"0.2rem"}*/,color:"black",position:"relative",top:"-0.2rem",marginBottom:"0.5rem"}}>
           Requested Date : <b>{data.onboardDate && !isNaN(new Date(data.onboardDate).getTime())?`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`:data.createdAt && !isNaN(new Date(data.createdAt).getTime())?`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`:"Sept 23rd, 2024"}</b> 
           </div>


           <div style={{fontSize:"0.8rem",color:"#000000",position:"relative",top:"-0.2rem",marginBottom:"0.5rem"}}>
           Approved Date: <b>{data.onboardDate && !isNaN(new Date(data.onboardDate).getTime())?`${date.getDate()}/${approvedDate.getMonth()}/${date.getFullYear()}`:data.createdAt && !isNaN(new Date(data.createdAt).getTime())?`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`:"Sept 23rd, 2024"}</b> 
           </div>



           <div style={{fontSize:"0.8rem",color:"#000000",position:"relative",top:"-0.2rem",marginBottom:"0.5rem"}}>
           Due Date: <b>{data.onboardDate && !isNaN(new Date(data.onboardDate).getTime())?`${date.getDate()}/${dueDate.getMonth()}/${date.getFullYear()}`:data.createdAt && !isNaN(new Date(data.createdAt).getTime())?`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`:"Sept 23rd, 2024"}</b> 
           </div>


           {agentAddedId &&
           <div> 
          {agentAddedId}
           </div>
         }


           {/*
           farmerId &&
           <div> 
            <FaIdCard style={{fontSize:"1.1rem"}}/>
            &nbsp;&nbsp;
           {agentId}&nbsp;&nbsp;{farmerId}
           </div>
          */}
      
        {type==="one" &&
           <div>
          {farmName}
           </div>
        }
         { /* <div>
          
           <FaIdCard style={{fontSize:"1.1rem",cursor:"pointer"}}/>
           &nbsp;&nbsp;
          
           {agentId}&nbsp;&nbsp;{farmerId}
           </div>
             */}

          

         {type==="one" &&
          
           <div  style={{display:"flex",gap:"0rem",marginTop:"0rem",marginBottom:"0rem",justifyContent:"flex-start"}}>
            <FaMapMarker sx={{fontSize:"1.1rem",position:"relative",top:"0.3rem",cursor:"pointer"}}/>
            &nbsp;&nbsp;
           

              <div style={{maxWidth:"16rem"}}>
             {data.locationName?data.locationName:"N/A"}
             </div>
           </div>
         }

           </Box>

           

          
       {type!=="one" &&
           <Button
               variant={'contained'}
               style={{
                 minHeight: '30px',
                 minWidth: '120px',
                 backgroundColor: '#2DA840',
                 color: '#fff',
                 border: 'none',
                 borderRadius: '5px',
                 marginRight: '4px',
               }}
              onClick={()=>{/*navigate('/dashboard/individual-campaign')*/}}
             >
              Contact
             </Button>
          }


         </div>




         </Grid>


         <Grid xs={12} sm={12} style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"flex-start",justifyContent:"flex-start",backgroundColor:"#FFF"}}>

             <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"flex-start",justifyContent:"flex-start",gap:"0rem",position:"relative",top:"-0.5rem",left:"-1.2rem"}}>
                 
                 <div  onClick={()=>{
                  dispatch(saveFarmerInFocus(data));
                  setTimeout(()=>{navigate('/dashboard/credit-score')},1300)
                 }}
                 style={{cursor:"pointer",display:"flex",flexDirection:"row",width:"100%",justifyContent:"flex-start",alignItems:"center",gap:"1rem",textAlign:"left",color:"black",position:"relative",left:"0.9rem"}}>
                 
              
                 
                 <BsSpeedometer 
                
                 
                 style={{fontSize:"1.5rem",top:"-14px",position:"relative",left:"0.5rem"}} /> 
                 
                 <div style={{display:"flex",flexDirection:"column"}}> 
                  Credit Score:
                  
                   <b> 
                    <Box flex={1} display="flex" flexDirection="row" alignItems="center" sx={{position:"relative",top:"-0.3rem",gap:"0rem"}}>
                    <Typography variant="h3" fontWeight={700} color="#141B34" style={{fontFamily:"Poppins",
                    scale:"0.7",
                       color: data && data.riskScore?
                          
                       (data.riskScore< 4?
                       "#DF2007"
                       :
                     data.riskScore >=4 && data.riskScore <7?
                      "#ED9E0B"
                      :
                     "#0A9C36"
                        )
                       :
                       '#0A9C36',
                    }}>
                     { data && data.riskScore?data.riskScore:"7.5"}
                    </Typography>
                   
                    <Button
                      variant="contained"
                      sx={{
                        scale:"0.7",
                        position:"relative",
                        left:"-0.5rem",
                        fontFamily:"Poppins",
                        backgroundColor: data && data.riskScore?
                          
                        (data.riskScore< 4?
                        "#DF200733"
                        :
                      data.riskScore >=4 && data.riskScore <7?
                       "#ED9E0B33"
                       :
                      "#0A9C3633"
                         )
                        :
                        '#0A9C3633',
                        borderRadius: '2rem',
                        color: 'white',
                        textTransform: 'none',
                        paddingX: 3,
                        fontWeight: 400,
                        fontSize: '0.675rem',
                        '&:hover': {
                          backgroundColor: data && data.riskScore?
                          
                          (data.riskScore< 4?
                          "#DF200733"
                          :
                        data.riskScore >=4 && data.riskScore <7?
                         "#ED9E0B33"
                         :
                        "#0A9C3633"
                           )
                          :
                          '#0A9C3633', // prevent background color change
                          color: 'inherit',           // prevent text color change
                          cursor: 'default',          // optional: don't show pointer cursor
                          boxShadow: 'none',          // prevent elevation
                        },
                      }}
                    >
                      {
                     data && data.riskScore?
                    ( data.riskScore< 4?
                      <span style={{opacity:1,
                        color: data && data.riskScore?
                          
                       ( data.riskScore< 4?
                        "#DF2007"
                        :
                      data.riskScore >=4 && data.riskScore <7?
                       "#ED9E0B"
                       :
                      "#0A9C36")
                      :
                      "#0A9C36"

                      }}>Poor</span>
                      :
                    data.riskScore >=4 && data.riskScore <7?
                    <span style={{opacity:1,
                      
                      color: data && data.riskScore?
                          
                       ( data.riskScore< 4?
                        "#DF2007"
                        :
                      data.riskScore >=4 && data.riskScore <7?
                       "#ED9E0B"
                       :
                      "#0A9C36")
                      :
                      "#0A9C36"



                     }}>Good</span>
                     :
                     <span style={{opacity:1,
                      color: data && data.riskScore?
                          
                       ( data.riskScore< 4?
                        "#DF2007"
                        :
                      data.riskScore >=4 && data.riskScore <7?
                       "#ED9E0B"
                       :
                      "#0A9C36")
                      :
                      "#0A9C36"

                     }}>Excellent</span>
                     
                    )
                     : 
                     <span style={{opacity:1,
                      color: data && data.riskScore?
                          
                       ( data.riskScore< 4?
                        "#DF2007"
                        :
                      data.riskScore >=4 && data.riskScore <7?
                       "#ED9E0B"
                       :
                      "#0A9C36")
                      :
                      "#0A9C36"

                     }}>Good</span>
                      }
                    </Button>
                  </Box>
                  
                  </b>
                   
                   </div>    
                   
                   <FaChevronDown  style={{fontSize:"1rem",top:"-14px",left:"-18px",position:"relative"}}/>
                 
             
            
             
                 </div>


             
               </div>





               <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"flex-start",justifyContent:"flex-start",gap:"0rem",position:"relative",top:"0.5rem",left:"-1rem"}}>
                 
                 <div  onClick={()=>{
                 // dispatch(saveFarmerInFocus(data));
                  //setTimeout(()=>{navigate('/dashboard/credit-score')},1300)
                 }}
                 style={{cursor:"pointer",display:"flex",flexDirection:"row",width:"100%",justifyContent:"flex-start",alignItems:"center",gap:"1rem",textAlign:"left",color:"black",position:"relative",left:"0.9rem"}}>
                 
              
                 
                 <FaWallet 
                
                 
                 style={{fontSize:"1.5rem",top:"-14px",position:"relative"}} /> 
                 
                 <div style={{display:"flex",flexDirection:"column"}}> 
                  Available Balance:
                  
                   <b> 
                    <Box flex={1} display="flex" flexDirection="row" alignItems="center" sx={{position:"relative",top:"-0.3rem",gap:"0rem"}}>
                    <Typography variant="h6" fontWeight={700} color="#141B34" style={{fontFamily:"Poppins",
                    scale:"1",
                    }}>
                     { `100,000`}
                    </Typography>
                   
                 
                  </Box>
                  
                  </b>
                   
                   </div>    
                   
                 
                 
             
            
             
                 </div>


             
               </div>

  </Grid>
       </Grid>


       <Grid item xs={12} sm={12} style={{ textAlign: 'center',height:"16rem",display:"flex" ,justifyContent:"space-evenly",backgroundColor:"white",borderRadius:"1rem",width:"max-content",paddingLeft:"0.5rem",paddingRight:"2rem",position:"relative",top:0,left:0,paddingBottom:"2rem"}}>
          
              <Typography variant="h6" fontWeight="bold" style={{position:"relative",top:"0.8rem",left:"1.5rem"}}>
                    Authorization
                  </Typography>

         <Box sx={{display:"flex",justifyContent:"center", alignItems:"flex-start",width:"100%",flexDirection:"column",scale:"0.8"}}> 
          
          
            <Box  sx={{width:"max-content",textAlign:"center",fontSize:{xs:"0.8rem",sm:"1.1rem",md:"1.1rem"}}}>Status </Box>  
             <Box  sx={{width:"50%",textAlign:"center",fontSize:{xs:"0.8rem",sm:"1.1rem",md:"1.6rem"},fontWeight:"1rem",color:"#000000"}}>
              {/*data && data.farmSize?data.farmSize.slice(0,3):0*/}{/*data.farmSize && !data.farmSize.includes("hect") && " Hectares"*/}

                     <Select
                     sx={{minWidth:"6rem", paddingLeft: '10px'}}
                     MenuProps={{
                      PaperProps: {
                        sx: {
                          '& .MuiMenuItem-root': {
                            paddingLeft: '10px'
                          }
                        }
                      }
                    }}
               labelId="status-label"
               id="status-select"
               //value={status}
               default={'Denied'}
               label="Status"
               //onChange={handleChange}
               onChange={(e)=>{setCurrentRequest({...currentRequest,status:e.target.value})}  }
             >
               <MenuItem value="Approved">Approved</MenuItem>
               <MenuItem value="Pending">Pending</MenuItem>
               <MenuItem value="Denied">Denied</MenuItem>
             </Select>
               </Box> 
           </Box>

           <Box sx={{display:"flex",justifyContent:"center",alignItems:"flex-start",width:"100%",flexDirection:"column",scale:"0.8"}}> 
            <Box  sx={{width:"max-content",textAlign:"center",fontSize:{xs:"0.8rem",sm:"1.1rem",md:"1.1rem"} }}>
             Terms 
              </Box>   
              <Box  sx={{width:"50%",textAlign:"center",fontSize:{xs:"0.8rem",sm:"1.1rem",md:"1.6rem"},fontWeight:"1rem",color:"#000000"}}> 
              <Select sx={{minWidth:"6rem"}}
               labelId="status-label"
               id="status-select"
               //value={status}
               default={' '}
               label="Terms"
               onChange={(e)=>{setCurrentRequest({...currentRequest,paymentTerms:e.target.value})}  }
             >
               <MenuItem value=" ">One Installment</MenuItem>
               <MenuItem value=" ">Two Installments</MenuItem>
               <MenuItem value=" ">Three Installments</MenuItem>
             </Select>
              </Box> 
           </Box>


         
         <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",flexDirection:"column",scale:"0.8",position:"relative", left:"-1.8rem"}}> 
            <Box  sx={{width:"max-content",textAlign:"center",fontSize:{xs:"0.8rem",sm:"1.1rem",md:"1.1rem"}}}>Due Date </Box>   <Box  sx={{width:"50%",textAlign:"center",fontSize:{xs:"0.8rem",sm:"1.1rem",md:"1.6rem"},fontWeight:"1rem",color:"#000000"}}>
              {/*data && data.lastHarvest? data.lastHarvest:2*/}

              <input type="date" id="paymentDueDate" name="paymentDueDate"
              onChange={(e) => {
                const rawValue = e.target.value; // "2025-06-23"
                const dateObj = new Date(rawValue);
            
                // Save as ISO string (UTC format)
                const isoString = dateObj.toISOString(); // "2025-06-23T00:00:00.000Z"
            
                setCurrentRequest({
                  ...currentRequest,
                  paymentDate: isoString
                });
              }}
              style={{
           minWidth: "5rem",
           paddingTop: "0.5rem",
           paddingBottom: "0.5rem",
           borderRadius: "0.5rem",
           border: "0.1px solid #ccc"
         }}></input>
            </Box> 
           </Box>


           <Button
             variant="contained"
             sx={{
               backgroundColor: '#0A6054',
               position:"absolute",
               width:"6rem",
               top:"14.5rem",
               left:"0.5rem",
               borderRadius:"0.5rem",
               color: 'white',
               '&:hover': {
                 backgroundColor: '#7db62d' // slightly darker for hover effect
               }
             }}
             onClick={()=>{updateRequestStatus(currentRequest)}}
         >
           Submit
         </Button>
         

       
         
         
        </Grid>


        


      </Grid>





      <br/>
      {/*<Divider style={{width:"100%"}} />*/}
      <br/>


     

    </Grid>

      <br />
    </>
  );
}
