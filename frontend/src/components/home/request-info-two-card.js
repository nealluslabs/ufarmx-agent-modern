import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Chip,
  Stack,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RequestInfoCard from "./request-info-card";
import { useDispatch, useSelector } from "react-redux";

import defaultFarmerPic from 'src/assets/images/farmer10.jpeg';
import { useNavigate } from "react-router-dom";
import { updateRequestDetails } from "src/redux/actions/group.action";

export default function RequestInfoTwoCard() {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { myGroups, isLoading,farmerInFocus,agentInFocus,currentDepositsToDisplay,requestInFocus } = useSelector((state) => state.group);
  const [aiForm,setAiForm] = useState(false)


  console.log("FARMER IN FOCUS IS (ON VIEW REQUESTS PAGE) -->",farmerInFocus)

  const [currentRequest,setCurrentRequest] = useState(requestInFocus && requestInFocus)

  function formatDateWithSuffix(isoString) {
    const date = new Date(isoString);
  
    const day = date.getDate();
    const year = date.getFullYear();
  
    const month = date.toLocaleString("en-US", { month: "long" });
  
    // Determine suffix
    const suffix =
      day % 10 === 1 && day !== 11 ? "st" :
      day % 10 === 2 && day !== 12 ? "nd" :
      day % 10 === 3 && day !== 13 ? "rd" :
      "th";
  
    return `${day}${suffix} ${month} ${year}`;
  }

  const updateRequestStatus = (requestObject)=>{
    console.log("UPDATING THE STATUS  OF THE REQUEST HAS BEGUN -->")
  dispatch(updateRequestDetails(requestObject))

  }

  return (
<Grid container spacing={2} sx={{ width: "100%" }}>
  {/* Left Box */}
  <Grid item xs={12} md={6}>
    <Card sx={{ borderRadius: 3, height: "100%" }}>
      <CardContent>
        <Box display="flex" alignItems="flex-start" gap={2} flexDirection={{ xs: "column", sm: "row" }}>
          {/* Avatar */}
          <Avatar
            src="https://via.placeholder.com/100"
            alt="Amira Khan"
            sx={{ width: 80, height: 80, alignSelf: { xs: "center", sm: "flex-start" } }}
          />
          <Box flex={1} sx={{ width: "100%" }}>
            {/* Header */}
            <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} flexDirection={{ xs: "column", sm: "row" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ textAlign: { xs: "center", sm: "left" } }}>
                {requestInFocus && requestInFocus.farmerName?requestInFocus.farmerName :"Amira Khan"}
              </Typography>
              <Chip
                label="My Farmer"
                size="small"
                sx={{ 
                  backgroundColor:"#FFE6BD",
                  color:"#B36034",
                  position: "relative", 
                  left: { xs: "0", sm: "-1.5rem" },
                  mt: { xs: 1, sm: 0 }
                }}
              />

              {/* Location */}
              <Box display="flex" style={{position:"relative"}} alignItems="center" gap={0.5} mt={0.5} sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">Dakar, Senegal</Typography>
              </Box>
            </Box>

               {/* Rating */}
               <Box display="flex" alignItems="center" gap={1} mt={1} justifyContent={{ xs: "center", sm: "flex-start" }}>
                  <Typography variant="body1" sx={{ 
                    //color: "#739D2A", 
                    color: farmerInFocus && farmerInFocus.riskScore?
                          
                    (farmerInFocus.riskScore< 4?
                    "#DF2007"
                    :
                  farmerInFocus.riskScore >=4 && farmerInFocus.riskScore <7?
                   "#ED9E0B"
                   :
                  "#0A9C36"
                     )
                    :
                    '#0A9C36',
                  fontWeight: "400" }}>
                  {farmerInFocus && farmerInFocus.riskScore?farmerInFocus.riskScore :"7.0"}
                  </Typography>
                  
                  <Box
                    sx={{
                      //bgcolor: "#E9F4D7",
                      backgroundColor: farmerInFocus && farmerInFocus.riskScore?
                          
                        (farmerInFocus.riskScore< 4?
                        "#DF20074D"
                        :
                      farmerInFocus.riskScore >=4 && farmerInFocus.riskScore <7?
                       "#ED9E0B4D"
                       :
                      "#0A9C364D"
                         )
                        :
                        '#0A9C364D',
                      //color: "#739D2A",
                      color: farmerInFocus && farmerInFocus.riskScore?
                          
                      (farmerInFocus.riskScore< 4?
                      "#DF2007"
                      :
                    farmerInFocus.riskScore >=4 && farmerInFocus.riskScore <7?
                     "#ED9E0B"
                     :
                    "#0A9C36"
                       )
                      :
                      '#0A9C36',
                      borderRadius: 1,
                      px: 1,
                      fontSize: "0.75rem",
                    }}
                  >
                    {
                     farmerInFocus && farmerInFocus.riskScore?
                    ( farmerInFocus.riskScore< 4?
                      "Poor"
                      :
                    farmerInFocus.riskScore >=4 && farmerInFocus.riskScore <7?
                     "Good"
                     :
                    "Very Good"
                     
                    )
                     : 
                     "Good"
                      }
                  </Box>
                </Box>

            {/* Contact Info */}
            <Stack spacing={0.5} mt={1} sx={{ alignItems: { xs: "center", sm: "flex-start" } }}>
              <Box display="flex" alignItems="center" gap={1}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">default@gmail.com</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">{farmerInFocus && farmerInFocus.phoneNumber?farmerInFocus.phoneNumber :"773 990 101"}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <CalendarTodayIcon fontSize="small" />
                <Typography variant="body2">10 years in Business</Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Grid>

  {/* Right Box */}
  <Grid item xs={12} md={6}>
  <Grid item xs={12} sm={12} sx={{ 
          textAlign: 'center',
          // display: "flex",
          justifyContent:"space-evenly",
          alignItems: { xs: "center", sm: "flex-start" },
          backgroundColor: "white",
          
          borderRadius: "1rem",
          width: "100%",
          height: "100%",
          padding: { xs: "1rem", sm: "0.5rem 2rem 2rem 0.5rem" },
          position: "relative",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: "1.5rem", sm: "0rem" }
        }}>
          
          <Typography variant="h6" fontWeight="bold" sx={{ 
             position: { xs: "static", sm: "relative" },
            top: { xs: "auto", sm: "0.9rem" },
            left: { xs: "auto", sm: "-32%" },
            marginBottom: { xs: "1rem", sm: "0rem" }
          }}>
            Authorization
          </Typography>
      {requestInFocus && requestInFocus.status && (requestInFocus.status === "Pending"||requestInFocus.status === "pending") &&
          <Box sx={{display: {md:'flex', xs: 'block'},top:"0.7rem",position:"relative"}}>

          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: { xs: "center", sm: "flex-start" },
            width: { xs: "100%", sm: "100%" },
            flexDirection: "column",
            scale: { xs: "1", sm: "0.8" }
          }}> 
            <Box sx={{
              width: "max-content",
              textAlign: "center",
              fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.1rem" }
            }}>Status</Box>  
            <Box sx={{
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.6rem" },
              fontWeight: "1rem",
              color: "#000000"
            }}>
              <Select
                sx={{ 
                  minWidth: { xs: "100%", sm: "6rem" },
                  paddingLeft: '10px'
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        paddingLeft: '10px'
                      }
                    }
                  }
                }}
                labelId="status-label"
                id="status-select"
                default={'Denied'}
                label="Status"
                onChange={(e) => { setCurrentRequest({ ...currentRequest, status: e.target.value }) }}
              >
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Denied">Denied</MenuItem>
              </Select>
            </Box> 
          </Box>

          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: { xs: "center", sm: "flex-start" },
            width: { xs: "100%", sm: "110%" },
            flexDirection: "column",
            scale: { xs: "1", sm: "0.8" }
          }}> 
            <Box sx={{
              width: "max-content",
              textAlign: "center",
              fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.1rem" }
            }}>
              Terms 
            </Box>   
            <Box sx={{
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.6rem" },
              fontWeight: "1rem",
              color: "#000000"
            }}> 
              <Select 
                sx={{ minWidth: { xs: "100%", sm: "6rem" } }}
                labelId="status-label"
                id="status-select"
                default={' '}
                label="Terms"
                onChange={(e) => { setCurrentRequest({ ...currentRequest, paymentTerms: e.target.value }) }}
              >
                <MenuItem value=" ">One Installment</MenuItem>
                <MenuItem value=" ">Two Installments</MenuItem>
                <MenuItem value=" ">Three Installments</MenuItem>
              </Select>
            </Box> 
          </Box>

          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: { xs: "center", sm: "flex-start" },
            width: { xs: "100%", sm: "100%" },
            flexDirection: "column",
            scale: { xs: "1", sm: "0.8" },
            position: "relative",
            left: { xs: "0rem", sm: "-1.8rem" }
          }}> 
            <Box sx={{
              width: "max-content",
              textAlign: "center",
              fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.1rem" }
            }}>Due Date</Box>   
            <Box sx={{
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.6rem" },
              fontWeight: "1rem",
              color: "#000000"
            }}>
              <input 
                type="date" 
                id="paymentDueDate" 
                name="paymentDueDate"
                onChange={(e) => {
                  const rawValue = e.target.value; // "2025-06-23"
                  const dateObj = new Date(rawValue);
                  const isoString = dateObj.toISOString(); // "2025-06-23T00:00:00.000Z"
                  setCurrentRequest({
                    ...currentRequest,
                    paymentDate: isoString
                  });
                }}
                style={{
                  minWidth: { xs: "100%", sm: "5rem" },
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  borderRadius: "0.5rem",
                  border: "0.1px solid #ccc"
                }}
              />
            </Box> 
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#0A6054',
              position: { xs: "static", sm: "absolute" },
              width: { xs: "100%", sm: "6rem" },
              top: { xs: "auto", sm: "5.5rem" },
              left: { xs: "auto", sm: "1rem" },
              borderRadius: "0.5rem",
              color: 'white',
              marginTop: { xs: "1rem", sm: "0rem" },
              '&:hover': {
                backgroundColor: '#7db62d'
              }
            }}
            onClick={() => { updateRequestStatus(currentRequest) }}
          >
            Submit
          </Button>
          </Box>

}




