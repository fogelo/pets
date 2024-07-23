import { ReactNode, createContext } from "react";

const StoreContext = createContext<unknown | undefined>(undefined);

type Props = {
  store: unknown | undefined;
  children: ReactNode;
};

const Provider = ({ store, children }: Props) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default Provider;

export { StoreContext };
