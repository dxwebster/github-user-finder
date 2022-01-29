import { all } from 'redux-saga/effects';
import user from './user/sagas';

export default function* rootSaga() {
  return yield all([user]);
}
