import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Provider } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: #28262e;
`;

export const HeaderTitle = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 20px;
  line-height: 28px;
  color: #f4ede8;
`;

export const UserName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #ff9000;
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)``;
