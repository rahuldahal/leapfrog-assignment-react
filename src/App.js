import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import store from "./redux/store";
import Landing from "./Screens/Landing";
import Contacts from "./Screens/Contacts";

function App() {
  return (
    <Router>
      <StoreProvider store={store}>
        <div className="App p-4 lg:p-0 bg-green-50 text-gray-700">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </div>
      </StoreProvider>
    </Router>
  );
}

export default App;
