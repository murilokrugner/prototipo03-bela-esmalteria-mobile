import styled from 'styled-components/native';
import ButtonDrawer from '../ButtonDrawer';

export const DrawerContent = styled.View `
  flex: 1;
  flex-direction: column;
  height: 600px;
  width: 220px;
  justify-content: space-between;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 25px;
  align-self: center;
  margin: 35px;
`;

export const UsersButton = styled(ButtonDrawer)`

`;

export const SubmitButton = styled(ButtonDrawer)`

`;

export const AboutButton = styled(ButtonDrawer)`

`;

export const LogoutButton = styled(ButtonDrawer)`
  margin-top: 10px;
  background: #FF142F;
`;
