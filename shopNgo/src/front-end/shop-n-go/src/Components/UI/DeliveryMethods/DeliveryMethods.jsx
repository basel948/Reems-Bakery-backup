import React, { useState } from "react";
import { Typography, Box, Button, styled } from "@mui/material";
import deliveryIcon from "../../../assets/fast-delivery.png";
import pickupIcon from "../../../assets/take-away.png";

const DeliveryMethods = ({ DeliveryMethodChoosen }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    DeliveryMethodChoosen(option);
  };

  const getButtonStyle = (option) => ({
    flexDirection: "column",
    alignItems: "center",
    width: "40%",
    fontWeight: "bolder",
    border: selected === option ? "3px solid darkgrey" : "3px solid #ccc",
    color: "#000",
    padding: "10px",
    backgroundColor: "#fff",
    "&:hover":
      selected === option
        ? { border: "3px solid darkgrey", bgcolor: "lightblue" }
        : { border: "3px solid #ccc", bgcolor: "#f5f5f5" },
    backgroundColor: selected === option ? "lightblue" : "#fff",
  });

  const textStyle = {
    fontWeight: "600",
    marginTop: "20px",
    fontSize: "1rem",
    padding: "10px",
  };

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      marginBottom={"50px"}
      mt={2}
    >
      <Button
        variant={selected === "delivery" ? "contained" : "outlined"}
        onClick={() => handleSelect("delivery")}
        disableRipple
        sx={getButtonStyle("delivery")}
      >
        <img src={deliveryIcon} alt="" />

        <Typography sx={textStyle} variant="body2">
          خدمة التوصيل
        </Typography>
      </Button>
      <Button
        variant={selected === "pickup" ? "contained" : "outlined"}
        onClick={() => handleSelect("pickup")}
        disableRipple
        sx={getButtonStyle("pickup")}
      >
        <img src={pickupIcon} alt="" />
        <Typography sx={textStyle} variant="body2">
          الاحضار بشكل شخصي
        </Typography>
      </Button>
    </Box>
  );
};

export default DeliveryMethods;
