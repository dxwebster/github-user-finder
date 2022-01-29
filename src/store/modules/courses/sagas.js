import { takeLatest, all, put, call} from 'redux-saga/effects';
import { coursesSuccess, coursesFailure, modulesSuccess, modulesFailure } from './actions';
import { TYPE_COURSES_REQUEST, TYPE_COURSES_MODULES_REQUEST } from '../../../constants/types-reducers'

import api from '../../../services/api';
import { CookiesGet } from "../../../helpers/cookies"

export function* getCourses() { 
  try {
    const userCookie = CookiesGet('userId');

    const url = 'courses/';
    const configs = {
      params: {
        userId: userCookie,
      },
    };

    const { data } = yield call(api.get, url, configs);

    yield put(coursesSuccess(data));
    
  } catch (err) {
    const error = err.result ? err.result : { message: `Erro ao buscar cursos.` };

    yield put(coursesFailure(error));
    alert(error.message)
    
  }
}

export function* getModules({ payload }) { 
  try {
    const { courseId } = payload;
    
    const userCookie = CookiesGet('userId');
    
    const url = `courses/modules/${courseId}/`;
    const configs = {
      params: {
        userId: userCookie,
      },
    };

    const { data } = yield call(api.get, url, configs);

    yield put(modulesSuccess(data))

  } catch (err) {
    const error = err.result ? err.result : { message: `Erro ao buscar módulos do curso selecionado.` };

    yield put(modulesFailure(error));
    alert(err)
    
  }
}

export default all([
  takeLatest(TYPE_COURSES_REQUEST, getCourses),
  takeLatest(TYPE_COURSES_MODULES_REQUEST, getModules),
]);
