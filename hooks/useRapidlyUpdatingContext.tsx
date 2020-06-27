import * as React from "react";

const RapidlyUpdatingContext = React.createContext<number>(0);

export const RapidlyUpdatingContextProvider: React.FC = React.memo(({ children }) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => setValue((v) => v + 1), 1000 / 30);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <RapidlyUpdatingContext.Provider value={value}>{children}</RapidlyUpdatingContext.Provider>
  );
});

export const useRapidlyUpdatingContext = () => React.useContext(RapidlyUpdatingContext);
