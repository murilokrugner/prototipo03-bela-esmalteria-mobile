import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

// import history from '~/services/history';
import api from '~/services/api';

import {
  recoverPasswordSuccess,
  recoverPasswordFailure,
  resetPasswordFailure,
  resetPasswordSuccess,
} from './actions';

export function* recoverPassword({ payload }) {
  try {
    const { email } = payload;

    yield call(api.post, 'forgotpassword', {
      email,
    });

    if (!email) {
      Alert.alert('email não existe', 'Esse e-mail não existe')
      return;
    }

    yield put(recoverPasswordSuccess(email));
    Alert.alert('E-mail enviado!', 'Verifique seu e-mail para alterar sua senha')
  } catch (err) {
    Alert.alert('Falha no envio', 'Falha no envio do e-mail, tente novamente')
    yield put(recoverPasswordFailure());
  }
}

export function* resetPassword({ payload }) {
  try {
    const { email, password, token } = payload;

    yield call(api.put, 'resetpassword', {
      email,
      password,
      token,
    });

    yield put(resetPasswordSuccess(email, password, token));

    // history.push('/');
    Alert.alert('Senha alterada!', 'Senha alterada! Faça login')
  } catch (err) {
    Alert.alert('Falha', 'Falha, verifique seus dados!')

    yield put(resetPasswordFailure());
  }
}

export default all([
  takeLatest('@password/RECOVER_PASSWORD_REQUEST', recoverPassword),
  takeLatest('@password/RESET_PASSWORD_REQUEST', resetPassword),
]);
