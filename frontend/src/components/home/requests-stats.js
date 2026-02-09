import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, CircularProgress, Divider, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import redboy from 'src/assets/images/jeansfarmer.jpeg';
import greenboy from 'src/assets/images/farmer2.jpeg';
import athlete from 'src/assets/images/farmer3.jpeg';
import amfootball from 'src/assets/images/farmer4.jpeg';
/*import  noimage from 'src/assets/images/no-image.jpg';*/
import { isMobile } from 'react-device-detect';

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



import { saveRequestInFocus,saveResponseInFocus,clearResponseInFocus, saveFormInFocus, clearFormInFocus} from 'src/redux/reducers/group.slice';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { fetchAllFarmerProduce, fetchFarmerById, fetchRetailerFarmerById } from 'src/redux/actions/group.action';

const random = Math.random()*11
//console.log("Math random is-->", random)
const noimage = Math.random()*11 < 1 ? farmer1 : Math.random()*11 < 2 ? farmer2: Math.random()*11 < 3 ? farmer3: Math.random()*11 < 4 ?farmer4 : Math.random()*11 < 5 ?farmer5 : Math.random()*11 < 6 ?farmer6 : Math.random()*11 < 7 ?farmer7 : Math.random()*11 < 8 ? farmer8: Math.random()*11 < 9 ? farmer9: Math.random()*11 < 10 ?farmer10 :farmer10 


const useStyles = makeStyles({
  row: {
  backgroundColor: '#F9F9F9',
  marginTop:"3px",
  marginBottom:"3px",
  },
  });


const columns =  !isMobile ? [
  {
    field: 'id',
    headerName: 'Request', 
    width: 75,
    renderCell: (params) => {
      return <div style={{fontSize:"1rem",display:"flex",flexDirection:"column"}}>
     
      
       <div style={{fontSize:"1rem",display:"flex",flexDirection:"column"}}>
      {params.row.id && `#${params.row.id.slice(0,5)}`
    }
      </div>

      </div>;
    },
  },
  { field: 'approvedDate', headerName: 'Date', width: 160,height:450, renderCell: (params) => {
    return <div style={{fontSize:"1rem",display:"flex",flexDirection:"column"}}>
      {params.row.approvedDate && new Date(params.row.approvedDate).toDateString() }
      
       <div style={{fontSize:"0.6rem",display:"flex",flexDirection:"column"}}>
      {params.row.approvedDate && new Date(params.row.approvedDate).toLocaleTimeString('en-US', {
     hour: 'numeric',
     minute: '2-digit',
     hour12: true
      }) }
      </div>

      </div>;
  }, },
  {
    field: 'farmerName', 
    headerName: 'Name',
    width: 275,
    height:250,
    renderCell: (params) => {
      
      //const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:280}}>
        
       
      
       <span style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"1rem",position:"relative",left:"-0rem"}}>{params.row.farmerName}</span>
       <div style={{backgroundColor:"#FFE6BD",borderRadius:"20px",color:"#B36034",padding:"1px",paddingLeft:"12px",paddingRight:"12px",width:"110px",textAlign:"center",border:"1px solid #DEDEDE",position:"relative",left:"4.5rem",fontSize:"1rem"}}>{"My Farmer"}</div>

      </div>;
    },
  },
  { field: 'riskScore', headerName: '', width: 120,height:450, renderCell: (params) => {
    return <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"0rem"}}>
    <div style={{borderRadius:"20px",color: params.row.riskScore?
    (params.row.riskScore< 4?
    "#DF2007"
    :
    params.row.riskScore >=4 && params.row.riskScore <7?
    "#ED9E0B"
    :
    "#0A9C36"
    )
    :
    '#0A9C36',padding:"1px",paddingLeft:"1px",paddingRight:"1px",width:"max-content",textAlign:"center"}}>{params.row.riskScore && params.row.riskScore.toFixed(1)}</div>

     {/**the corresponding button  -START*/}

     <Button
