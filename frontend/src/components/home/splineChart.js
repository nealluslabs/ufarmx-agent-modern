import React, { useState,useRef,useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

const ApexChart = ({pointsData}) => {
    const chartRef = useRef(null);
    const [activeRange,setActiveRange] = useState('1Y')
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const points = pointsData?[...pointsData]: [30, 62, 40, 60, 50, 70, 53,66]

    // Get the current month (0-based, so January is 0, December is 11)
    const currentMonthIndex = new Date().getMonth(); 
    

useEffect(()=>{
  updateTimeRange('1Y')
},[pointsData])




    let resultArray = [];
   console.log("TYPE OF POINTS DATA IS--->",typeof(pointsData[0]))
   
    
    // Loop backwards for 8 months including the current month
    for (let i = 0; i < 8; i++) {
      let monthIndex = (currentMonthIndex - i + 12) % 12; // This ensures wrapping around from January to December
      resultArray.push(months[monthIndex]);
    }
    
    console.log(resultArray);
   
    let resultFinalArray = resultArray.reverse()

  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'value',
        data:points
      }
    ],
    options: {
      chart: {
        id:'my-area-chart',
        height: 350,
        type: 'area',
        events: {
            mounted: (chart) => {
              // Select June point by default
              ApexCharts.exec('my-area-chart', 'tooltip.show', {
                seriesIndex: 0,
                dataPointIndex: 5 // Index for June
            });
            },
          },
        
      },
      toolbar: {
        show: false, // Display toolbar
        tools: {
          download: true,  // Enable download button
          selection: false, // Disable selection
          zoom: false,     // Disable zoom
          zoomin: false,   // Disable zoom in
          zoomout: false,  // Disable zoom out
          pan: false,      // Disable panning
          reset: false     // Disable reset button
        }
      }
    ,
      dataLabels: {
        enabled: false
      },
       
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.8,
          opacityTo: 0,
          stops: [0, 100],
          colorStops: [
            {
              offset: 0,
              color: '#A7D35A33',
              opacity: 0.8
            },
            {
              offset: 100,
              color: '#90C43400',
              opacity: 0
            }
          ]
        }
      },
      stroke: {
        curve: 'smooth',
        colors: ['#90C434'] 
      },
      yaxis: {
        min: 0,  // Set minimum value for y-axis
        max: 400, // Set maximum value for y-axis
        title: {
            text: 'Overview',
            rotate: 0, // Makes the title vertical
            offsetX: 20, // Adjust horizontal positioning (set it to 0 to align with y-axis)
            offsetY: -161, // Adjust vertical positioning to move it to the top
            style: {
              fontSize: '12px',  // Adjust font size (optional)
              
              color: '#333' // Set font color (optional)
            }
          }
        },
      xaxis: {
        
        categories: resultFinalArray?resultFinalArray: [
         'May', 'Jun', 
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
      },
      tooltip: {
        enabled: true
      /*  x: {
          format: 'dd/MM/yy HH:mm'
        }*/
      }
    }
  });

  // Function to update chart based on time range
  const updateTimeRange = (range) => {
    let newCategories, newData;
    if (range === '1D') {
      newCategories = ['1D'];
      newData = [20];
    } else if (range === '1W') {
      newCategories = ['1W'];
      newData = [30, 50, 60, 20, 40, 90, 60];
    } else if (range === '1M') {
      newCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      newData = [10, 50, 30, 80, 40];
    } else if (range === '1Y') {
      newCategories = resultFinalArray?resultFinalArray: [
          'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      newData =pointsData?[...pointsData]: [20, 62, 40, 60, 50, 80, 43, 60];
    }
    setChartData({
      ...chartData,
      series: [{ name: 'value', data: newData }],
      options: {
        ...chartData.options,
        xaxis: {
          categories: newCategories
        }
      }
    });
  };

  useEffect(() => {
    // Ensure the tooltip for June is shown on mount
    ApexCharts.exec('my-area-chart', 'tooltip.show', {
        seriesIndex: 0,
        dataPointIndex: 5, // Index for June
    });
}, []);


  


  return (
    <div style={{position:"relative",backgroundColor:"white",paddingTop:"1rem"}}>

          {/* Custom Buttons for Time Range */}
      <div style={{ marginBottom: '10px',position:"absolute",right:"0.2rem",display:"flex",gap:"0.5rem",zIndex:"200" }}>
        <button  style={{backgroundColor:activeRange==="1D" ?'#0A6054':"#F5F5F5",border:"0px",color:activeRange==="1D"  ?'white':"black",width:"2.5rem",borderRadius:"5px"}} onClick={() => {setActiveRange('1D');updateTimeRange('1D')}}>1D</button>
        <button style={{backgroundColor:activeRange==="1W" ?'#0A6054':"#F5F5F5",border:"0px",color:activeRange==="1W"  ?'white':"black",width:"2.5rem",borderRadius:"5px"}} onClick={() => {setActiveRange('1W');updateTimeRange('1W') } }>1W</button>
        <button style={{backgroundColor:activeRange==="1M" ?'#0A6054':"#F5F5F5",border:"0px",color:activeRange==="1M"  ?'white':"black",width:"2.5rem",borderRadius:"5px"}} onClick={() => {setActiveRange('1M');updateTimeRange('1M')} }>1M</button>
        <button style={{backgroundColor:activeRange==="1Y" ?'#0A6054':"#F5F5F5",border:"0px",color:activeRange==="1Y"  ?'white':"black",width:"2.5rem",borderRadius:"5px"}} onClick={() => {setActiveRange('1Y');updateTimeRange('1Y')} }>1Y</button>
      </div>


      <div id="chart" >
     
       <Chart
         
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={350}
          width={"100%"}
        />
      
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
