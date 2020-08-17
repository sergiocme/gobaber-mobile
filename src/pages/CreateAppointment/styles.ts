import styled from 'styled-components/native';

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
