import React, { useState, useEffect } from "react";
import _ from "lodash";
import http from "../services/httpService";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Paper } from "@mui/material";
import RtlProvider from "../rtlProvider";
import Stepper from "../components/stepper";
import ResponsiveAppBar from "../components/appBar";
import CoinPrice from "../components/coinPrice";
import socketIOClient, { io } from "socket.io-client";
import HeaderPaper from "../components/headerPaper";
import StepZero from "../components/stepZero";
import StepOne from "../components/stepOne";
import StepThree from "../components/stepThree";

const fixf = 4;
// wss://ws.coincap.io/prices?assets=ALL
const paperStyle = {
  borderRadius: "10px",
  height: "35rem",
  width: "48rem",
  margin: "1rem auto",
};
const innerPaperStyle = {
  marginTop: "2rem",
  borderRadius: "10px",
  height: "8rem",
  width: "100%",
  boxShadow: "0 6px 10px rgb(0 0 0 / 3%)",
};
const gridStyle = {
  marginTop: "3rem",
};

function Exchange() {
  let navigate = useNavigate();
  const auth = useSelector((state) => state.data.auth);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [walletAd, setWalletAd] = useState("");
  const [card, setCard] = useState("");
  const [shaba, setShaba] = useState("");
  const [buysell, setBuysell] = useState("buy");
  const [tether, setTether] = useState("");
  const [rial, setRial] = useState("");
  const [buyPrice, setBuyPrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [priceIrt, setPriceIrt] = useState(0);
  const [priceUsd, setPriceUsd] = useState(0);
  const [diffPercent, setDiffPercent] = useState(0);

  useEffect(() => {
    const socket = socketIOClient("http://localhost:8081");
    socket.on("message", (data) => {
      const temp = JSON.parse(data);
      console.log(temp);
      setBuyPrice(
        (parseFloat(temp["usd"]) * parseFloat(temp["priceUsd"])).toFixed(fixf)
      );
      setSellPrice(
        (parseFloat(temp["usd"]) * parseFloat(temp["priceUsd"])).toFixed(fixf)
      );

      setPriceIrt(
        (parseFloat(temp["usd"]) * parseFloat(temp["priceUsd"])).toFixed(fixf)
      );
      setPriceUsd(parseFloat(temp["priceUsd"]).toFixed(fixf));

      setDiffPercent(parseFloat(temp["changePercent24Hr"]).toFixed(fixf));
    });
  }, []);

  const handleNext = () => {
    if (auth === null) {
      navigate("/login");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleBuy = () => {
    setBuysell("buy");
  };

  const handleSell = () => {
    setBuysell("sell");
  };

  const handleSubmit = (event) => {
    console.log(event.target.id);
  };

  const handleTether = (event) => {
    setTether(event.target.value);
    let temp;
    if (buysell === "buy") {
      temp = parseFloat(parseFloat(event.target.value) * buyPrice).toFixed(
        fixf
      );
    }
    if (buysell === "sell") {
      temp = parseFloat(parseFloat(event.target.value) * sellPrice).toFixed(
        fixf
      );
    }
    if (isNaN(temp)) {
      temp = "";
    }

    setRial(temp);
  };

  const handleRial = (event) => {
    setRial(event.target.value);
    let temp;
    if (buysell === "buy") {
      temp = parseFloat(parseFloat(event.target.value) / buyPrice).toFixed(
        fixf
      );
    }
    if (buysell === "sell") {
      temp = parseFloat(parseFloat(event.target.value) / sellPrice).toFixed(
        fixf
      );
    }
    if (isNaN(temp)) {
      temp = "";
    }
    setTether(temp);
  };

  // console.log(auth);
  return (
    <>
      <ResponsiveAppBar />
      <Grid
        container
        direction="column"
        style={(gridStyle, { display: "flex", justifyContent: "center" })}
      >
        <Paper elevation={4} style={paperStyle}>
          <Paper elevation={6} style={innerPaperStyle}>
            <Grid
              container
              direction="column"
              style={{ marginBottom: "-1rem" }}
            >
              <h3
                style={{
                  color: "#176ccf",
                  fontSize: "20px",
                  letterSpacing: "-1px",
                }}
              >
                محاسبه گر ارز دیجیتال
              </h3>
            </Grid>

            {activeStep === 0 && (
              <HeaderPaper
                buysell={buysell}
                handleBuy={handleBuy}
                handleSell={handleSell}
              ></HeaderPaper>
            )}
          </Paper>
          <RtlProvider>
            <Stepper activeStep={activeStep} handleBack={handleBack}></Stepper>
          </RtlProvider>
          {activeStep === 0 && (
            <StepZero
              buysell={buysell}
              tether={tether}
              rial={rial}
              handleTether={handleTether}
              handleRial={handleRial}
              handleNext={handleNext}
            ></StepZero>
          )}
          {activeStep === 1 && (
            <StepOne
              buysell={buysell}
              tether={tether}
              walletAd={walletAd}
              sellPrice={sellPrice}
              card={card}
              shaba={shaba}
              setWalletAd={setWalletAd}
              handleNext={handleNext}
              setCard={setCard}
              setShaba={setShaba}
            ></StepOne>
          )}
          {activeStep === 2 && (
            <StepThree
              buysell={buysell}
              tether={tether}
              walletAd={walletAd}
              sellPrice={sellPrice}
              card={card}
              shaba={shaba}
              handleSubmit={handleSubmit}
            ></StepThree>
          )}
        </Paper>
        <CoinPrice
          buyPrice={buyPrice}
          sellPrice={sellPrice}
          diff={diffPercent}
          priceIrt={priceIrt}
          priceUsd={priceUsd}
        />
      </Grid>
    </>
  );
}

export default Exchange;
