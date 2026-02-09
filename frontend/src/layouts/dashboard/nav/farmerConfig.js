// component
import { useSelector } from 'react-redux';
import { AiOutlineForm } from 'react-icons/ai';
import { FaPerson } from 'react-icons/fa6';
import { MdDashboard } from 'react-icons/md';
import { PiShippingContainer, PiShippingContainerDuotone } from 'react-icons/pi';
import { GiCorn } from 'react-icons/gi';
import { CiSettings } from 'react-icons/ci';



// const icon = (name) => <SvgColor src={`/assets/icons/${name}.png`} sx={{ width: 1, height: 1 }} />;
const icon = (name) => <img src={`/assets/icons2/${name}.png`} sx={{ width: 1, height: 1 }} />;



const farmerConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/home-farmer',
    icon: <MdDashboard/>,
  },
  {
    title: 'Products',
    
    path: `/dashboard/farmer-products`,
    icon: <GiCorn/>,
  },


  {
    title: 'Deposits',
    
    path: `/dashboard/deposits-farmer`,
    icon: <PiShippingContainerDuotone />,
  },
 
 
 
 
  {
    title: 'Settings',
     path: '/dashboard/farmer-settings',
    //path: '#',
    icon: <CiSettings />,
  },

 
];

export default farmerConfig;
