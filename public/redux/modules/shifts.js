const GET_SHIFTS = 'GET_SHIFTS';
const GET_SHIFTS_SUCCESS = 'GET_SHIFTS_SUCCESS';
const GET_SHIFTS_FAIL = 'GET_SHIFTS_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  shifts: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_SHIFTS:
      return {
        ...state,
        loading: true
      };
    case GET_SHIFTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: false,
        shifts: action.result
      };
    case GET_SHIFTS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function load() {
  return {
    types: [ GET_SHIFTS, GET_SHIFTS_SUCCESS, GET_SHIFTS_FAIL ],
    promise: (client) => client.get('..')
  };
}