variant="contained"
sx={{
scale:"0.9",
position:"relative",
left:"0.5rem",
fontFamily:"Poppins",
boxShadow: 'none', // prevent elevation
paddingX: 0.3,
paddingY: 0.3,

backgroundColor: params.row && params.row.riskScore?
(params.row.riskScore< 4?
"#DF200733"
:
params.row.riskScore >=4 && params.row.riskScore <7?
"#ED9E0B33"
:
"#0A9C3633"
)
:
'#0A9C3633',
borderRadius: '2rem',
color: 'white',
textTransform: 'none',


fontWeight: 400,
fontSize: '0.85rem',
'&:hover': {
backgroundColor: params.row && params.row.riskScore?
(params.row.riskScore< 4?
"#DF200733"
:
params.row.riskScore >=4 && params.row.riskScore <7?
"#ED9E0B33"
:
"#0A9C3633"
)
:
'#0A9C3633', // prevent background color change
color: 'inherit', // prevent text color change
cursor: 'default', // optional: don't show pointer cursor

},
}}
>
{
params.row && params.row.riskScore?
( params.row.riskScore< 4?
<span style={{opacity:1,
color: params.row && params.row.riskScore?
( params.row.riskScore< 4?
"#DF2007"
:
params.row.riskScore >=4 && params.row.riskScore <7?
"#ED9E0B"
:
"#0A9C36")
:
"#0A9C36"

}}>Poor</span>
:
params.row.riskScore >=4 && params.row.riskScore <7?
<span style={{opacity:1,
color: params.row && params.row.riskScore?
( params.row.riskScore< 4?
"#DF2007"
:
params.row.riskScore >=4 && params.row.riskScore <7?
"#ED9E0B"
:
"#0A9C36")
:
"#0A9C36"


}}>Good</span>
:
<span style={{opacity:1,
color: params.row && params.row.riskScore?
( params.row.riskScore< 4?
"#DF2007"
:
params.row.riskScore >=4 && params.row.riskScore <7?
"#ED9E0B"
:
"#0A9C36")
:
"#0A9C36"

}}>Excellent</span>
)
: 
<span style={{opacity:1,
color: params.row && params.row.riskScore?
( params.row.riskScore< 4?
"#DF2007"
:
params.row.riskScore >=4 && params.row.riskScore <7?
"#ED9E0B"
:
"#0A9C36")
:
"#0A9C36"

}}>Good</span>
}
</Button>



    {/**the corresponding risk score button - END */}

   </div>
  }},
  { field: 'items', headerName: 'Items', width: 60,height:450, renderCell: (params) => {
    return <div >{params.row.products && params.row.products.length}</div>;
  }},
  { field: 'status', headerName: 'Status', width: 110,height:450, renderCell: (params) => {
    return <div style={{backgroundColor:params.row.status==="Approved"?"#B4DAC5":params.row.status==="Rejected"?"#F9B8C5":"#E4E7EC",borderRadius:"20px",color:params.row.status==="Approved"?"#0B7D3E":params.row.status==="Rejected"?"#D8173D":"black",padding:"1px",paddingLeft:"4px",paddingRight:"4px",width:"90px",textAlign:"center",border:"1px solid #DEDEDE",fontSize:"1rem"}}>{params.row.status}</div>;
  }},
  { field: 'total', headerName: 'Total', width: 90,height:450, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>₦{params.row.totalAmount && params.row.totalAmount}</div>;
  }},
 // { field: 'invoice', headerName: ' Invoice', width: 170,height:450, renderCell: (params) => {
 //   return <div style={{fontSize:"1rem"}}>{params.row.invoice}</div>;
 // }},
 /* { field: 'location', headerName: 'Location',  width: 250,height:450, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}> {params.row.location}</div>;
  }, },*/
 
  {
    field: 'actions',
    headerName: 'Action',
    width: 110,
    height:250,
  },
]
:

[
  {
    field: 'id',
    headerName: '#', 
    width: 250,
    renderCell: (params) => {
    },
  },
  {
    field: 'name', 
    headerName: 'Name',
    width: 120,
    height:250,
    renderCell: (params) => {
      
      //const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:450}}>
        
        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}><div>{/*THE NUMBERS SHOULD GO HERE */}</div> 
   
  
  </div>
      
       <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"0.5rem"}}>{params.row.name}</span>

      </div>;
    },
  },

  {
    field: 'actions',
    headerName: '',
    width: 150,
    height:250,
  },
]



