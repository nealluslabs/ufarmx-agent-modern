// component
import { FaPerson } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { PiShippingContainer } from "react-icons/pi";
import { FaWpforms } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";
import { GiCorn } from 'react-icons/gi';



// const icon = (name) => <SvgColor src={`/assets/icons/${name}.png`} sx={{ width: 1, height: 1 }} />;
const icon = (name) => <img src={`/assets/icons2/${name}.png`} sx={{ width: 1, height: 1 }} />;



const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/home-regmgr',
    icon: /*icon('dashboard')*/<MdDashboard />,
  },
  {
    title: 'Farmers',
    
    path: `/dashboard/products-regmgr`,
    icon:<IoPerson />/*icon('teacher')*/,
  },
  {
    title: 'Agents',
    path: '/dashboard/deposits-regmgr',
    icon: <FaPerson/> /*icon('student')*/,
  },
  {
    title: 'Products',
    path: '/dashboard/products',
    icon:  <GiCorn /> /*icon('student')*/,
  },
 
  {
    title: 'Responses',
    path: '/dashboard/responses-regmgr',
    icon: <FaWpforms /> /*icon('report')*/,
  },
 

  {
    title: 'Forms',
    path: '/dashboard/forms-regmgr',
    icon: <AiOutlineForm /> /*icon('report')*/,
  },
 
  {
    title: 'Containers',
     path: '/dashboard/containers-regmgr',
    //path: '#',
    icon:<PiShippingContainer /> /*icon('settings')*/,
  },

 
];

export default navConfig;
