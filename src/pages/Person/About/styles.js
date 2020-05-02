import styled from 'styled-components/native';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

export const Container = styled.SafeAreaView`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
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
