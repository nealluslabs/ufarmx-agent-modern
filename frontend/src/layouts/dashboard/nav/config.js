// component
import { FaChartBar, FaPerson } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { PiShippingContainer } from "react-icons/pi";
import { FaCog, FaFileInvoiceDollar, FaHandHolding, FaShoppingBag, FaWpforms } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";
import { RiAdminFill } from 'react-icons/ri';
import { GiCorn } from 'react-icons/gi';



// const icon = (name) => <SvgColor src={`/assets/icons/${name}.png`} sx={{ width: 1, height: 1 }} />;
const icon = (name) => <img src={`/assets/icons2/${name}.png`} sx={{ width: 1, height: 1 }} />;



const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/home',
    icon: /*icon('dashboard')*/<MdDashboard />,
  },
  {
    title: 'Farmers',
    
    path: `/dashboard/farmers`,
    icon:<IoPerson />/*icon('teacher')*/,
  },
  // {
  //   title: 'Agents',
  //   path: '/dashboard/deposits',
  //   icon: <FaPerson/> /*icon('student')*/,
  // },

  // {
  //   title: 'Admins',
  //   path: '/dashboard/admins',
  //   icon: <RiAdminFill /> ,
  // },
  //   {
  //   title: 'Products',
  //   path: '/dashboard/products',
  //   icon: <GiCorn />,
  // },
 
  // {
  //   title: 'Responses',
  //   path: '/dashboard/responses',
  //   icon: <FaWpforms /> /*icon('report')*/,
  // },
 

  {
    title: 'Forms',
    path: '/dashboard/forms',
    icon: <AiOutlineForm /> /*icon('report')*/,
  },

  {
    title: 'Products',
    path: '/dashboard/farm-products',
    icon: <FaShoppingBag /> /*icon('report')*/,
  },

  {
    title: 'Requests',
    path: '/dashboard/requests',
    icon: <FaHandHolding /> /*icon('report')*/,
  },

  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: <FaCog /> /*icon('report')*/,
  },

 // {
 //   title: 'Invoices',
 //   path: '/dashboard/invoices',
 //   icon: <FaFileInvoiceDollar /> /*icon('report')*/,
 // },
 
  // {
  //   title: 'Containers',
  //    path: '/dashboard/containers',
  //   //path: '#',
  //   icon:<PiShippingContainer /> /*icon('settings')*/,
  // },
  //{
  //  title: 'Market Insights',
  //   path: '/dashboard/market-insights',
  //  //path: '#',
  //  icon:<FaChartBar /> /*icon('settings')*/,
  //},



 
];

export default navConfig;
