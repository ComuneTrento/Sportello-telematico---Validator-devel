import { takeLatest, take, put, all, call, delay } from 'redux-saga/effects';
import request from 'superagent'
import {
  CHANGED_QUERY_FILTER,
  MODULE_DATA_REQUEST,
  MODULE_DATA_RECEIVED,
  MODULE_DATA_ERROR,
  SET_QUERY_FILTER,
} from '../actions';


export function* setQueryFilter(action) {
  yield call(delay, 500);
  action.type = SET_QUERY_FILTER;
  yield put(action);
}

export function* whatchSearchFilter() {
  yield takeLatest(CHANGED_QUERY_FILTER, setQueryFilter);
}

function getModules() {
  return request.get('/module').then(res => res.body)
}

export function* fetchModules(dispatch) {
  while (true) {
    yield take(MODULE_DATA_REQUEST)

    try {
      const modules = yield call(getModules)

      if (!modules) {
        yield put({ type: MODULE_DATA_ERROR })
        continue
      }

      modules.map(m => {
        if (Array.isArray(m['folders'])) {
          m['folders_search'] = m['folders'].join('/');
        }


        return m;
      });

      yield put({ type: MODULE_DATA_RECEIVED, modules })
    } catch (err) {
      yield put({ type: MODULE_DATA_ERROR })
    }
  }
}

export function* prepareFolder() {
  while(true) {
    const { folders } = yield take('PREPARE_FOLDER_REQUEST')
    try {
      const response = yield call(
        () => request.get(`/folder/${folders.join('-')}/download`).then(res => res.body)
      )

      if (response.hasOwnProperty('error')) {
        yield put({
          type: 'PREPARE_FOLDER_ERROR',
          error: response.error
        })

      } else {
        yield put({
          type: 'PREPARE_FOLDER_RECEIVED',
          response
        })

        window.location.href = `/download/${response.uuid}`;
      }
    } catch (error) {
      yield put({
        type: 'PREPARE_FOLDER_REQUEST_ERROR',
        error
      })
    }
  }
}


export function* prepareModule() {
  while(true) {
    const { module_key } = yield take('PREPARE_MODULE_REQUEST')
    try {
      const response = yield call(
        () => request.get(`/module/${module_key}/download`).then(res => res.body)
      )

      if (response.hasOwnProperty('error')) {
        yield put({
          type: 'PREPARE_MODULE_ERROR',
          error: response.error
        })

      } else {
        yield put({
          type: 'PREPARE_MODULE_RECEIVED',
          response
        })

        window.location.href = `/download/${response.uuid}`;
      }
    } catch (error) {

      yield put({
        type: 'PREPARE_MODULE_REQUEST_ERROR',
        error
      })
    }
  }
}

export function* listenEdit() {
  while (true) {
    const { module_key } = yield take('EDIT_MODULE_REQUEST')
    yield call(
      () => request.get(`/module/${module_key}/edit`).then(res => res.body)
    )
  }
}


export default function* rootSaga() {
  yield all([
    prepareFolder(),
    prepareModule(),
    whatchSearchFilter(),
    fetchModules(),
    listenEdit(),
  ])
}
