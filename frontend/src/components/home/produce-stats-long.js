import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, CircularProgress, Divider, Grid, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import redboy from 'src/assets/images/jeansfarmer.jpeg';
import greenboy from 'src/assets/images/farmer2.jpeg';
import athlete from 'src/assets/images/farmer3.jpeg';
import amfootball from 'src/assets/images/farmer4.jpeg';
/*import  noimage from 'src/assets/images/no-image.jpg';*/

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



import { saveCurrentCropFilter, saveFarmerInFocus,saveProductInFocus } from 'src/redux/reducers/group.slice';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { FaTrash } from 'react-icons/fa';
import { deleteFarmerSingleInput, deleteSingleProduct } from 'src/redux/actions/group.action';

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




const columns = [
  /*{
    field: 'id',
    headerName: '#', 
    width: 250,
    renderCell: (params) => {
    },
  },*/ 
  {
    field: 'image', 
    headerName: 'Produce',
    width: 200,
    height:250,
    renderCell: (params) => {

      var returnStyle = (params)=>{
       return params.row.index
      }
      
      //const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"0.5rem",width:100}}>
        
        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}><div>{/*THE NUMBERS SHOULD GO HERE */}</div> 
      
  </div>
      
       <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"1rem",gap:"25px"}}>
        <img src={params.row.image} style ={{height:"40px",width:"50px",borderRadius:"50%"}}/>
       
        <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"1rem"}}>{params.row.name}</span>
       </span>

      </div>;
    },
  },

  
  {/*
    field: 'name', 
    headerName: '',
    width: 150,
    height:250,
    renderCell: (params) => {

      var returnStyle = (params)=>{
       return params.row.index
      }
      
      
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"0.5rem",width:100}}>
        
        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}><div></div> 
      
  </div>
      
       <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"1rem"}}>{params.row.name}</span>

      </div>;
    },
  */},
 
  { field: 'quantity', headerName: 'Unit Quantity', width: 130,height:450, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.unitQuantity && params.row.unitQuantity}</div>;
  }, },

  { field: 'localPrice', headerName: 'Price (CFA)', width: 130,height:450, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.localPrice}</div>;
  },  },
  { field: 'nextHarvestDate', headerName: 'Next Harvest', width: 130,height:450, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.nextHarvestDate?params.row.nextHarvestDate: "17/06/2025"}</div>;
  }, },
  { field: 'nextHarvestQuantity', headerName: 'Next Harvest', width: 130,height:450, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.nextHarvestQuantity?params.row.nextHarvestQuantity: "2.3"}</div>;
  }, },
 
  {
    field: 'actions',
    headerName: '',
    width: 110,
    height:250,
  },
  {
    field: 'delete',
    headerName: '',
    width: 70,
    height:250,
  },
];

