import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Title,
  Description,
  OkayButton,
  OkayButtonText,
} from './styles';

const CreatedAppointment: React.FC = () => {
  const { reset } = useNavigation();

  const handleOkayButton = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  return (
    <Container>
      <Icon name="check" size={128} color="#04d361" />

      <Title>Success</Title>
      <Description>
        You now have a meet with your Barber at Setemper, 14 on 09:00
      </Description>

      <OkayButton onPress={handleOkayButton}>
        <OkayButtonText>Okay</OkayButtonText>
      </OkayButton>
    </Container>
  );
};

export default CreatedAppointment;
