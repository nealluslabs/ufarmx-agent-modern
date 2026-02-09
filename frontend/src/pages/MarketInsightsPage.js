import { useState } from 'react'
// import './App.css';

// Apex Chart
import Chart from "react-apexcharts";

// React Icons
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";

// Map styling
import { MapContainer, TileLayer, Marker, Popup,Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

import tempImg from 'src/assets/images/temp-map.png'


const TableData = () => {


 




  const data = [
    { products: "Onion", price: "CFA 1375", $Price: "$2.20", arrow: true },
    { products: "Tomato", price: "CFA 1125", $Price: "$1.80", arrow: false },
    { products: "Potato", price: "CFA 940", $Price: "$1.50", arrow: true },
    { products: "Carrot", price: "CFA 815", $Price: "$1.30", arrow: false },
    { products: "Lettuce", price: "CFA 1065", $Price: "$1.70", arrow: true }
  ]

  return (
    <div style={{ margin: "20px", overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
      <thead>
        <tr style={{ backgroundColor: "#f5f5f5" }}>
          <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Product</th>
          <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Price</th>
          <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Price ($)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, key) => (
          <tr
            key={key}
            style={{
              backgroundColor: key % 2 === 0 ? "#fff" : "#f9f9f9",
              borderBottom: "1px solid #ddd",
            }}
          >
            <td style={{ padding: "10px" }}>{item.products}</td>
            <td style={{ padding: "10px" }}>{item.price}</td>
            <td style={{ padding: "10px", display: "flex", alignItems: "center", gap: "5px" }}>
              {item.$Price}
              {item.arrow ? (
                <FaArrowUp style={{ color: "#039855" }} />
              ) : (
                <FaArrowDown style={{ color: "#D92D20" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

//const SelectOptions = () => {
//
//  return (
//    <>
//      <select name='crops' style={{ padding: "6px 16px", marginRight: "7px" }}>
//        <option value="Select">Select</option>
//        <option value="Okro">Okro</option>
//        <option value="Potato">Potato</option>
//        <option value="Carrot">Carrot</option>
//      </select>
//    </>
//  )
//}

//const Arrangement = () => {
//
//  return (
//    <div style={{ background: "#FAF2F2", display: "flex", width: "240px", alignItems: "center", padding: "1px 2px" }}>
//      <p style={{ background: "#FFFFFF", padding: "6px 12px", cursor: "pointer", borderRadius: "4px" }}>Daily</p>
//      <p style={{ padding: "6px 12px", cursor: "pointer", borderRadius: "4px" }}>Weekly</p>
//      <p style={{ padding: "6px 12px", cursor: "pointer", borderRadius: "4px" }}>Monthly</p>
//    </div>
//  )
//}

export default function MarketInsightsPage() {
  // const [count, setCount] = useState(0)

  const [options1, setOptions1] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: ["Onion", "Tomato","Potato", "Carrot", "Lettuce"]
    },
    plotOptions: {
      bar: {
        borderRadius: 5, // Adds a slight curve to the top corners
        horizontal: false, // Ensures the bars are vertical
        columnWidth:"50%"
      },
    },
    dataLabels:{
      enabled:false
    },
    colors:['#0A6054']
  });





  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: ["Onion", "Tomato","Potato", "Carrot", "Lettuce"]
    },
    colors:['#0A6054']
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [45, 71, 45, 50, 40, ]
    }
  ])

  const today = new Date();
  const format = { month: "short", day: "2-digit" };

  const cropPriceComparisonCategories = ["Feb 18", "Feb 19", "Feb 20", "Feb 21", "Feb 22", "Feb 23"];

  for (let i = cropPriceComparisonCategories.length - 1; i >= 0; i--) {
    cropPriceComparisonCategories[i] = today.toLocaleDateString("en-US", format);
    today.setDate(today.getDate() - 1);
  }


  const [optionsMarket, setOptionsMarket] = useState({
    chart: {
      id: "line-chart",
      toolbar: {
        show: false, // Hides the toolbar with zoom/panning options
      },
    },

    xaxis: {
      categories:[
           new Date(new Date().setDate(new Date().getDate()-3 )).toLocaleDateString("en-US", format), 
            new Date(new Date().setDate(new Date().getDate()-2 )).toLocaleDateString("en-US", format),
            new Date(new Date().setDate(new Date().getDate()-1 )).toLocaleDateString("en-US", format),
            new Date(new Date().setDate(new Date().getDate() )).toLocaleDateString("en-US", format),
            new Date(new Date().setDate(new Date().getDate()+1 )).toLocaleDateString("en-US", format),
            new Date(new Date().setDate(new Date().getDate()+2 )).toLocaleDateString("en-US", format)
          ],
    },
    yaxis: {
      min: 0,
      max: 60,
      tickAmount: 6, // Controls increments (60/6 = 10)
    },
    stroke: {
      curve: "smooth", // Smoothens the lines
      width: 2, // Thin lines
    },
    colors: ["#FFD700", "#FF4500", "#008000"], // Yellow, Red, Green
    markers: {
      size: 0, // Hides the points on the line
    },
    legend: {
      show: false, // Hides the legend
    },
    dataLabels: {
      enabled: false, // Disables data labels
    },
    grid: {
      show: true,
      borderColor: "#e7e7e7",
      xaxis: {
        lines: {
          show: false, // Hides vertical grid lines
        },
      },
      yaxis: {
        lines: {
          show: false, // Shows horizontal grid lines
        },
      },
    },
  });

  const [seriesMarket, setSeriesMarket] = useState([
    {
      name: "Local Price",
      data: [28, 24, 34, 45], // Slight variance around 30
    },
    {
      name: "Landing Price",
      data: [29, 34, 30, 44], // Slight upward trend
    },
    {
      name: "Market Price",
      data: [22, 30, 45, 50], // Starting lower but straddles around 30
    },
  ]);




  const [optionsPredictive, setOptionsPredictive] = useState({
    chart: {
      id: "line-chart",
      toolbar: {
        show: false, // Hides the toolbar with zoom/panning options
      },
    },

    xaxis: {
      categories:[
        new Date(new Date().setDate(new Date().getDate() )).toLocaleDateString("en-US", format), 
         new Date(new Date().setDate(new Date().getDate()+1 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+2 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+3 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+4 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+5 )).toLocaleDateString("en-US", format)
       ],
    },
    yaxis: {
      min: 0,
      max: 60,
      tickAmount: 6, // Controls increments (60/6 = 10)
    },
    stroke: {
      curve: "smooth", // Smoothens the lines
      width: 2, // Thin lines
    },
    colors: ["#FFD700"], // Yellow
    markers: {
      size: 0, // Hides the points on the line
    },
    legend: {
      show: false, // Hides the legend
    },
    dataLabels: {
      enabled: false, // Disables data labels
    },
    grid: {
      show: true,
      borderColor: "#e7e7e7",
      xaxis: {
        lines: {
          show: false, // Hides vertical grid lines
        },
      },
      yaxis: {
        lines: {
          show: true, // Shows horizontal grid lines
        },
      },
    },
  });

  const [seriesPredictive, setSeriesPredictive] = useState([
    {
      name: "Local Price",
      data: [28, 24, 34, 45], // Slight variance around 30
    },

  ]);



  const [optionsCropPrice, setOptionsCropPrice] = useState({
    chart: {
      id: "line-chart",
      toolbar: {
        show: false, // Hides the toolbar with zoom/panning options
      }
    },

    xaxis: {
      categories:[
        new Date(new Date().setDate(new Date().getDate()-2 )).toLocaleDateString("en-US", format), 
         new Date(new Date().setDate(new Date().getDate()-1 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate() )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+1 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+2 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+3 )).toLocaleDateString("en-US", format)
       ],
    },
    yaxis: {
      min: 0,
      max: 60,
      tickAmount: 6, // Controls increments (60/6 = 10)
    },
    stroke: {
      curve: "smooth", // Smoothens the lines
      width: 2, // Thin lines
    },
    colors: ["#800080", "#FF4500"], // Purple, Red
    markers: {
      size: 0, // Hides the points on the line
    },
    legend: {
      show: false, // Hides the legend
    },
    dataLabels: {
      enabled: false, // Disables data labels
    },
    grid: {
      show: true,
      borderColor: "#e7e7e7",
      xaxis: {
        lines: {
          show: false, // Hides vertical grid lines
        },
      },
      yaxis: {
        lines: {
          show: false, // Shows horizontal grid lines
        },
      },
    },
  });

  const [seriesCropPrice, setSeriesCropPrice] = useState([
    {
      name: "Onion",
      data: [28, 44, 64], // Slight variance around 30
    },
    {
      name: "Tomato",
      data: [32, 50, 70], // Slight upward trend
    },

  ]);



  const [optionsRegion, setOptionsRegion] = useState({
    chart: {
      id: "line-chart",
      toolbar: {
        show: false, // Hides the toolbar with zoom/panning options
      },
    },

    xaxis: {
      categories:[
        new Date(new Date().setDate(new Date().getDate()-2 )).toLocaleDateString("en-US", format), 
         new Date(new Date().setDate(new Date().getDate()-1 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate() )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+1 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+2 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+3 )).toLocaleDateString("en-US", format)
       ],
    },
    yaxis: {
      min: 0,
      max: 60,
      tickAmount: 6, // Controls increments (60/6 = 10)
    },
    stroke: {
      curve: "smooth", // Smoothens the lines
      width: 2, // Thin lines
    },
    colors: [ "#008000","#FFD700"], // Yellow, Red, Green
    markers: {
      size: 0, // Hides the points on the line
    },
    legend: {
      show: false, // Hides the legend
    },
    dataLabels: {
      enabled: false, // Disables data labels
    },
    grid: {
      show: true,
      borderColor: "#e7e7e7",
      xaxis: {
        lines: {
          show: false, // Hides vertical grid lines
        },
      },
      yaxis: {
        lines: {
          show: false, // Shows horizontal grid lines
        },
      },
    },
  });


  const [seriesRegion, setSeriesRegion] = useState([
    {
      name: "Thies Region",
      data: [8, 24, 44], // Slight variance around 30
    },
    {
      name: "Kolda Region",
      data: [12, 30, 50], // Slight upward trend
    },

  ]);


  const center = [13.1383064, -14.1242743];

  // Marker positions
  const marker1 = [13.1373064, -14.1342743];
  const marker2 = [13.1393064, -14.1442743];
  const marker3 = [13.1993064, -14.1542743];
  const marker4 = [13.1493064, -14.1642743];
  const marker5 = [13.1733064, -14.1152743];
  const marker6 = [13.1093064, -14.1842743];
  const marker7 = [13.1593064, -14.1942743];

 //const marker1 = [13.273064, -14.942743];
 // const marker2 = [12.9383064, -13.0242743];



return (
    <>
      <div style={{ background: "#F5F5F5",padding:"2rem",margin:"0 auto",display:"flex",flexDirection:"column",gap:"3rem",marginTop:"-1rem" }}>
        <div style={{paddingLeft:"8rem",fontSize:"0.7rem",fontWeight:"400"}}> <h1>Crop Price Trends</h1> </div>

        <div style={{ display: "flex",justifyContent:"center"}}>
          {/* ... (Crop Harvest section remains exactly the same) */}
          {/* ... (Crop Density section remains exactly the same) */}
        </div>

        {/* FIXED: Price Change and Market Comparison - NO FLEX ON MOBILE */}
        <div>
          {/* Price Change - Full width block on mobile */}
          <div style={{ 
            display: "block",
            width: "100%",
            marginBottom: { xs: "1rem", sm: "0" },
            backgroundColor: "#FFF",
            borderRadius: "0.5rem",
            padding: { xs: "1rem", sm: "1rem 1rem 1rem 2rem" },
            maxWidth: { xs: "100%", sm: "30rem" },
            boxSizing: "border-box"
          }}>
            <h2 style={{fontWeight:"700",fontSize:"1.2rem"}}>Price Change</h2>
            {/*<Arrangement />*/}
            <div style={{
              position: "relative",
              left: { xs: "0rem", sm: "-2rem" },
              top: { xs: "0rem", sm: "-1.5rem" },
              overflowX: "auto"
            }}>
              <TableData />
            </div>
          </div>

          {/* Market Comparison - Full width block on mobile */}
          <div
            style={{
              display: "block",
              width: "100%",
              backgroundColor: "#FFF",
              borderRadius: "0.5rem",
              padding: { xs: "1rem", sm: "1rem 1rem 1rem 4rem" },
              maxWidth: { xs: "100%", sm: "30rem" },
              boxSizing: "border-box"
            }}
          >
            <h2 style={{ fontWeight: 700 ,fontSize:"1.2rem"}}>Market Comparison & Trends</h2>
            <div style={{ marginBottom: "1rem" }}>
              <select
                style={{
                  padding: "8px",
                  borderRadius: "0.25rem",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                  width: { xs: "100%", sm: "auto" }
                }}
              >
                <option value="">Select Product</option>
                <option value="onion">Onion</option>
                <option value="tomato">Tomato</option>
                <option value="potato">Potato</option>
                <option value="carrot">Carrot</option>
                <option value="lettuce">Lettuce</option>
              </select>
            </div>
            <div style={{ 
              position: "relative", 
              left: { xs: "0rem", sm: "-3rem" }, 
              top: { xs: "0rem", sm: "1.5rem" }, 
              paddingBottom: "10px" 
            }}>
              <Chart options={optionsMarket} series={seriesMarket} type="line" width="100%" />
            </div>
          </div>
        </div>

        <div
          style={{
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#FFF",
            borderRadius: "0.5rem",
            flexDirection: "column",
            gap: "10px",
            paddingTop: "1rem",
            paddingLeft: "3rem",
            maxWidth: "62rem",
            width: "96%",
          }}
        >
          {/* ... (Predictive Analytics section remains exactly the same) */}
        </div>

        {/* FIXED: Crop Price Comparison and Region Comparison - NO FLEX ON MOBILE */}
        <div>
          {/* Crop Price Comparison - Full width block on mobile */}
          <div
            style={{
              display: "block",
              width: "100%",
              marginBottom: { xs: "1rem", sm: "0" },
              backgroundColor: "#FFF",
              borderRadius: "0.5rem",
              padding: { xs: "1rem", sm: "1rem 1rem 1rem 2rem" },
              maxWidth: { xs: "100%", sm: "30rem" },
              boxSizing: "border-box"
            }}
          >
            <h2 style={{ fontWeight: "700",fontSize:"1.2rem" }}>Crop Price Comparison</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                marginTop: "2rem",
                flexDirection: { xs: "column", sm: "row" }
              }}
            >    
              <select
                style={{
                  width: { xs: "100%", sm: "50%" },
                  padding: "10px",
                  borderRadius: "0.375rem",
                  border: "1px solid #E0E0E0",
                  fontSize: "1rem",
                  color: "#4F4F4F",
                  backgroundColor: "#F9F9F9",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <option value="" disabled selected>
                  Select Crop
                </option>
                <option value="onion">Onion</option>
                <option value="tomato">Tomato</option>
                <option value="potato">Potato</option>
                <option value="carrot">Carrot</option>
                <option value="lettuce">Lettuce</option>
              </select>
              <select
                style={{
                  width: { xs: "100%", sm: "50%" },
                  padding: "10px",
                  borderRadius: "0.375rem",
                  border: "1px solid #E0E0E0",
                  fontSize: "1rem",
                  color: "#4F4F4F",
                  backgroundColor: "#F9F9F9",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <option value="" disabled selected>
                  Select Crop
                </option>
                <option value="onion">Onion</option>
                <option value="tomato">Tomato</option>
                <option value="potato">Potato</option>
                <option value="carrot">Carrot</option>
                <option value="lettuce">Lettuce</option>
              </select>
            </div>
            <div>
              <Chart
                options={optionsCropPrice}
                series={seriesCropPrice}
                type="line"
                width="100%"
              />
            </div>
          </div>

          {/* Region Comparison - Full width block on mobile */}
          <div
            style={{
              display: "block",
              width: "100%",
              backgroundColor: "#FFF",
              borderRadius: "0.5rem",
              padding: { xs: "1rem", sm: "1.5rem" },
              maxWidth: { xs: "100%", sm: "30rem" },
              boxSizing: "border-box"
            }}
          >
            <h2 style={{ fontWeight: 700, marginBottom: "1rem",fontSize:"1.2rem" }}>Region Comparison</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
                flexDirection: { xs: "column", sm: "row" }
              }}
            >
              <select
                style={{
                  width: { xs: "100%", sm: "auto" },
                  padding: "10px",
                  borderRadius: "0.375rem",
                  border: "1px solid #E0E0E0",
                  fontSize: "1rem",
                  color: "#4F4F4F",
                  backgroundColor: "#F9F9F9",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <option value="" disabled selected>
                  Select
                </option>
                <option value="thies">Thies</option>
                <option value="kolda">Kolda</option>
              </select>
              <select
                style={{
                  width: { xs: "100%", sm: "auto" },
                  padding: "10px",
                  borderRadius: "0.375rem",
                  border: "1px solid #E0E0E0",
                  fontSize: "1rem",
                  color: "#4F4F4F",
                  backgroundColor: "#F9F9F9",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <option value="" disabled selected>
                  Select
                </option>
                <option value="thies">Thies</option>
                <option value="kolda">Kolda</option>
              </select>
            </div>
            <div>
              <Chart options={optionsRegion} series={seriesRegion} type="line" width="100%" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