{requestInFocus && requestInFocus.status && requestInFocus.status === "Approved" &&
          <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 4,
            padding: 2,
            marginTop:"2rem",
            width:"100%"
            
            
          }}
        >
        
         

           {/* Status */}
           <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start",justifyContent:"flex-start",width:"max-content" }}>
            <h3 style={{ margin: 0, fontWeight: "600", fontSize: "1rem" }}>
              Status
            </h3>
            <p style={{padding:"5px 10px",backgroundColor:requestInFocus.status==="Approved"?"#B4DAC5":requestInFocus.status==="Denied"?"#F9B8C5":"#E4E7EC",borderRadius:"20px",color:requestInFocus.status==="Approved"?"#0B7D3E":requestInFocus.status==="Denied"?"#D8173D":"black", marginTop: "0.4rem", fontSize: "0.8rem", color: "#333" }}>
              Approved
            </p>


          </Box>

           {/* Due Date */}
           <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" ,justifyContent:"flex-start",width:"max-content" }}>
            <h3 style={{ margin: 0, fontWeight: "600", fontSize: "1rem" }}>
              Date
            </h3>
            <p style={{ marginTop: "0.4rem", fontSize: "0.8rem", color: "#333",textAlign:"left" }}>
            {requestInFocus && requestInFocus.updatedAt?formatDateWithSuffix(requestInFocus.updatedAt):"December 1, 2025"}
            </p>
          </Box>

           {/* Payment Terms */}
           <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start",justifyContent:"flex-start",width:"max-content"  }}>
            <h3 style={{ margin: 0, fontWeight: "600", fontSize: "1rem",textAlign:"left" }}>
             Terms
            </h3>
            <p style={{ marginTop: "0.4rem", fontSize: "0.8rem", color: "#333",textAlign:"left" }}>
            {requestInFocus && requestInFocus.paymentTerms?requestInFocus.paymentTerms:"3 installments"}
            </p>
          </Box>
        
          {/* Next Payment */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start",justifyContent:"flex-start" ,width:"max-content" }}>
            <h3 style={{ margin: 0, fontWeight: "600", fontSize: "1rem",textAlign:"left" }}>
              Due Date
            </h3>
            <p style={{ marginTop: "0.4rem", fontSize: "0.8rem", color: "#333",textAlign:"left" }}>
              {requestInFocus && requestInFocus.paymentDueDate?formatDateWithSuffix(requestInFocus.paymentDueDate):"15th January, 2026"}
            </p>
          </Box>
        
         
        
        </Box>
        

}



