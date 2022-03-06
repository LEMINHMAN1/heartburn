import actionType from './../constant/ActionType';

export default (state = {questions:[]}, action) => {
  switch (action.type) {
    case actionType.INIT_DATA: return { ...state, questions: action.questions, outcomes: action.outcomes }
    case actionType.KEEP_HISTORY: return { ...state, history: action.history }
  }
}
