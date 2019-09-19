import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function App({ navigation }) {
  const signed = useSelector(state => state.auth.signed);
  const provider = useSelector(state => state.user.provider)

  const Routes = createRouter(signed, provider);

  return (
    <Routes />
  );
}
