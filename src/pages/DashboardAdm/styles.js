import styled from 'styled-components/native';

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

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})``;

export const BoxList = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;
