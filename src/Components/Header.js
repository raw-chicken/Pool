import { AppBar, Button, Toolbar, Typography } from "@mui/material";
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
    // <Box>
        
        <Button
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
          href="/"
          // sx={{ mr: 2 }}
        >
          <Box
            component="img"
            sx={{
              height: 50,
              width: 100,
            }}
            src="pool-transparent.png"
          />
        </Button>
    // </Box>
  );
  
  return (
    <AppBar>{displayDesktop()}</AppBar>
  );
}