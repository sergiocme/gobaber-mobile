import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Provider } from './index';

export const Container = styled.View``;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: #28262e;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  margin-left: 16px;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #f5ede8;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  margin-left: auto;
  border-radius: 28px;
`;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`;

export const ProviderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
  padding: 8px 12px;
  border-radius: 10px;
  background: #3e3b47;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ProviderName = styled.Text`
  margin-left: 8px;
  font-family: 'RobotSlab-Medium';
  font-size: 16px;
  color: #f4ede8;
`;
