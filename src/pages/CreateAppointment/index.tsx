import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';

import { Alert } from 'react-native';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

import emptyAvatarImg from '../../assets/empty_profile.png';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface Availability {
  hour: number;
  availability: boolean;
}

const CreateAppointment: React.FC = () => {
  const {
    data: { user },
  } = useAuth();
  const { goBack, navigate } = useNavigation();
  const route = useRoute();
  const { providerId } = route.params as RouteParams;
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [selectedHour, setSelectedHour] = useState(0);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((id: string) => {
    setSelectedProvider(id);
  }, []);

  const handleOpenDatePicker = useCallback(() => {
    setShowDatePicker(true);
  }, []);

  const handleDateChanged = useCallback(
    (event: unknown, date: Date | undefined) => {
      setShowDatePicker(false);
      date ? setSelectedDate(date) : null;
    },
    [],
  );

  const handleSelectedHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      selectedDate.setHours(selectedHour);
      selectedDate.setMinutes(0);

      await api.post('/appointments', {
        provider_id: selectedProvider,
        date,
      });

      navigate('CreatedAppointment', { date: date.getTime() });
    } catch (error) {
      Alert.alert(
        'Appointment Error',
        'Unable to create appointment, try again later.',
      );
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider]);

  useEffect(() => {
    async function loadProviders(): Promise<void> {
      const { data } = await api.get('/providers');

      setProviders(data);
    }

    loadProviders();
  }, []);

  useEffect(() => {
    async function loadDayAvailability(): Promise<void> {
      const { data } = await api.get(
        `/providers/${selectedProvider}/day-availability`,
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        },
      );

      setAvailability(data);
    }

    loadDayAvailability();
  }, [selectedDate, selectedProvider]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, availability: available }) => ({
        hour,
        formattedHour: format(new Date().setHours(hour), 'HH:00'),
        availability: available,
      }));
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, availability: available }) => ({
        hour,
        formattedHour: format(new Date().setHours(hour), 'HH:00'),
        availability: available,
      }));
  }, [availability]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Barbers</HeaderTitle>

        {
          user.avatar_url ? (
            <UserAvatar source={{ uri: user.avatar_url }} />
          ) : (
            <UserAvatar source={emptyAvatarImg} />
          )
        }
      </Header>

      <Content alwaysBounceVertical>
        <ProvidersListContainer>
          <ProvidersList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={providers}
            keyExtractor={provider => provider.id}
            renderItem={({ item }) => (
              <ProviderContainer
                onPress={() => handleSelectProvider(item.id)}
                selected={item.id === selectedProvider}
              >
                {
                  item.avatar_url ? (
                    <ProviderAvatar source={{ uri: item.avatar_url }} />
                  ) : (
                    <ProviderAvatar source={emptyAvatarImg} />
                  )
                }
                <ProviderName selected={item.id === selectedProvider}>
                  {item.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <Calendar>
          <Title>Pick a Day</Title>

          <OpenDatePickerButton onPress={handleOpenDatePicker}>
            <OpenDatePickerButtonText>Change date</OpenDatePickerButtonText>
          </OpenDatePickerButton>

          {showDatePicker && (
            <DateTimePicker
              mode="date"
              display="calendar"
              onChange={handleDateChanged}
              value={selectedDate}
            />
          )}
        </Calendar>

        <Schedule>
          <Title>Choose an hour</Title>

          <Section>
            <SectionTitle>Morning</SectionTitle>

            <SectionContent horizontal>
              {morningAvailability.map(
                ({ formattedHour, availability: available, hour }) => (
                  <Hour
                    key={formattedHour}
                    enabled={available}
                    available={available}
                    selected={selectedHour === hour && available}
                    onPress={() => handleSelectedHour(hour)}
                  >
                    <HourText selected={selectedHour === hour && available}>
                      {formattedHour}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Afternoon</SectionTitle>

            <SectionContent horizontal>
              {afternoonAvailability.map(
                ({ formattedHour, availability: available, hour }) => (
                  <Hour
                    key={formattedHour}
                    enabled={available}
                    available={available}
                    selected={selectedHour === hour && available}
                    onPress={() => handleSelectedHour(hour)}
                  >
                    <HourText selected={selectedHour === hour && available}>
                      {formattedHour}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Schedule</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
