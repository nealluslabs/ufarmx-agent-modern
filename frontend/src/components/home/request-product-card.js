import React from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
  Grid,
} from '@mui/material';





const seedItems = [
  {
    title: 'Maize Seeds (2kg)',
    description: 'Disease-resistant variety ideal for organic farming',
    price: '₦ 9,499',
  },
  {
    title: 'Sweet Bell Pepper Seeds (500g)',
    description: 'High yielding and vibrant colors',
    price: '₦ 4,200',
  },
  {
    title: 'Heirloom Basil Seeds (250g)',
    description: 'Aromatic herb, perfect for culinary use',
    price: '₦ 2,800',
  },
  {
    title: 'Green Bean Seeds (2kg)',
    description: 'Fast-growing and nutritious variety',
    price: '₦ 5,600',
  },
];

const RequestProductCard = ({requestProducts}) => {

  console.log("IN THE COMPONENT ITSELF ?--->",requestProducts)
  return (
    <Stack spacing={2} width="100%">
      {requestProducts && requestProducts.length &&  requestProducts.map((item, index) => (
        <Paper
          key={index}
          elevation={2}
          sx={{
            width: '100%',
            p: 2,
            border: '1px dashed #90caf9',
            borderRadius: 2,
            bgcolor: '#f9f9f9',
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
            {/* Left Section: Image + Text */}
            <Grid item xs={12} sm={9}>
              <Box display="flex" alignItems="center">
                {/* Image Placeholder */}
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    minWidth: 64,
                    backgroundColor: '#e0e0e0',
                    borderRadius: '10px',
                    mr: 2,
                  }}
                />

                {/* Text */}
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.name}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2" color="text.secondary" sx={{maxWidth:"80%"}}>
                      {item.description}
                    </Typography>

                    
                  </Box>

                  
                </Box>
              </Box>





              {/* Price next to description, 2rem to the right */}
              <Box sx={{ml:"80%",position:"relative",top:"-2.2rem"}}>
              <Typography
                      variant="subtitle1"
                      fontWeight={500}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      {item.price}
                    </Typography>
              </Box>
            </Grid>

            {/* Right Section: Buttons */}
            <Grid item xs={12} sm={3}>
              {/*<Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button
                  variant="contained"
                 
                  style={{backgroundColor:"#0A6054", color: '#fff', minWidth: 100 }}
                >
                  Approve
                </Button>
               
                <Button
                  variant="contained"
                  color="error"
                  sx={{ color: '#fff', minWidth: 100 }}
                >
                  Reject
                </Button>
                
                </Stack>*/}
            </Grid>
          </Grid>
        </Paper>
 ))

}
    </Stack>
  );
};

export default RequestProductCard;
