import { combineReducers } from 'redux';
import { user } from './user/reducer';
import { repos } from './repos/reducer';

export default combineReducers({ user, repos });
