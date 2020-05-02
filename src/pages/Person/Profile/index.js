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
} from './styles';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(profile.avatar.url);

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
                uri: profile.avatar
                  ? profile.avatar.url
                  : `https://api.adorable.io/avatars/50/${profile.name}.png`,
              }}
            />

            <SubmitButton onPress={() => navigation.navigate('ProfileEdit')}>
              Atualizar Perfil
            </SubmitButton>

            <AboutButton onPress={() => navigation.navigate('About')}>
              Sobre
            </AboutButton>

            <LogoutButton onPress={handleLogout}>Sair</LogoutButton>
          </Form>
        </Container>
      )}
    </Background>
  );
}

Profile.navigationOptions = ({navigation}) => ({
  title: 'Meu Perfil',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
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
