import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, CircularProgress, Divider, Grid } from '@mui/material';
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



import { saveResponseInFocus,clearResponseInFocus } from 'src/redux/reducers/group.slice';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';

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
  { field: 'Added On', headerName: 'Date', width: 200,height:450, renderCell: (params) => {
    return <div style={{fontSize:"1rem",display:"flex",flexDirection:"column"}}>
      {params.row.createdAt && new Date(params.row.createdAt).toDateString() }
      
       <div style={{fontSize:"0.6rem",display:"flex",flexDirection:"column"}}>
      {params.row.createdAt && new Date(params.row.createdAt).toLocaleTimeString('en-US', {
     hour: 'numeric',
     minute: '2-digit',
     hour12: true
      }) }
      </div>

      </div>;
  }, },
  {
    field: 'formName', 
    headerName: 'Form Name',
    width: 420,
    height:250,
    renderCell: (params) => {
      
      //const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:450}}>
        
        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}><div>{/*THE NUMBERS SHOULD GO HERE */}</div> 
        
     {/*   
        <img src={noimage} 
        alt='farmer photo'
       loading='lazy'
      onLoad={({ currentTarget }) => {
          currentTarget.onerror = null; 
          currentTarget.src=`${params.row.photo}`;
       }} 
       

        onError={({ currentTarget }) => {
          currentTarget.onerror = null; 
          currentTarget.src=params.row.index === 0 ? farmer1 : params.row.index === 1 ? farmer2: params.row.index === 2 ? farmer3: params.row.index === 3 ?farmer4 : params.row.index === 4 ?farmer5 : params.row.index === 5 ?farmer6 : params.row.index === 6 ?farmer7 : params.row.index === 7 ? farmer8: params.row.index === 8 ? farmer9: params.row.index === 9 ?farmer10 :farmer10 ;
       }} 

  style ={{height:"50px",width:"60px",borderRadius:"16px"}}/>

      */}
  
  </div>
      
       <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"1rem"}}>{params.row.farmerName}</span>

      </div>;
    },
  },
  { field: 'agentName', headerName: 'Agent', width: 250,height:450, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.agentName}</div>;
  },  },
 /* { field: 'location', headerName: 'Location',  width: 250,height:450, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}> {params.row.location}</div>;
  }, },*/
 
  {
    field: 'actions',
    headerName: '',
    width: 150,
    height:250,
  },
];

export default function ResponsesStatsLong({ farmers }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleActionClick = (student) => {
    navigate('/dashboard/edit-student', { state: { student } });
  };

  const handleCellClick = (param, event) => {
    event.defaultMuiPrevented = param.field !== "actions"
    console.log("STOPPING PROPAGATIONS!")
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
      //getRowClassName={(params) =>(classes.row)}
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

                  <span 


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
                  
                  
                  style={{cursor:"pointer",color:"#0A6054",textDecoration:"none"}}>
                    View
  
                   </span>
                  

                 

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
               
                <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"1rem"}}>{params.row.formName}</span>
         
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