import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ProvidersList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
})`
  margin-top: 60px;
  padding: 0 20px;
`;
export const Provider = styled(RectButton)`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin: 0 5px 20px;
  padding: 20px;
  width: 150px;
`;


export const Name = styled.Text`
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
  color: #f08080;
  align-items: center;
`;

export const Service = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;

`;
