import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, CircularProgress, Divider, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import redboy from 'src/assets/images/jeansfarmer.jpeg';
import greenboy from 'src/assets/images/farmer2.jpeg';
import athlete from 'src/assets/images/farmer3.jpeg';
import amfootball from 'src/assets/images/farmer4.jpeg';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import noimage from 'src/assets/images/no-image.jpg';

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
import { saveFarmerInFocus } from 'src/redux/reducers/group.slice';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { fetchFarmerById } from 'src/redux/actions/group.action';


const useStyles = makeStyles({
  row: {
  backgroundColor: '#F9F9F9',
  marginTop:"3px",
  marginBottom:"3px",
  },
  });

const columns = !isMobile?[
  /*{
    field: 'id',
    headerName: '#', 
    width: 250,
    renderCell: (params) => {
    },
  },*/
  {
    field: 'farmerName', 
    headerName: 'Farmer Name',
    width: 350,
    height:250,
    renderCell: (params) => {
      
      //const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:220}}>
        
        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}><div>{/*THE NUMBERS SHOULD GO HERE */}</div>
         
         {/*<img src={params.row.image} style ={{height:"50px",width:"60px",borderRadius:"16px"}}/>*/}
         

        {/* <img src={noimage} 
        alt='farmer photo'
       loading='lazy'
      onLoad={({ currentTarget }) => {
          currentTarget.onerror = null; 
          currentTarget.src=`${params.row.image}`;
       }} 
       

        onError={({ currentTarget }) => {
          currentTarget.onerror = null; 
          currentTarget.src=noimage;
       }} 

      style ={{height:"50px",width:"60px",borderRadius:"16px"}}/>*/}

         </div>
      
       <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"1rem"}}>{params.row.farmerName}</span>

      </div>;
    },
  },
 
  { field: 'location', headerName: 'Location',  width: 380,height:450, renderCell: (params) => {
    return <div sx={{fontSize:"1rem",display:"none"}}> {params.row.locationName ? params.row.locationName.slice(0,35)+"...":"n/a"}</div>;
  }, },

  
  { field: 'onboardDate', headerName: 'Onboard Date', width: 140,height:450, renderCell: (params) => {
    return <div sx={{fontSize:"1rem",display:"none"}}>{params.row.onboardDate && params.row.onboardDate }</div>;
  }, },
  {
    field: 'actions',
    headerName: '',
    width: 242,
    height:250,
  },
]

: 

[
  /*{
    field: 'id',
    headerName: '#', 
    width: 250,
    renderCell: (params) => {
    },
  },*/
  {
    field: 'farmerName', 
    headerName: 'Farmer Name',
    width: 230,
    height:250,
    renderCell: (params) => {
   
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:220}}>
        
        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}><div>{/*THE NUMBERS SHOULD GO HERE */}</div>
 
         </div>
      
       <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"1rem"}}>{params.row.farmerName}</span>

      </div>;
    },
  },
 
  {
    field: 'actions',
    headerName: '',
    width: 242,
    height:250,
  },
]





;

export default function FarmerStats({ farmers }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <div style={{ height: 550, width: '100%' }}>
       { !classes.row?
       <CircularProgress/>
     :
      <DataGrid
        rows={farmers}
        rowHeight={80}
        onCellClick={handleCellClick}
        sx={{
          border: 'none',
          backgroundColor: '#ffffff',
          fontSize: '0.95rem',

          // Header style
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f2f2f2', // grey header
            color: '#333333',
            fontWeight: 600,
            borderBottom: '1px solid #e0e0e0',
          },

          // Header text alignment
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
            fontSize: '0.9rem',
          },

          // All rows white, subtle border between
          '& .MuiDataGrid-row': {
            backgroundColor: '#ffffff',
            color: '#111',
            borderBottom: '1px solid #f0f0f0',
            '&:hover': {
              backgroundColor: '#fafafa',
            },
          },

          // Remove gridlines
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },

          // Hide scrollbar but keep scrollability
          '& .MuiDataGrid-virtualScroller': {
            scrollbarWidth: 'none',
          },
          '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
            display: 'none',
          },

          // Pagination and footer
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#ffffff',
            borderTop: '1px solid #e0e0e0',
          },

          // Remove focus outlines
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
          },
        }}
        //getRowClassName={(params) => (classes.row)}
        columns={columns.map((col,index) => {
          if (col.field === 'actions') {
            return {
              ...col,
              renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {/*<Button
                    
                      onClick={() =>{ 
                     
                        
                        dispatch(saveFarmerInFocus(params.row))
            
                        setTimeout(()=>{
                     
                        navigate('/dashboard/farmer-profile')
                       
                      },
                        600)
            
            
                        setTimeout(()=>{
                     
                         
                         
                        },
                          1000)
  
                      }
                      }



                   


                    variant="contained"
                    style={{ minWidth: '130px', backgroundColor: "#2DA840", marginRight: '20px' }}
                  >
                   View
                    </Button>*/}


                  <span 
                  style={{cursor:"pointer",color:"green",textDecoration:"underline"}}
                  
                  onClick={() =>{ 
                     
                    dispatch(saveFarmerInFocus(params.row))

                    setTimeout(()=>{
                  
                     navigate('/dashboard/farmer-profile')
                    
                   },
                     600)
                   


                 //   dispatch(fetchFarmerById(params.row)) 
                 //   .then(()=>{ 
                 // 
                 //   setTimeout(()=>{
                 // 
                 //   navigate('/dashboard/farmer-profile')
                 //  
                 //    },
                 //   600)
                 // 
                 // 
                 //  })
                  
                  }

                  
                  }
                  
                  
                  
                  >
                    View
                    </span>
                  
                </div>
              ),
            };
          }else if(col.field === 'farmerName'){
            
            return {
              ...col,
              renderCell: (params) => (
               


              
                <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:450}}>
        
                 <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}><div>{/*THE NUMBERS SHOULD GO HERE */}</div>

                  {/*<img src={params.row.image} style ={{height:"50px",width:"60px",borderRadius:"16px"}}/>*/}
                  

        <img src={params.row.photo?params.row.photo:params.row.image} 
        alt='farmer photo'
       loading='lazy'
     
      
       onError={({ currentTarget }) => {
        currentTarget.onerror = null; 
        currentTarget.src=params.row.index === 0 ? farmer1 : params.row.index === 1 ? farmer2: params.row.index === 2 ? farmer3: params.row.index === 3 ?farmer4 : params.row.index === 4 ?farmer5 : params.row.index === 5 ?farmer6 : params.row.index === 6 ?farmer7 : params.row.index === 7 ? farmer8: params.row.index === 8 ? farmer9: params.row.index === 9 ?farmer10 :farmer10 ;
     }} 

      style ={{height:"50px",width:"50px",borderRadius:"50%"}}
      />

                 
                 </div>
               
                <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left",width:"40px",fontSize:"1rem"}}>{params.row.farmerName}</span>
         
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
        
      />
   }
    </div>
  );
}