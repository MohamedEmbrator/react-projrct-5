import {
  Box,
  Paper,
  Button,
  IconButton,
  styled,
  Badge,
  Typography,
  Divider,
  Stack
} from "@mui/material";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { Add, Delete, Remove } from "@mui/icons-material";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteProduct
} from "../../Redux/cartSlice.js";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#1976d2",
    color: "#fff"
  }
}));
const Cart = () => {
  // @ts-ignore
  const { selectedProducts } = useSelector((state) => state.cartt);
  const dispatch = useDispatch();
  let totalPrice = 0;
  return (
    <Box>
      {selectedProducts.map((el, index) => {
        totalPrice += el.price * el.quantity;
        return (
          <Paper dir="rtl" className="item-container" key={index}>
            <Box component="div" className="img-title-parent">
              <img src={el.imageLink[0]} alt="" />
              <p className="product-name">{el.productName}</p>
            </Box>
            <Box
              component="div"
              style={{ display: "flex", alignItems: "center" }}
            >
              <IconButton
                sx={{ color: "#1976d2", ml: "10px" }}
                onClick={() => {
                  dispatch(increaseQuantity(el));
                }}
              >
                <Add />
              </IconButton>
              <StyledBadge badgeContent={el.quantity} color="secondary" />
              <IconButton
                sx={{ color: "#1976d2", mr: "10px" }}
                onClick={() => {
                  dispatch(decreaseQuantity(el));
                }}
              >
                <Remove />
              </IconButton>
            </Box>
            <Box component="div" className="price">
              ${el.price * el.quantity}
            </Box>
            <Button
              sx={{ display: { xs: "none", md: "inline-flex" } }}
              variant="text"
              color="error"
              onClick={() => {
                dispatch(deleteProduct(el));
              }}
            >
              Delete
            </Button>
            <IconButton
              onClick={() => {
                dispatch(deleteProduct(el));
              }}
              sx={{
                color: "#ef5350",
                display: { xs: "inline-flex", md: "none" }
              }}
            >
              <Delete />
            </IconButton>
          </Paper>
        );
      })}
      <Paper sx={{ width: "200px", mx: "auto", mt: "60px" }}>
        <Typography p={2} variant="h6" align="center">
          Cart Summary
        </Typography>
        <Divider />
        <Stack direction="row" sx={{ justifyContent: "space-between", p: 1.2 }}>
          <Typography variant="body1">Subtotal</Typography>
          <Typography variant="body1">${totalPrice}</Typography>
        </Stack>
        <Divider />
        <Button color="primary" variant="contained" fullWidth>
          Checkout
        </Button>
      </Paper>
    </Box>
  );
};

export default Cart;
