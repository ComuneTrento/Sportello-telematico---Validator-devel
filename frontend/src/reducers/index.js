import { combineReducers } from 'redux';
import {
    SET_QUERY_FILTER,
    SET_FIELD_FILTER,
    MODULE_DATA_REQUEST,
    MODULE_DATA_RECEIVED,
    FieldFilter,
} from '../actions';

const { FIELD_PATH } = FieldFilter;

function fieldFilter(state = FIELD_PATH, action) {
    switch (action.type) {
        case SET_FIELD_FILTER:
            return action.field;
        default:
            return state;
    }
}

function queryFilter(state = "", action) {
    switch (action.type) {
        case SET_QUERY_FILTER:
            return action.query;
        default:
            return state;
    }
}

function modules(state = [], action) {
    switch (action.type) {
        case MODULE_DATA_REQUEST:
            return state;
        case MODULE_DATA_RECEIVED:
            return action.modules;
        default:
            return state;
    }
}

function currentDownloadStatus(state = {
    module: null,
    folders: null,
    lastError: null,
}, action) {
    switch (action.type) {
        case 'PREPARE_FOLDER_REQUEST':
        case 'PREPARE_MODULE_REQUEST':
            if (action.hasOwnProperty('folders')) {
                return { ...state, folders: action.folders, lastError: null }
            } else if(action.hasOwnProperty('module'))  {
                return { ...state, module: action.module, lastError: null }
            }
            return state
        case 'PREPARE_FOLDER_ERROR':
        case 'PREPARE_MODULE_ERROR':
        case 'PREPARE_FOLDER_REQUEST_ERROR':
        case 'PREPARE_MODULE_REQUEST_ERROR':
            return { lastError: action.error, module: null, folders: null }
        case 'PREPARE_FOLDER_RECEIVED':
        case 'PREPARE_MODULE_RECEIVED':
            return { lastError: null, module: null, folders: null};
        case 'CLEAN_ERROR':
            return { ...state, lastError: null}
        default:
            return state;
    }
}

function settings(state = {stu3Flag: false}, action) {
    switch (action.type) {
        case 'UPDATE_SETTING':
            return {
                ...state,
                ...action.settings,
            }
        default:
            return state;
    }
}

const validatorApp = combineReducers({
    fieldFilter,
    queryFilter,
    modules,
    currentDownloadStatus,
    settings
})

export default validatorApp