{requestInFocus && requestInFocus.status && requestInFocus.status === "Denied" &&
          <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 4,
            padding: 2,
             
            marginTop:"2rem"
          }}
        >
        
           {/* Status */}
           <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h3 style={{ margin: 0, fontWeight: "600", fontSize: "1.2rem" }}>
              Status
            </h3>
            <p style={{backgroundColor:requestInFocus.status==="Approved"?"#B4DAC5":requestInFocus.status==="Denied"?"#F9B8C5":"#E4E7EC",borderRadius:"20px",color:requestInFocus.status==="Approved"?"#0B7D3E":requestInFocus.status==="Denied"?"#D8173D":"black", marginTop: "0.4rem", fontSize: "1rem", color: "#333",padding:" 5px 10px" }}>
              Denied
            </p>
          </Box>

           {/* Due Date */}
           <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h3 style={{ margin: 0, fontWeight: "600", fontSize: "1.2rem" }}>
              Date
            </h3>
            <p style={{ marginTop: "0.4rem", fontSize: "1rem", color: "#333",textAlign:"left" }}>
            {requestInFocus && requestInFocus.updatedAt?formatDateWithSuffix(requestInFocus.updatedAt):"December 1, 2025"}
            </p>
          </Box>

   

         
          {/* Next Payment */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h3 style={{ margin: 0, fontWeight: "600", fontSize: "1.2rem" }}>
              Reason
            </h3>
            <p style={{ marginTop: "0.4rem", fontSize: "1rem", color: "#333",textAlign:"left" }}>
              {"Bad Credit"} 
            </p>
          </Box>
        
        </Box>
        

}



