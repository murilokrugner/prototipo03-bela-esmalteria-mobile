import produce from 'immer';

const InitalState = {
  token: null,
  signed: false,
  provider: null,
  id: '',
  loading: false,
};

export default function auth(state = InitalState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.provider = action.payload.user.provider;
        draft.id = action.payload.user.id;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        draft.provider = null;
        break;
      }
      default:
    }
  });
}
