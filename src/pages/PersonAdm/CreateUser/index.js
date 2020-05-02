import React, {useRef, useState} from 'react';
import {CheckBox} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../../components/Background';
import {useDispatch, useSelector} from 'react-redux';
import {signUpRequest} from '../../../store/modules/auth/actions';

import {
  Container,
  Header,
  Form,
  FormInput,
  SubmitButton,
  Box,
  TBox,
} from './styles';

export default function CreateUser({navigation}) {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const phoneRef = useRef();
  const passRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const loading = useSelector((state) => state.auth.loading);

  async function handleSubmit() {
    const provider = checked;
    dispatch(signUpRequest(name, email, phone, password, provider));
    navigation.navigate('DashboardAdm');
    navigation.openDrawer();
  }

  return (
    <Background>
      <Container>
        <Header>Cadastrar novo usuario</Header>
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            placeholder="Nome do usuário"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />

          <FormInput
            icon="person-outline"
            autoCorrect={false}
            keyboardType="email-address"
            autoCapitalize="none"
            ref={emailRef}
            placeholder="e-mail do usuário"
            returnKeyType="next"
            onSubmitEditing={() => phoneRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="person-outline"
            autoCorrect={false}
            keyboardType="numeric"
            autoCapitalize="none"
            ref={phoneRef}
            placeholder="telefone/celular"
            returnKeyType="next"
            onSubmitEditing={() => passRef.current.focus()}
            value={phone}
            onChangeText={setPhone}
          />

          <FormInput
            icon="person-outline"
            autoCorrect={false}
            secureTextEntry
            ref={passRef}
            placeholder="senha para o usuário"
            value={password}
            onChangeText={setPassword}
          />

          <Box>
            <TBox>Prestador de serviço?</TBox>
            <CheckBox value={checked} onValueChange={setChecked} />
          </Box>

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Cadastrar
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

CreateUser.navigationOptions = ({navigation}) => ({
  /**title: 'Criar novo usuário',**/
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DashboardAdm');
        navigation.openDrawer();
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