{requestInFocus && requestInFocus.status && requestInFocus.status.toLowerCase() === "activated"&&
        
    <Box 
    sx={{
     width: "100%",            // occupy full width at all sizes
     flexBasis: "100%",        // force new row in flex layout
     display: "flex",
     flexDirection: "column",
     gap: "0.5rem",
     alignItems: "center",
     justifyContent: "center",
    }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 4,
            padding: 2,
            marginTop:"2rem",
            width:"100%"
            
            
          }}
        >
        
         
     
           {/* Status */}
           <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start",justifyContent:"flex-start",width:"max-content" }}>
            <h3 style={{ margin: 0, fontWeight: "600", fontSize: "1rem" }}>
              Status
            </h3>
            <p style={{padding:"5px 10px",backgroundColor:(requestInFocus.status==="Approved"||requestInFocus.status==="Activated")?"#B4DAC5":requestInFocus.status==="Denied"?"#F9B8C5":"#E4E7EC",borderRadius:"20px",color:requestInFocus.status==="Approved"?"#0B7D3E":requestInFocus.status==="Denied"?"#D8173D":"black", marginTop: "0.4rem", fontSize: "0.8rem", color: "#333" }}>
              Activated
            </p>


          </Box>

           {/* Due Date */}
           <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" ,justifyContent:"flex-start",width:"max-content" }}>
            <h3 style={{ margin: 0, fontWeight: "600", fontSize: "1rem" }}>
              Date
            </h3>
            <p style={{ marginTop: "0.4rem", fontSize: "0.8rem", color: "#333",textAlign:"left" }}>
            {requestInFocus && requestInFocus.updatedAt?formatDateWithSuffix(requestInFocus.updatedAt):"December 1, 2025"}
            </p>
          </Box>

           {/* Payment Terms */}
           <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start",justifyContent:"flex-start",width:"max-content"  }}>
            <h3 style={{ margin: 0, fontWeight: "600", fontSize: "1rem",textAlign:"left" }}>
              Terms
            </h3>
            <p style={{ marginTop: "0.4rem", fontSize: "0.8rem", color: "#333",textAlign:"left" }}>
            {requestInFocus && requestInFocus.paymentTerms?requestInFocus.paymentTerms:"1 installment(s)"}
            </p>
          </Box>
        
          {/* Next Payment */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start",justifyContent:"flex-start" ,width:"max-content" }}>
            <h3 style={{ margin: 0, fontWeight: "600", fontSize: "1rem",textAlign:"left" }}>
              Due Date
            </h3>
            <p style={{ marginTop: "0.4rem", fontSize: "0.8rem", color: "#333",textAlign:"left" }}>
              {"TBD"/*requestInFocus && requestInFocus.paymentDueDate?formatDateWithSuffix(requestInFocus.paymentDueDate):"15th January, 2026"*/}
            </p>
          </Box>

        
        </Box>


       </Box> 

}




