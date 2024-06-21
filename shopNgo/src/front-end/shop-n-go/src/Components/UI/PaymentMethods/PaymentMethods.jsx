import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

const PaymentMethods = ({ PaymentMethodChoosen }) => {
  const [selected, setSelected] = useState(null);

  const getButtonStyle = (option) => ({
    flexDirection: "column",
    alignItems: "center",
    width: "40%",
    border: selected === option ? "3px solid darkgrey" : "3px solid #ccc",
    color: "#000",
    fontWeight: "bolder",
    "&:hover":
      selected === option
        ? { border: "3px solid darkgrey", bgcolor: "lightblue" }
        : { border: "3px solid #ccc", bgcolor: "#f5f5f5" },
    backgroundColor: selected === option ? "lightblue" : "#fff",
  });

  const textStyle = {
    fontWeight: "600",
    marginTop: "5px",
  };
  const handleSelect = (method) => {
    setSelected(method);
    PaymentMethodChoosen(method);
  };

  return (
    <Box display="flex" justifyContent="space-around" mt={2}>
      <Button
        variant={selected === "credit" ? "contained" : "outlined"}
        onClick={() => handleSelect("credit")}
        disableRipple
        sx={getButtonStyle("credit")}
      >
        <CreditCardIcon fontSize="large" />
        <Typography sx={textStyle} variant="body2">
          بطاقة إئتمان
        </Typography>
      </Button>
      <Button
        variant={selected === "cash" ? "contained" : "outlined"}
        onClick={() => handleSelect("cash")}
        disableRipple
        sx={getButtonStyle("cash")}
      >
        <LocalAtmIcon fontSize="large" />
        <Typography sx={textStyle} variant="body2">
          نقدي
        </Typography>
      </Button>
    </Box>
  );
};

export default PaymentMethods;
