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
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddIcon from "@mui/icons-material/Add";
import SmsIcon from "@mui/icons-material/Sms";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const imgStyle = {
  width: "120px",
  height: "120px",
  marginTop: "0px",
  borderRadius: "50%",
  margin: "1rem",
};

const paperStyle = {
  padding: "1.5rem",
  height: "34rem",
  width: "20rem",
  margin: "1rem auto",
};
const inputStyle = {
  margin: "0.5rem auto",
};
const avatarStyle = { background: "cadetblue" };
const btnstyle = { margin: "8px 0" };

class RegisterValidationForm extends Form {
  state = {
    data: { sms: "", firstName: "", lastName: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    sms: Joi.string().label("sms"),
    firstName: Joi.string().label("firstName"),
    lastName: Joi.string().label("lastName"),
    email: Joi.string().label("email"),
    password: Joi.label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.register(
        this.props.mobile,
        data.firstName,
        data.lastName,
        data.email,
        data.password
      );
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

  render() {
    const { data, errors } = this.state;
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
                name="sms"
                type="text"
                label="کد تایید پیامک شده"
                className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={this.handleChange}
                placeholder="کد تایید پیامک شده"
                value={data["sms"]}
                style={{ direction: "rtl", outline: "none" }}
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <SmsIcon style={{ fontSize: "1.3rem" }} />
              </span>
            </div>
          </div>
          <div style={{ margin: "1rem 0" }}>
            <div className="flex">
              <input
                name="firstName"
                type="text"
                label="نام"
                className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={this.handleChange}
                placeholder="نام"
                value={data["firstName"]}
                style={{ direction: "rtl", outline: "none" }}
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <AccountBoxIcon style={{ fontSize: "1.3rem" }} />
              </span>
            </div>
          </div>
          <div style={{ margin: "1rem 0" }}>
            <div className="flex">
              <input
                name="lastName"
                type="text"
                label="نام خانوادگی"
                className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={this.handleChange}
                placeholder="نام خانوادگی"
                value={data["lastName"]}
                style={{ direction: "rtl", outline: "none" }}
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <BadgeIcon style={{ fontSize: "1.3rem" }} />
              </span>
            </div>
          </div>
          <div style={{ margin: "1rem 0" }}>
            <div className="flex">
              <input
                name="email"
                type="text"
                label="ایمیل"
                className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={this.handleChange}
                placeholder="ایمیل"
                value={data["email"]}
                style={{ direction: "rtl", outline: "none" }}
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <EmailIcon style={{ fontSize: "1.3rem" }} />
              </span>
            </div>
          </div>
          <div style={{ margin: "1rem 0" }}>
            <div className="flex">
              <input
                name="password"
                type="text"
                label="کلمه عبور"
                className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={this.handleChange}
                placeholder="کلمه عبور"
                value={data["password"]}
                style={{ direction: "rtl", outline: "none" }}
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <VpnKeyIcon style={{ fontSize: "1.3rem" }} />
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
            <span>ثبت نام</span>
          </Button>
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
  }
}

export default RegisterValidationForm;
