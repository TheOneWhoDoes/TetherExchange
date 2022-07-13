import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = ["مرحله اول", "اطلاعات پرداخت", "تایید سفارش"];

export default function HorizontalLinearStepper({ activeStep, handleBack }) {
  return (
    <Box sx={{ width: "100%" }}>
      <React.Fragment>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            <span>برگشت</span>
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
        </Box>
      </React.Fragment>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>
                <span>{label}</span>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
