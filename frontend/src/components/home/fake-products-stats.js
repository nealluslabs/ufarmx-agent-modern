import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, CircularProgress, Divider, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

import redboy from 'src/assets/images/corn.jpeg';
import greenboy from 'src/assets/images/potato.jpeg';
import athlete from 'src/assets/images/plantain.jpeg';
import amfootball from 'src/assets/images/amfootball.jpeg'
import { isMobile } from 'react-device-detect';
import { FaTrash } from 'react-icons/fa';

const useStyles = makeStyles({
  row: {
  backgroundColor: '#F9F9F9',
  marginTop:"3px",
  marginBottom:"3px",
  },
  });

const columns = !isMobile? [
  /*{
    field: 'id',
    headerName: '#', 
    width: 250,
    renderCell: (params) => {
    },
  },*/
  {
    field: 'name', 
    headerName: 'Name',
    width: 230,
    renderCell: (params) => {
      //const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"1.5rem",width:"60%"}}>
        
       
      
       <span style={{fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left"}}>{params.row.name}</span>

      </div>;
    },
  },
 
  { field: 'quantity', headerName: 'Quantity', width: 230, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.quantity && params.row.quantity }</div>;
  }, },
  
  { field: 'price', headerName: 'Price', width: 230, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.price && params.row.price }</div>;
  }, },
 // {
 //   field: 'delete',
 //   headerName: '',
 //   width: 150,
 // },
]
:
[

  {
    field: 'cropName', 
    headerName: 'Name',
    width: 250,
    renderCell: (params) => {
      //const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"1.5rem",width:"60%"}}>
        
        <div style={{fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"flex-start"}}><div>{/*THE NUMBERS SHPULD GO HERE */}</div> <img src={params.row.image/*params.row.id === '0S91dTHhu7t0Zc6645Gb'?redboy:params.row.id === '75LPiOJKwtndeC67o5d3'?greenboy:params.row.id === '8Gnbs3WPwJ7ZzzvHgORs'?athlete:amfootball*/} style ={{height:"40px",width:"50px",borderRadius:"50%"}}/></div>
      
       <span style={{fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left"}}>{params.row.cropName}</span>

      </div>;
    },
  },

 
 // {
 //   field: 'delete',
 //   headerName: '',
 //   width: 150,
 // },
]


export default function FakeProductsStats({ crops }) {
  const navigate = useNavigate();
  const classes = useStyles();

  const handleActionClick = (student) => {
    navigate('/dashboard/edit-student', { state: { student } });
  };


  const handleCellClick = (param, event) => {
    event.defaultMuiPrevented = param.field !== "actions"
   // console.log("STOPPING PROPAGATIONS!")
    event.stopPropagation()
   
  

  
    
    };

  return (
    <div style={{ height: crops.length > 3 ?600:400, width: '100%'}}>
     { !classes.row?
       <CircularProgress/>
     :
      <DataGrid
      onCellClick={handleCellClick}
        rows={crops}
        rowHeight={80}
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
       // getRowClassName={(params) => (classes.row)}
        columns={columns.map((col) => {
          if (col.field === 'actions') {
            return {
              ...col,
              renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                 {/* <Button
                   
                    variant="contained"
                    style={{ minWidth: '80px', backgroundColor: "#2DA840", marginRight: '20px' }}
                  >
                   View
              </Button>*/}

                 <span  onClick={() => {/*navigate('/dashboard/crop-profile')*/} } style={{cursor:"pointer",color:"green",textDecoration:"underline"}}>View</span>
                </div>
              ),
            };
          }else if(col.field === 'delete'){
    
            return {
              ...col,
              renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              

                  <span  onClick={()=>{ }} style={{cursor:"pointer",color:"green",textDecoration:"underline",fontSize:"1.2rem"}}>
                    <FaTrash />
                    </span>
                 
                </div>
              ),
            };

          }

          return col;
        })}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
      />
  }
    </div>
  );
}