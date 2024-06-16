import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: "text.secondary",
      }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://localhost:5173/">
        Aidan
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
