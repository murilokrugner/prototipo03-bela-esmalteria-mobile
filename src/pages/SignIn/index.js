import React, { useRef, useState } from 'react';
import {presetColors} from 'react-native-animated-linear-gradient';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../assets/logo.jpg';
import Background from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Form, FormInput, SubmitButton, SignLink, SignLinkText } from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background customColors={presetColors.instagram} speed={4000}>
      <Container>
        <Image source={logo} style={{width: 200, height: 200 }}/>

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>Acessar</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

/*<SignLink onPress={() => {navigation.navigate('Password')}}>
          <SignLinkText>Esqueci minha senha</SignLinkText>
        </SignLink>

        <SignLink onPress={() => {navigation.navigate('SignUp')}}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>*/
