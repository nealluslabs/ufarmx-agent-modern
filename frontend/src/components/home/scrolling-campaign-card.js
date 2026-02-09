import * as React from 'react';
import Typography from '@mui/material/Typography';
// import Title from './title';
import { Button, Divider, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { fCurrency } from 'src/utils/formatNumber';
import PieChartOne from './pie-chart-one';
import PieChartTwo from './pie-chart-two';

/*import agent1 from 'src/assets/images/agent10.jpeg';
import agent2 from 'src/assets/images/agent2.jpeg';
import agent3 from 'src/assets/images/agent3.jpeg';
import agent4 from 'src/assets/images/agent4.jpeg';
import agent5 from 'src/assets/images/agent5.jpeg';
import agent6 from 'src/assets/images/agent6.jpeg';
import agent7 from 'src/assets/images/agent7.jpeg';

import agent9 from 'src/assets/images/agent9.jpeg';
import agent10 from 'src/assets/images/agent1.jpeg';*/

import noimage from 'src/assets/images/no-image.jpg';

import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { saveAgentInFocus } from 'src/redux/reducers/group.slice';
import { fetchFarmersForOneAgent } from 'src/redux/actions/group.action';


function preventDefault(event) {
  event.preventDefault();
}
 
export default function ScrollingCampaignCard({scrollItems, headerOne, headerTwo, value, type,image,farmerName,farmName,phoneNumber,email,city }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [indexToDisplay,setIndexToDisplay] =React.useState(0)

  return (
    <>
      <Grid container alignItems="center" style={{ padding: '10px' }}>
        <Grid item xs={6}>
          <Typography color="textPrimary" variant="h6" component="p" style={{ color: '#9291A5', fontSize: '16.23px' }}>
            {headerOne}
          </Typography>
          <Typography color="textPrimary" variant="h6" component="p" style={{ color: '#000000', fontSize: '20.33px' }}>
            <b>{headerTwo}</b>
          </Typography>
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
      <Divider />
      <br />

      <Grid container alignItems="center">

        <Grid item xs={12} style={{ textAlign: 'center',height:"10rem",display:"flex", }}>

      {
        scrollItems && scrollItems.slice(indexToDisplay,indexToDisplay+1).map((item)=>(   
        <>
        
          <img src={noimage/*indexToDisplay==1?agent1:indexToDisplay==2?agent2:indexToDisplay==3?agent3:indexToDisplay==4?agent4:indexToDisplay==5?agent5:indexToDisplay==6?agent6:indexToDisplay==7?agent7:indexToDisplay==8?agent9:indexToDisplay==9?agent10:agent10*/}

           style={{marginLeft:"2rem",marginBottom:"1rem",height:"9rem",width:"11rem",borderRadius:"1.5rem"}} alt="athlete image"/>
       
         
          <div style={{display:"flex",flexDirection:"column",width:"50%",alignItems:"center",justifyContent:"center",gap:"1rem"}}>
           
            <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",textAlign:"left"}}>
            
            <div> 
           {item.firstName && item.lastName ? item.firstName + " " + item.lastName :" "}
            </div>
       
         {type==="one" &&
            <div>
           {farmName}
            </div>
         }
            <div>
            {item.phoneNumber && item.phoneNumber}
            </div>


            <div>
            {email}
            </div>

        {type==="one" &&
            <div>
            {city}
            </div>
          }

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
               onClick={()=>{dispatch(fetchFarmersForOneAgent(item.user_id))
                            dispatch(saveAgentInFocus(item));
                             setTimeout(()=>{navigate('/dashboard/agent-profile')},1500)
                              }}
              >
               View
              </Button>
           }


          </div>
      </>
   ))  
     }
         
        </Grid>

        

        <Grid item xs={12} style={{ textAlign: 'center',display:"flex",justifyContent:"space-between",width:"100%" }}>
        <FaCaretLeft onClick={()=>{if(indexToDisplay > 0){
         setIndexToDisplay(indexToDisplay-1)
        }}} style={{color: '#2DA840',fontSize:"2rem"}}/> 


         <FaCaretRight  onClick={()=>{if(indexToDisplay < scrollItems.length-1){
          setIndexToDisplay(indexToDisplay+1)
         }}}style={{color: '#2DA840',fontSize:"2rem"}} /> 
        </Grid>
      
      </Grid>
     
    </>
  );
}
