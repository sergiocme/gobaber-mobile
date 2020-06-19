import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Router = createStackNavigator();

const AuthRouter: React.FC = () => {
  return (
    <Router.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Router.Screen name="SignIn" component={SignIn} />
      <Router.Screen name="SignUp" component={SignUp} />
    </Router.Navigator>
  );
};

export default AuthRouter;
