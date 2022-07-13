import React, { useState, useEffect, useRef } from "react";
import Joi from "joi-browser";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import auth from "../services/authService";
import Form from "../components/form";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddIcon from "@mui/icons-material/Add";
import RegisterValidationForm from "./registerValidationForm";

const imgStyle = {
  width: "120px",
  height: "120px",
  marginTop: "0px",
  borderRadius: "50%",
  margin: "1rem",
};

const paperStyle = {
  padding: "1.5rem",
  height: "23rem",
  width: "20rem",
  margin: "1rem auto",
};
const inputStyle = {
  margin: "0.5rem auto",
};
const avatarStyle = { background: "cadetblue" };
const btnstyle = { margin: "8px 0" };

const RegisterForm = () => {
  let navigate = useNavigate();
  // const history = useHistory();
  const [number, setNumber] = useState("");
  const [validated, setValidated] = useState(false);

  const doSubmit = (evnet) => {
    try {
      setValidated(true);
      // navigate("/validation", { replace: true });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  if (!validated) {
    return (
      <Grid>
        <div style={{ textAlign: "-webkit-center" }}>
          <div className="Logo" />
        </div>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}></Avatar>
            <h2 className="login">ثبت نام</h2>
          </Grid>
          <div style={{ margin: "1rem 0" }}>
            <div className="flex">
              <input
                name="number"
                type="text"
                label="شماره همراه"
                id="website-admin"
                className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => setNumber(event.target.value)}
                placeholder="شماره همراه"
                value={number}
                style={{ direction: "rtl", outline: "none" }}
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <PhoneIphoneIcon style={{ fontSize: "1.3rem" }} />
              </span>
            </div>
          </div>
          {/* <Link
          to={{
            pathname: "/register/validation",
          }}
        > */}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={(e) => doSubmit(e)}
            disabled={number.toString().trim().length === 0}
            startIcon={<LoginIcon />}
          >
            <span>ثبت نام</span>
          </Button>
          {/* </Link> */}

          <span>سایر موارد</span>
          <Link
            to={{
              pathname: "/login",
            }}
          >
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={
                (btnstyle, { backgroundColor: "lightgray", margin: "1rem 0" })
              }
              fullWidth
            >
              <span>ورود</span>
            </Button>
          </Link>
        </Paper>
      </Grid>
    );
  } else {
    return <RegisterValidationForm mobile={number}></RegisterValidationForm>;
  }
};

export default RegisterForm;
