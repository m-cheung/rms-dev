const GET_CERTIFICATIONS = 'GET_CERTIFICATIONS';
const GET_CERTIFICATIONS_FAIL = 'GET_CERTIFICATIONS_FAIL';
const GET_CERTIFICATIONS_SUCCESS = 'GET_CERTIFICATIONS_SUCCESS';
const GET_USER = 'GET_USER';
const GET_USER_FAIL = 'GET_USER_FAIL';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const SHOW_CERTIFICATES_IMAGE_MODAL = 'SHOW_CERTIFICATES_IMAGE_MODAL';
const HIDE_CERTIFICATES_IMAGE_MODAL = 'HIDE_CERTIFICATES_IMAGE_MODAL';

const initialState = {
  certificates: [],
  certificatesImageModal: {
    image: '',
    show: false
  },
  data: {},
  loading: false,
  loaded: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_CERTIFICATIONS:
    case GET_USER:
      return {
        ...state,
        loading: true
      };
    case GET_CERTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        certificates: action.result
      };
    case GET_CERTIFICATIONS_FAIL:
    case GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case HIDE_CERTIFICATES_IMAGE_MODAL:
      return {
        ...state,
        certificatesImageModal: {
          image: '',
          show: false
        }
      };
    case SHOW_CERTIFICATES_IMAGE_MODAL:
      return {
        ...state,
        certificatesImageModal: {
          image: action.image,
          show: true
        }
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

export function loadCertificates() {
  return {
    types: [ GET_CERTIFICATIONS, GET_CERTIFICATIONS_SUCCESS, GET_CERTIFICATIONS_FAIL ],
    promise: (client) => client.get('/certifications/')
  };
}

export function showCertificateImage(image) {
  return {
    type: SHOW_CERTIFICATES_IMAGE_MODAL,
    image
  };
}

export function hideCertificateImage() {
  return {
    type: HIDE_CERTIFICATES_IMAGE_MODAL
  };
}
