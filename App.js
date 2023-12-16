import React, { useState, useEffect } from 'react';
import { ModalPortal } from 'react-native-modals';
import { UserContext } from './UserContext';
import StackNavigator from './navigation/StackNavigator';
import SplashScreenComponent from './screens/SplashScreen'; // Import từ file SplashScreen.js
import store from "./store";
import { Provider } from "react-redux";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleSkip = () => {
    setIsLoading(false); // Kết thúc màn hình SplashScreen khi người dùng bấm "Skip"
  };


  return (
    <Provider store={store}>
      <UserContext>
        {isLoading ? (
          <SplashScreenComponent onSkip={handleSkip} />
        ) : (
          <StackNavigator />
        )}
        <ModalPortal />
      </UserContext>
    </Provider>
  );
};

export default App;
