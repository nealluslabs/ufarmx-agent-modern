import {useState} from 'react';
import Typography from '@mui/material/Typography';
// import Title from './title';
import { Button, Divider, Grid } from '@mui/material';
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
import { saveAgentInFocus } from 'src/redux/reducers/group.slice';
import { fetchFarmersForOneAgent,fetchAllResponsesForOneAgentAdminModule } from 'src/redux/actions/group.action';


function preventDefault(event) {
  event.preventDefault();
}

export default function AgentCard({params,headerOne, headerTwo, value, type,image,agentId,agentAddedId,farmerId,farmerName,farmName,phoneNumber,email,city,index }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loading,setLoading] = useState(false)
  //console.log("farmer id is -->",farmerId)
  return (
    <>
      <Grid container alignItems="center" style={{ padding: '10px',color:"#4B0082" }}>
        <Grid item xs={6}>
         {/*
          <Typography color="textPrimary" variant="h6" component="p" style={{ color: '#9291A5', fontSize: '16.23px' }}>
            {headerOne}
          </Typography>
             */}
      
          <Typography color="textPrimary" variant="h6" component="p" style={{ fontSize: '22.23px',fontWeight:"200",paddingLeft:"2rem" }}>
           {headerTwo} 
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

      {/*<Divider />*/}
      

      <Grid container alignItems="center" justifyContent={"flex-start"} >
        <Grid item xs={12} sm={2} style={{ textAlign: 'center',height:"5rem",display:"flex" ,justifyContent:"flex-start"}}>
          
          <img src={image}

           onError={({ currentTarget }) => {
             currentTarget.onerror = null; 
             currentTarget.src=index === 0 ? farmer1 : index === 1 ? farmer2: index === 2 ? farmer3: index === 3 ?farmer4 : index === 4 ?farmer5 : index === 5 ?farmer6 : index === 6 ?farmer7 : index === 7 ? farmer8: index === 8 ? farmer9: index === 9 ?farmer10 :farmer10 ;
           }} 
          
          style={{marginLeft:"2rem",marginBottom:"1rem",height:"4rem",width:"5rem",borderRadius:"50%"}} alt="athlete image"/>
       
         
         
        </Grid>


       <Grid xs={12} sm={7} style={{}}>

  
           
           <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",textAlign:"left",gap:"1rem",paddingLeft:"1rem"}}>
           
        


           <div> 
          {farmerName}
           </div>


           {agentAddedId &&
           <div> 
          {agentAddedId}
           </div>
         }


           {farmerId &&
           <div> 
           {agentId}&nbsp;&nbsp;{farmerId}
           </div>
        }
      
        {type==="one" &&
           <div>
          {farmName}
           </div>
        }
          

           <div>
           {city/*email*/}
           </div>


           <div>
           {phoneNumber}
           </div>


       {type==="one" &&
           <div>
           {city}
           </div>
         }

           </div>





       </Grid>


       <Grid xs={12} sm={3}  style={{display:"flex",justifyContent:"flex-end",paddingRight:"1rem"}}>

       {type!=="one" &&
           /*<Button
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
              onClick={()=>{}}
             >
              View
             </Button>*/

             <span 
             
              
             onClick={async() =>{ 
                                      
              setLoading(true)
              dispatch(saveAgentInFocus(params))
             // console.log("AGENT BEING PASSED IN -->,",params)
              dispatch(fetchFarmersForOneAgent(params.user_id)).then(()=>{ 
               //double nesting, refactor later
              dispatch(fetchAllResponsesForOneAgentAdminModule(params.user_id)).then(()=>{ 

              setTimeout(()=>{
            
              navigate('/dashboard/agent-profile')
             
            },
              2000)
            
             })
               })
              setTimeout(()=>{
            
                setLoading(false)
               
              },
                6000
              )
            }
           }
             
             
             style={{cursor:"pointer",color:"green",textDecoration:"underline"}}>{loading?"Loading...":"View"}</span>

          }

       </Grid>

      </Grid>
      <br />
    </>
  );
}
