import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  CardActions,
  CardContent,
  CardMedia,
  Card,
  IconButton,
  Badge
} from "@mui/material";
import { useGetProductsByNameQuery } from "../../Redux/productsApi.js";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/cartSlice.js";
import { increaseQuantity, decreaseQuantity } from "../../Redux/cartSlice.js";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {}
}));
const Home = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProductsByNameQuery();
  const { selectedProducts, selectedProductsID } = useSelector(
    // @ts-ignore
    (state) => state.cartt
  );
  const dispatch = useDispatch();
  const theme = useTheme();
  if (isLoading) {
    return (
      <Box>
        <CircularProgress size="10rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box>
        <Typography variant="body1" color="initial">Error</Typography>
      </Box>
    );
  }
  if (data && !isLoading) {
    return (
      <Stack
        direction="row"
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {data.map((el, index) => {
          return (
            <Card sx={{ maxWidth: 280, mb: 6, mx: 2 }} key={index}>
              <CardMedia
                component="img"
                height="280"
                sx={{cursor: "pointer"}}
                image={el.imageLink[0]}
                alt="Paella dish"
                onClick={() => {
                  navigate(`product-details/${el.id}`);
                }}
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {el.description}
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{ justifyContent: "space-between" }}
              >
                {selectedProductsID.includes(el.id) ? (
                  <Box
                    component="div"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <IconButton
                      color="primary"
                      sx={{ mr: "10px" }}
                      onClick={() => {
                        dispatch(decreaseQuantity(el));
                      }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <StyledBadge
                      badgeContent={
                        selectedProducts.find((ele) => ele.id === el.id)
                          .quantity
                      }
                      color="primary"
                    />
                    <IconButton
                      color="primary"
                      sx={{ ml: "10px" }}
                      onClick={() => {
                        dispatch(increaseQuantity(el));
                      }}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>
                ) : (
                  <Button
                    sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch(addToCart(el));
                    }}
                  >
                      <ShoppingCart sx={{fontSize: "18px", mr: 1}} /> Add to cart
                  </Button>
                )}
                <Typography
                  mr={1}
                  variant="body1"
                  color={theme.palette.error.main}
                >
                  ${el.price}
                </Typography>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    );
  }
};

export default Home;
