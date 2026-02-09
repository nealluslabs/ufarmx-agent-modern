import PropTypes from 'prop-types';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SavingsIcon from '@mui/icons-material/Savings';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import { BorderTop } from '@mui/icons-material';
// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <>
          <NavItem key={item.title} item={item}/>
           {
             item?.children?.map((c) => (
              <SubNavItem key={c.title} item={c}/>
            ))
           }
          </>
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, iconLabel, info } = item;

  const location = useLocation()
 

  return (
    <StyledNavItem
      component={RouterLink}
      to={ path }
      sx={{
        color: '#FFF',
        fontSize: '18px',
        fontWeight: '300',
       // backgroundColor:  title=== "Deals" && (location.pathname === '/dashboard/individual-campaign') && "#0A6054",
        '&.active': {
          //color: '#FFFFFF',
          color: '#90C434',
          // bgcolor: '#66000000',
          //backgroundColor: path != '#' && '#0A6054'|| title=== "Deals" && (location.pathname === '/dashboard/individual-campaign') && "#0A6054",
          fontWeight: '300',
          position:"relative",
          
            transition: 'transform 0.3s ease-in-out', // Smooth sliding effect
         
          // borderBottomLeftRadius: '26px',
          '&::after': {
            content: '""', // Required to display the pseudo-element
            position: 'absolute',
            top: '20%',
            right: '-3%',
            width: '5px',
            height: '70%',
            borderTopLeft:"1rem",
            borderBottomLeftt:"1rem",
            backgroundColor: '#90C434',
            //clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0.1rem, 0.2rem  0 0)',
            clipPath: 'inset(0 0 0 0 round 60% 0% 0 60%)'
          },
        },
      }}
    >
      {/* {iconLabel === 'dashboard' && iconLabel != 'settings' && <StyledNav/>ItemIcon sx={{ fontSize: '20px'}}>{icon && icon}</StyledNavItemIcon>} */}
      {iconLabel != 'msg' && iconLabel != 'settings' && <StyledNavItemIcon sx={{ fontSize: '20px'}}>{icon && icon}</StyledNavItemIcon>}
      {iconLabel === 'msg' && <StyledNavItemIcon sx={{fontSize: '20px'}}><MessageIcon /></StyledNavItemIcon>}
      {/* {iconLabel === 'settings' && <StyledNavItemIcon sx={{fontSize: '20px'}}><SettingsIcon /></StyledNavItemIcon>} */}

      <ListItemText disableTypography primary={title} sx={{color: title && title.toLowerCase() === 'cooler' && 'white'}}/>
      {/* sx={{ color: '#130C66', fontSize: '18px'}}/> */}
      {/* <ListItemText disableTypography primary={title} sx={{ color: '#FFFFFF', fontSize: '18px'}}/> */}

      {info && info}
    </StyledNavItem>
  );
}
function SubNavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
      <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        color: '#FFFFFF',
        '&.active': {
          color: '#FFFFFF',
          backgroundColor: path != '#' && '#b4dac0',
          fontWeight: 'fontWeightBold',
          // borderBottomLeftRadius: '26px',
        },
      }}
    >
      {/* <StyledNavItemIcon sx={{color: '#FFFFFF', fontSize: '20px'}}>{icon && icon}</StyledNavItemIcon> */}
      <StyledNavItemIcon sx={{fontSize: '18px', ml: 5}}>
        {icon === 'LockIcon' && <LockIcon />}
        {icon === 'LockOpen' && <LockOpenIcon />}
        {icon === 'Savings' && <SavingsIcon />}
      </StyledNavItemIcon>

      <ListItemText disableTypography primary={title} sx={{fontSize: '15px'}}/>

      {info && info}
    </StyledNavItem>
  );
}
