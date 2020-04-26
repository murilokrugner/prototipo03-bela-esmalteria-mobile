import React, { useRef, useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Alert, ActivityIndicator, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../../components/Background';

import { Container, Image, Avatar, Separator, Form, FormInput, SubmitButton } from './styles';
import api from '../../../services/api';

export default function EditUser({ navigation }) {
  const user = navigation.getParam('user');

  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();

  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [imageProfile, setImageProfile] = useState('');
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setPassword('');
    setImageProfile(user);
    setLoading(false);
  }, [user]);

  async function handleSubmit() {
    setLoading(true);
    await api.put('usersUpdate', {
      id: user.id,
      name: name,
      email: email,
      phone: phone,
      password: password,
    });

    Alert.alert('Dados do usuário atualizados');
    setLoading(false);
    navigation.navigate('DashboardAdm');
    navigation.openDrawer();

  }

  return (
    <Background>
      {loading ? (
        <ActivityIndicator size="large" color="#FFF" align="center"
          style={styles.load} />
      ) : (
          <Container>
            <Form>

              {imageProfile === '' ? (
                <ActivityIndicator size="small" color="#fff" align="center"
                  style={styles.loadAvatar} />
              ) : (
                  <Avatar
                    source={{
                      uri: imageProfile.avatar
                        ? imageProfile.avatar.url
                        : `https://api.adorable.io/avatars/50/${user.name}.png`,
                    }}
                  />
                )}
              <FormInput
                icon="person-outline"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Nome do usuário"
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current.focus()}
                value={name}
                onChangeText={setName}
              />

              <FormInput
                icon="mail-outline"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="E-mail"
                ref={emailRef}
                returnKeyType="next"
                onSubmitEditing={() => phoneRef.current.focus()}
                value={email}
                onChangeText={setEmail}

              />

              <FormInput
                icon="mail-outline"
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Telefone/Celular"
                ref={phoneRef}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()}
                value={phone}
                onChangeText={setPhone}
              />

              <Separator />

              <FormInput
                icon="lock-outline"
                secureTextEntry
                placeholder="nova senha"
                ref={passwordRef}
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
                value={password}
                onChangeText={setPassword}

              />

              <SubmitButton loading={loading} onPress={handleSubmit}>Atualizar Perfil</SubmitButton>

            </Form>
          </Container>
        )}

    </Background>
  );
}

EditUser.navigationOptions = ({ navigation }) => ({
  title: 'Editar usuário',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Users');
        navigation.openDrawer();
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  load: {
    flex: 1,
    justifyContent: 'center'
  },

  loadAvatar: {
    flex: 1,
    padding: 100,
    flexDirection: "column",
    justifyContent: "flex-start",
  }
})

