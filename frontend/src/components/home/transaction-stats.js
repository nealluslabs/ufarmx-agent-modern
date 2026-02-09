import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import redboy from 'src/assets/images/corn.jpeg';
import greenboy from 'src/assets/images/potato.jpeg';
import athlete from 'src/assets/images/plantain.jpeg';
import amfootball from 'src/assets/images/amfootball.jpeg'


const columns = [
  /*{
    field: 'id',
    headerName: '#', 
    width: 250,
    renderCell: (params) => {
    },
  },*/
  {
    field: 'date', 
    headerName: 'Date',
    width: 350,
    renderCell: (params) => {
      //const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"1.5rem",width:200}}>
        
      {/*  <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}><div></div> <img src={params.row.image &&params.row.image } style ={{height:"40px",width:"50px",borderRadius:"8px"}}/></div>*/}
      
       <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left"}}>{params.row.date}</span>

      </div>;
    },
  },
  { field: 'description', headerName: 'Description', width: 300, renderCell: (params) => {
    return <div>{params.row.description}</div>;
  },  },
  { field: 'type', headerName: 'Type',  width: 300, renderCell: (params) => {
    return <div style={{backgroundColor:params.row.type==="Credit"?"#BDFFCE":"#FFBDBA",borderRadius:"20px",color:params.row.type==="Credit"?"black":"#C61F1C",padding:"5px",width:"75px",textAlign:"center"}}>{params.row.type}</div>;
  }, },
  { field: 'amount', headerName: 'Amount', width: 250, renderCell: (params) => {
    return <div style={{ color:params.row.type==="Credit"?"#306D3F":"#C61F1C"}}>{params.row.amount && params.row.amount }</div>;
  }, },
 /* {
    field: 'actions',
    headerName: 'Action',
    width: 200,
  },*/
];

export default function TransactionStats({ transactions }) {
  const navigate = useNavigate();
  const handleActionClick = (student) => {
    navigate('/dashboard/edit-student', { state: { student } });
  };


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={transactions}
        columns={columns.map((col) => {
          if (col.field === 'actions') {
            return {
              ...col,
              renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography
                    //onClick={() => handleActionClick(params?.row)}
                    variant="contained"
                    style={{ minWidth: '130px', backgroundColor: 'transparent'/*"#2DA840"*/,color:"black", marginRight: '20px' }}
                  >
                   View
                  </Typography>
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
          return col;
        })}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        //checkboxSelection
      />
    </div>
  );
}