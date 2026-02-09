import * as React from 'react';
import Typography from '@mui/material/Typography';
// import Title from './title';
import { Box, Button, Divider, Grid, LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { fCurrency } from 'src/utils/formatNumber';
import PieChartOne from './pie-chart-one';
import PieChartTwo from './pie-chart-two';
import redboy from 'src/assets/images/redboy.jpeg';


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

import { PiDeviceMobileCameraLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { VscPerson } from "react-icons/vsc";
import { isMobile } from 'react-device-detect';

function preventDefault(event) {
  event.preventDefault();
}

export default function ContainerDashboardCard({ headerOne, headerTwo, value, type,image,agentId,agentAddedId,farmerId,farmerName,farmName,phoneNumber,email,city,country,region,index }) {
  const { user } = useSelector((state) => state.auth);
  const [progress, setProgress] = React.useState(0);

  const navigate = useNavigate()
 // console.log("farmer id is -->",farmerId)
  return (
    <>
      <Grid container alignItems="center" style={{display:"flex",justifyContent:"flex-end",alignItems:"flex-end", paddingLeft: '10px' , paddingRight: '10px',position:"relative"}}>
       
       <img src={image} style={{position:"absolute",left:"0rem",top:"0rem",borderRadius:"1rem",height:"6rem",width:"8rem"}}/>      
       
        <Grid item xs={12}style={{display:"flex",alignItems:"flex-end", justifyContent:"flex-end"}}>
          <Typography color="textPrimary" variant="p" component="p" sx={{ color: '#0A6054', fontSize:{xs:'11px',sm:'15px'},position:"relative",marginTop:{xs:"0.2rem",sm:"0rem"} }}>
            {headerOne}
          </Typography>
      
      
         {/*
          <Typography color="textPrimary" variant="h6" component="p" style={{ color: '#000000', fontSize: '20.33px' }}>
            <b>{headerTwo}</b>
          </Typography>
         */}

        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            border: '0px solid red',
            minHeight: '25px',
            minWidth: '100px',
          }}
        >
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
           {/* THESE USED TO BE THE WORDS AT THE FAR RIGHT OF THE CARD BUT I AM NOT USING THEM ANYMORE
            <Typography
              color="textPrimary"
              variant="h6"
              component="p"
              style={{ color: '#9291A5', fontSize: '16.23px' }}
            >
              Deal Expense
            </Typography>
            <Typography
              color="textPrimary"
              variant="h6"
              component="p"
              style={{ color: '#000000', fontSize: '20.33px' }}
            >
              <b>{value}</b>
            </Typography>
           */
           }
          </Grid>
        </Grid>
      </Grid>
     {/*<Divider />*/}
      <br />
     {isMobile &&
     <>
      <br />
      <br />
      </>
      }
      <Grid container alignItems="center">
        <Grid item xs={12} sm={12} style={{ textAlign: 'center',display:"flex" ,justifyContent:"center",fontSize:"1.1rem",fontWeight:"400",position:"relative"}}>

          <div >{country?country:"Dakar, Senegal"}</div>
          
        </Grid>



        <Grid item xs={12} sm={12} style={{paddingTop:"0.5rem", textAlign: 'center',display:"flex" ,justifyContent:"center",fontSize:"1.6rem",fontWeight:"500",position:"relative"}}>

          <div>{region?region:"VELIGNARA"}</div>
        </Grid>


       <Grid xs={12} sm={12}>

       <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"flex-start",justifyContent:"flex-start",gap:"1rem",color:"#667085"}}>
           
           <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",textAlign:"left",gap:"0.6rem"}}>
           
           {type==="one" &&
           <div>
        <CiLocationOn style={{marginRight:"0.4rem"}}/>   {farmName}
           </div>
        }


           <div> 
           <VscPerson style={{marginRight:"0.4rem"}} /> {farmerName}
           </div>


        
          


           {agentAddedId &&
           <div> 
          {agentAddedId}
           </div>
         }


           {/*farmerId &&
           <div> 
           {agentId}&nbsp;&nbsp;{farmerId}
           </div>
        */}
      
       <div>
           <PiDeviceMobileCameraLight style={{marginRight:"0.4rem"}} />   {phoneNumber}
           </div>


           {
            /*<div>
           {email}
           </div>*/
           }

       {/*type==="one" &&
           <div>
           {city}
           </div>
         */}

           </div>

           

          
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

       <Grid xs={12} sm={12} sx={{marginTop:"1rem",marginBottom:"1rem"}}>
        <div style={{ display: 'flex',justifyContent:"flex-start",alignItems:"center",gap:"1.2rem" }}>
       
       
       <div style={{ width: '70%' ,display:"flex",flexDirection:"column",justifyContent:"center"}}>
         
       <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"13px",marginBottom:"0.6rem"}}>
         Status

         <div style={{backgroundColor:"#D1FADF",borderRadius:"2rem",color:"#12B76A",width:"max-content",paddingLeft:"0.5rem",paddingRight:"0.5rem",fontSize:"13px"}}>Full</div>
       </div>
        
        <LinearProgress style={{backgroundColor:"#12B76A",height:"0.5rem",borderRadius:"2rem"}} variant="determinate" value={progress} />
       </div>

       <div style={{ width: '20%' }}>
           <Button
               variant={'contained'}
               sx={{
                 minHeight: '30px',
                 minWidth: {xs:"70px",sm:'90px'},
                 backgroundColor: '#0A6054',
                 color: '#fff',
                 border: 'none',
                 borderRadius: '5px',
                 marginRight: '4px',
               }}
              onClick={()=>{navigate('/dashboard/container-profile')}}
             >
              View
             </Button>
       </div>

       </div>

       </Grid>

      </Grid>
      <br />
    </>
  );
}
