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

const gridStyle = {
  marginTop: "1rem",
};

function StepThree({
  buysell,
  tether,
  walletAd,
  sellPrice,
  card,
  shaba,
  handleSubmit,
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
        direction="row-reverse"
        justifyContent="center"
        alignItems="center"
        style={{
          marginTop: "0rem",
          marginBottom: "1rem",
        }}
      >
        <div className="flex ">
          <input
            type="text"
            id="website-admin"
            className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled
            value={buysell === "buy" ? "خریداز سرو" : "فروش به سرو"}
            style={{ direction: "rtl" }}
          ></input>
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            نوع درخواست
          </span>
        </div>
      </Grid>
      <Grid
        container
        direction="row-reverse"
        justifyContent="center"
        alignItems="center"
      >
        <div className="flex">
          <input
            type="text"
            id="website-admin"
            className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled
            value={tether + " - " + "Tether"}
            style={{ direction: "rtl" }}
          ></input>
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            تعداد رمزارز
          </span>
        </div>
        <div className="flex" style={{ marginRight: "2rem" }}>
          <input
            type="text"
            id="website-admin"
            className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled
            value={parseFloat(tether) * sellPrice + " " + "ریال"}
            style={{ direction: "rtl" }}
          ></input>
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            قیمت نهایی
          </span>
        </div>
      </Grid>
      {buysell === "sell" && (
        <div>
          <div
            className="flex"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            <input
              type="text"
              id="website-admin"
              className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled
              value={card}
              style={{ outline: "none" }}
            ></input>
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              شماره کارت بانکی
            </span>
          </div>
          <div className="flex">
            <input
              type="text"
              id="website-admin"
              className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled
              // value={parseFloat(tether)*sellPrice + " " + "ریال"}
              value={shaba}
              style={{ width: "32rem", outline: "none" }}
            ></input>
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              شماره شبا
            </span>
          </div>

          <button
            id="buy"
            onClick={(event) => handleSubmit(event)}
            className="button-21"
          >
            تایید سفارش
          </button>
        </div>
      )}

      {buysell === "buy" && (
        <div>
          <div
            className="flex"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            <input
              type="text"
              id="website-admin"
              className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled
              value={walletAd}
              style={{ outline: "none" }}
            ></input>
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              آدرس کیف پول
            </span>
          </div>

          <button
            id="sell"
            onClick={(event) => handleSubmit(event)}
            className="button-21"
          >
            پرداخت
          </button>
        </div>
      )}
    </Grid>
  );
}

export default StepThree;
