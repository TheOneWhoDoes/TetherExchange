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
  height: "8rem",
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

function StepZero({
  buysell,
  tether,
  handleTether,
  rial,
  handleRial,
  handleNext,
}) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={gridStyle}
    >
      <Grid
        container
        display="flex"
        direction="row-reverse"
        justifyContent="center"
      >
        <div className="flex">
          <span
            style={{ fontSize: "1rem" }}
            className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
          >
            Tether
          </span>
          <input
            type="text"
            id="website-admin"
            className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900  block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            placeholder="میزان ارز را وارد کنید"
            style={{ direction: "rtl", outline: "none" }}
            onChange={handleTether}
            value={tether}
          ></input>
        </div>
        <CompareArrowsIcon style={{ margin: "1rem" }} />
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            ریال
          </span>
          <input
            type="text"
            id="website-admin"
            className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900  block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            placeholder="قیمت"
            style={{ direction: "rtl", outline: "none" }}
            onChange={handleRial}
            value={rial}
          ></input>
        </div>
      </Grid>
      {buysell === "buy" && (
        <button
          disabled={rial.toString().trim().length === 0}
          onClick={(event) => handleNext()}
          className="button-21"
        >
          خرید
        </button>
      )}
      {buysell === "sell" && (
        <button
          disabled={rial.toString().trim().length === 0}
          onClick={(event) => handleNext()}
          className="button-21"
        >
          فروش
        </button>
      )}
    </Grid>
  );
}

export default StepZero;
