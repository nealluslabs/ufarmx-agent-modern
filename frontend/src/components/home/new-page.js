<Grid xs={6.7} sm={6.7} style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"flex-start",backgroundColor:"#FFF",borderRadius:"1rem"}}>
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

   <div style={{fontSize:"0.8rem",color:"black",position:"relative",top:"-0.2rem",marginBottom:"0.5rem"}}>
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


 

{type==="one" &&
   <div>
  {farmName}
   </div>
}
 
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
      onClick={()=>{}}
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
                  '#0A9C3633', 
                  color: 'inherit',           
                  cursor: 'default',          
                  boxShadow: 'none',          
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