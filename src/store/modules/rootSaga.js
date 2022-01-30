import { all } from 'redux-saga/effects';
import user from './user/sagas';
import repos from './repos/sagas';

export default function* rootSaga() {
  return yield all([user, repos]);
}
