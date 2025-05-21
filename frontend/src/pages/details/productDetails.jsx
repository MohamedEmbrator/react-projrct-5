import { useParams } from "react-router-dom";
import "./pruducts-details.css";
import { useGetOneProductQuery } from "../../Redux/productsApi.js";
import { Badge, Box, Button, CircularProgress, IconButton, styled, Typography } from "@mui/material";
import { useRef, useState } from "react";
import DetailsThumb from "./DetailsThumb.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/cartSlice.js";
import { increaseQuantity, decreaseQuantity } from "../../Redux/cartSlice.js";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {}
}));
const ProductDetails = () => {
  let { id } = useParams();
  const { data, error, isLoading } = useGetOneProductQuery(id);
  const [index, setIndex] = useState(0);
  const myRef = useRef(null);
    const { selectedProducts, selectedProductsID } = useSelector(
      // @ts-ignore
      (state) => state.cartt
    );
    const dispatch = useDispatch();
  const handleTab = (index) => {
    setIndex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };
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
        <Typography variant="body1" color="initial">
          Error
        </Typography>
      </Box>
    );
  }
  if (data && !isLoading) {
    return (
      <div className="app details-page">
        <div className="details">
          <div className="big-img">
            <img src={`../${data.imageLink[index]}`} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{data.productName}</h2>
              <span>${data.price}</span>
            </div>
            {/* <Colors colors={item.colors} /> */}

            <p>{data.description}</p>

            <DetailsThumb
              images={data.imageLink}
              tab={handleTab}
              myRef={myRef}
            />
            {selectedProductsID.includes(data.id) ? (
              <Box
                component="div"
                style={{ display: "flex", alignItems: "center", marginTop: "30px" }}
              >
                <IconButton
                  color="primary"
                  sx={{ mr: "10px" }}
                  onClick={() => {
                    dispatch(decreaseQuantity(data));
                  }}
                >
                  <Remove fontSize="small" />
                </IconButton>
                <StyledBadge
                  badgeContent={
                    selectedProducts.find((ele) => ele.id === data.id).quantity
                  }
                  color="primary"
                />
                <IconButton
                  color="primary"
                  sx={{ ml: "10px" }}
                  onClick={() => {
                    dispatch(increaseQuantity(data));
                  }}
                >
                  <Add fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <Button
                sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1, mt: "30px" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  dispatch(addToCart(data));
                }}
              >
                <ShoppingCart sx={{fontSize: "18px", mr: 1}} /> Add to cart
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
