import React from "react";
import {Provider} from "react-redux";
import {store} from "../../store";
import MainPage from "../pages/main-page";
import ErrorBoundary from "../error-boundary/error-boundary";
import {MainDataContext, mainData} from "../../context/main-data-context";

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <MainDataContext.Provider value={mainData}>
          <MainPage/>
        </MainDataContext.Provider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
