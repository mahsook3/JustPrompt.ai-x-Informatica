import { SUBMIT_FORM } from './formActions';

const initialState = {
  formData: {},
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_FORM:
      return {
        ...state,
        formData: action.payload,
      };
    default:
      return state;
  }
};

export default formReducer;