import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function App() {
  const signed = useSelector(state => state.auth.signed);
  const provider = useSelector(state => state.auth.provider);

  const Routes = createRouter(provider, signed);

  return (
    <Routes />
  );
}
