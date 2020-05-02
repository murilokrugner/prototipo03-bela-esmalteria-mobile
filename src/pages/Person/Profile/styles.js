import styled from 'styled-components/native';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 25px;
  align-self: center;
  margin: 35px;
`;

export const Form = styled.ScrollView.attrs({
  showVerticalIndicator: false,
  contentContainerStyle: {padding: 30},,
})`
  align-self: stretch;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const AboutButton = styled(Button)`
  margin-top: 5px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 10px;
  background: #f64c75;
`;
