import { 
  ANSWER_QUESTION,
  ANSWER_QUESTION_SUCCESS,
  ANSWER_QUESTION_ERROR,
  INCREMENT_NOW_INDEX,
  CLEAR_EVERY_TERM_ANSWER_COUNT,
} from '../constants';

// get questions
import singleOptionQuestions from '../util/data/single.json';
import multiOptionQuestions from '../util/data/multiple.json';

// split question item to valid represent format
import { convertToValidQuestion } from '../util/';

// config the answer question
export const initialAnswerState = {
  // every day, you answer success count number
  everyDayAnswerCount: 0,

  // every day, how many questions you need answer
  everyDayTotalCount: 3,

  // every term, how many question you need answer
  everyFecthTotalCount: 2,

  // every day, you answer question, the index number is changed
  everyDayNowQuestionIndex: 0,

  // every term, how many questions you answered success
  everyTermAnswerCount: 0,
  singleOptionQuestions: singleOptionQuestions.map(question => convertToValidQuestion(question)),
  multiOptionQuestions: multiOptionQuestions.map(question => convertToValidQuestion(question)),
};

function answer(state = initialAnswerState, action) {
  switch (action.type) {
    case ANSWER_QUESTION: {
      const {
        everyDayNowQuestionIndex,
      } = state;
      return { 
        ...state, 
        everyDayNowQuestionIndex: everyDayNowQuestionIndex + 1,
      };
    }
    case ANSWER_QUESTION_SUCCESS: {
      const {
        everyDayAnswerCount,
        everyTermAnswerCount,
      } = state;
      return { 
        ...state, 
        everyDayAnswerCount: everyDayAnswerCount + 1,
        everyTermAnswerCount: everyTermAnswerCount + 1,
      };
    }
    case INCREMENT_NOW_INDEX: {
      const {
        everyDayNowQuestionIndex,
      } = state;
      return {
        ...state,
        everyDayNowQuestionIndex: everyDayNowQuestionIndex + 1,
      };
    }
    case CLEAR_EVERY_TERM_ANSWER_COUNT: {
      return { 
        ...state, 
        everyTermAnswerCount: 0,
        everyDayNowQuestionIndex: 0,
      };
    }
    default: {
      return state;
    }
  }
}

export default answer;
