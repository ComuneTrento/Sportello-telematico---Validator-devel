export const SET_QUERY_FILTER = 'SET_QUERY_FILTER';
export const CHANGED_QUERY_FILTER = 'CHANGED_QUERY_FILTER';
export const SET_FIELD_FILTER = 'SET_FIELD_FILTER';

export const MODULE_DATA_REQUEST = 'MODULE_DATA_REQUEST';
export const MODULE_DATA_RECEIVED = 'MODULE_DATA_RECEIVED';
export const MODULE_DATA_ERROR = 'MODULE_DATA_ERROR';

export const FieldFilter = {
  FIELD_FILENAME: 'FIELD_FILENAME',
  FIELD_URN: 'FIELD_URN',
  FIELD_PATH: 'FIELD_PATH',
};

export function setQueryFilter(query) {
    return { type: CHANGED_QUERY_FILTER, query };
}

export function setFieldFilter(field) {
    return { type: SET_FIELD_FILTER, field };
}

export function getModules() {
    return { type: MODULE_DATA_REQUEST };
}

export function startDownloadFolder(folders) {
    return {
        type: 'PREPARE_FOLDER_REQUEST',
        folders
    }
}

export function startDownloadModule(module_key) {
    return {
        type: 'PREPARE_MODULE_REQUEST',
        module_key
    }
}

export function editModule(module_key) {
    return {
        type: 'EDIT_MODULE_REQUEST',
        module_key
    }
}

export function cleanError() {
  return {
    type: 'CLEAN_ERROR'
  }
}
