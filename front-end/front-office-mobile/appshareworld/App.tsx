// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/routes/navigator';

import {createStore, applyMiddleware, Store} from 'redux';
import thunk from 'redux-thunk'; 
import reducer from './src/store/reducers';

// import { useNavigation } from "@react-navigation/core";
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux";
import { composeWithDevTools } from 'redux-devtools-extension';


export const store: Store<UserState, UserAction> & {
   dispatch: DispatchType
} = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));



const App: React.FC = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      {/*  <StatusBar /> */}
     
 
     
      <Navigator />
    
    </NavigationContainer>
    </Provider>
  )
}

export default App;
