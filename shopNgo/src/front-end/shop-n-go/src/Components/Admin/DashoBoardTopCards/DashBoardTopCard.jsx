import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

function DashBoardTopCard({ title, value }) {
  return (
    <Card sx={{ minWidth: 100, margin: 2, width: 200 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="H5" component="div" sx={{ textAlign: "center" }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DashBoardTopCard;
