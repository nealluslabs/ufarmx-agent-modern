import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, FormControl, Box, Select, MenuItem, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyGroups } from 'src/redux/actions/group.action';
import { fetchUserData } from 'src/redux/actions/auth.action';

import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';


import cropcompany from 'src/assets/images/cropcompany.png';


/*import agent1 from 'src/assets/images/agent1.jpeg';
import agent2 from 'src/assets/images/agent2.jpeg';
import agent3 from 'src/assets/images/agent3.jpeg';*/
import ContainerCard from 'src/components/listcards/container-card';


export default function ContainersPage() {
  const theme = useTheme();
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myGroups, isLoading } = useSelector((state) => state.group);
  //const { students } = useSelector((state) => state.student);

 // useEffect(() => {
 //   dispatch(fetchMyGroups(user?.coolers));
 //   dispatch(fetchMyTransactions(user?.id));
 //   console.log("Transac Changed.");
 // }, [user])
//
 // useEffect(() => {
 //   dispatch(getStudents());
 //   dispatch(fetchUserData(user?.id));
 // }, [])

 
  useEffect(()=>{

   if(!user ){
    navigate('/login')
   }

  },[user])




  const [selectedOption, setSelectedOption] = useState('');
  const [activeButton, setActiveButton] = useState('viewStudents');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleViewStudentsClick = () => {
    setActiveButton('viewStudents');
 
  };

  const handleAddStudentsClick = () => {
    setActiveButton('addStudents');
  };

  return (
    <>


      <Helmet>
        <title> UfarmX </title>
      </Helmet>

      <Container style={{scale:"1",position:"relative",top:"0rem"}} maxWidth="xl" >
        
          {/* <CustomToggleSwitch activeButton={activeButton} setActiveButton={setActiveButton} handleViewStudentsClick={handleViewStudentsClick} handleAddStudentsClick={handleAddStudentsClick}/>*/}

          <Grid container spacing={2} alignItems="center" justifyContent="flex-end" style={{marginTop:"0.3rem"}}> 
     {/*<CustomToggleSwitch activeButton={activeButton} setActiveButton={setActiveButton} handleViewStudentsClick={handleViewStudentsClick} handleAddStudentsClick={handleAddStudentsClick}/>*/}

    

      <Grid item /*xs={6}*/ style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "0rem",backgroundColor:"#F9F9F9",borderRadius:"2rem",padding:"0.5rem" }}>
            <Box sx={{ width: '100%' /*,position:"relative",top:"-1rem",left:"-1rem"*/}}>
            
              <Button
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '130px',
                  backgroundColor: '#21712E',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  marginRight: '4px',
                }}
                // onClick={handleOne}
              >
               Filter
              </Button>



              <Button
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '130px',
                  backgroundColor: '#2DA840',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  marginRight: '4px',
                }}
                onClick={()=>{navigate('/dashboard/add-deposit')}}
              >
               Add Deposit
              </Button>

            </Box>

         
          </Grid>
     

          </Grid>

         
          <br/>
          
        <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <div style={{background: 'white',  padding: '10px',display:"flex",flexDirection:"column",gap:"1rem"}}>
               {/*activeButton === 'viewStudents' &&  <ViewStudents students={students}/>*/}  
              
               {/*activeButton === 'addStudents' && <AddStudent />*/}

               <ContainerCard pic={cropcompany} collection={'VELIGNARA'} about={"Dakar, Senegal"} signed={"Last Deposit: 01-01-2024"} containerName={'Velignara'}/>
               {/*<ContainerCard pic={cropcompany2} collection={'CONTAINER #2'} about={"Oyo, Ibadan"} signed={"Last Deposit: TBD"} containerName={'Container 2'}/>*/}
              
              
                </div>
            </Grid>
            
          </Grid>
      </Container>
    </>
  );
}
