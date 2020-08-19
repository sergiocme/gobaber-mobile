import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  margin-top: 48px;
  text-align: center;
  font-family: 'RobotoSlab-Medium';
  font-size: 32px;
  color: #f4ede8;
`;

export const Description = styled.Text`
  margin-top: 16px;
  padding: 0 24px;
  text-align: center;
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: #999591;
`;

export const OkayButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  padding: 12px 24px;
  border-radius: 10px;
  background: #ff9900;
`;

export const OkayButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #321e38;
`;
