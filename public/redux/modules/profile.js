const GET_USER = 'GET_USER';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_FAIL = 'GET_USER_FAIL';

const initialState = {
  loading: false,
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        loading: true
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case GET_USER_FAIL:
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

export function isLoaded(globalState) {
  return globalState.profile && globalState.profile.loaded;
}

export function load() {
  return {
    types: [ GET_USER, GET_USER_SUCCESS, GET_USER_FAIL ],
    promise: (client) => client.get('/users/')
  };
}
