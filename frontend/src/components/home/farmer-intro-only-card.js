//import * as React from 'react';
import {useState,useEffect} from 'react';
import Typography from '@mui/material/Typography';
// import Title from './title';
import { Box, Button, Divider, Grid, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { fCurrency } from 'src/utils/formatNumber';
import PieChartOne from './pie-chart-one';
import PieChartTwo from './pie-chart-two';
import redboy from 'src/assets/images/redboy.jpeg';
import fakeMaps from 'src/assets/images/fake-maps.jpeg';

import { fetchSpecificResponse } from 'src/redux/actions/group.action';

// MUI Pencil Icon
import CreateIcon from '@mui/icons-material/Create';

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
import { FaChevronDown, FaEnvelope, FaIdCard, FaMapMarker, FaMapMarkerAlt } from 'react-icons/fa';
import { MdOutlineMultilineChart, MdOutlineScoreboard } from "react-icons/md";
import { MdSmartphone } from 'react-icons/md';
import axios from 'axios';
import AiSolutionsForm from '../aisolutions/aiSolutionsForm';
import { saveFarmerInFocus, saveTotalPagesAgents } from 'src/redux/reducers/group.slice';
import { IoAnalyticsSharp } from 'react-icons/io5';
import { BsSpeedometer } from 'react-icons/bs';

function preventDefault(event) {
  event.preventDefault();
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "85%",
  height:"85%",

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function FarmerIntroOnlyCard({data,type,image,agentId,agentAddedId,farmerId,farmerName,farmName,phoneNumber,email,city,index}) {
  const { user } = useSelector((state) => state.auth);
 // console.log("data in farmer-->",data)
  const navigate = useNavigate()

  const dispatch = useDispatch()

 
//console.log("IMAGE IN ADDITIONAL CARD IS__>",image)


  const [mapsLocation,setMapsLocation] = useState(' ')
 const [open,setOpen] =useState(false)

 const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
 //   const fetchLocationData = async () => {
 //     try {
 //       const response = await axios.get(
 //         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${data.gps.split(',')[0]}&lon=${data.gps.split(',')[1]}&zoom=8&addressdetails=3`
 //       );
 //       const returnData = await response.data;
 //   
 //       console.log("data from nominatim is --> ",returnData)  
//
 //   if (returnData && returnData.display_name) {
 //     
 //     setMapsLocation(
 //      
 //       returnData.display_name
 //     );
 //   }
 // } catch (error) {
 //   console.error('Error fetching location data from nominatim:', error);
 // }
//};
//
//
 // fetchLocationData();

   //console.log("GPS 0-->",data.gps && data.gps.split(',')[0])
   //console.log("GPS 1-->",data.gps && data.gps.split(',')[1])

  }, []);




  return (
<>
  <Grid container alignItems="center" style={{ padding: '10px', backgroundColor: "transparent" }} onClick={() => { }}>

    <Grid xs={12} sm={12} container alignItems="center" sx={{
      borderRadius: "1rem",
      display: "flex",
      gap: "1rem",
      width: "100%",
      alignItems: "center",
      flexDirection: { xs: "column", sm: "row" },
      marginLeft: { xs: "1rem", sm: "0" } // Added ml for mobile
    }}>
       
      <Grid xs={12} sm={6.7} sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: '#F3F3F3',
        borderRadius: "1rem",
        padding: { xs: "1.5rem 1rem", sm: "0" },
         height: "13.5rem",
      }}>
        <Grid item xs={12} sm={12} sx={{
           textAlign: 'center',
          // height: { xs: "auto", sm: "10.5rem" },
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-start" },
          position: "relative",
          bottom: { xs: "0", sm: "0.3rem" },
          left: { xs: "0", sm: "1.5rem" },
        }}>
          <img src={image && image}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; 
              currentTarget.src = index === 0 ? farmer1 : index === 1 ? farmer2 : index === 2 ? farmer3 : index === 3 ? farmer4 : index === 4 ? farmer5 : index === 5 ? farmer6 : index === 6 ? farmer7 : index === 7 ? farmer8 : index === 8 ? farmer9 : index === 9 ? farmer10 : farmer10;
            }} 
            style={{
              position: "relative",
              top: { xs: "0", sm: "1.3rem" },
              marginLeft: { xs: "0", sm: "2rem" },
              marginBottom: { xs: "2rem", sm: "1rem" }, // Increased mb for mobile
              height: "7rem",
              width: "7rem",
              borderRadius: "50%"
            }} alt="farmer image"
          />
        </Grid>

        <Grid xs={12} sm={8} sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: '#F3F3F3',
          padding: { xs: "0 1rem", sm: "0" }
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "1rem",
            position: "relative"
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              textAlign: "left",
              color: "lightgray",
              width: "100%"
            }}>
              <Typography variant="h4" sx={{
                fontFamily: "Poppins",
                fontWeight: "500",
                color: "black",
                fontSize: { xs: "1rem", sm: "1.3rem" }
              }}> 
                {data.name}
              </Typography>

              <div style={{
                fontSize: { xs: "0.5rem", sm: "0.6rem" },
                color: "#000000",
                position: "relative",
                top: "-0.2rem",
                marginBottom: "0.5rem"
              }}>
                Onboard Date: <b>{data.onboardDate && !isNaN(new Date(data.onboardDate).getTime()) ? new Date(data.onboardDate).toDateString() : data.createdAt && !isNaN(new Date(data.createdAt).getTime()) ? new Date(data.createdAt).toDateString() : "Sept 23rd, 2024"}</b> 7:16PM
              </div>

              {agentAddedId &&
                <div> 
                  {agentAddedId}
                </div>
              }

              {type === "one" &&
                <div>
                  {farmName}
                </div>
              }
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FaIdCard style={{ fontSize: "0.8rem", cursor: "pointer" }}/>
                <span style={{ wordBreak: "break-word" }}>
                  {agentId}&nbsp;&nbsp;{farmerId}
                </span>
              </div>

              {type === "one" &&
                <div style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginTop: "0rem",
                  marginBottom: "0rem",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}>
                  <FaMapMarker style={{ fontSize: "0.7rem", cursor: "pointer" }}/>
                  <div style={{ maxWidth: "16rem", wordBreak: "break-word" }}>
                    {data.locationName ? data.locationName : "N/A"}
                  </div>
                </div>
              }

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FaEnvelope className="iconHover" style={{ fontSize: "0.7rem", cursor: "pointer" }} />
                -
              </div>
            </div>

            {type !== "one" &&
              <Button
                variant={'contained'}
                style={{
                  minHeight: '30px',
                  minWidth: '120px',
                  backgroundColor: '#2DA840',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  marginRight: '4px',
                }}
                onClick={() => {}}
              >
                Contact
              </Button>
            }
          </div>
        </Grid>

        <Grid xs={12} sm={12} sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          backgroundColor: '#F3F3F3',
          padding: { xs: "1rem", sm: "0" },
          marginTop: { xs: "1rem", sm: "0" }
        }}>
          <div style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "0rem",
            position: "relative",
            top: { xs: "0", sm: "-1.55rem" }
          }}>
            <div onClick={() => {
              dispatch(saveFarmerInFocus(data));
              setTimeout(() => { navigate('/dashboard/credit-score') }, 1300);
            }}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "1rem",
                textAlign: "left",
                color: "black",
                position: "relative",
                left: { xs: "0", sm: "0.9rem" }
              }}
            >
              <BsSpeedometer style={{
                fontSize: "1.5rem",
                top: { xs: "0", sm: "-14px" },
                position: "relative",
                left: { xs: "0", sm: "0.5rem" }
              }} /> 
              <div style={{ display: "flex", flexDirection: "column" }}> 
                Credit Score:
                <b> 
                  <Box flex={1} display="flex" flexDirection="row" alignItems="center" sx={{
                    position: "relative",
                    top: "-0.3rem",
                    gap: "0rem",
                    flexWrap: { xs: "wrap", sm: "nowrap" }
                  }}>
                    <Typography variant="h3" fontWeight={700} color="#141B34" style={{
                      fontFamily: "Poppins",
                      scale: "0.7",
                      color: data && data.riskScore ?
                        (data.riskScore < 4 ?
                          "#DF2007"
                          :
                          data.riskScore >= 4 && data.riskScore < 7 ?
                            "#ED9E0B"
                            :
                            "#0A9C36"
                        )
                        : '#0A9C36',
                    }}>
                      {data && data.riskScore ? data.riskScore : "7.5"}
                    </Typography>
                   
                    <Button
                      variant="contained"
                      sx={{
                        scale: "0.7",
                        position: "relative",
                        left: { xs: "0", sm: "-0.5rem" },
                        fontFamily: "Poppins",
                        backgroundColor: data && data.riskScore ?
                          (data.riskScore < 4 ?
                            "#DF200733"
                            :
                            data.riskScore >= 4 && data.riskScore < 7 ?
                              "#ED9E0B33"
                              :
                              "#0A9C3633"
                          )
                          : '#0A9C3633',
                        borderRadius: '2rem',
                        color: 'white',
                        textTransform: 'none',
                        paddingX: 3,
                        fontWeight: 400,
                        fontSize: '0.675rem',
                        '&:hover': {
                          backgroundColor: data && data.riskScore ?
                            (data.riskScore < 4 ?
                              "#DF200733"
                              :
                              data.riskScore >= 4 && data.riskScore < 7 ?
                                "#ED9E0B33"
                                :
                                "#0A9C3633"
                            )
                            : '#0A9C3633',
                          color: 'inherit',
                          cursor: 'default',
                          boxShadow: 'none',
                        },
                        marginTop: { xs: "0.5rem", sm: "0" }
                      }}
                    >
                      {data && data.riskScore ?
                        (data.riskScore < 4 ?
                          <span style={{
                            opacity: 1,
                            color: data && data.riskScore ?
                              (data.riskScore < 4 ?
                                "#DF2007"
                                :
                                data.riskScore >= 4 && data.riskScore < 7 ?
                                  "#ED9E0B"
                                  :
                                  "#0A9C36")
                              : "#0A9C36"
                          }}>Poor</span>
                          :
                          data.riskScore >= 4 && data.riskScore < 7 ?
                            <span style={{
                              opacity: 1,
                              color: data && data.riskScore ?
                                (data.riskScore < 4 ?
                                  "#DF2007"
                                  :
                                  data.riskScore >= 4 && data.riskScore < 7 ?
                                    "#ED9E0B"
                                    :
                                    "#0A9C36")
                                : "#0A9C36"
                            }}>Good</span>
                            :
                            <span style={{
                              opacity: 1,
                              color: data && data.riskScore ?
                                (data.riskScore < 4 ?
                                  "#DF2007"
                                  :
                                  data.riskScore >= 4 && data.riskScore < 7 ?
                                    "#ED9E0B"
                                    :
                                    "#0A9C36")
                                : "#0A9C36"
                            }}>Excellent</span>
                        )
                        : 
                        <span style={{
                          opacity: 1,
                          color: data && data.riskScore ?
                            (data.riskScore < 4 ?
                              "#DF2007"
                              :
                              data.riskScore >= 4 && data.riskScore < 7 ?
                                "#ED9E0B"
                                :
                                "#0A9C36")
                            : "#0A9C36"
                        }}>Good</span>
                      }
                    </Button>
                  </Box>
                </b>
              </div>    
              <FaChevronDown style={{
                fontSize: "1rem",
                top: { xs: "0", sm: "-14px" },
                left: { xs: "0", sm: "-18px" },
                position: "relative"
              }}/>
            </div>
          </div>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={5} sx={{
        textAlign: 'center',
        height: { xs: "auto", sm: "13.5rem" },
        display: "flex",
        justifyContent: "center",
        background: '#F3F3F3',
        borderRadius: "1rem",
        padding: { xs: "1rem", sm: "0" },
        marginTop: { xs: "1rem", sm: "0" },
        gap: { xs: "2rem", sm: "0" },
        marginLeft: { xs: "1rem", sm: "0" } // Added ml for mobile
      }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column" }}> 
          <Box sx={{ width: "80%", textAlign: "center", fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.1rem" } }}>Farm Size/ha </Box>
          <Box sx={{ width: "50%", textAlign: "center", fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.6rem" }, fontWeight: "1rem", color: "#000000" }}>
            {data && data.farmSize ? data.farmSize.slice(0, 3) : 0}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", width: "100%", flexDirection: "column" }}> 
          <Box sx={{ width: "30%", textAlign: "center", fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.1rem" } }}>Crops/Livestock </Box>
          <Box sx={{ width: "50%", textAlign: "center", fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.6rem" }, fontWeight: "1rem", color: "#000000" }}> 1 </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column" }}> 
          <Box sx={{ width: "50%", textAlign: "center", fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.1rem" } }}>Harvests </Box>
          <Box sx={{ width: "50%", textAlign: "center", fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.6rem" }, fontWeight: "1rem", color: "#000000" }}>
            {data && data.lastHarvest ? data.lastHarvest : 2}
          </Box>
        </Box>
      </Grid>
    </Grid>

  </Grid>

</>
  );
}
