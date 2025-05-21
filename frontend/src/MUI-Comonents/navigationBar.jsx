import {
  Avatar,
  Link,
  Typography,
  AppBar,
  Toolbar,
  IconButton
} from "@mui/material";
import { Menu } from "@mui/icons-material";
const NavigationBar = ({ drawerWidth, setDrawerDisplay, setDrawerType }) => {
  return (
    <AppBar
      position="static"
      sx={{
        ml: { xs: 0, sm: `${drawerWidth}px` },
        width: { sm: `calc(100% - ${drawerWidth}px)` }
      }}
    >
      <Toolbar>
        <IconButton
          sx={{ display: { xs: "block", sm: "none", md: "none" } }}
          onClick={() => {
            setDrawerDisplay("block");
            setDrawerType("temporary");
          }}
        >
          <Menu />
        </IconButton>
        <Link href="/" color="inherit" underline="none" sx={{ flexGrow: 1 }}>
          Online Store
        </Link>
        <Typography variant="body1" color="inherit" mr={2}>
          Mohamed
        </Typography>
        <Avatar alt="Avatar" src="./imgs/avatar.png" />
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