export default function RequestsStats({ forms }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const { isAgent,isAdmin,isSuperAdmin } = useSelector((state) => state.group);
  const { user } = useSelector((state) => state.auth);

 // console.log("WHAT IS ENTERING REQUESTS TABLE?--->",forms)


  const handleActionClick = (student) => {
    navigate('/dashboard/edit-student', { state: { student } });
  };

  const handleCellClick = (param, event) => {
    event.defaultMuiPrevented = param.field !== "actions"
    //console.log("STOPPING PROPAGATIONS!")
    event.stopPropagation()
    
    };

  const [loading,setLoading] = React.useState(false)


  return (
    <div style={{ height: 450, width: '100%' }}>
     { !classes.row?
       <CircularProgress/>
     :
      <DataGrid
      sx={{
        
        '& .MuiDataGrid-row': {
         
         // marginTop:"3px",
         // marginBottom:"3px",
         
         
          color:"black",
          borderColor:"transparent"
         
        },   '& .MuiDataGrid-cell:focus': {
          outline: 'none', // Removes the blue focus outline
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#F5F5F5', // 👈 header background
          fontSize:"0.9rem"
        },
        //'& .MuiDataGrid-row:nth-child(even)': {
        //  backgroundColor: '#ffffff', // White background for even rows
        //},

       // '& .MuiDataGrid-row:nth-child(odd)': {
       //   backgroundColor: '#f4f4f4', // Light background for odd rows
       // },


        '& .MuiDataGrid-virtualScroller': {
          overflowY: 'hidden', 
        },
        '& .MuiDataGrid-root': {
          scrollbarWidth: 'none',
        },
        '& .MuiDataGrid-root::-webkit-scrollbar': {
          display: 'none', 
        },
        '& .MuiDataGrid-columnHeaderCheckbox, & .MuiDataGrid-cellCheckbox': {
          width: '40px',   // reduce default space (default ~56px)
          maxWidth: '40px',
          minWidth: '40px',
        },
      }}
      //getRowClassName={(params) =>(classes.row)}
      onCellClick={handleCellClick}
        rows={forms}
        rowHeight={80}
       
        disableSelectionOnClick
        columns={columns.map((col,index) => {
          if (col.field === 'actions') {
            return {
              ...col,
              renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' ,gap:"5rem"}}>
                 {/* <Button
                    onClick={() =>{ 
                     
                      setLoading(true)
                   if(params.row.responseObject){
                      dispatch(saveResponseInFocus(params.row))
                     }
                 else {

                  dispatch(clearResponseInFocus(params.row))
                 }



                      setTimeout(()=>{
                   
                      navigate('/dashboard/view-response')
                     
                    },
                      1200)
          
          
                      setTimeout(()=>{
                   
                        setLoading(false)
                       
                      },
                        1000)

                    }
                     }
                    variant="contained"
                    style={{ minWidth: '130px', backgroundColor: "#2DA840", marginRight: '20px' }}
                  >
                   {'View'}
                    </Button> */}
                <div sx={{display:"flex",gap:"0.5rem"}}>
                {/*isSuperAdmin && !isAdmin &&
                  <span 


                     onClick={() =>{ 
                                          
                       setLoading(true)
                     if(params.row.fields){
                       dispatch(saveFormInFocus(params.row))
                      }
                     else {
                     
                     dispatch(clearFormInFocus(params.row))
                     }
                     
                     
                     
                       setTimeout(()=>{
                     if(params.row.title.includes("Farmer Intake Form") ||params.row.title.includes('Velingara') ){
                     // navigate('/dashboard/farmers-intake-fill-form')
                     }
                     else{
                     // navigate('/dashboard/view-form')
                     }
                      
                     },
                       1200)
                     
                     
                       setTimeout(()=>{
                     
                         setLoading(false)
                        
                       },
                         1000)
                     
                     }
                      }
                  
                  
                  style={{cursor:"pointer",color:"#90C434",marginRight:"0.5rem"}}>
                    Edit
  
                   </span>
                 */}

                   <span 


                   onClick={() =>{ 
                          // console.log("WHAT IS RETAILER FARMER ID-->",params.row.retailer_farmer_id)                                  
                     dispatch(saveRequestInFocus(params.row))
                      dispatch(fetchRetailerFarmerById(params.row.retailer_farmer_id))    
                     .then(()=>{ 
                   
                     setTimeout(()=>{
                   
                     navigate('/dashboard/farmer-request')
                    
                   },
                     600)
                   
                   
                    })
                   
                   }
                   }
               
               
               style={{cursor:"pointer",color:"#0A6054",fontSize:"1rem"}}>
               View
               
               </span>
                </div>


            {isAgent &&
                   <span 


                     onClick={() =>{ 
                       // console.log("PARAMS ROW (FOR FORM) IS -->",params.row)                   
                       setLoading(true)
                     if(params.row.fields){
                       dispatch(saveFormInFocus(params.row))
                      }
                     else {
                     
                     dispatch(clearFormInFocus(params.row))
                     }
                     
                     
                     
                       setTimeout(()=>{
                       
                        if(params.row.title=== 'Farmer Intake Form (english)'||params.row.title=== 'Velingara Onboard (Français)' ||params.row.title=== 'Velingara (Français) 2'){
                         
                          navigate('/dashboard/farmers-intake-fill-form')
                        }
                        else{
                       navigate('/dashboard/fill-form')
                        }
                     },
                       1200)
                     
                     
                       setTimeout(()=>{
                     
                         setLoading(false)
                        
                       },
                         1000)
                     
                     }
                      }
                  
                  
                  style={{cursor:"pointer",color:"#90C434",textDecoration:"underline"}}>
                    Fill
  
                   </span>
                 
                 }

                 

                </div>
              ),
            };
          }else if(col.field === 'formName'){
            
            return {
              ...col,
              renderCell: (params) => (
               


              
                <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:450}}>
        
                 <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}><div>{/*THE NUMBERS SHOULD GO HERE */}</div>
                  

                 {/*
                  <img src={params.row.photo} 
                     alt='farmer photo'
                    loading='lazy'
                  
                   
                     onError={({ currentTarget }) => {
                       currentTarget.onerror = null; 
                       currentTarget.src=params.row.index === 0 ? farmer1 : params.row.index === 1 ? farmer2: params.row.index === 2 ? farmer3: params.row.index === 3 ?farmer4 : params.row.index === 4 ?farmer5 : params.row.index === 5 ?farmer6 : params.row.index === 6 ?farmer7 : params.row.index === 7 ? farmer8: params.row.index === 8 ? farmer9: params.row.index === 9 ?farmer10 :farmer10 ;
                    }} 
             
                   style ={{height:"50px",width:"60px",borderRadius:"16px"}}
                   />
                  */}
                  
                  </div>
               
                <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"1rem"}}>{params.row.title}</span>
         
               </div>
            
            ),



            };


          }
          return col;
        })}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection={true}
      />
    }
    </div>
  );
}