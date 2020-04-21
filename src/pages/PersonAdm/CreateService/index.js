import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Alert } from 'react-native';
import Background from '../../../components/Background';

import { Container, Form, FormInput, SubmitButton, Header } from './styles';

import api from '../../../services/api';

export default function CreateService({ navigation }) {
  const [loading, setLoading] = useState(false);
  const priceRef = useRef();
  const durationRef = useRef();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');

  async function handleSubmit() {
    setLoading(true);
    const response = await api.post('services', {
      name,
      price,
      duration,
    })

    if (response) {
      Alert.alert('Serviço cadastrado!');
      setLoading(false);
      navigation.navigate('DashboardAdm');
      navigation.openDrawer();
    }

  }

  return (
    <Background>
      <Container>
        <Header>Novo serviço</Header>

        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            placeholder="Digite o nome do serviço"
            returnKeyType="next"
            onSubmitEditing={() => priceRef.current.focus()}
            value={name}
            onChangeText={setName}
          />

          <FormInput
            icon="person-outline"
            keyboardType="phone-pad"
            autoCorrect={false}
            placeholder="Digite o valor do serviço"
            ref={priceRef}
            onSubmitEditing={() => durationRef.current.focus()}
            value={price}
            onChangeText={setPrice}
            returnKeyType="next"
          />

          <FormInput
            icon="person-outline"
            keyboardType="phone-pad"
            autoCorrect={false}
            placeholder="Digite o tempo de duração em minutos"
            ref={durationRef}
            returnkeyType="send"
            value={duration}
            onChangeText={setDuration}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>Cadastrar</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

CreateService.navigationOptions = ({ navigation }) => ({
  //title: 'Criar novo serviço',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DashboardAdm');
        navigation.openDrawer();
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
