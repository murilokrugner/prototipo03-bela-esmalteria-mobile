import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logoks from '../../../assets/logoks.png';

import Background from '../../../components/Background';

import {Container, Avatar, Title} from './styles';

export default function About({navigation}) {
  return (
    <Background>
      <Container>
        <Avatar source={logoks} />
        <Title>Knowledge Soft</Title>
        <Title>CEO - Murilo Krugner</Title>
      </Container>
    </Background>
  );
}

About.navigationOptions = ({navigation}) => ({
  title: 'Sobre',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
        navigation.openDrawer();
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
