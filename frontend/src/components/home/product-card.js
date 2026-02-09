import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FaShoppingCart } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import { CiShoppingBasket } from "react-icons/ci";

import {useNavigate} from "react-router-dom"

export default function ProductEcommerceCard({picture,header,price,supplier,description,supplyUnit,rating}) {
    
  const navigate = useNavigate()

  return (
    <Card
      sx={{
        maxWidth: 420,
        height:630,
        boxShadow:
          '4px 0px 8px rgba(0, 0, 0, 0.1), -4px 0px 8px rgba(0, 0, 0, 0.1), 0px -4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardMedia
        sx={{ height: 320 }}
        image={picture}
        title="fertilizer"
      />
      <CardContent sx={{maxWidth:"92%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",margin:"0 auto"}}>
        <Typography gutterBottom variant="h5" component="div" sx={{fontSize:"1rem",display:"flex",justifyContent:"space-between",width:"100%"}}>
        <span>{header.length <15? header:header.substring(0,15)+'...'}</span>    <span>{price}</span>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary',width:"100%" }}>
         <span>{supplier}</span>   <span style={{marginLeft:"2rem"}}><FaStar style={{color:"#EE9E0B"}}/>{rating}</span>
        </Typography>

       




        <Typography variant="body2" sx={{ color: 'text.secondary',marginTop:"1rem",textAlign:"left",fontFamily:"Poppins" }}>
         {description}
        </Typography>

        <Typography gutterBottom variant="h6" component="div" sx={{fontSize:"0.65rem",display:"flex",justifyContent:"space-between",width:"100%",marginTop:"1rem"}}>
        <span>{supplyUnit}</span>  
        </Typography>

        
      </CardContent>
      
        <CardActions sx={{ justifyContent: 'center',marginBottom:"2rem" }}>
        <Button
          size="small"
          onClick={()=>{navigate('/dashboard/edit-product')}}
          style={{
            color: 'black',
            borderRadius: '8px',
            border: '1px solid #B4B4B4',
            textTransform: 'none',
            padding:"6px",
            paddingLeft:"10px",
            paddingRight:"10px",
            width:"10rem",
            fontWeight:"300",
            
          }}
        >
          Edit Product
        </Button>
        {/*
        <Button
          size="small"
          style={{
            backgroundColor: '#E4E4E4',
            color: 'black',
            textTransform: 'none',
            padding:"6px",
            paddingLeft:"10px",
            paddingRight:"10px",
            width:"10rem",
            fontWeight:"300",
          }}
        > 
          <CiShoppingBasket style={{ marginRight: '7px' ,fontSize:"1.3rem",position:"relative",top:"-3px"}} />
          Add to Cart
        </Button>
        */}
      </CardActions>
      
    </Card>
  );
}
