import { 
  FEEDBACK,
  FEEDBACK_SUCCESS,
  FEEDBACK_ERROR,
} from '../constants';


export const initialFeedbackState = {
  isFeedbacking: false,
  feedbackSuccess: false,
  feedbackError: false,
};

function feedback(state = initialFeedbackState, action) {
  switch (action.type) {
    case FEEDBACK: {
      return {
        ...state,
        isFeedbacking: true,
        feedbackSuccess: false,
        feedbackError: false,
      };
    }

    case FEEDBACK_SUCCESS: {
      return {
        ...state,
        isFeedbacking: false,
        feedbackSuccess: true,
      };
    }

    case FEEDBACK_ERROR: {
      return {
        ...state,
        isFeedbacking: false,
        feedbackError: true,
      };
    }

    default:
      return state;
  }
}

export default feedback;
