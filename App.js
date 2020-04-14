import React from 'react';

import Approute from './Loginpages/LoginNavigation';
import navigationService from './Services/navigationService';



export default function App() {
  return (

    <Approute  ref={navigatorRef => {
      navigationService.setTopLevelNavigator(navigatorRef);
    }}/>
  );
}
 
