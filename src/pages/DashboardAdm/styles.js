import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  display: flex;
`;

export const Info = styled.Text`
  font-size: 20px;
  color: #000;
  font-weight: bold;
  align-self: center;

  max-width: 600px;
  margin: 10px auto;
  padding: 20px;
  border-radius: 4px;
  background: #fff;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 }
})``;
