import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Background from '~/components/Background';
import Icon from 'react-native-vector-icons/MaterialIcons';

import more from '../../assets/more.png';
import like from '../../assets/like.png';
import comment from '../../assets/comment.png';
import send from '../../assets/send.png';

export default function Feed() {
  return (
    <Background>
      <View style={styles.container}>
        <FlatList>
          <View style={styles.feedItem}>
            <View style={styles.feedItemHeader}>
              <View style={styles.userInfo}>
                <Text styles={styles.name}>author</Text>
                <Text styles={styles.place}>place</Text>
              </View>

              <Image source={more} />

            </View>
            <Image style={styles.feedImage} source={more}/>

            <View style={styles.feedItemFooter}>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.action} onPress={() => {}}>
                  <Image source={like} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={() => {}}>
                  <Image source={comment} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={() => {}}>
                  <Image source={send} />
                </TouchableOpacity>
            </View>

            <Text style={styles.likes}>likes curtidas</Text>
            <Text style={styles.description}>description</Text>
            <Text style={styles.hashtags}>hashtags</Text>
          </View>
        </View>
      </FlatList>
    </View>
  </Background>
  );
}

Feed.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({tintColor}) => <Icon name="event" size={20} color={tintColor}/>
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },

  feedItem: {
      marginTop: 20,
  },

  feedItemHeader: {
      paddingHorizontal: 15,

      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },

  name: {
      fontSize: 14,
      color: '#000',
  },

  place: {
      fontSize: 12,
      color: '#666',
      marginTop: 2,
  },

  feedImage: {
      width: '100%',
      height: 400,
      marginVertical: 15,
  },

  feedItemFooter: {
      paddingHorizontal: 15,
  },

  actions: {
      flexDirection: 'row',
  },

  action: {
      marginRight: 8,
  },

  likes: {
      marginTop: 15,
      fontWeight: 'bold',
      color: '#000',
  },

  description: {
      lineHeight: 18,
      color: '#000',
  },

  hashtags: {
      color: '#7159c1',
  },
})
