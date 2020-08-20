import React, { useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  BackButton,
  Title,
  UserAvatarButton,
  UserAvatar,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const {
    data: { user },
    updateUser,
  } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async ({
      name,
      email,
      oldPassword,
      newPassword,
      passwordConfirmation,
    }: SignUpFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .required('Email is required')
            .email('Email must be valid'),
          oldPassword: Yup.string(),
          newPassword: Yup.string().when('oldPassword', {
            is: val => !!val.length,
            then: Yup.string().required('Required field'),
            otherwise: Yup.string(),
          }),
          passwordConfirmation: Yup.string()
            .when('oldPassword', {
              is: val => !!val.length,
              then: Yup.string().required('Required field'),
              otherwise: Yup.string(),
            })
            .equals([Yup.ref('oldPassword'), null], 'Password must match'),
        });

        await schema.validate(
          { name, email, newPassword, oldPassword, passwordConfirmation },
          { abortEarly: false },
        );

        const { data } = await api.put('/profiles', {
          name,
          email,
          password: newPassword,
          old_password: oldPassword,
        });

        await updateUser(data);
        navigation.goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        } else {
          Alert.alert(
            'Update Error',
            'Unable to update profile, try again later',
          );
        }
      }
    },
    [navigation, updateUser],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleImagePicker = useCallback(() => {
    ImagePicker.showImagePicker({ title: 'Select Avatar' }, (response) => {
      if (response.didCancel) {
        return;
      }

      if (response.error) {
        Alert.alert(
          'Something did wrong',
          'Unable to update, make sure you granted permission',
        );
        return;
      }
      const data = new FormData();

      data.append('avatar', {
        type: 'image/jpeg',
        name: `${user.id}.jpg`,
        uri: response.uri,
      });

      api.patch('/users/avatar', data).then(({ data }) => {
        updateUser(data);
      });
    });
  }, [updateUser, user]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>

            <UserAvatarButton onPress={handleImagePicker}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <View>
              <Title>My Profile</Title>
            </View>

            <Form
              ref={formRef}
              initialData={user}
              onSubmit={handleSignUp}
              style={{ width: '100%' }}
            >
              <Input
                name="name"
                icon="user"
                placeholder="Name"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="Email"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
              />
              <Input
                ref={oldPasswordInputRef}
                name="oldPassword"
                icon="lock"
                placeholder="Old Password"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                containerStyle={{ marginTop: 16 }}
                onSubmitEditing={() => {
                  newPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={newPasswordInputRef}
                name="newPassword"
                icon="lock"
                placeholder="New Password"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordConfirmationInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordConfirmationInputRef}
                name="passwordConfirmation"
                icon="lock"
                placeholder="Password Confirmation"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Save Changes
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
