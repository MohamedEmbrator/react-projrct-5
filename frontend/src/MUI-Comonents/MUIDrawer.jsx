import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import {
  Badge,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme
} from "@mui/material";
import { Home, LightMode, DarkMode, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px"
  }
}));

const MUIDrawer = ({
  drawerWidth,
  setColorMode,
  drawerDisplay,
  drawerType,
  setDrawerDisplay,
  setDrawerType
}) => {
  // @ts-ignore
  const { selectedProducts } = useSelector((state) => state.cartt);
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Drawer
      sx={{
        display: { xs: drawerDisplay, sm: "block", md: "block" },
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box"
        }
      }}
      variant={drawerType}
      anchor="left"
      open={true}
      onClose={() => {
        setDrawerType("permanent");
        setDrawerDisplay("none");
      }}
    >
      <List>
        <ListItem
          disablePadding
          sx={{ display: "flex", justifyContent: "Center" }}
        >
          <IconButton
            onClick={() => {
              window.localStorage.setItem(
                "mode",
                theme.palette.mode === "dark" ? "light" : "dark"
              );
              setColorMode(theme.palette.mode === "dark" ? "light" : "dark");
            }}
          >
            {theme.palette.mode === "dark" ? (
              <LightMode sx={{ color: "gold" }} />
            ) : (
              <DarkMode />
            )}
          </IconButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            onClick={(e) => {
              navigate("/");
            }}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/cart")}>
            <ListItemIcon>
              <StyledBadge badgeContent={selectedProducts.length} color="secondary">
                <ShoppingCart />
              </StyledBadge>
            </ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
export default MUIDrawer;
