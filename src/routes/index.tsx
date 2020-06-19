import React from 'react';
import AppRouter from './app.routes';
import AuthRouter from './auth.routes';

import { useAuth } from '../contexts/auth';

const RouterContainer: React.FC = () => {
  const { data: authData } = useAuth();

  return authData.user ? <AppRouter /> : <AuthRouter />;
};

export default RouterContainer;
