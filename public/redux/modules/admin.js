const GET_RESPONDERS = 'GET_RESPONDERS';
const GET_RESPONDERS_FAIL = 'GET_RESPONDERS_FAIL';
const GET_RESPONDERS_SUCCESS = 'GET_RESPONDERS_SUCCESS';

const initialState = {
  responders: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_RESPONDERS:
      return {
        ...state,
        loading: true
      };
    case GET_RESPONDERS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };

    case GET_RESPONDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        responders: action.result
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.profile && globalState.profile.loaded;
}

export function loadResponders() {
  return {
    types: [ GET_RESPONDERS, GET_RESPONDERS_SUCCESS, GET_RESPONDERS_FAIL ],
    promise: (client) => client.get('/users/getAllUsers')
  };
}
