import styled from 'styled-components/native';
import Button from '../../../components/Button';

export const Container = styled.View`
  flex: 1;
`;

export const UsersList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
})`
  margin-top: 60px;
  padding: 0 20px;
`;

export const User = styled.View`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  align-items: center;
  margin: 0 10px 20px;
  padding: 20px;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Name = styled.Text`
  margin-top: 15px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  align-items: center;
`;

export const Alter = styled(Button)`
  margin-top: 20px;
  width: 70px;
  height: 30px;
`;
