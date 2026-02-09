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
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFarmerSingleInput } from 'src/redux/actions/group.action';
import { saveInputToUpdateInFocus } from 'src/redux/reducers/group.slice';

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

const columns = !isMobile?
[
  /*{
    field: 'id',
    headerName: '#', 
    width: 250,
    renderCell: (params) => {
    },
  },*/
  {
    field: 'amountSpent', 
    headerName: 'Amount',
    width: 100,
    renderCell: (params) => {
      //const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:700,fontSize:"1rem"}}>
        
       {/* <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",fontSize:"1rem"}}><div></div> <img src={params.row.photo?params.row.photo:params.row.index === 0?farmer1:params.row.index === 1?farmer2:params.row.index ===2 ?farmer3:params.row.index ===3 ?farmer4:params.row.index ===4 ?farmer5:farmer6  } style ={{height:"50px",width:"50px",borderRadius:"50%"}}/></div>*/}
      
       <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left",fontSize:"1rem"}}>{params.row.amountSpent}</span>

      </div>;
    },
  },

 /* { field: 'crop', headerName: 'Crop', width: 250, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.cropName}</div>;
  },  },*/

 /* { field: 'crop', headerName: 'Crop', width: 130, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}} >{params.row.crop}</div>;
  },  },*/
 

  { field: 'estHarvestDate', headerName: 'Est Harvest Date',  width: 100, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.estHarvestDate}</div>;
  }, },

  { field: 'estSales', headerName: 'Est Sales',  width: 100, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.estSales && params.row.estSales}</div>;
  }, },

  { field: 'actHarvestDate', headerName: 'Act Harvest Date',  width: 100, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.actHarvestDate}</div>;
  }, },

  { field: 'amountMade', headerName: 'Amount',  width: 100, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.amountMade}</div>;
  }, },
  { field: 'estReturns', headerName: 'Est Returns',  width: 100, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.estReturns}</div>;
  }, },
  { field: 'actReturns', headerName: 'Act Returns',  width: 100, renderCell: (params) => {
    return <div style={{fontSize:"1rem",color:params.row.gain===true?"green":"red",fontWeight:"700"}}>{params.row.actReturns && params.row.actReturns}</div>;
  }, },

  {
    field: 'actions',
    headerName: '',
    width: 100,
  },
  {
    field: 'delete',
    headerName: '',
    width: 100,
  },
]
:
[
 
  //{
  //  field: 'companyName', 
  //  headerName: 'Crop',
  //  width: 250,
  //  renderCell: (params) => {
  //   
  //    return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:700,fontSize:"1rem"}}>
  //      
  //      <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",fontSize:"1rem"}}><div>{/*THE NUMBERS SHPULD GO HERE */}</div> <img src={params.row.photo?params.row.photo:params.row.index === 0?farmer1:params.row.index === 1?farmer2:params.row.index ===2 ?farmer3:params.row.index ===3 ?farmer4:params.row.index ===4 ?farmer5:farmer6  } style ={{height:"50px",width:"50px",borderRadius:"50%"}}/></div>
  //    
  //     <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left",fontSize:"1rem"}}>{params.row.cropName}</span>
//
  //    </div>;
  //  },
  //},
  { field: 'crop', headerName: 'Crop', width: 130, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}} >{params.row.crop}</div>;
  },  },
 

   { field: 'actReturns', headerName: 'Actual',  width: 130, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.actReturns}</div>;
  }, },
,
]

export default function InputStats({ inputs }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const {farmerInFocus} = useSelector(state=> state.group)
//console.log("FARMER IN FOCUS IN INPUT STATS-->",farmerInFocus)


  const handleActionClick = (student) => {
    navigate('/dashboard/edit-student', { state: { student } });
  };

  const handleInputDelete = (indexId,inputsArray,farmerId) =>{
     
     let inputsArrayCopy = [...inputsArray]
   //  console.log("INPUTS ARRAY COPY INDEX IS ___>",inputsArray)

    const updatedInputsArray = inputsArrayCopy && inputsArrayCopy.filter((item)=>(item._id !== indexId))

  //  console.log("UPDATED INPUTS ARRAY  IS ___>",updatedInputsArray)


   const farmerObject = {
      _id:farmerId,
     inputs:updatedInputsArray.filter((item)=>(item.id !== '1')), //i need to filter the hardcoded entry mr dean asked me to put, so i dont add it in the db - mar 13 dagogo
    }

    

    dispatch(deleteFarmerSingleInput(farmerObject))
  }

  const handleSetInputToUpdate = (index,input)=>{
      
    // console.log("INPUT BEING SAVED IS-->",input)
     dispatch(saveInputToUpdateInFocus({...input,index:index}))

     setTimeout((navigate('/dashboard/farmer-input-update')),1500)

  }


  return (
    <div style={{ height: 550, width: '100%' }}>
     { !classes.row?
       <CircularProgress/>
     :
      <DataGrid
      disableSelectionOnClick
      onCellClick={(params, event) => event.stopPropagation()}
      onRowClick={(params, event) => event.stopPropagation()}
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
        rows={inputs}
        rowHeight={80}
        columns={columns.map((col,index) => {
          if (col.field === 'actions') {
            return {
              ...col,
              renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/*  <Button
                   
                    variant="contained"
                    style={{ minWidth: '130px', backgroundColor: "#2DA840", marginRight: '20px' }}
                  >
                   View
              </Button> */}

                  <span onClick={()=>{handleSetInputToUpdate(index,params.row) }}
                  style={{cursor:"pointer",color:"green",textDecoration:"underline"}}>View</span>
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
          }else if(col.field === 'delete'){
    
            return {
              ...col,
              renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              

                  <span  onClick={()=>{handleInputDelete(params.row._id,inputs,farmerInFocus._id) }} style={{cursor:"pointer",color:"green",textDecoration:"underline",fontSize:"1.2rem"}}>
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