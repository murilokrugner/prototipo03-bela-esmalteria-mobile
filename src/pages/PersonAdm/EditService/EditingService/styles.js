import styled from 'styled-components/native';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Header = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #FFF;
`;

export const HeaderName = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #FFF;
  margin: 0 0 10px 0;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 100px;
  width: 200px;
`;
