import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Background from '~/components/Background';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { Container, UsersList, User, Name, Avatar } from './styles';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('listusers');

      setUsers(response.data);
    }

    loadUsers();
  }, [])

  return (
    <Background>
      <Container>
      <UsersList
          data={users}
          keyExtractor={user => user.id}
          renderItem={({ item: user }) => (
            <User>
              <Avatar
                source={{
                  uri: user.avatar
                    ? user.avatar.url
                    : `https://api.adorable.io/avatars/50/${user.name}.png`,
                }}
                />
              <Name>{user.name}</Name>
            </User>
          )}
        />
      </Container>
    </Background>
  );
}

Users.navigationOptions = ({ navigation }) => ({
  title: 'Usuários cadastrados',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DashboardAdm');
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
