import { createContext, useState } from "react";

export const ValueContext = createContext();

const ValueContextProvider = ({ children }) => {
  const [value, setValue] = useState("");
  const [changeUnit, setChangeUnit] = useState(false);
  return (
    <ValueContext.Provider value={{ value, setValue,changeUnit, setChangeUnit }}>
      {children}
    </ValueContext.Provider>
  );
};
export default ValueContextProvider;
