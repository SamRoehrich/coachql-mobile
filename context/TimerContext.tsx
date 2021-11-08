import { createContext, useState, useContext, useReducer, FC } from "react";

const [started, setStarted] = useState(false);

const TimerContext = createContext({ started, setStarted });

const TimerContextProvider: FC = ({ children }) => {
  return (
    <TimerContext.Provider value={{ started, setStarted }}>
      {children}
    </TimerContext.Provider>
  );
};

export { TimerContextProvider, TimerContext };
