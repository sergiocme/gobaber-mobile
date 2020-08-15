import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import CreateAppointment from '../pages/CreateAppointment';
import CreatedAppointment from '../pages/CreatedAppointment';
import Profile from '../pages/Profile';

const Router = createStackNavigator();

const AppRouter: React.FC = () => {
  return (
    <Router.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Router.Screen name="Dashboard" component={Dashboard} />
      <Router.Screen name="CreateAppointment" component={CreateAppointment} />
      <Router.Screen name="CreatedAppointment" component={CreatedAppointment} />

      <Router.Screen name="Profile" component={Profile} />
    </Router.Navigator>
  );
};

export default AppRouter;
