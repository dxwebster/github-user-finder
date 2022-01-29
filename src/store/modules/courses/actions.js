import {
  TYPE_COURSES_REQUEST,
  TYPE_COURSES_SUCCESS,
  TYPE_COURSES_FAILURE,
  TYPE_COURSES_MODULES_REQUEST,
  TYPE_COURSES_MODULES_SUCCESS,
  TYPE_COURSES_MODULES_FAILURE, 
  TYPE_COURSES_SELECT_LESSON, 
  TYPE_COURSES_COLLAPSE_SIDEBAR
} from '../../../constants/types-reducers'


export function coursesRequest() {
  return {
    type: TYPE_COURSES_REQUEST,
  };
}
export function coursesSuccess(courses) {
  return {
    type: TYPE_COURSES_SUCCESS,
    payload: courses,
  };
}
export function coursesFailure(error) {
  return {
    type: TYPE_COURSES_FAILURE,
    payload: error,
  };
}

export function modulesRequest(courseId) {
  return {
    type: TYPE_COURSES_MODULES_REQUEST,
    payload: { courseId },
  };
}
export function modulesSuccess(modules) {
  return {
    type: TYPE_COURSES_MODULES_SUCCESS,
    payload: modules,
  };
}
export function modulesFailure(error) {
  return {
    type: TYPE_COURSES_MODULES_FAILURE,
    payload: error,
  };
}

export function selectLesson(activeModule, activeLesson) {
  return {
    type: TYPE_COURSES_SELECT_LESSON,
    payload: { activeModule, activeLesson },
  };
}
export function setCollapseSidebar(collapseSidebar) {
  return {
    type: TYPE_COURSES_COLLAPSE_SIDEBAR,
    payload: { collapseSidebar },
  };
}
