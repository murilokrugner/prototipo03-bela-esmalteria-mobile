import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import { PersistGate } from 'redux-persist/integration/react';
import {AnimatedLinearGradient, presetColors} from 'react-native-animated-linear-gradient';
import api from './services/api';
import { Provider } from 'react-redux';
import CodePush from 'react-native-code-push';
import { StatusBar } from 'react-native';
import App from './App';
import './config/ReactotronConfig';

import { store, persistor } from './store';

console.disableYellowBox = true;

// import { Container } from './styles';

function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor={presetColors.instagram} speed={4000} />
        <App />
      </PersistGate>
    </Provider>
  );
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(Index);
