import React from "react";
import Joi from "joi-browser";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import auth from "../services/authService";
import Form from "../components/form";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LockIcon from "@mui/icons-material/Lock";

const paperStyle = {
  padding: "1.5rem",
  height: "25rem",
  width: "20rem",
  margin: "1rem auto",
};
const inputStyle = {
  margin: "0.5rem auto",
};
const avatarStyle = { background: "cadetblue" };
const btnstyle = { margin: "8px 0" };

class LoginForm extends Form {
  state = {
    data: { number: "", password: "" },
    errors: {},
  };

  schema = {
    number: Joi.string().required().label("Number"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.number, data.password);
      // const { state } = this.props.location;

      if (auth.getToken()) {
        // window.location = state ? state.from.pathname : "/";
        window.location = "/";
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleRegister = () => {};

  render() {
    const { data, errors } = this.state;
    return (
      <Grid>
        <div style={{ textAlign: "-webkit-center" }}>
          <div className="Logo" />
        </div>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>{/* <LockOutlinedIcon /> */}</Avatar>
            <h2 className="login">ورود</h2>
          </Grid>
          <div style={{ margin: "1rem 0" }}>
            <div className="flex">
              <input
                name="number"
                type="text"
                label="شماره همراه"
                id="website-admin"
                className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value=""
                onChange={this.handleChange}
                placeholder="شماره همراه"
                value={data["number"]}
                style={{ direction: "rtl", outline: "none" }}
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <PhoneIphoneIcon style={{ fontSize: "1.3rem" }} />
              </span>
            </div>
          </div>
          <div style={{ margin: "1rem 0" }}>
            <div className="flex">
              <input
                name="number"
                type="text"
                label="شماره همراه"
                id="website-admin"
                className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value=""
                name="password"
                label="کلمه عبور"
                placeholder="کلمه عبور"
                onChange={this.handleChange}
                value={data["password"]}
                style={{ direction: "rtl", outline: "none" }}
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <LockIcon style={{ fontSize: "1.3rem" }} />
              </span>
            </div>
          </div>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={this.handleSubmit}
            disabled={this.validate() != null}
            startIcon={<LoginIcon />}
          >
            <span>ورود</span>
          </Button>

          <span>سایر موارد</span>
          <Link
            to={{
              pathname: "/register",
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
              <span>ثبت نام</span>
            </Button>
          </Link>
        </Paper>
      </Grid>
    );
  }
}

export default LoginForm;
