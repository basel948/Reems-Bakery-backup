import TextField from "@mui/material/TextField";
import styles from "./InputField.module.css";
import React from "react";

function InputField({
  id,
  label,
  variant,
  height,
  value,
  onChange,
  className,
  width,
}) {
  return (
    <div className={`${styles["inputField-container"]} ${className}`}>
      <TextField
        id={id}
        label={label}
        variant={variant}
        value={value}
        onChange={onChange}
        InputLabelProps={{
          sx: {
            left: "auto",
            top: 10,
            textAlign: "right",
            marginRight: "30px",
            fontSize: "25px",
          },
        }}
        inputProps={{
          dir: "rtl", // Set the direction to RTL
          sx: {
            marginTop: "10px",
            fontSize: "25px",
            width: width || "540px",
            height: height || "auto", // Use the height prop if provided
          },
        }}
      />
    </div>
  );
}

export default InputField;
