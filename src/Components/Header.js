import { AppBar, Button, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Header() {

  const displayDesktop = () => {
    return <Toolbar
      sx = {{
        backgroundColor: '#77BB3F'
      }}
    >
      {poolLogo}
    </Toolbar>;
  };

  const poolLogo = (
    <Button
      size="small"
      edge="start"
      color="inherit"
      aria-label="menu"
      href="/"
    >
      <Box
        className="d-flex"
        component="img"
        sx={{
          height: 50,
          width: 100,
        }}
        src={require("../Assets/pool-transparent-large-text.png")}
      />
    </Button>
  );
  
  return (
    <AppBar>{ displayDesktop() }</AppBar>
  );
}