import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashborad from "./Pages/Dashborad";
import Users from "./Pages/Users";
import Layout from "./Components/layout";
import Login from "./Pages/Login";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/store";
import { AdminAuth, LoggedOut } from "./Auth/LoginAuth";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route element={<AdminAuth/>}>
          <Route element={<Layout />}>
            <Route path="/admin" element={<Dashborad />} />
            <Route path="/admin/users" element={<Users />} />
          </Route>
          </Route>
          <Route element={<LoggedOut/>}>

        <Route path="/admin/login" element={<Login />} />
        </Route>
        
        </Routes>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
