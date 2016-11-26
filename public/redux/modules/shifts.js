const GET_SHIFTS = 'GET_SHIFTS';
const GET_SHIFTS_SUCCESS = 'GET_SHIFTS_SUCCESS';
const GET_SHIFTS_FAIL = 'GET_SHIFTS_FAIL';
const TAKE_SHIFT = 'TAKE_SHIFT';
const TAKE_SHIFT_SUCCESS = 'TAKE_SHIFT_SUCCESS';
const TAKE_SHIFT_FAIL = 'TAKE_SHIFT_FAIL';

const initialState = {
  error: null,
  loading: false,
  loaded: false,
  success: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_SHIFTS:
    case TAKE_SHIFT:
      return {
        ...state,
        error: null,
        loading: true,
        success: null
      };
    case GET_SHIFTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case GET_SHIFTS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case TAKE_SHIFT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.result
      };
    case TAKE_SHIFT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.shifts && globalState.shifts.loaded;
}

export function load() {
  return {
    types: [ GET_SHIFTS, GET_SHIFTS_SUCCESS, GET_SHIFTS_FAIL ],
    promise: (client) => client.get('/shifts/')
  };
}

export function takeShift(shiftId) {
  return {
    types: [ TAKE_SHIFT, TAKE_SHIFT_SUCCESS, TAKE_SHIFT_FAIL ],
    promise: (client) => client.post(`/shifts/${shiftId}/take`)
  };
}
