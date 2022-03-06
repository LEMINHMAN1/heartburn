import React, { useEffect, useReducer } from "react";
import actionType from "constant/ActionType";
import EndPoint from "constant/EndPoint";
import globalReducer from "reducers";
import { get } from "utils/FetchUtils";
import "./stylesheet.scss";

export const GlobalStateContext = React.createContext([{}, () => {}]);

const HomeLayout = ({ children }) => {
  const [globalState, dispatch] = useReducer(globalReducer, {});

  const initData = async () => {
    const data = await get(EndPoint.GET_QUESTIONS);
    if (data) {
      dispatch({
        type: actionType.INIT_DATA,
        questions: data.questions,
        outcomes: data.outcomes,
      });
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <GlobalStateContext.Provider value={[globalState, dispatch]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default HomeLayout;
