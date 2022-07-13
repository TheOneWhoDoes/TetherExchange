import React from "react";
import Joi from "joi-browser";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import LoginIcon from "@mui/icons-material/Login";
import auth from "../services/authService";
import Form from "../components/form";
import http from "../services/httpService";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const paperStyle = {
  padding: "1.5rem",
  height: "24rem",
  width: "20rem",
  margin: "1rem auto",
};
const inputStyle = {
  margin: "0.5rem auto",
};
const btnStyle = {
  position: "absolute",
  right: "1rem",
  top: "0.5rem",
};
const btnstyle = { margin: "0.2rem" };

// const ws = new WebSocket("wss://www.cryptofacilities.com/ws/v1");
const api =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10";
class Users extends Form {
  state = {
    data: { firstInput: "", secondInput: "", targetType: "usd-coin" },
    allCoinsName: [],
    errors: {},
  };

  schema = {
    firstInput: Joi.number(),
    secondInput: Joi.number(),
  };

  async componentDidMount() {
    try {
      const promise = await http.get(api);
      const { data } = promise;
      const allCoinsName = data.map((e) => e.id);
      // console.log(allCoinsName);
      this.setState({ allCoinsName });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
    // ws.onopen = () => {
    //   console.log("connected");
    // };
    // /**
    //  * @param {event} evt
    //  * take event and based on protocol save
    //  * message at local storage
    //  */
    // ws.onmessage = (evt) => {
    //   const message = JSON.parse(evt.data);
    //   // console.log(message);
    //   console.log(message);
    // };

    // ws.onclose = () => {
    //   console.log("disconnected");
    // };

    // ws.onopen = () => {
    //   console.log("connected");
    // };
  }

  handleSelect = (event) => {
    const tempData = { ...this.state.data };
    tempData["targetType"] = event.target.value;
    this.setState({ data: tempData });
  };

  handleSubmitDown = async (event) => {
    try {
      const promise = await http.get(api);
      const { data } = promise;
      const tempTarget = data.filter(
        (e) => e.id === this.state.data.targetType
      );
      console.log(tempTarget[0]);
      const tempTether = data.filter((e) => e.id === "tether");
      // console.log(tempTether[0]);
      // console.log(tempTether[0].current_price, tempTarget[0].current_price);
      const tempData = { ...this.state.data };
      tempData.secondInput =
        (tempTarget[0].current_price * parseFloat(this.state.data.firstInput)) /
        tempTether[0].current_price;
      this.setState({ data: tempData });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleSubmitUp = async (event) => {
    try {
      const promise = await http.get(api);
      const { data } = promise;
      const tempTarget = data.filter(
        (e) => e.id === this.state.data.targetType
      );
      // console.log(tempTarget[0]);
      const tempTether = data.filter((e) => e.id === "tether");
      // console.log(tempTether[0]);
      // console.log(tempTether[0].current_price, tempTarget[0].current_price);
      const tempData = { ...this.state.data };
      tempData.firstInput =
        (tempTether[0].current_price *
          parseFloat(this.state.data.secondInput)) /
        tempTarget[0].current_price;
      this.setState({ data: tempData });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleBuy = async (event) => {
    try {
      const promise = await http.get(api);
      const { data } = promise;
      const tempTarget = data.filter(
        (e) => e.id === this.state.data.targetType
      );
      // console.log(tempTarget[0]);
      const tempTether = data.filter((e) => e.id === "tether");
      // console.log(tempTether[0]);
      // console.log(tempTether[0].current_price, tempTarget[0].current_price);
      const tempData = { ...this.state.data };
      tempData.firstInput =
        (tempTether[0].current_price *
          parseFloat(this.state.data.secondInput)) /
        tempTarget[0].current_price;
      this.setState({ data: tempData });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { data, allCoinsName, errors } = this.state;
    return (
      <Grid>
        <Button
          variant="contained"
          color="primary"
          style={btnStyle}
          startIcon={<LogoutIcon />}
          href="/logout"
        >
          Logout
        </Button>
        <Paper elevation={10} style={paperStyle}>
          {/* <Grid align="center">
            <Avatar style={avatarStyle}></Avatar>
            <h2 className="login">Login</h2>
          </Grid> */}
          <div>
            <InputLabel id="demo-simple-select-label">Target Coin</InputLabel>

            <TextField
              name="firstInput"
              label="USD coin"
              placeholder="Enter Coin Number"
              fullWidth
              required
              onChange={this.handleChange}
              value={data["firstInput"]}
              style={inputStyle}
            />
          </div>
          <div style={{ display: "flex" }}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              onClick={this.handleSubmitDown}
              disabled={data["firstInput"].length === 0}
              startIcon={<ArrowCircleDownIcon />}
            >
              DownWard
            </Button>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              style={btnstyle}
              fullWidth
              onClick={this.handleSubmitUp}
              disabled={data["secondInput"].length === 0}
              startIcon={<ArrowCircleUpIcon />}
            >
              UpWard
            </Button>
          </div>
          <div>
            <TextField
              name="secondInput"
              label="Tether"
              placeholder="Enter Coin Number"
              fullWidth
              required
              onChange={this.handleChange}
              value={data["secondInput"]}
              style={inputStyle}
            />
          </div>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={this.handleBuy}
            disabled={data["secondInput"].length === 0}
            startIcon={<ShoppingCartIcon />}
          >
            Buy
          </Button>
        </Paper>
      </Grid>
    );
  }
}

export default Users;
