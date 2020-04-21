import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import OneSignalConfig from './config/OneSignalConfig';

import createRouter from './routes';

export default function App() {
  const signed = useSelector(state => state.auth.signed);
  const provider = useSelector(state => state.auth.provider);
  const user = useSelector(state => state.auth.id);
  const Routes = createRouter(provider, signed);

  return (
    <>
      <Routes />
      <OneSignalConfig idUser={user}/>
    </>
  );
}
