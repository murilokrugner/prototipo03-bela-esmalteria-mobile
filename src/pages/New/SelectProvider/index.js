import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../services/api';

import Background from '../../../components/Background';

import {Container, ProvidersList, Provider, Avatar, Name} from './styles';

export default function SelectProvider({navigation}) {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');

      setProviders(response.data);
      setLoading(false);
    }

    loadProviders();
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
          <ProvidersList
            data={providers}
            keyExtractor={(provider) => String(provider.id)}
            renderItem={({item: provider}) => (
              <Provider
                onPress={() =>
                  navigation.navigate('SelectService', {provider})
                }>
                <Avatar
                  source={{
                    uri: provider.avatar
                      ? provider.avatar.url
                      : `https://api.adorable.io/avatars/50/${provider.name}.png`,
                  }}
                />
                <Name>{provider.name}</Name>
              </Provider>
            )}
          />
        </Container>
      )}
    </Background>
  );
}

SelectProvider.navigationOptions = ({navigation}) => ({
  title: 'Selecione a professional',
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
