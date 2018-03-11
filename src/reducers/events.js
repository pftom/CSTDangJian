import { combineReducers } from 'redux';

// import action constants in one place
import {
  // all need attend events
  GET_EVENTS,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_ERROR,

  GET_SINGLE_EVENT,
  GET_SINGLE_EVENT_SUCCESS,
  GET_SINGLE_EVENT_ERROR,

  GET_ACTIVE_EVENTS,

  ATTEND,
  ATTEND_SUCCESS,
  ATTEND_ERROR,
} from '../constants/';

// construct initial need attend events state
const initialEventsState = {
  isGettingEvents: false,
  getEventSuccess: false,
  getEventsError: false,
  events: null,
  needAttendEvents: null,
  errorMsg: null,
  next: false,
};

const events = (state = initialEventsState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        isGettingEvents: true,
        getEventsSuccess: false,
        getEventsError: false,
      };

    case GET_EVENTS_SUCCESS: {
      // if get events success, merge the res into the state tree
      const { events, active, mode } = action.payload;

      console.log('mode', mode, active, events);

      let judgeActive = {};
      // judge this events is all or need attend events
      if (active) {
        console.log('h');
        if (mode === 'footer') {
          console.log('footer');
          const { needAttendEvents: oldNeedAttendEvents } = state;
          if (oldNeedAttendEvents) {
            judgeActive = {
              needAttendEvents: {
                ...events,
                results: oldNeedAttendEvents.results.concat(events.results),
              },
            };
          }
        }
      } else {
        if (mode === 'footer') {
          const { events: oldEvents } = state;
          if (oldEvents) {
            judgeActive = {
              events: { 
                ...events,
                results: oldEvents.results.concat(events.results),
              },
            }
          }
       }
      }

      if (Object.keys(judgeActive).length === 0) {
        if (active) {
          judgeActive = {
            needAttendEvents: events,
          };
        } else {
          judgeActive = {
            events,
          };
        }
      }
      
      return {
        ...state,
        ...judgeActive,
        isGettingEvents: false,
        getEventsSuccess: true,
      };
    }

    case GET_EVENTS_ERROR:
      // if get events error, merge error message into the state tree
      const { errorMsg } = action;
      return {
        ...state,
        errorMsg,
        isGettingEvents: false,
        getEventsError: true,
      };

    default:
      // if dissatisfy other circumstance, return the origin state
      return state;
  }
};


// construct initial events state
const initialSingleEventState = {
  isGettingEvent: false,
  getEventSuccess: false,
  getEventError: false,
  singleEvent: null,
  errorMsg: null,
};

const singleEvent = (state = initialSingleEventState, action) => {
  switch (action.type) {
    case GET_SINGLE_EVENT:
      return {
        ...state,
        isGettingEvent: true,
        getEventSuccess: false,
        getEventError: false,
      };

    case GET_SINGLE_EVENT_SUCCESS:
      // if get events success, merge the res into the state tree
      const { singleEvent } = action.payload;

      return {
        ...state,
        singleEvent,
        isGettingEvent: false,
        getEventSuccess: true,
      };

    case GET_SINGLE_EVENT_ERROR:
      // if get events error, merge error message into the state tree
      const { errorMsg } = action;
      return {
        ...state,
        errorMsg,
        isGettingEvent: false,
        getEventError: true,
      };

    default:
      // if dissatisfy other circumstance, return the origin state
      return state;
  }
};

// construct initial events state
const initialAttendEventState = {
  isAttendingEvent: false,
  attendEventSuccess: false,
  attendEventError: false,
};

const attendEvent = (state = initialAttendEventState, action) => {
  switch (action.type) {
    case ATTEND:
      return {
        ...state,
        isAttendingEvent: true,
        attendEventSuccess: false,
        attendEventError: false,
      };

    case ATTEND_SUCCESS: {

      return {
        ...state,
        isAttendingEvent: false,
        attendEventSuccess: true,
      };
    }

    case ATTEND_ERROR: {
      return {
        ...state,
        isAttendingEvent: false,
        attendEventError: true,
      };
    }

    default:
      // if dissatisfy other circumstance, return the origin state
      return state;
  }
};

export default combineReducers({
  events,
  singleEvent,
  attendEvent,
});