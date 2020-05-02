import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Background from '../../../components/Background';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {withNavigationFocus} from 'react-navigation';
import api from '../../../services/api';

import {Container, UsersList, User, Name, Alter, Avatar} from './styles';

function Users({isFocused, navigation}) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isFocused) {
      async function loadUsers() {
        const response = await api.get('listusers');

        setUsers(response.data);
      }

      loadUsers();
    }

    setLoading(false);
  }, [isFocused]);

  return (
    <Background>
      <Container>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <UsersList
            data={users}
            keyExtractor={(user) => user.id}
            renderItem={({item: user}) => (
              <User>
                <Avatar
                  source={{
                    uri: user.avatar
                      ? user.avatar.url
                      : `https://api.adorable.io/avatars/50/${user.name}.png`,
                  }}
                />
                <Name>Nome: {user.name}</Name>
                <Name>E-mail: {user.email}</Name>
                <Name>Telefone: {user.phone}</Name>
                <Alter
                  onPress={() => {
                    navigation.navigate('EditUser', {user});
                  }}>
                  Alterar
                </Alter>
              </User>
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Users.navigationOptions = ({navigation}) => ({
  title: 'Usuários cadastrados',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DashboardAdm');
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

export default withNavigationFocus(Users);
