import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useDispatch, useSelector } from 'react-redux';
import { Kitchen, VerticalAlignBottom } from '@mui/icons-material';
import {fetchProductsByCategoryId} from '../Products/redux/productSlice.js';

const Navbar = ({
  isNavbarVisible,
  activeCategory,
  handleClick,
  showHoverDiv,
  setShowHoverDiv,
  setHoverPosition,
  setActiveCategory,
  hoverPosition,
  searchTerm,
  handleSearchChange,
}) => {
  const { fetchCategory} = useSelector((state) => state.products);
  const dispatch = useDispatch();
  
  const menCategories = Array.from(
    new Set(fetchCategory.filter((item) => item.sectionId === 1).map((item) => item.categoryName))
  ).map((categoryName) => ({
    categoryName,
    subcategories: fetchCategory
      .filter((item) => item.categoryName === categoryName && item.sectionId === 1)
      .map((sub) => ({
        subId: sub.subId,
        subcategoryName: sub.subcategoryName,
      })),
  }));
  
  const womenCategories = Array.from(
    new Set(fetchCategory.filter((item) => item.sectionId === 2).map((item) => item.categoryName))
  ).map((categoryName) => ({
    categoryName,
    subcategories: fetchCategory
      .filter((item) => item.categoryName === categoryName && item.sectionId === 2)
      .map((sub) => ({
        subId: sub.subId,
        subcategoryName: sub.subcategoryName,
      })),
  }));
  
  const kidsCategories = Array.from(
    new Set(fetchCategory.filter((item) => item.sectionId === 3).map((item) => item.categoryName))
  ).map((categoryName) => ({
    categoryName,
    subcategories: fetchCategory
      .filter((item) => item.categoryName === categoryName && item.sectionId === 3)
      .map((sub) => ({
        subId: sub.subId,
        subcategoryName: sub.subcategoryName,
      })),
  }));

  const homeKitchen = Array.from(
    new Set(fetchCategory.filter((item) => item.sectionId === 4).map((item) => item.categoryName))
  ).map((categoryName) => ({
    categoryName,
    subcategories: fetchCategory
      .filter((item) => item.categoryName === categoryName && item.sectionId === 4)
      .map((sub) => ({
        subId: sub.subId,
        subcategoryName: sub.subcategoryName,
      })),
  }));

  const beauty = Array.from(
    new Set(fetchCategory.filter((item) => item.sectionId === 5).map((item) => item.categoryName))
  ).map((categoryName) => ({
    categoryName,
    subcategories: fetchCategory
      .filter((item) => item.categoryName === categoryName && item.sectionId === 5)
      .map((sub) => ({
        subId: sub.subId,
        subcategoryName: sub.subcategoryName,
      })),
  }));

  const electronics = Array.from(
    new Set(fetchCategory.filter((item) => item.sectionId === 6).map((item) => item.categoryName))
  ).map((categoryName) => ({
    categoryName,
    subcategories: fetchCategory
      .filter((item) => item.categoryName === categoryName && item.sectionId === 6)
      .map((sub) => ({
        subId: sub.subId,
        subcategoryName: sub.subcategoryName,
      })),
  }));

  const handleHover = (e, categoryName) => {
    const rect = e.target.getBoundingClientRect();
    setShowHoverDiv(true);
    setHoverPosition({ top: rect.bottom + window.scrollY, left: rect.left });
    setActiveCategory(categoryName);
  };

  const testing = (subid)=>{
      dispatch(fetchProductsByCategoryId(subid));
  }
  return (
    <div>
      {isNavbarVisible && (
        <AppBar position="fixed" style={{ backgroundColor: "#fff", color: "#333" }}>
          <Toolbar
            className={`navbar ${isNavbarVisible ? "" : "navbar-hidden"}`}
            // onMouseLeave={() => showHoverDiv(false)}
          >
            <Typography variant="h6" component="div" className="logo">
              <img src="N_Logo.jpg" alt="Logo" style={{ width: "100px" }} />
            </Typography>

            <Box className="nav-links" sx={{ display: "flex", gap: 3 }}>
              {['men', 'women', 'kids', 'home & Kitchen', 'beauty', 'electronics'].map((category) => (
                <Typography
                  key={category}

                  variant="h6"
                  component="a"
                  className={`nav-link ${activeCategory === category ? "highlighted" : ""}`}
                  onClick={() => handleClick(category)}
                  
                  onMouseMove={(e) => {
                    if (category === 'men' || category === 'women' || category === 'kids' || category === 'home & Kitchen' || category === 'beauty'|| category ==='electronics') {
                      handleHover(e, category);
                    }
                  }}

                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Typography>
              ))}
            </Box>
  {/*men*/}
  {showHoverDiv && activeCategory === 'men' && (
  <div
    onMouseLeave={() => setShowHoverDiv(false)}
    className="hover-div"
    style={{
      position: "absolute",
      top: hoverPosition.top,
      left: hoverPosition.left,
      background: "white",
      padding: "10px",
      borderRadius: "10px",
      zIndex: 1,
    }}
  >
    {menCategories.map((item) => (
      <div key={item.categoryName}>
        <Typography style={{fontSize:"16px" ,marginRight:"20px", marginBottom : "20px", color:"#4f62fe"}} variant="h6">{item.categoryName}</Typography>
        <Box sx={{ pl: 2 }}>
          {item.subcategories.map((sub) => (
            <Typography onClick={()=>{testing(sub.subId)}} key={sub.subId} variant="body2" style={{ marginLeft:"-15px", gap:"3px",marginBottom:"10px"}}>
              {sub.subcategoryName}
            </Typography>
          ))}
        </Box>
      </div>
    ))}
  </div>
)}

  {showHoverDiv && activeCategory === 'women' && (
  <div
    onMouseLeave={() => setShowHoverDiv(false)}
    className="hover-div"
    style={{
      position: "absolute",
      top: hoverPosition.top,
      left: hoverPosition.left,
      background: "white",
      padding: "10px",
      borderRadius: "10px",
      zIndex: 1,
    }}
  >
    {womenCategories.map((item) => (
      <div key={item.categoryName}>
        <Typography style={{fontSize:"16px" ,marginRight:"20px",  marginBottom : "20px", color:"#4f62fe"}} variant="h6">{item.categoryName}</Typography>
        <Box sx={{ pl: 2 }}>
          {item.subcategories.map((sub) => (
            <Typography onClick={()=>{testing(sub.subId)}} key={sub.subId} variant="body2" style={{ marginLeft:"-15px", gap:"3px", marginBottom:"10px"}}>
              {sub.subcategoryName}
            </Typography>
          ))}
        </Box>
      </div>
    ))}
  </div>
)}

  {showHoverDiv && activeCategory === 'kids' && (
  <div
    onMouseLeave={() => setShowHoverDiv(false)}
    className="hover-div"
    style={{
      position: "absolute",
      top: hoverPosition.top,
      left: hoverPosition.left,
      background: "white",
      padding: "10px",
      borderRadius: "10px",
      zIndex: 1,
    }}
  >
    {kidsCategories.map((item) => (
      <div key={item.categoryName}>
        <Typography style={{fontSize:"16px" ,marginRight:"20px",  marginBottom : "20px", color:"#4f62fe"}} variant="h6">{item.categoryName}</Typography>
        <Box sx={{ pl: 2 }}>
          {item.subcategories.map((sub) => (
            <Typography onClick={()=>{testing(sub.subId)}} key={sub.subId} variant="body2" style={{ marginLeft:"-15px", gap:"3px", marginBottom:"10px"}}>
              {sub.subcategoryName}
            </Typography>
          ))}
        </Box>
      </div>
    ))}
  </div>
)}
  {showHoverDiv && activeCategory === 'home & Kitchen' && (
  <div
    onMouseLeave={() => setShowHoverDiv(false)}
    className="hover-div"
    style={{
      position: "absolute",
      top: hoverPosition.top,
      left: hoverPosition.left,
      background: "white",
      padding: "10px",
      borderRadius: "10px",
      zIndex: 1,
    }}
  >
    {homeKitchen.map((item) => (
      <div key={item.categoryName}>
        <Typography style={{fontSize:"16px" ,marginRight:"20px",  marginBottom : "20px", color:"#4f62fe"}} variant="h6">{item.categoryName}</Typography>
        <Box sx={{ pl: 2 }}>
          {item.subcategories.map((sub) => (
            <Typography onClick={()=>{testing(sub.subId)}} key={sub.subId} variant="body2" style={{ marginLeft:"-15px", gap:"3px", marginBottom:"10px"}}>
              {sub.subcategoryName}
            </Typography>
          ))}
        </Box>
      </div>
    ))}
  </div>
)}

  {showHoverDiv && activeCategory === 'beauty' && (
  <div
    onMouseLeave={() => setShowHoverDiv(false)}
    className="hover-div"
    style={{
      position: "absolute",
      top: hoverPosition.top,
      left: hoverPosition.left,
      background: "white",
      padding: "10px",
      borderRadius: "10px",
      zIndex: 1,
    }}
  >
    {beauty.map((item) => (
      <div key={item.categoryName}>
        <Typography style={{fontSize:"16px" ,marginRight:"20px",  marginBottom : "20px", color:"#4f62fe"}} variant="h6">{item.categoryName}</Typography>
        <Box sx={{ pl: 2 }}>
          {item.subcategories.map((sub) => (
            <Typography onClick={()=>{testing(sub.subId)}} key={sub.subId} variant="body2" style={{ marginLeft:"-15px", gap:"3px", marginBottom:"10px"}}>
              {sub.subcategoryName}
            </Typography>
          ))}
        </Box>
      </div>
    ))}
  </div>
)}

  {showHoverDiv && activeCategory === 'electronics' && (
  <div
    onMouseLeave={() => setShowHoverDiv(false)}
    className="hover-div"
    style={{
      position: "absolute",
      top: hoverPosition.top,
      left: hoverPosition.left,
      background: "white",
      padding: "10px",
      borderRadius: "10px",
      zIndex: 1,
    }}
  >
    {electronics.map((item) => (
      <div key={item.categoryName}>
        <Typography style={{fontSize:"16px" ,marginRight:"20px",  marginBottom : "20px", color:"#4f62fe"}} variant="h6">{item.categoryName}</Typography>
        <Box sx={{ pl: 2 }}>
          {item.subcategories.map((sub) => (
            <Typography onClick={()=>{testing(sub.subId)}} key={sub.subId} variant="body2" style={{ marginLeft:"-15px", gap:"3px", marginBottom:"10px"}}>
              {sub.subcategoryName}
            </Typography>
          ))}
        </Box>
      </div>
    ))}
  </div>
)}






            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                padding: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "200px",
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }} className="navbar-icons">
              <IconButton href="#profile" aria-label="profile" color="inherit">
                <AccountCircle />
              </IconButton>
              <IconButton href="#wishlist" aria-label="wishlist" color="inherit">
                <FavoriteIcon />
              </IconButton>
              <IconButton href="#bag" aria-label="shopping bag" color="inherit">
                <ShoppingBagIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
};

export default Navbar;
