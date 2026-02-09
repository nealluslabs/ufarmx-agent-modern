import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Paper, Button, MenuItem, FormControl, Select, Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { fCurrency, fNumber } from '../utils/formatNumber';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EmptyRowCard from 'src/components/home/empty-row-card';
import SearchIcon from '@mui/icons-material/Search';
import { fetchUserData } from 'src/redux/actions/auth.action';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


import maizeSeeds from '../assets/images/hybrid-maize-seeds.jpg';
import lambdacyhalothrin from '../assets/images/lambdacyhalothrin.jpg';
import ureaFertilizer from '../assets/images/urea-fertilizer.jpg';
import hoe from '../assets/images/hoe.jpg';
import cutlass from '../assets/images/cutlass.jpg';
import knapsack from '../assets/images/knapsack-sprayer.jpg';
import npkFertilizer from '../assets/images/npk-fertilizer.jpg';
import riceSeeds from '../assets/images/rice-seeds.jpg';
import atrazine from '../assets/images/atrazine.jpg';
import cassavaStems from '../assets/images/cassava-stems.jpg';
//import fertilizer1 from '../assets/images/fertilizer1.png';
//import fertilizer2 from '../assets/images/fertilizer2.png';
//import fertilizer3 from '../assets/images/fertilizer3.png';


import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';
//import AdditionalInfoCard from 'src/components/home/additional-info-card';
import CropDepositStats from 'src/components/home/crop-deposit-stats';
import CropStats from 'src/components/home/crop-stats';
//import CustomToggleSwitch from 'src/components/buttons/CustomToogleSwitch';
//import CustomToggleSwitchWallet from 'src/components/buttons/CustomToggleSwitchWallet';
//import TransactionStats from 'src/components/home/transaction-stats';
import { FaArrowDown, FaArrowDownLong, FaArrowUp, FaArrowUpLong, FaCartShopping } from 'react-icons/fa6';
import { GoPlusCircle } from 'react-icons/go';
//import CropStats from 'src/components/home/crop-stats';
//import ScrollingCampaignCard from 'src/components/home/scrolling-campaign-card';
//import FarmerStats from 'src/components/home/farmer-stats';
//import { fetchFarmersFromPage,fetchAgentsFromPage, sectionFarmersFromPage,fetchLastThreeDeposits } from 'src/redux/actions/group.action';
//import { saveCurrentFarmersToDisplay,saveFilteredFarmers,saveCurrentLocationFilter,saveCurrentCropTypeFilter,saveCurrentCropFilter,saveTotalPagesFarmers, saveTablesSet } from 'src/redux/reducers/group.slice';
//import ApexChart from 'src/components/home/splineChart';
//import ContainerCard from 'src/components/listcards/container-card-small';
//import cropcompany from 'src/assets/images/cropcompany.jpeg';
//import ContainerCardSmall from 'src/components/listcards/container-card-small';

//import tomato from 'src/assets/images/tomato.png'
//import maize from 'src/assets/images/maize.png'
//import cucumber from 'src/assets/images/cucumber.png'
//import carrot from 'src/assets/images/carrot.png'
//import bellpepper from 'src/assets/images/bellpepper.png'
//import lemon from 'src/assets/images/lemon.jpeg'
//import avocado from 'src/assets/images/avocado.jpeg'
//import potato from 'src/assets/images/potato.jpeg'
//import DepositStats from 'src/components/home/deposit-stats';
import CustomSearchBarFullWidth from 'src/components/global/CustomSearchBarFullWidth';
import CustomToggleSwitchVendors from 'src/components/buttons/CustomToggleSwitchVendors';
import ProductEcommerceCard from 'src/components/home/product-card';


import { FaPlus } from 'react-icons/fa';
import { fetchAllRetailerProducts } from 'src/redux/actions/group.action';


const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const CHART_DATA = [50, 50];

export default function FarmProductsPage() {
  const theme = useTheme();


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loggedInFarmer } = useSelector((state) => state.group);
 
 // useEffect(()=>{
//
 //  if(!user ){
 //   navigate('/login')
 //  }
