import styled from 'styled-components/native';
import ButtonDrawer from '../ButtonDrawer';
import { Dimensions } from 'react-native';

export const DrawerContent = styled.View `
  flex: 1;
  flex-direction: column;
  Dimensions.get('window').height;
  width: 220px;
  justify-content: space-between;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 25px;
  align-self: center;
  margin-top: 35px;
`;

export const Name = styled.Text`
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const UsersButton = styled(ButtonDrawer)`
  height: 40px;
  width: 250px;
`;

export const SubmitButton = styled(ButtonDrawer)`
  height: 40px;
  width: 250px;
`;

export const AboutButton = styled(ButtonDrawer)`
  height: 40px;
  width: 250px;
`;

export const LogoutButton = styled(ButtonDrawer)`
  margin-top: 10px;
  width: 250px;
  background: #FF142F;
`;
