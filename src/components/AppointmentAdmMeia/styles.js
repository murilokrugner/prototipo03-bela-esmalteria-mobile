import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 20px;
  padding: 15px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 170px;
  height: 230px;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Left = styled.View`
  flex: 1;
  margin-top: 30px;
  width: 160px;

`;

export const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 50px;
`;

export const Info = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 160px;
  color: ${props => (props.available ? '#999' : '#7159c1')};
`;

export const Name = styled.Text`
  justify-content: center;
  font-weight: bold;
  margin-top: 10px;
  font-size: 17px;
  color: #f08080;
  width: 150px;
`;

export const Time = styled.Text`
  justify-content: center;
  color: #ffa07a;
  font-size: 15px;
  margin-top: 4px;
  width: 140px;
  margin-left: 10px;
`;

export const Content = styled.View`
  justify-content: center;
  width: 140px;
`;
