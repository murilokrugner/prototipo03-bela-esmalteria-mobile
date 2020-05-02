import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../../components/Background';
import {signOut} from '../../../store/modules/auth/actions';

import {
  Container,
  Avatar,
  Form,
  SubmitButton,
  LogoutButton,
  AboutButton,
  UsersButton,
} from './styles';

export default function Adm({navigation}) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(profile);

  useEffect(() => {
    setLoading(false);
  }, [profile]);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FFF"
          align="center"
          style={styles.load}
        />
      ) : (
        <Container>
          <Form>
            <Avatar
              source={{
                uri: avatar.avatar
                  ? avatar.avatar.url
                  : `https://api.adorable.io/avatars/50/${avatar.name}.png`,
              }}
            />

            <SubmitButton onPress={() => navigation.navigate('ProfileEditAdm')}>
              Atualizar Perfil
            </SubmitButton>

            <UsersButton onPress={() => navigation.navigate('Users')}>
              Todos os usuários
            </UsersButton>

            <UsersButton onPress={() => navigation.navigate('CreateUser')}>
              Cadastrar um novo usuário
            </UsersButton>

            <UsersButton onPress={() => navigation.navigate('CreateService')}>
              Cadastrar um novo serviço
            </UsersButton>

            <UsersButton
              onPress={() => navigation.navigate('SelectServiceEdit')}>
              Editar serviços cadastrados
            </UsersButton>

            <AboutButton onPress={() => navigation.navigate('AboutAdm')}>
              Sobre
            </AboutButton>

            <LogoutButton onPress={handleLogout}>Sair</LogoutButton>
          </Form>
        </Container>
      )}
    </Background>
  );
}

Adm.navigationOptions = ({navigation}) => ({
  title: 'Meu Perfil',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DashboardAdm');
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  load: {
    flex: 1,
    justifyContent: 'center',
  },
});
