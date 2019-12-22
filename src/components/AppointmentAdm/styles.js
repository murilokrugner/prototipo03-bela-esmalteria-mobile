import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 20px;
  padding: 15px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Left = styled.View`
  flex: 1;
`;

export const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 50px;
`;

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-left: 15px;
  color: ${props => (props.available ? '#999' : '#7159c1')};
`;

export const Name = styled.Text`
  font-weight: bold;
  margin-top: 10px;
  font-size: 17px;
  color: #f08080;
`;

export const Time = styled.Text`
  color: #ffa07a;
  font-size: 13px;
  margin-top: 4px;
`;

export const Content = styled.View`
  flex: 1;
  margin-left: 20px;
`;
