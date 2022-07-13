import React, { useState, useEffect, useRef, Component } from "react";
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
// wss://ws.coincap.io/prices?assets=ALL
const paperPriceStyle = {
  borderRadius: "10px",
  height: "6rem",
  width: "48rem",
  margin: "1rem auto",
};

const lineStyle = {
  width: "2px",
  height: "2rem",
  background: "rgb(242, 245, 250)",
};

class CoinPrice extends Component {
  //   console.log(sellPrice);
  render() {
    const { buyPrice, sellPrice, priceIrt, priceUsd, diff } = this.props;
    let diffStyle = {};
    if (diff < 0) {
      diffStyle = {
        color: "red",
      };
    } else {
      diffStyle = {
        color: "green",
      };
    }
    return (
      <div>
        <div style={{ margin: "2rem", color: "teal", fontWeight: "800" }}>
          قیمت لحظه ای ارزهای دیجیتال
        </div>
        <Paper elevation={10} style={paperPriceStyle}>
          <div className="flex flex-row-reverse justify-around items-center">
            <div className="flex flex-row-reverse justify-evenly items-center">
              <div style={{ textAlign: "-webkit-center" }}>
                <div className="tether" />
              </div>
              <span>USDT - تتر</span>
            </div>
            <div className="flex flex-col ">
              <div>{priceIrt}</div>
              <div>نرخ لحظه</div>
            </div>
            {/* <span
                style={{
                  width: "3px",
                  height: "6rem",
                  background: "rgb(242, 245, 250)",
                  marginRight: "2rem",
                }}
              ></span> */}

            {/* <div className="flex flex-row-reverse justify-evenly items-center"> */}
            <div className="flex flex-col w-24">
              <div style={diffStyle}>{diff}%</div>
              <div>تغییر</div>
            </div>
            {/* <span style={lineStyle} /> */}
            <div className="flex flex-col  w-24">
              <div>{priceUsd}</div>
              <div>نرخ به دلار</div>
            </div>
            {/* <span style={lineStyle} /> */}
            {/* <div className="flex flex-col mx-4 w-24">
                <div>{sellPrice}</div>
                <div>فروش</div>
              </div> */}
            {/* </div> */}
          </div>
        </Paper>
      </div>
    );
  }
}

export default CoinPrice;
