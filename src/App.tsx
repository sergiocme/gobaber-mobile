import React from 'react';
import { View, StatusBar } from 'react-native';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#321e38" />
      <View style={{ backgroundColor: '#321e38', flex: 1 }} />
    </>
  );
};

export default App;
