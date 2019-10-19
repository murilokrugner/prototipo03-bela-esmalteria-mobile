import React from 'react';
//import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Background from '~/components/Background';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Title, Post, ListPost } from './styles';

import logo from '../../assets/logo.jpg';
//import more from '../../assets/more.png';
//import like from '../../assets/like.png';
//import comment from '../../assets/comment.png';
//import send from '../../assets/send.png';

export default function Feed() {
  return (
    <Background>
      <Title>Feed</Title>
        <Container>
          <Post>
            <ListPost source={logo} />
          </Post>
        </Container>
  </Background>
  );
}

Feed.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({tintColor}) => <Icon name="event" size={20} color={tintColor}/>
}

