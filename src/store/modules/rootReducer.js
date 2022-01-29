import { combineReducers } from 'redux';

import { courses } from './courses/reducer';
import { auth } from './auth/reducer';

export default combineReducers({
  courses,
  auth
});
