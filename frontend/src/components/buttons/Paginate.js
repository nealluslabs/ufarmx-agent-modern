import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
//import {Pagination} from 'react-bootstrap'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchFarmersFromPage, sectionFarmersFromPage } from 'src/redux/actions/group.action';



const Paginate = ({pages=10,page=1, isAdmin=false, keyword='',allFarmers=[],filteredFarmers=[]}) => {

   // const { page } = useParams();
   const dispatch = useDispatch()
    const navigate = useNavigate();
    const currentPage = parseInt(page, 10) || 1; // Default to page 1 if no page param
  
    const handlePageChange = (event, value) => {
        dispatch(sectionFarmersFromPage(page,allFarmers,filteredFarmers))
        //PAGE NUMBERS KEEP RESETTING WHEN I CLICK THEM
      setTimeout(()=>{
      navigate(`/dashboard/products/${value}`);
        }
      )
    };



        return pages > 1 && (
           <Pagination
        count={pages} // Total number of pages (you might need to calculate this based on your data)
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
      />

        )
}

export default Paginate
