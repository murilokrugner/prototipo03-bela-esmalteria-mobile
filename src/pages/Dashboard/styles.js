import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
export const Menu = styled.View`
  align-items: flex-end;
  margin-right: 2px;
  margin-top: 10px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #FFF;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const BoxNotAppoint = styled.View`
  flex: 1;
  Dimensions.get('window').height;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 }
})``;

export const BoxImage = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  height: 350px;
`;

export const Message = styled.Text`
  color: #000;
  font-size: 12px;
  font-weight: bold;
`;
