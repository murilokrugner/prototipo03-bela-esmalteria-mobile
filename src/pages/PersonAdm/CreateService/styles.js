import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0 30px;
`;

export const Header = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #FFF;
`;

export const Form = styled.View`
  align-self: stretch;
  margin: 0 0 150px 0;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
