import * as React from 'react';
import Typography from '@mui/material/Typography';
// import Title from './title';
import { Button, Divider, FormControl, Grid, MenuItem,Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fCurrency } from 'src/utils/formatNumber';

import FormControlContext from '@mui/material/FormControl/FormControlContext';

import { FaPerson } from "react-icons/fa6";
import { BsFillTriangleFill } from "react-icons/bs";
import { PiPersonThin } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { FaRegMoneyBill1 } from "react-icons/fa6";


function preventDefault(event) {
  event.preventDefault();
}

export default function RequestCard({header, value, img, type,additions}) {
  const { user } = useSelector((state) => state.auth);
  return (
    <div style={{backgroundColor: header=== 'Farm'? '#90C434' :'Total Responses'? '#FFF'   :"white",borderRadius:"0.7rem"}} >
  <Grid container alignItems="flex-start"  style={{position:"relative",paddingTop:"1rem",paddingBottom:"1rem",paddingLeft:"1rem",paddingRight:"1rem"}} >
     <Grid container   xs={6} alignItems="flex-start"  style={{position:"relative"}} >
      
     <Grid  style={{marginBottom:"1rem",borderRadius:"50%"}} item xs={12}>
       <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"0.3rem",borderRadius:"50%",backgroundColor:header=== 'Total Responses'?"inherit":header=== 'Farmer'?"#F5F5F5":header=== 'Agent'?'#DAFBF7':'#FFFFFF',width:"max-content"}}>
     { header=== 'Farmer'? <BsPerson   style={{color:"#90C434"}}/>
       :
       header=== 'Agent'? <PiPersonThin   style={{color:"#000000"}}/>
       :
       header === "Balance" ? <FaRegMoneyBill1 style={{color:"#000000"}} />
       :
       header=== 'Total Responses'? <PiPersonThin   style={{display:"none",color:"#000000"}}/>
       :
       header=== 'Farm' && <GrMapLocation   style={{color:"#90C434"}}/>
     }
       </div>
     </Grid>
     
      <Grid item xs={12}>
      <Typography color="textPrimary" variant="h6" component="p" style={{color: '#000000',fontFamily:"Poppins", fontSize: '16px',fontWeight:"300",marginBottom:"1rem", whiteSpace: 'nowrap' }}>
       {header}
      </Typography>
      </Grid>

      <Grid item xs={12} >
        <Typography color="textPrimary" variant="h4" component="p" style={{color: '#000000', fontSize: ` ${ header=== 'Farm' && "20px" } `, fontWeight:"400",fontFamily:"Poppins",display:"inline-block",marginBottom:"0.5rem"}}>
          {value}{header=== 'Farm' && ' ha'}
        </Typography>
       {header === 'Total Responses' &&
        <Typography color="textPrimary" variant="p" component="p" style={{color:'#000000',textAlign:"right",display:"inline-block",marginLeft:"1rem"}}>
             <div style={{backgroundColor: header!== 'Farm'?"#ECFDF3":"#FFFFFF",padding:"0.2rem",width:"max-content",borderRadius:"0.2rem",fontSize:"0.7rem"}}>
            <span> <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",color:"#12B76A"}}>{additions}{'+'}{header!=='Total Responses' && <BsFillTriangleFill style={{fontSize:"0.5rem"}} />}  </span>  {" "}{header==='Total Responses'? "" :"This Month"}</span> 
            </div>
        </Typography>
       }
      </Grid>
      

    </Grid>

    {header !== 'Total Responses' &&
      <Grid xs={6} container alignItems="flex-end" justifyContent="flex-end" style={{textAlign:"right",height:"5.8rem",marginTop:"0rem",paddingRight:"1rem"}} >
      <Grid item xs={12} style={{display:"flex",justifyContent:"flex-end",textAlign:"right"}}>
        <Typography color="textPrimary" variant="p" component="p" style={{color:'#000000',textAlign:"right"}}>
             <div style={{backgroundColor: header!== 'Farm'?"#ECFDF3":"#FFFFFF",padding:"0.2rem",width:"max-content",borderRadius:"0.2rem",fontSize:"0.7rem"}}>
            <span> <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",color:"#12B76A"}}>{additions}{'+'} {header!=='Total Responses' && <BsFillTriangleFill style={{fontSize:"0.5rem"}} />}   </span>  {" "}{header==='Total Responses'? "" :"This Month"}</span> 
            </div>
        </Typography>
      </Grid>
  
    </Grid>
    }

  </Grid>
     
    </div>
  );
}
