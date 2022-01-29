import { produce } from 'immer';

import {
  TYPE_COURSES_REQUEST,
  TYPE_COURSES_SUCCESS,
  TYPE_COURSES_FAILURE,
  TYPE_COURSES_MODULES_SUCCESS,
  TYPE_COURSES_SELECT_LESSON,
  TYPE_COURSES_COLLAPSE_SIDEBAR
} from '../../../constants/types-reducers';

export const INITIAL_STATE = {
  loading: false,
  courses: [],
  modules: [],

  activeModule: {},
  activeLesson: {},
  collapseSidebar: false
};

export function courses(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case TYPE_COURSES_REQUEST: {
        draft.loading = true;
        break;
      }

      case TYPE_COURSES_SUCCESS: {
        draft.courses = action.payload;
        draft.loading = false;
        break;
      }

      case TYPE_COURSES_FAILURE: {
        draft.loading = false;
        break;
      }

      case TYPE_COURSES_MODULES_SUCCESS: {
        draft.modules = action.payload;
        draft.activeModule = action.payload[0];
        draft.activeLesson = action.payload[0].lessons[0];
        break;
      }

      case TYPE_COURSES_SELECT_LESSON: {
        draft.activeModule = action.payload.activeModule;
        draft.activeLesson = action.payload.activeLesson;
        break;
      }

      case TYPE_COURSES_COLLAPSE_SIDEBAR: {
        draft.collapseSidebar = action.payload.collapseSidebar;
        break;
      }
      default:
    }
  });
}
