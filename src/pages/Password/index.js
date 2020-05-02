import React, {useState} from 'react';
import {Image} from 'react-native';
import {useDispatch} from 'react-redux';

import logo from '../../assets/logo.jpg';

import Background from '../../components/Background';

import {recoverPasswordRequest} from '../../store/modules/password/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignIn({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  function handleSubmit() {
    dispatch(recoverPasswordRequest(email));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} style={{width: 200, height: 200}} />

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={email}
            onChangeText={setEmail}
          />

          <SubmitButton onPress={handleSubmit}>Enviar</SubmitButton>
        </Form>

        <SignLink
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <SignLinkText>Lembrei minha senha</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
