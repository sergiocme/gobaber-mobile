import React, { useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Title,
  Description,
  OkayButton,
  OkayButtonText,
} from './styles';

interface RouteParams {
  date: number;
}

const CreatedAppointment: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const handleOkayButton = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  const formattedDate = useMemo(() => {
    return format(routeParams.date, "EEEE', day' dd', 'MMMM', 'HH:mm'h'");
  }, [routeParams.date]);

  return (
    <Container>
      <Icon name="check" size={128} color="#04d361" />

      <Title>Success</Title>
      <Description>
        You now have a meet with your Barber at {formattedDate}.
      </Description>

      <OkayButton onPress={handleOkayButton}>
        <OkayButtonText>Okay</OkayButtonText>
      </OkayButton>
    </Container>
  );
};

export default CreatedAppointment;
