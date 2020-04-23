import { Alert } from 'react-native';
import Toast from 'react-native-easy-toast'
import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, phone, avatar_id, ...rest } = payload.data;

    const profile = Object.assign(
      { name, email, phone, avatar_id },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, 'users', profile);

    Alert.alert('Sucesso na atualização de perfil', 'Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert('Falha na alteração do cadastro', 'Falha na alteração do cadastro verifique seus dados');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
