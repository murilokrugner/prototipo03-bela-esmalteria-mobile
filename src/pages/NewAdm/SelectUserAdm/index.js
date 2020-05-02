import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../services/api';

import Background from '../../../components/Background';

import { Container, UsersList, User, Avatar, Name } from './styles';

export default function SelectUserAdm({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('listusers');

      setUsers(response.data);
      setLoading(false);
    }

    loadUsers();
  }, []);

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
            <UsersList
              data={users}
              keyExtractor={(user) => String(user.id)}
              renderItem={({ item: user }) => (
                <User
                  onPress={() => navigation.navigate('SelectServiceAdm', { user })}>
                  {user.avatar === '' ? (
                    <ActivityIndicator
                      size="small"
                      color="#000"
                      align="center"
                      style={styles.loadAvatar}
                    />
                  ) : (
                      <Avatar
                        source={{
                          uri: user.avatar
                            ? user.avatar.url
                            : `https://api.adorable.io/avatars/50/${user.name}.png`,
                        }}
                      />
                    )}

                  <Name>{user.name}</Name>
                </User>
              )}
            />
          </Container>
        )}
    </Background>
  );
}

SelectUserAdm.navigationOptions = ({ navigation }) => ({
  title: 'Selecione um(a) cliente',
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
  loadAvatar: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});