//
 // },[user])

 
  const[farmersFromDB,setFarmersFromDB] = useState([/*
    {
    img:tomato, crop:"Tomato",  id:"0", depositDate:"May 18, 2025",qualityGrade:"Grade A",status:"In Storage",quantity:"500 Kg"
    },
    {
        img:maize, crop:"Maize",  id:"1",  depositDate:"May 18, 2025",qualityGrade:"Grade A",status:"In Storage",quantity:"250 Kg"
    },
     {
        img:cucumber,  crop:"Cucumber", id:"2", depositDate:"May 18, 2025",qualityGrade:"Grade B",status:"In Storage",quantity:"500 Kg"
    },
    {
        img:carrot,  crop:"Carrot", id:"3", depositDate:"May 20, 2025",qualityGrade:"Grade B",status:"In Storage",quantity:"250 Kg"
    },
    {
        img:bellpepper,  crop:"Bell Pepper", id:"4", depositDate:"May 21, 2025",qualityGrade:"Grade A",status:"In Storage",quantity:"500 Kg"
    },
    {
        img:potato,   crop:"Potato",id:"5", depositDate:"May 22, 2025",qualityGrade:"Grade A",status:"In Storage",quantity:"255 Kg"
    },
    {
        img:lemon,  crop:"Lemon",  id:"6",depositDate:"May 23, 2025",qualityGrade:"Grade B",status:"In Storage",quantity:"150 Kg"
    },
    {
        img:avocado,  crop:"Avocado", id:"7", depositDate:"May 24, 2025",qualityGrade:"Grade B",status:"In Storage",quantity:"100 Kg"
    },
  */])
  const[loading,setLoading] = useState([])

  const[updatedCropDeposits,setUpdatedCropDeposits] = useState([])
  
  const[farmersAddedPerMonth,setFarmersAddedPerMonth] = useState([])
  const[allLandSize,setAllLandSize] = useState(0)
  const[totalLandForCurrentMonth,setTotalLandForCurrentMonth] = useState([])
  const[ loadedFarmersPerMonth,setLoadedFarmersPerMonth]= useState(false)

  const[agentsAddedPerMonth,setAgentsAddedPerMonth] = useState([])

  const [activeButton, setActiveButton] = useState('Fertilizers');

  const handleFertilizersClick = () => {
  setActiveButton('Fertilizers');
  setStartIndex(0)
  setEndIndex(3)

  const selectedProductLength = allRetailerProducts && allRetailerProducts.length && allRetailerProducts.filter((item)=>(item.category ==="Fertilizers")).length
  setProductCount(Math.ceil(selectedProductLength/3) )
  };
  
  const handleSeedsClick = () => {
  setActiveButton('Seeds');
  setStartIndex(0)
  setEndIndex(3)
  const selectedProductLength = allRetailerProducts && allRetailerProducts.length && allRetailerProducts.filter((item)=>(item.category ==="Seeds")).length
  setProductCount(Math.ceil(selectedProductLength/3) )
  };

  const handleEquipmentClick = () => {
    setActiveButton('Equipment');
    setStartIndex(0)
    setEndIndex(3)
    const selectedProductLength = allRetailerProducts && allRetailerProducts.length && allRetailerProducts.filter((item)=>(item.category ==="Equipment")).length
    setProductCount(Math.ceil(selectedProductLength/3) )
    };

    const handleServicesClick = () => {
      setActiveButton('Herbicide');
      setStartIndex(0)
      setEndIndex(3)
      const selectedProductLength = allRetailerProducts && allRetailerProducts.length && allRetailerProducts.filter((item)=>(item.category ==="Herbicide")).length
      setProductCount(Math.ceil(selectedProductLength/3) )
      };

      const handleHerbicideClick = () => {
        setActiveButton('Herbicide');
        setStartIndex(0)
        setEndIndex(3)
        const selectedProductLength = allRetailerProducts && allRetailerProducts.length && allRetailerProducts.filter((item)=>(item.category ==="Herbicide")).length
        setProductCount(Math.ceil(selectedProductLength/3) )
        };
  

  const { myGroups, isLoading,
    currentFarmersToDisplay,currentAgentsToDisplay,
    totalPagesFarmers,allFarmers,filteredFarmers,
    currentDepositsToDisplay,tablesSet,allRetailerProducts
   } = useSelector((state) => state.group);

   //console.log("ALL RETAILER PRODUCTS--->",allRetailerProducts)
  //const { students } = useSelector((state) => state.student);


 // useEffect(() => {
 //
 //  if(!tablesSet){
 //   window.location.reload()
 //  }
 // }, [])

 

  useEffect(() => {
 
     dispatch(fetchAllRetailerProducts(user && user._id))
    //dispatch(saveTablesSet(true))
  }, [])




  useEffect(()=>{


  function calculateTotalLand(allFarmers) {
    let totalLand = 0;
  
    allFarmers && allFarmers.forEach(item => {
      // Check if 'farm_size' or 'farmsize' exists in the object
      let farmSizeValue = item.farm_size || item.farmsize||item.size_of_farm ;
  
      if (farmSizeValue) {
        // Extract the number from the string, ignoring the non-numeric parts
        let numericValue = parseFloat(farmSizeValue.match(/[0-9]*\.?[0-9]+/)); 
        if (!isNaN(numericValue)) {
          totalLand += numericValue;
        }
      }
    });
  
    return totalLand;
  }


  const totalLand = calculateTotalLand(allFarmers);
  setAllLandSize(totalLand)

},[allFarmers])








  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');


  const [currentPage,setCurrentPage] = useState(1);
  const [productCount,setProductCount] = useState(3);

  

  const itemsPerPage = 3;


