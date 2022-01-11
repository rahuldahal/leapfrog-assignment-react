import React from "react";
import Landing from "./Screens/Landing";
import { Provider as StoreProvider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <StoreProvider store={store}>
      <div className="App p-4 lg:p-0 bg-green-50 text-gray-700">
        <Landing />
      </div>
    </StoreProvider>
  );
}

export default App;