{requestInFocus && requestInFocus.status && requestInFocus.status.toLowerCase() === "closed"&&
        
    <Box 
    sx={{
     width: "100%",            // occupy full width at all sizes
     flexBasis: "100%",        // force new row in flex layout
     display: "flex",
     flexDirection: "column",
     gap: "0.5rem",
     alignItems: "center",
     justifyContent: "center",
    }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 4,
            padding: 2,
            marginTop:"2rem",
            width:"100%"
            
            
          }}
        >
        
         
     
           {/* Status */}
           <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start",justifyContent:"flex-start",width:"max-content" }}>
            <h3 style={{ margin: 0, fontWeight: "600", fontSize: "1rem" }}>
              Status
            </h3>
            <p style={{padding:"5px 10px",backgroundColor:(requestInFocus.status==="Approved"||requestInFocus.status==="Activated")?"#B4DAC5":requestInFocus.status==="Denied"?"#F9B8C5":"#E4E7EC",borderRadius:"20px",color:requestInFocus.status==="Approved"?"#0B7D3E":requestInFocus.status==="Denied"?"#D8173D":"black", marginTop: "0.4rem", fontSize: "0.8rem", color: "#333" }}>
              Closed
            </p>


          </Box>

           {/* Due Date */}
           <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" ,justifyContent:"flex-start",width:"max-content" }}>
            <h3 style={{ margin: 0, fontWeight: "600", fontSize: "1rem" }}>
              Date
            </h3>
            <p style={{ marginTop: "0.4rem", fontSize: "0.8rem", color: "#333",textAlign:"left" }}>
            {requestInFocus && requestInFocus.updatedAt?formatDateWithSuffix(requestInFocus.updatedAt):"December 1, 2025"}
            </p>
          </Box>

           {/* Payment Terms */}
           <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start",justifyContent:"flex-start",width:"max-content"  }}>
            <h3 style={{ margin: 0, fontWeight: "600", fontSize: "1rem",textAlign:"left" }}>
              Terms
            </h3>
            <p style={{ marginTop: "0.4rem", fontSize: "0.8rem", color: "#333",textAlign:"left" }}>
            {requestInFocus && requestInFocus.paymentTerms?requestInFocus.paymentTerms:"1 installment(s)"}
            </p>
          </Box>
        
          {/* Next Payment */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start",justifyContent:"flex-start" ,width:"max-content" }}>
            <h3 style={{ margin: 0, fontWeight: "600", fontSize: "1rem",textAlign:"left" }}>
              Due Date
            </h3>
            <p style={{ marginTop: "0.4rem", fontSize: "0.8rem", color: "#333",textAlign:"left" }}>
              {"TBD"/*requestInFocus && requestInFocus.paymentDueDate?formatDateWithSuffix(requestInFocus.paymentDueDate):"15th January, 2026"*/}
            </p>
          </Box>

        
        </Box>



       </Box> 

}






        </Grid>

    {/* <Card sx={{ borderRadius: 3, height: "100%" }}>
      <CardContent>
        <Grid container spacing={3}>
          
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Farm Details
            </Typography>
            <Stack spacing={1}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Total Acres</Typography>
                <Typography variant="body2">15</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Owned</Typography>
                <Typography variant="body2">10</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Leased</Typography>
                <Typography variant="body2">5</Typography>
              </Box>
            </Stack>
          </Grid>

         
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Crop
            </Typography>
            <Typography variant="body2" gutterBottom>
              Secondary
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
              <Chip    sx={{ backgroundColor: "#E4E7EC",fontWeight: 500}} label="Hay" variant="outlined" />
              <Chip  sx={{ backgroundColor: "#E4E7EC",fontWeight: 500}}  label="Cover Crop" variant="outlined" />
            </Stack>
            <Typography variant="body2" gutterBottom>
              Primary Crops
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="nowrap">
              <Chip  sx={{ backgroundColor: "#E4E7EC",fontWeight: 500}}  label="Corn" variant="outlined" />
              <Chip  sx={{ backgroundColor: "#E4E7EC",fontWeight: 500}}  label="Soybeans" variant="outlined" />
              <Chip  sx={{ backgroundColor: "#E4E7EC",fontWeight: 500}}  label="Onions" variant="outlined" />
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    */}
  </Grid>
</Grid>
  );
}
