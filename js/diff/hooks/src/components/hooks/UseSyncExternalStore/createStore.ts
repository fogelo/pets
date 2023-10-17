export const createStore = (initialState) => {
  const store = {
    state: initialState,
    setState: (newState) => {
      store.state = newState;
      store.listeners.forEach((listener) => listener());
    },
    getState: () => {
      return store.state;
    },
    listeners: new Set(),
    subscribe: (callback) => {
      store.listeners.add(callback);
      return () => store.listeners.delete(callback);
    },
  };
  return store;
};
