// Action Types
export const SUBMIT_FORM = 'SUBMIT_FORM';

// Action Creators
export const submitForm = (formData) => {
  return {
    type: SUBMIT_FORM,
    payload: formData
  };
};