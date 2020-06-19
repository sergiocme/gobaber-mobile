import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';

const Router = createStackNavigator();

const AppRouter: React.FC = () => {
  return (
    <Router.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Router.Screen name="Dashboard" component={Dashboard} />
    </Router.Navigator>
  );
};

export default AppRouter;
