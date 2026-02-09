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
import { FiEdit,FiEye } from "react-icons/fi";



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



import { saveRequestInFocus,saveResponseInFocus,clearResponseInFocus, saveFormInFocus, clearFormInFocus, saveProductInFocus} from 'src/redux/reducers/group.slice';
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
    headerName: 'Product', 
    width: 230,
    renderCell: (params) => {
      return <div style={{fontSize:"1rem",display:"flex",flexDirection:"row",gap:"15px"}}>


{
                  <img src={params.row.image} 
                     alt='farmer photo'
                    loading='lazy'
                  
                   
                     onError={({ currentTarget }) => {
                       currentTarget.onerror = null; 
                       currentTarget.src=params.row.index === 0 ? farmer1 : params.row.index === 1 ? farmer2: params.row.index === 2 ? farmer3: params.row.index === 3 ?farmer4 : params.row.index === 4 ?farmer5 : params.row.index === 5 ?farmer6 : params.row.index === 6 ?farmer7 : params.row.index === 7 ? farmer8: params.row.index === 8 ? farmer9: params.row.index === 9 ?farmer10 :farmer10 ;
                    }} 
             
                   style ={{height:"70px",width:"70px",borderRadius:"16px"}}
                   />
                  }
     
      
       <div style={{fontSize:"1rem",display:"flex",flexDirection:"column",justifyContent:"center",gap:"7px"}}>

      <div style={{fontSize:"1rem",fontWeight:"500", whiteSpace: 'wrap',position:"relative",top:"0.2rem" }}> {params.row.name && `${params.row.name}`}</div>
     {/*
      <div style={{fontSize:"0.6rem",
      whiteSpace: "normal",   
    wordBreak: "break-word", 
    overflowWrap: "break-word"}}> 
    {params.row.id && `Disease Resistant Variety, Ideal for organic farming`}
    </div>
                */}
      </div>

      </div>;
    },
  },
  
  //{ field: 'approvedDate', headerName: 'Product', width: 200,height:450, renderCell: (params) => {
  //  return <div style={{fontSize:"1rem",display:"flex",flexDirection:"column"}}>
  //    {params.row.approvedDate && new Date(params.row.approvedDate).toDateString() }
  //    
  //     <div style={{fontSize:"0.6rem",display:"flex",flexDirection:"column"}}>
  //    {params.row.approvedDate && new Date(params.row.approvedDate).toLocaleTimeString('en-US', {
  //   hour: 'numeric',
  //   minute: '2-digit',
  //   hour12: true
  //    }) }
  //    </div>
//
  //    </div>;
  //}, },
  { field: 'status', headerName: 'Status', width: 90,height:450, renderCell: (params) => {
    return <div style={{scale:"0.7",backgroundColor:params.row.status==="Active"?"#B4DAC5":params.row.status==="Inactive"?"#F9B8C5":"#E4E7EC",borderRadius:"20px",color:params.row.status==="Active"?"#0B7D3E":params.row.status==="Inactive"?"#D8173D":"black",padding:"1px",paddingLeft:"12px",paddingRight:"12px",width:"110px",textAlign:"center",border:"1px solid #DEDEDE"}}>{params.row.status}</div>;
  }},
  {
    field: 'quantity', 
    headerName: 'Quantity',
    width: 120,
    height:250,
    renderCell: (params) => {
      
      //const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:80}}>
        
       
      
       <span style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"1rem",position:"relative",left:"-0rem"}}>{params.row.quantity}</span>
     

      </div>;
    },
  },
  {
    field: 'category', 
    headerName: 'Category',
    width: 120,
    height:250,
    renderCell: (params) => {
      
      //const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:280}}>
        
       
      
       <span style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"1rem",position:"relative",left:"-0rem"}}>{params.row.category}</span>
     

      </div>;
    },
  },
  {
    field: 'unit', 
    headerName: 'UoM',
    width: 110,
    height:250,
    renderCell: (params) => {
      
      //const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:80}}>
        
       
      
       <span style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"1rem",position:"relative",left:"-0rem"}}>{params.row.unit}</span>
      

      </div>;
    },
  },
  {
    field: 'price', 
    headerName: 'Price',
    width: 100,
    height:250,
    renderCell: (params) => {
      
      //const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:80}}>
        
       
      
       <span style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"1rem",position:"relative",left:"-0rem"}}>{params.row.price}</span>
      

      </div>;
    },
  },
  {
    field: 'credit', 
    headerName: 'Credit',
    width: 50,
    height:250,
    renderCell: (params) => {
      
      //const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:80}}>
        
       
      
       <span style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"1rem",position:"relative",left:"-0rem"}}>yes</span>
      

      </div>;
    },
  },



 // { field: 'invoice', headerName: ' Invoice', width: 170,height:450, renderCell: (params) => {
 //   return <div style={{fontSize:"1rem"}}>{params.row.invoice}</div>;
 // }},
 /* { field: 'location', headerName: 'Location',  width: 250,height:450, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}> {params.row.location}</div>;
  }, },*/
 
  {
    field: 'actions',
    headerName: ' ',
    width: 100,
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



export default function NewProductsStatsLong({ forms }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const { isAgent,isAdmin,isSuperAdmin } = useSelector((state) => state.group);
  const { user } = useSelector((state) => state.auth);

  //console.log("WHAT IS ENTERING REQUESTS TABLE?--->",forms)


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
    <div style={{ height: 950, width: '100%' }}>
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
          fontSize:"1rem",
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
                 
                <div sx={{display:"flex",gap:"0.5rem"}}>
                

                   <span 

               style={{cursor:"pointer",color:"#141B34"/*"#0A6054"*/,display:"flex",gap:"10px"}}>
               <FiEye style={{fontSize:"1.2rem"}} /> <FiEdit onClick={()=>{dispatch(saveProductInFocus(params.row));setTimeout(()=>{navigate('/dashboard/edit-product')},1000)   }} style={{fontSize:"1.2rem"}} />

               
               </span>
                </div>


            {isAgent &&
                   <span 


                     onClick={() =>{ 
                       //console.log("PARAMS ROW (FOR FORM) IS -->",params.row)                   
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
                  

                 {
                  <img src={params.row.photo} 
                     alt='farmer photo'
                    loading='lazy'
                  
                   
                     onError={({ currentTarget }) => {
                       currentTarget.onerror = null; 
                       currentTarget.src=params.row.index === 0 ? farmer1 : params.row.index === 1 ? farmer2: params.row.index === 2 ? farmer3: params.row.index === 3 ?farmer4 : params.row.index === 4 ?farmer5 : params.row.index === 5 ?farmer6 : params.row.index === 6 ?farmer7 : params.row.index === 7 ? farmer8: params.row.index === 8 ? farmer9: params.row.index === 9 ?farmer10 :farmer10 ;
                    }} 
             
                   style ={{height:"50px",width:"60px",borderRadius:"16px"}}
                   />
                  }
                  
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