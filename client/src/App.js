import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import "./App.scss";
import http from "./services/httpService";
import Pagination from "./components/pagination";
import Box from "@mui/material/Box";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Input,
} from "@mui/material";
import ProtectedRoute from "./components/protectedRoute";
import LoginForm from "./pages/loginForm";
import RegisterForm from "./pages/registerForm";
import RegisterValidationForm from "./pages/registerValidationForm";
import Logout from "./pages/logout";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Users from "./pages/users";
import { useSelector, useDispatch } from "react-redux";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ResponsiveAppBar from "./components/appBar";
import { StyledEngineProvider } from "@mui/material/styles";
import RtlProvider from "./rtlProvider";
import Stepper from "./components/stepper";
import Exchange from "./pages/exchange";
import socketIOClient, { io } from "socket.io-client";
import { getUser } from "./services/authService";

function App() {
  // const auth = useSelector((state) => state.data.auth);
  const dispatch = useDispatch();
  // const [auth, setAuth] = useState(null);

  useEffect(() => {
    let name = getUser();
    dispatch({
      type: "set_user",
      payload: {
        data: { auth: name },
      },
    });
    // setAuth(getUser());
  }, []);
  // const fetch = async () => {
  //   try {
  //     const headers = {
  //       "Content-Type": "application/json",
  //     };
  //     const promise = http.get(
  //       "https://www.bitstamp.net/api/v2/ticker/btcusd/",
  //       { headers }
  //     );
  //     const { data } = await promise;
  //     console.log(data);
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 400) {
  //       const errors = { ...this.state.errors };
  //       errors.username = ex.response.data;
  //       this.setState({ errors });
  //     }
  //   }
  // };

  return (
    <>
      <div className="App">
        <ToastContainer></ToastContainer>
        <main>
          {/* <header className="App-header"> */}
          <Routes>
            <Route exact path="/login" element={<LoginForm />} />
            {/* <Route
              exact
              path="/validation"
              element={<RegisterValidationForm />}
            /> */}
            <Route exact path="/register" element={<RegisterForm />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/" element={<Exchange />} />
          </Routes>
          {/* </header> */}
        </main>
      </div>
    </>
  );
}

export default App;
