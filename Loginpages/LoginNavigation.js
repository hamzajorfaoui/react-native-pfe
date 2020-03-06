import React from 'react';
import { createStackNavigator   } from '@react-navigation/stack';
import Choose from './choose';

export const choosenavigator = createStackNavigator(
      {
        Choose :{
            screen: Choose,
            navigationOptions:{
                headerShown: false
            }

        }

      }
)