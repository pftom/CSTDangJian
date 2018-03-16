import { REHYDRATE } from 'redux-persist/constants';

import { 
  ANSWER_QUESTION,
  ANSWER_QUESTION_SUCCESS,
  ANSWER_QUESTION_ERROR,
  INCREMENT_NOW_INDEX,
  CLEAR_EVERY_TERM_ANSWER_COUNT,
} from '../constants';


export const initialAnswerState = {
  everyDayAnswerCount: 0,
  everyDayTotalCount: 3,
  everyFecthTotalCount: 2,
  everyDayNowQuestionIndex: 0,
  everyTermAnswerCount: 0,
  questions: [
    {
      question: '1.第十九届中共中央政治局常委会共有几位委员？',
      options: [
        "A. 6",
        "B. 7",
        "C. 8",
        "D. 9",
      ],
      answer: "B",
    },
    {
      question: '2.在现阶段，我国社会的主要矛盾是（ ）',
      options: [
        "A. 公有制经济与非公有制经济之间的矛盾",
        "B. 人民日益增长的物质文化需要同落后的社会生产之间的矛盾",
        "C. 生产力与生产关系之间的矛盾",
        "D. 人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾",
      ],
      answer: "D",
    },
    {
      question: '3.（ ）是党的根本组织原则，也是群众路线在党的生活中的运用。',
      options: [
        "A. 民主制",
        "B. 集中制",
        "C. 民主集中制",
        "D. 民主协商制",
      ],
      answer: "C",
    },
    {
      question: '4.中国共产党领导人民构建社会主义和谐社会。按照民主法治、公平正义、诚信友爱、充满活力、安定有序、人与自然和谐相处的总要求和共同建设、共同享有的原则，以（ ）为重点，解决好人民最关心、最直接、最现实的利益问题,努力形成全体人民各尽其能、各得其所而又和谐相处的局面。',
      options: [
        "A. 改善民生",
        "B. 发展经济",
        "C. 社会保障",
        "D. 扩大就业",
      ],
      answer: "A",
    },
    {
      question: '5.我们党的最大政治优势是密切联系群众，党执政后的最大危险是（ ）。党风问题、党同人民群众联系问题是关系党生死存亡的问题。',
      options: [
        "A. 脱离群众",
        "B. 骄傲自满",
        "C. 形式主义",
        "D. 经验主义",
      ],
      answer: "A",
    },
  ],
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