export default function ProduceStatsLong({ farmers }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [priceChange,setPriceChange] = React.useState('')

  const handleActionClick = (student) => {
    navigate('/dashboard/edit-student', { state: { student } });
  };

  const handleCellClick = (param, event) => {
    event.defaultMuiPrevented = param.field !== "actions"
    //console.log("STOPPING PROPAGATIONS!")
    event.stopPropagation()
    
    };


    const handleInputDelete = (productId) =>{
     
   //   let inputsArrayCopy = [...inputsArray]
   //   console.log("INPUTS ARRAY COPY INDEX IS ___>",inputsArray)
 //
   //  const updatedInputsArray = inputsArrayCopy && inputsArrayCopy.filter((item)=>(item._id !== indexId))
 //
   //  console.log("UPDATED INPUTS ARRAY  IS ___>",updatedInputsArray)
 //
 //
   // const farmerObject = {
   //    _id:farmerId,
   //   inputs:updatedInputsArray.filter((item)=>(item.id !== '1')), //i need to filter the hardcoded entry mr dean asked me to put, so i dont add it in the db - mar 13 dagogo
   //  }
 
     
 
     //dispatch(deleteFarmerSingleInput(farmerObject))

     console.log("PRODUCT ID TO DELETE IS -->",productId)
     dispatch(deleteSingleProduct(productId))
   }
    

  const [loading,setLoading] = React.useState(false)


  return (
    <div style={{ height: 930, width: '100%' }}>
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
         
        },

        '& .MuiDataGrid-row:nth-child(even)': {
          backgroundColor: '#ffffff', // White background for even rows
        },

        '& .MuiDataGrid-row:nth-child(odd)': {
          backgroundColor: '#f4f4f4', // Light background for odd rows
        },


        '& .MuiDataGrid-virtualScroller': {
          overflow: 'hidden', // Hides both scrollbars
        },
        '& .MuiDataGrid-root': {
          scrollbarWidth: 'none', // For Firefox
        },
        '& .MuiDataGrid-root::-webkit-scrollbar': {
          display: 'none', // For Chrome, Safari, and Edge
        },
      }}
      //getRowClassName={(params) => (classes.row)}
      onCellClick={handleCellClick}
        rows={farmers}
        rowHeight={80}
        columns={columns.map((col,index) => {
          if (col.field === 'actions') {
            return {
              ...col,
              renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                

                  <span 

                   onClick={() =>{ 
                                        
                     setLoading(true)
                     dispatch(saveProductInFocus(params.row))
                     //dispatch(saveCurrentCropFilter(params.row.produce))
                     setTimeout(()=>{
                   
                     navigate('/dashboard/farmer-products')
                    
                   },
                     1300)
                   
                   
                     setTimeout(()=>{
                   
                       setLoading(false)
                      
                     },
                       1200)
                   
                   }
                   }
                  
                  
                  style={{cursor:"pointer",color:"#90C434",textDecoration:"#90C434"}}>
                    View
                    </span>

                  
                
                </div>
              ),
            };
          }else if(col.field === 'name'){
            
            return {
              ...col,
              renderCell: (params) => (
               


              
                <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:180}}>
        
                 <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}><div>{/*THE NUMBERS SHOULD GO HERE */}</div>
                 
                   
                   {/*
                  <img src={params.row.photo} 
                     alt='farmer photo'
                    loading='lazy'
                  
                   
                     onError={({ currentTarget }) => {
                       currentTarget.onerror = null; 
                       currentTarget.src=params.row.index === 0 ? farmer1 : params.row.index === 1 ? farmer2: params.row.index === 2 ? farmer3: params.row.index === 3 ?farmer4 : params.row.index === 4 ?farmer5 : params.row.index === 5 ?farmer6 : params.row.index === 6 ?farmer7 : params.row.index === 7 ? farmer8: params.row.index === 8 ? farmer9: params.row.index === 9 ?farmer10 :farmer10 ;
                    }} 
             
                   style ={{height:"50px",width:"50px",borderRadius:"50%"}}
                   />
                  */}
                  
                  </div>
               
                <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"1rem"}}>{params.row.name}</span>
         
               </div>
            
            ),



            };


          }
          else if(col.field === 'delete'){
    
            return {
              ...col,
              renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              

                  <span  onClick={()=>{handleInputDelete(params.row._id/*,inputs,farmerInFocus._id*/) }} style={{cursor:"pointer",color:"green",textDecoration:"underline",fontSize:"1.2rem"}}>
                    <FaTrash />
                    </span>
                 
                </div>
              ),
            };

          }
          else if(col.field === 'price'){
            return {
              ...col,
              renderCell: (params,index) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                

                  <TextField 
                   value={ params.row.price}
                   onChange={(e) =>{ 
                                        
                     setPriceChange(e.target.value)
                      if(params.row.index === index){
                        params.row.price = e.target.value
                      }
                   }
                   }
                  
                   inputProps={{
                    style: { border: "0px", outline: "none", padding: "8px" }, // Removes border from input field
                  }}
                  sx={{
                    cursor: "pointer",
                    color: "#90C434",
                    textDecoration: "#90C434",
                    border: "0px", // Ensures no border on the outer TextField
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "0px", // Removes border for outlined variant
                      },
                      "&:hover fieldset": {
                        border: "0px", // Removes border on hover
                      },
                      "&.Mui-focused fieldset": {
                        border: "0px", // Ensures no border when focused
                      },
                    },
                  }}
                  />
               

                  
                
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
       
        checkboxSelection={false}
      />
      }
    </div>
  );
}