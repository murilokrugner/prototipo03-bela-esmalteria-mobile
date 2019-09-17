import React, { useState } from 'react';
import { Image } from 'react-native';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';

import { Container, Form, FormInput, SubmitButton, SignLink, SignLinkText } from './styles';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');

  function handleSubmit() {

  }

  return (
    <Background>
      <Container>
        <Image source={logo} style={{width: 200, height: 200}}/>

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

        <SignLink onPress={() => {navigation.navigate('SignIn')}}>
          <SignLinkText>Lembrei minha senha</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
