import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import {signOut} from '../../store/modules/auth/actions';

import logo from '../../assets/logo.jpg';

import {DrawerItems} from 'react-navigation-drawer';

import {SafeAreaView, ScrollView} from 'react-navigation';

import {
  DrawerContent,
  Avatar,
  Name,
  UsersButton,
  SubmitButton,
  AboutButton,
  LogoutButton,
} from './styles';

export default function DrawerCustom({navigation}) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const [loading, setLoading] = useState(true);
  //const [avatar, setAvatar] = useState(profile.avatar.url);

  useEffect(() => {
    setLoading(false);
  }, [profile]);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 800,
      }}>
      <ScrollView>
        <DrawerContent>
          <Avatar
            source={{
              uri: profile.avatar
                ? profile.avatar.url
                : `https://api.adorable.io/avatars/50/${profile.name}.png`,
            }}
          />

          <Name>Olá {profile.name}</Name>

          <SubmitButton onPress={() => navigation.navigate('ProfileEdit')}>
            Atualizar Perfil
          </SubmitButton>

          <AboutButton onPress={() => navigation.navigate('About')}>
            Sobre
          </AboutButton>
          <LogoutButton onPress={handleLogout}>Sair</LogoutButton>
        </DrawerContent>
      </ScrollView>
    </SafeAreaView>
  );
}

/**<DrawerItems {...props} />**/
