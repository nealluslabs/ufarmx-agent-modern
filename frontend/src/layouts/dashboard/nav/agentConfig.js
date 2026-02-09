// component
import { AiOutlineForm } from 'react-icons/ai';
import { FaWpforms } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import { MdDashboard } from 'react-icons/md';
import { PiShippingContainer } from 'react-icons/pi';
import { useSelector } from 'react-redux';



// const icon = (name) => <SvgColor src={`/assets/icons/${name}.png`} sx={{ width: 1, height: 1 }} />;
const icon = (name) => <img src={`/assets/icons2/${name}.png`} sx={{ width: 1, height: 1 }} />;



const agentConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/home-agent',
    icon: /*icon('dashboard')*/<MdDashboard style={{color:"black"}} />,
  },
  {
    title: 'Farmers',
    
    path: `/dashboard/all-farmers-one-agent`,
    icon:<FaPerson style={{color:"black"}}/> /*icon('teacher')*/,
  },
 
  {
    title: 'Forms',
    path: '/dashboard/forms',
    icon: <AiOutlineForm style={{color:"black"}}/> /*icon('report')*/,
  },


  {
    title: 'Responses',
    path: '/dashboard/responses',
    icon: <FaWpforms /> /*icon('report')*/,
  },
  {
    title: 'Containers',
     path: '/dashboard/containers',
    //path: '#',
    icon: <PiShippingContainer style={{color:"black"}}/>,
  },

];

export default agentConfig;
