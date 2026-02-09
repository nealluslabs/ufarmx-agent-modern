import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, CircularProgress, Divider, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import redboy from 'src/assets/images/jeansfarmer.jpeg';
import greenboy from 'src/assets/images/farmer2.jpeg';
import athlete from 'src/assets/images/farmer3.jpeg';
import amfootball from 'src/assets/images/farmer4.jpeg';
import { saveFarmerInFocus,saveAgentInFocus } from 'src/redux/reducers/group.slice';
import { fetchAllResponsesForOneAgent, fetchAllResponsesForOneAgentAdminModule, fetchFarmersForOneAgent } from 'src/redux/actions/group.action';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';



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
    field: 'fullName', 
    headerName: 'Agent Name',
    
    width: 420,
    height:250,
    renderCell: (params) => {
      
      const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:400}}>
        
        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}><div>{/*THE NUMBERS SHOULD GO HERE */}</div> <img src={params.row.image} style ={{height:"50px",width:"50px",borderRadius:"50%"}}/></div>
      
       <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left",fontSize:"1rem"}}>{params.row.fullName}</span>

      </div>;
    },
  },
  /*{ field: 'email', headerName: 'Email', width: 250,height:450, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.email}</div>;
  },  },*/
 /* { field: 'location', headerName: 'Location',  width: 250,height:450, renderCell: (params) => {
    return <div style={{fontSize:"1.3rem"}}> {params.row.location}</div>;
  }, },*/
  { field: 'phone', headerName: 'Phone Number', width: 330,height:450, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.phone && params.row.phone }</div>;
  }, },
  {
    field: 'actions',
    headerName: '',
    width: 300,
    height:250,
  },
];

export default function AgentStatsLong({ farmers }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

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
          overflowY: 'hidden', 
        },
        '& .MuiDataGrid-root': {
          scrollbarWidth: 'none',
        },
        '& .MuiDataGrid-root::-webkit-scrollbar': {
          display: 'none', 
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
                 {/* <Button
                  
                    variant="contained"
                    style={{ minWidth: '130px', backgroundColor: "#2DA840", marginRight: '20px' }}
                  >
                   {loading === index?'Loading...':'View'}
                  </Button>*/}


                  <span 

                 onClick={async() =>{ 
                                      
                   setLoading(params.row.index)
                   dispatch(saveAgentInFocus(params.row))
                  // console.log("AGENT BEING PASSED IN -->,",params.row)
                   dispatch(fetchFarmersForOneAgent(params.row.user_id)).then(()=>{ 
                    //double nesting, refactor later
                   dispatch(fetchAllResponsesForOneAgentAdminModule(params.row.user_id)).then(()=>{ 

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
                  
                  style={{cursor:"pointer",color:"#90C434",textDecoration:"underline"}}>
                    View
                    </span>
                
                </div>
              ),
            };
          }else if(col.field === 'fullName'){
            
            return {
              ...col,
              renderCell: (params) => (
           
                <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:400}}>
        
                 <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}><div>{/*THE NUMBERS SHOULD GO HERE */}</div> <img src={params.row.image} style ={{height:"50px",width:"65px",borderRadius:"50%"}}/></div>
               
                <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"1rem"}}>{params.row.fullName}</span>
         
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