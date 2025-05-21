import { Outlet } from "react-router-dom";
import NavigationBar from "../MUI-Comonents/navigationBar.jsx";
import MUIDrawer from "../MUI-Comonents/MUIDrawer.jsx";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";

const drawerWidth = 240;
const Root = () => {
  const [colorMode, setColorMode] = useState(
    localStorage.getItem("mode") !== null
      ? localStorage.getItem("mode")
      : "light"
  );
  const darkTheme = createTheme({
    palette: {
      // @ts-ignore
      mode: colorMode
    }
  });

  const [drawerDisplay, setDrawerDisplay] = useState("none");
  const [drawerType, setDrawerType] = useState("permanent");
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <NavigationBar {...{ drawerWidth, setDrawerDisplay, setDrawerType }} />
        <MUIDrawer
          {...{
            drawerWidth,
            setColorMode,
            drawerDisplay,
            drawerType,
            setDrawerDisplay,
            setDrawerType
          }}
        />
        <Box
          component="main"
          sx={{
            ml: { xs: 0, sm: `${drawerWidth}px` },
            mt: "66px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Outlet />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Root;
