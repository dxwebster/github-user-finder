import { all } from 'redux-saga/effects';

import courses from './courses/sagas';
import auth from './auth/sagas';

export default function* rootSaga() {
  return yield all([
    courses,
    auth
  ]);
}
