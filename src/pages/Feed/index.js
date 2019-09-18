import React from 'react';
import { Text } from 'react-native';
import Background from '~/components/Background';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container } from './styles';

export default function Feed() {
  return (
    <Background>
      <Container>
        <Text>Feed</Text>
      </Container>
    </Background>
  );
}

Feed.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({tintColor}) => <Icon name="event" size={20} color={tintColor}/>
}
