import React from 'react';

import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {

    if(isSignedIn) {

      return(

    <nav>
       <p onClick={() => onRouteChange('signout')}>Log Out</p>
    </nav>

  );

  } else {

  return (

    <nav>
       <p onClick={() => onRouteChange('signin')}>Log In</p>
       <p onClick={() => onRouteChange('register')}>Register</p>
    </nav>

  );

  }

}

export default Navigation;
