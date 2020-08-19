import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Title,
  Description,
  OkayButton,
  OkayButtonText,
} from './styles';

const CreatedAppointment: React.FC = () => {
  return (
    <Container>
      <Icon name="check" size={128} color="#04d361" />

      <Title>Success</Title>
      <Description>
        You now have a meet with your Barber at Setemper, 14 on 09:00
      </Description>

      <OkayButton onPress={() => {}}>
        <OkayButtonText>Okay</OkayButtonText>
      </OkayButton>
    </Container>
  );
};

export default CreatedAppointment;