const [startIndex,setStartIndex] = useState((currentPage - 1) * itemsPerPage);
const [endIndex,setEndIndex] = useState(startIndex + itemsPerPage);

  const handleChange =  (value) => {
    setCurrentPage(value);
    setStartIndex((currentPage - 1) * itemsPerPage)

  };

  useEffect(()=>{


setEndIndex(startIndex + itemsPerPage)

  },[startIndex,currentPage])


  useEffect(()=>{
    const selectedProductLength = allRetailerProducts && allRetailerProducts.length && allRetailerProducts.filter((item)=>(item.category ==="Fertilizers")).length
  setProductCount(Math.ceil(selectedProductLength/3) )
},[allRetailerProducts])

  return (
    <>

      <Helmet>
        <title> UfarmX </title>
      </Helmet>

      <Container maxWidth="xl" style={{scale:"0.9",position:"relative",top:"-3rem",left:"-2rem"}}>
        
        {/* <SearchBox style={{ width: '100%' }} /> */}


   <Grid item xs={12} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"2rem",width:"100%",marginTop:"1.5rem"}}>

     <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
     
     <h1 style={{fontWeight:"500",marginBottom:"0rem"}}>Products</h1>
     {/*<div>{new Date().toDateString()}</div>*/}

     <div style={{display:"flex",gap:"20px",justifyContent:"flex-start"}}>
     {/*<Button
          variant="contained"
          style={{ minHeight: '60px', width:'175px', backgroundColor: '#0A6054',borderRadius:"10px" ,fontSize:"18px",fontWeight:"300"}}
        >
            <FaArrowUpLong style={{marginRight:"10px",fontSize:"18px"}}/> 
          Deposit
        </Button>*/}

       {
        <Button
          variant="contained"
          style={{ minHeight: '60px', width:'175px', backgroundColor: '#0A6054',borderRadius:"10px",fontSize:"18px",fontWeight:"300",position:"relative",top:"1rem"}}
          onClick={()=>{navigate('/dashboard/add-product')}}
        >
          
         <FaPlus style={{marginRight:"10px",fontSize:"22px"}}/>  Add Product
        </Button>
      }
    </div>
     
     </div>

    </Grid> 
      
        <Grid container spacing={3}>
         {/* <Grid item xs={12} md={12} lg={6}>
            <div style={{ background:'white', padding: '10px',position:"relative",left:"-2rem" }}>
           

       <CampaignCard headerOne={'Statistics'} headerTwo={'Profile'} value={''} type={'one'} image={noimage} farmName={'Super Admin'} farmerName={"Joe Thomas"} city={"Dakar, Senegal"} email={"default@gmail.com"} phoneNumber={"+221 555-380-1000"} />
            </div>
          </Grid> */}

         {/* <Grid item xs={8} md={12} lg={6}>
            <div style={{ background: 'white', padding: '10px',position:"relative",left:"0rem" }}>
              <ScrollingCampaignCard scrollItems={currentAgentsToDisplay} headerOne={'Statistics'} headerTwo={'Agents'} value={''} type={'two'}  farmName={'Jenkins Farm'} farmerName={"Djibril Cisse"} city={"Dakar, Senegal"} email={"default@ufarmx.com"} phoneNumber={"+221 555-123-1000"}  image={redboy}/>
            </div>
          </Grid> */}


          {/*
          <Grid container spacing={2} style={{marginTop:"2rem"}}>
          <div style={{ background: '#F8F8F8', padding: '10px',width:"100%" }}>
              <AdditionalInfoCard headerOne={'Statistics'} headerTwo={'Agent'} value={''} type={'two'}  farmName={'Jenkins Farm'} farmerName={"Djibril Cisse"} city={"Dakar, Senegal"} email={"djibril@ufarmx.com"} phoneNumber={"+221 555-123-1000"}  image={redboy}/>
            </div>
          </Grid>
            */}
 {/*<Grid container spacing={2} sx={{marginBottom:"1.5rem"}}>
         
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                height: 'max-content',
                border: '1px solid #F8F8F8',
                backgroundColor: '#F8F8F8',
                borderRadius: '10px',
              }}
            >
              <DashboardCard header={'Total Storage'} value={'1,250 kg'} img={TeacherImg} extra={"62.5% of capacity used"} additions={farmersAddedPerMonth ?farmersAddedPerMonth[farmersAddedPerMonth.length-1]:'0'}  cardType={'deposit'}/>
            </Paper>
          </Grid>

         
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                height: 'max-content',
                border: '1px solid #F8F8F8',
                backgroundColor: '#F8F8F8',
                borderRadius: '10px',
              }}
            >
              <DashboardCard
                header={'Maize Storage'}
                value={ '750kg'}
                img={StudentImg}
                additions={agentsAddedPerMonth ?agentsAddedPerMonth[0]:'0'} 
                extra={"60% of total deposits"}
                cardType={'deposits'}
              />
            </Paper>
          </Grid>


          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                height: 'max-content',
                border: '1px solid #F8F8F8',
                backgroundColor: '#F8F8F8',
                borderRadius: '10px',
              }}
            >
              <DashboardCard
                header={'250kg'}
                value={ currentAgentsToDisplay ?currentAgentsToDisplay.length :'0'}
                img={StudentImg}
                additions={agentsAddedPerMonth ?agentsAddedPerMonth[0]:'0'} 
                extra={"20% of total deposits"}
                cardType={'deposits'}
              />
            </Paper>
          </Grid>

        
        </Grid> */}
        <br />

        <br />

        <Grid item /*xs={6}*/ style={{flexDirection:"column" ,width:"max-content",display: 'flex',justifyContent:"space-between", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",backgroundColor:'transparent'/*"#F9F9F9"*/,borderRadius:"2rem",padding:"0.5rem",width:"98%",position:"relative",left:"3%" }}>
           {/* <Box sx={{ width: '100%' }}>
              <Button
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '180px',
                  backgroundColor: '#2DA840',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  marginRight: '4px',
                }}
                // onClick={handleOne}
              >
               Crops
              </Button>
              &nbsp; &nbsp;

              <Button
                variant={'contained'}
                style={{
                  minHeight: '50px',
                  minWidth: '180px',
                  backgroundColor: '#21712E',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  marginRight: '4px',
                }}
                // onClick={handleOne}
              >
               Deposits
              </Button>

              </Box>*/}


             

              <CustomSearchBarFullWidth  title="Search Products"/>

               <CustomToggleSwitchVendors activeButton={activeButton} setActiveButton={setActiveButton} handleFertilizersClick={handleFertilizersClick} handleSeedsClick={handleSeedsClick}  handleEquipmentClick={handleEquipmentClick}  handleServicesClick={handleServicesClick} handleHerbicideClick={handleHerbicideClick} />
          </Grid>


    <Grid container spacing={1.5} sx={{marginBottom:"1.5rem",position:"relative",left:"4rem"}}>
        {activeButton === "Fertilizers" &&
        <> 
        {allRetailerProducts && allRetailerProducts.length? allRetailerProducts.filter((item)=>(item.category ==="Fertilizers")).slice(startIndex,endIndex).map((product)=>( 
          <Grid item xs={12} md={4} lg={4}>
           <ProductEcommerceCard picture={product.image && product.image} header={product.name} price={product.price} supplier={"AgroSupplies Ltd"} description={"100% organic compost made from natural materials. Perfect for organic farming."} supplyUnit={product.unit}  rating={"4.9"}/>
          </Grid>
        ))
        :

        <center style={{marginTop:"3rem"}}>
        No Products To Display
       </center>
        }
          {/*<Grid item xs={12} md={4} lg={4}>
          <ProductEcommerceCard picture={ureaFertilizer} header={"Searles 5IN1 Organic Fertiliser"} price={"N17,000"} supplier={"EcoFarm Solutions"} description={"100% organic compost made from natural materials. Perfect for organic farming."} supplyUnit={"Per 50kg bag"} rating={"4.5"}/>
          </Grid>
            */}


         
          </>
         }

      {activeButton === "Seeds" &&
        <>

       {allRetailerProducts && allRetailerProducts.length? allRetailerProducts.filter((item)=>(item.category ==="Seeds")).slice(startIndex,endIndex).map((product)=>( 
          <Grid item xs={12} md={4} lg={4}>
           <ProductEcommerceCard picture={product.image && product.image} header={product.name} price={product.price} supplier={"AgroSupplies Ltd"} description={"100% organic compost made from natural materials. Perfect for organic farming."} supplyUnit={product.unit}   rating={"4.9"}/>
          </Grid>
        ))
        :
        

        <center style={{marginTop:"3rem"}}>
        No Products To Display
       </center>
        
        }
         {/* <Grid item xs={12} md={4} lg={4}>
           <ProductEcommerceCard  picture={maizeSeeds} header={"Hybrid Maize Seeds"} price={"N15,000"} supplier={"AgroSupplies Ltd"} description={"Maize Seeds. Perfect for organic farming."} supplyUnit={"Per 10kg bag"}  rating={"4.9"}/>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
          <ProductEcommerceCard  picture={riceSeeds} header={"Rice Seeds (Faro 44)"} price={"N12,000"} supplier={"GreenThumb Seeds"}   description={"Rice Seeds. Perfect for organic farming."} supplyUnit={"Per 10kg bag"} rating={"4.5"}/>
          </Grid>


          <Grid item xs={12} md={4} lg={4}>
          <ProductEcommerceCard  picture={cassavaStems} header={"Cassava Stems (Improved)"} price={"N1500"} supplier={"GreenThumb Seeds"} description={"Cassava Stems. Perfect for organic farming."} supplyUnit={"per 50 stems bundle"} rating={"4.5"}/>
        </Grid>*/}
        </>
        }

 {activeButton === "Herbicide" &&
        <>

        {allRetailerProducts&& allRetailerProducts.length? allRetailerProducts.filter((item)=>(item.category ==="Herbicide")).slice(startIndex,endIndex).map((product)=>( 
          <Grid item xs={12} md={4} lg={4}>
           <ProductEcommerceCard picture={product.image && product.image} header={product.name} price={product.price} supplier={"AgroSupplies Ltd"} description={"100% organic compost made from natural materials. Perfect for organic farming."} supplyUnit={product.unit}  rating={"4.9"}/>
          </Grid>
        ))
        : 
        <center style={{marginTop:"3rem"}}>
        No Products To Display
       </center>

        }
        {/*
          <Grid item xs={12} md={4} lg={4}>
           <ProductEcommerceCard  picture={atrazine} header={"Herbicide (Atrazine)"} price={"N18,000"} supplier={"AgroSupplies Ltd"} description={"Herbicide for protecting your crops from weeds in the farm."} supplyUnit={"Per 1 liter bottle"}  rating={"4.9"}/>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
          <ProductEcommerceCard  picture={lambdacyhalothrin} header={"Insecticide (Lambdacyhalothrin)"} price={"N3,500"} supplier={"GreenThumb Seeds"}   description={"Insecticide for protecting your crops from insects in the farm."} supplyUnit={"Per 1 liter bottle"} rating={"4.5"}/>
          </Grid>
      */}

         
        </>
        }

        {activeButton === "Equipment" &&
        <>

        {allRetailerProducts &&allRetailerProducts.length ? allRetailerProducts.filter((item)=>(item.category ==="Equipment")).slice(startIndex,endIndex).map((product)=>( 
          <Grid item xs={12} md={4} lg={4}>
           <ProductEcommerceCard picture={product.image && product.image} header={product.name} price={product.price} supplier={"AgroSupplies Ltd"} description={"100% organic compost made from natural materials. Perfect for organic farming."} supplyUnit={product.unit}   rating={"4.9"}/>
          </Grid>
        ))
        :
        <center style={{marginTop:"3rem"}}>
        No Products To Display
       </center>

        }
          {/*<Grid item xs={12} md={4} lg={4}>
           <ProductEcommerceCard  picture={knapsack} header={"Knapsack Sprayer(16L)"} price={"N20,000"} supplier={"AgroSupplies Ltd"} description={"Knapsack Sprayer. Perfect for spraying crops."} supplyUnit={"Per 1 unit"}  rating={"4.9"}/>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
          <ProductEcommerceCard  picture={cutlass} header={"Cutlass"} price={"N2,500"} supplier={"AgroSupplies Ltd"}   description={"Cutlass for farming. Simple Agricultural tool"} supplyUnit={"Per 1 piece"} rating={"4.5"}/>
          </Grid>


          <Grid item xs={12} md={4} lg={4}>
          <ProductEcommerceCard  picture={hoe} header={"Hoe"} price={"N2,500"} supplier={"AgroSupplies Ltd"}  description={"Hoe for farming. Simple Agricultural tool"} supplyUnit={"Per 1 piece"} rating={"4.5"}/>
          </Grid>*/}
        </>
        }
        
        </Grid> 


        <Stack spacing={2} sx={{position:"relative",left:"3.6rem"}}>
        
        <Pagination onChange={handleChange} page={currentPage} count={productCount} variant="outlined" shape="rounded" />
        </Stack>
          
        
        </Grid>
      </Container>
    </>
  );
}
