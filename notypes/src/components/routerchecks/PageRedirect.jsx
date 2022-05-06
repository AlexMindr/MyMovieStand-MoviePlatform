import React from 'react'
import {useLocation,Navigate} from 'react-router-dom';
import {useSelector } from 'react-redux';

 
 const PageRedirect = ({ children }) => {
    const {user} = useSelector(state=>state.user);
    //let location = useLocation();
    console.log('here',user)
    if (user) {
      //TODO redirect to dashboard/profile when its done
        return   <Navigate to='/' replace />;
    }
    
    return children;
  }

  export default PageRedirect;