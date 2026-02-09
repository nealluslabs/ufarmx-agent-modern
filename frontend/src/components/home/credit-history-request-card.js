import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Stack,
  Divider,
} from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

export default function CreditHistoryRequestCard() {
  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {/* Top Grid: Credit Score + Payment Performance */}
      <Grid container spacing={3}>
        {/* Credit Score */}
    
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{ bgcolor: "inherit", boxShadow: "none", height: "100%" }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{fontWeight:"400",marginBottom:"1rem"}}>
                Credit Score
              </Typography>

              <Stack direction="row" alignItems="center" justifyContent='space-between' spacing={0} sx={{}}>
               
              <Stack direction="column" alignItems="flex-start" justifyContent='space-between' spacing={0} sx={{}}>
                <Typography
                  variant="body1"
                  sx={{ color:"#739D2A", fontWeight: "400" }}
                >
                  7.0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  out of 10
                </Typography>
             </Stack>


                <Box
                  sx={{
                    bgcolor: "#E9F4D7",
                    color: "#739D2A",
                    borderRadius: 1,
                    px: 1,
                    fontSize: "0.75rem",
                  }}
                >
                  Very Good
                </Box>



              </Stack>

              <LinearProgress
                variant="determinate"
                value={95.8}
                sx={{
                  mt: 1.5,
                  height: 8,
                  borderRadius: 5,
                  bgcolor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": { bgcolor: "#739D2A" },
                }}
              />

             
            </CardContent>
          </Card>
        </Grid>





        {/* Payment Performance */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{ bgcolor: "inherit", boxShadow: "none", height: "100%" }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{fontWeight:"400",marginBottom:"1rem"}}>
                Payment Performance
              </Typography>

              <Stack direction="row" alignItems="center" justifyContent='space-between' spacing={0} sx={{}}>
               
              <Stack direction="column" alignItems="flex-start" justifyContent='space-between' spacing={0} sx={{}}>
                <Typography
                  variant="body1"
                  sx={{ color:"#739D2A", fontWeight: "400" }}
                >
                  95.8%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  on-time payments
                </Typography>
             </Stack>


                <Typography
                variant="body2"
                color="text.secondary"
                align="right"
                sx={{ mt: 0 }}
              >
                94 of 98 payments
              </Typography>



              </Stack>

              <LinearProgress
                variant="determinate"
                value={95.8}
                sx={{
                  mt: 1.5,
                  height: 8,
                  borderRadius: 5,
                  bgcolor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": { bgcolor: "#739D2A" },
                }}
              />

             
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity Box */}
      <Card
        sx={{ mt: 3, borderRadius: 3, bgcolor: "white", width: "100%" }}
        elevation={1}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>

          <Stack spacing={2}>
            {/* Row Template */}
            {[
              {
                type: "up",
                text: "Payment to FarmSupply Co.",
                date: "2025-01-15",
                amount: "₦ 11,250",
              },
              {
                type: "down",
                text: "Seed purchase - AgriTech Solutions",
                date: "2025-01-15",
                amount: "₦ 11,250",
              },
              {
                type: "up",
                text: "Fertilizer delivery - GreenGrow Ltd.",
                date: "2025-01-16",
                amount: "₦ 8,500",
              },
              {
                type: "down",
                text: "Equipment rental - FarmTools Inc.",
                date: "2025-01-17",
                amount: "₦ 14,750",
              },
              {
                type: "down",
                text: "Pesticide order - CropGuard Supplies",
                date: "2025-01-18",
                amount: "₦ 6,200",
              },
              {
                type: "down",
                text: "Irrigation system installation - AquaFarm",
                date: "2025-01-19",
                amount: "₦ 22,000",
              },
            ].map((item, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {/* Left */}
                <Box display="flex" alignItems="center" gap={1}>
                  {item.type === "up" ? (
                    <ArrowCircleUpIcon sx={{ color: "#739D2A" }} />
                  ) : (
                    <ArrowCircleDownIcon sx={{ color: "orange" }} />
                  )}
                  <Box>
                    <Typography variant="body1">{item.text}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.date}
                    </Typography>
                  </Box>
                </Box>

                {/* Amount */}
                <Typography variant="body1" fontWeight="bold">
                  {item.amount}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
