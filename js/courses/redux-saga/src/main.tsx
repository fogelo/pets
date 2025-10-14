import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./store/reducers";
import createSagaMiddleware from "redux-saga";
import { saga } from "./store/sagas.ts";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
sagaMiddleware.run(saga);
createRoot(document.getElementById("root")!).render(
  // <StrictMode>

  <Provider store={store}>
    <App />
  </Provider>
  // </StrictMode>,
);
