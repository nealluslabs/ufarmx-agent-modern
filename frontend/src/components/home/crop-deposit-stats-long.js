import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, CircularProgress, Divider, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

import redboy from 'src/assets/images/cropcompany.png';
import greenboy from 'src/assets/images/cropcompany.png';
import athlete from 'src/assets/images/cropcompany.png';
import amfootball from 'src/assets/images/cropcompany.png';
import { isMobile } from 'react-device-detect';

const farmer1 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863974/farmer8_l3ewpm.png"
const farmer2 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863990/farmer2_icjojq.png"
const farmer3 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863997/farmer5_ip0m4q.png"
const farmer4 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863998/farmer7_zsvpiv.png"
const farmer5 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863996/farmer3_ngfl1i.png"
const farmer6 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866493/farmer1_ijfjvu.png"
const farmer7 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866568/farmer10_bnpjqc.png"
const farmer8 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866571/farmer9_l6pqj5.png"
const farmer9 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866573/farmer4_mp8ffo.png"
const farmer10 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866573/farmer6_fnwxhj.png"

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
  /*{
    field: 'companyName', 
    headerName: '# Crop',
    width: 450,
    renderCell: (params) => {
      //const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:350,fontSize:"1rem"}}>
        
        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",fontSize:"1rem"}}><div></div>
         <img src={params.row.photo?params.row.photo:params.row.index === 0?farmer1:params.row.index === 1?farmer2:params.row.index ===2 ?farmer3:params.row.index ===3 ?farmer4:params.row.index ===4 ?farmer5:farmer6  } 
         
         onError={({ currentTarget }) => {
          currentTarget.onerror = null; 
          currentTarget.src=params.row.index === 0 ? farmer1 : params.row.index === 1 ? farmer2: params.row.index === 2 ? farmer3: params.row.index === 3 ?farmer4 : params.row.index === 4 ?farmer5 : params.row.index === 5 ?farmer6 : params.row.index === 6 ?farmer7 : params.row.index === 7 ? farmer8: params.row.index === 8 ? farmer9: params.row.index === 9 ?farmer10 :farmer10 ;
        }} 
            

         style ={{height:"50px",width:"60px",borderRadius:"16px"}}/>
         </div>
      
       <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left",fontSize:"1rem"}}>{params.row.companyName}</span>

      </div>;
    },
  },*/

  { field: 'Crop', headerName: 'Crop', width: 190, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.cropName}</div>;
  },  },

  { field: 'earnings', headerName: 'Quantity', width: 190, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}} >{params.row.earnings}  </div>;
  },  },
  /*{ field: 'harvestDate', headerName: 'Date',  width: 190, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.depositDate}</div>;
  }, },*/
  { field: 'harvestDate', headerName: 'Deposit Date',  width: 190, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.depositDate}</div>;
  }, },
  
  {
    field: 'actions',
    headerName: '',
    width: 150,
  },
]
: 
[

  { field: 'Crop', headerName: 'Crop', width: 190, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.cropName}</div>;
  },  },

  {
    field: 'actions',
    headerName: '',
    width: 150,
  },
]


export default function CropDepositStatsLong({ cropDeposits }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleActionClick = (student) => {
    navigate('/dashboard/edit-student', { state: { student } });
  };

  const handleCellClick = (param, event) => {
    event.defaultMuiPrevented = param.field !== "actions"
   // console.log("STOPPING PROPAGATIONS!")
    event.stopPropagation()
    
    };
  


  return (
    <div style={{ height:cropDeposits.length < 5?460: 460, width: '100%',paddingBottom:"0rem" }}>
      { !classes.row?
       <CircularProgress/>
     :
     
      <DataGrid style={{paddingBottom:"0rem"}}
      onCellClick={handleCellClick}
      
        rows={cropDeposits}
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
          '& .MuiDataGrid-cell:focus': {
            outline:'none'
          }
        }}
        //getRowClassName={(params) => (classes.row)}

       

        columns={columns.map((col,index) => {
          if (col.field === 'actions') {
            return {
              ...col,
              renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                 {/* <Button
                    //onClick={() => handleActionClick(params?.row)}
                    variant="contained"
                    style={{ minWidth: '130px', backgroundColor: "#2DA840", marginRight: '20px' }}
                  >
                   View
                  </Button>*/}

                  <span   style={{cursor:"pointer",color:"green",textDecoration:"underline"}}>View</span>
                  {/* <Button
                    onClick={() => handleAddResult(params?.row)}
                    variant="contained"
                    style={{ minWidth: '85px', backgroundColor: "#000000" }}
                  >
                    Add Result
                  </Button> */}
                </div>
              ),
            };
          }

          return col  
           
        })}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
      />
     }
    </div>
  );
}