import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import AppRouter from './app.routes';
import AuthRouter from './auth.routes';

import { useAuth } from '../contexts/auth';

const RouterContainer: React.FC = () => {
  const { data: authData, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }
  return authData.user ? <AppRouter /> : <AuthRouter />;
};

export default RouterContainer;
