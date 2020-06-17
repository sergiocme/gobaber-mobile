import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, TextButton } from './styles';

interface TextButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<TextButtonProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <TextButton>{children}</TextButton>
    </Container>
  );
};

export default Button;
