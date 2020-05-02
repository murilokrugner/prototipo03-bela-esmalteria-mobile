import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, Image} from 'react-native';
import Background from '../../components/Background';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, Title, Post, ListPost} from './styles';

import logo from '../../assets/logo.jpg';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(logo);
  });

  return (
    <Background>
      <Title>Feed</Title>
      <Container>
        <ListPost>
          <Post>
            <Image source={logo} style={styles.image} />
          </Post>
          <Post>
            <Image source={logo} style={styles.image} />
          </Post>
          <Post>
            <Image source={logo} style={styles.image} />
          </Post>
          <Post>
            <Image source={logo} style={styles.image} />
          </Post>
        </ListPost>
      </Container>
    </Background>
  );
}

Feed.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({tintColor}) => (
    <Icon name="event" size={20} color={tintColor} />,
  ),
};;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 400,
  },
});

/*<Image source={logo} style={styles.image}/>*/
