import React from 'react'
import {useLocation,Navigate} from 'react-router-dom';
import {useSelector } from 'react-redux';

 
 const PageRedirect = ({ children }) => {
    const {user} = useSelector(state=>state.user);
    const location = useLocation();

    
    if (user) {
      //TODO redirect to dashboard/profile when its done
        return   <Navigate to={location.state.from} replace />;
    }
    
    return children;
  }

  export default PageRedirect;