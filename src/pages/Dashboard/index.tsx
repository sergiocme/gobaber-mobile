import React from 'react';
// import {  } from 'react-native';

import { useAuth } from '../../contexts/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
} from './styles';

const Dashboard: React.FC = () => {
  const {
    data: { user },
  } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Welcome, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={() => {}}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>
    </Container>
  );
};

export default Dashboard;
