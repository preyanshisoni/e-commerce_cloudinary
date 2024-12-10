
import React, { useEffect, useState } from "react";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductsByCategoryId,
  fetchUniqueCategory,
  fetchCategories,
  setSearchTerm,
  fetchDataBySectionId,
} from "./redux/productSlice";
import { useNavigate } from "react-router";
import Products from "../All_Json/NewJson.json";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Shimmer from "./Shimmer";

export default function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showHoverDiv, setShowHoverDiv] = useState(false);
  const [BulkProduct, setBulkProduct] = useState([]);
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });
  const [loadingshimmer, setLoadingshimmer] = useState({});

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

const handlePageChange = (event, value) => {
  setCurrentPage(value);
};

  const {
    products,
    searchTerm,
    loading,
    uniqueCategories,
    fetchCategory,
    fetchDataSectionId,
  } = useSelector((state) => state.products);

  // const menCategories = fetchCategory.filter((item) => item.sectionId === 1);
  // const womenCategories = fetchCategory.filter((item) => item.sectionId === 2);

  console.log("FetchCategory data", fetchCategory)
  const [activeCategory, setActiveCategory] = useState("");


  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUniqueCategory());
    dispatch(fetchCategories());
    dispatch(fetchDataBySectionId(1));
  }, [dispatch]);

  
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      clearTimeout(scrollTimeout);
    
      if (currentScroll > scrollPosition) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }

      setScrollPosition(currentScroll);

      
      setScrollTimeout(
        setTimeout(() => {
          setIsNavbarVisible(true);
        }, 600)
      );
    };


    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [scrollPosition, scrollTimeout]);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const ProductDetails = (product) => {
    navigate("/ProductDetails", {state:{product}});
  };

  const addProductInBulk = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/products/addproductinbulk",
        Products
      );
      const responseData = response.data;
      setBulkProduct(responseData.data);
      if (response.status === 201) {
        alert("Product added successfully");
      }
    } catch (err) {
      console.log("Error Posting Products", err);
    }
  };

  const handleClick = (category) => {
    setActiveCategory(category);
    navigate(`/${category}`);
  };

  const handleHover = (e, categoryName) => {
    const rect = e.target.getBoundingClientRect();
    setShowHoverDiv(true);
    setHoverPosition({ top: rect.bottom + window.scrollY, left: rect.left });
    setActiveCategory(categoryName);
  };

  const handleImageError = (productId) => {
    setLoadingshimmer((prevState) => ({
      ...prevState,
      [productId]: true,
    }));
  };

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

const currentProducts = products.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

  return (
    <>
       <Navbar
        isNavbarVisible={isNavbarVisible}
        activeCategory={activeCategory}
        handleClick={handleClick}
        // handleHover={handleHover}
        showHoverDiv={showHoverDiv}
        setHoverPosition={setHoverPosition}
        setActiveCategory={setActiveCategory}
        setShowHoverDiv={setShowHoverDiv}

        hoverPosition={hoverPosition}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <div className="main-div-product">
        {/* <button  onClick={addProductInBulk}>Add Products</button> */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          // products
          currentProducts
            .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((product) => (
              <Card key={product.id} sx={{ width: 338, height: 400, margin: "16px", boxShadow: 3 }} onClick={()=>{ProductDetails(product)}}>
                <div className="img-card">
                  {loadingshimmer[product.id] && <Shimmer />}
                  <CardMedia
                    component="img"
                    width="100%"
                    image={product.images}
                    alt={product.name}
                    onLoad={() => setLoadingshimmer(false)}
                    onError={() => handleImageError(product.id)}
                    style={{ display: loadingshimmer[product.id] ? "none" : "block" }}
                  />
                </div>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.name}
                    
                  </Typography>
                  <Typography variant="body1" component="div" sx={{ fontWeight: "bold" }}>
                    Rs.{product.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Brand: {product.brand}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="medium" variant="outlined" color="white">
                    Add to Cart
                  </Button>
                  <Button size="medium" variant="contained" style={{ backgroundColor: "#813CDF", marginLeft: "75px" }}>
                    Buy Now
                  </Button>
                </CardActions>
              </Card>
            ))
        )}
  </div>
<div className="pagination">
<Stack  spacing={2} alignItems="left">
      <Pagination
        count={totalPages}
        page={currentPage} 
        onChange={handlePageChange} 
        color="primary" 
      />
    </Stack>
    </div>
      

    </>
  );
}
