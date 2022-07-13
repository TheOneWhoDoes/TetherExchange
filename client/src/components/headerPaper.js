import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import http from "../services/httpService";
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
import Modal from "@mui/material/Modal";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { StyledEngineProvider } from "@mui/material/styles";
import RtlProvider from "../rtlProvider";
import Stepper from "../components/stepper";
import ResponsiveAppBar from "../components/appBar";
import CoinPrice from "../components/coinPrice";
import socketIOClient, { io } from "socket.io-client";

const paperStyle = {
  borderRadius: "10px",
  height: "33rem",
  width: "48rem",
  margin: "1rem auto",
};
const paperPriceStyle = {
  borderRadius: "10px",
  height: "7rem",
  width: "48rem",
  margin: "1rem auto",
};
const innerPaperStyle = {
  borderRadius: "10px",
  padding: "1.5rem",
  height: "7rem",
  width: "100%",
  boxShadow: "0 6px 10px rgb(0 0 0 / 3%)",
};

const btnSell = {
  margin: "3rem",
};

const inputStyle = {
  margin: "0.5rem auto",
};

const gridStyle = {
  marginTop: "3rem",
};

const buttonStyle = {
  fontFamily: "IranianSans !important",
};

function HeaderPaper({ handleBuy, handleSell, buysell }) {
  const buysellClicked =
    buysell === "buy"
      ? {
          buy: {
            backgroundColor: "#0a66c2",
          },
          sell: {},
        }
      : {
          sell: {
            backgroundColor: "#0a66c2",
          },
          buy: {},
        };
  return (
    <Paper elevation={6} style={innerPaperStyle}>
      <Grid
        container
        display="flex"
        direction="row"
        justifyContent="flex-end"
        style={{ margin: "1rem 0" }}
      >
        <button
          onClick={(e) => handleBuy()}
          style={buysellClicked.buy}
          className="button-18"
        >
          خرید
        </button>
        <button
          onClick={(e) => handleSell()}
          style={buysellClicked.sell}
          className="button-18"
        >
          فروش
        </button>
      </Grid>
    </Paper>
  );
}

export default HeaderPaper;
