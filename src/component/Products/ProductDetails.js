

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import './ProductDetails.css';
import { CardMedia, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function ProductDetails() {
  const location = useLocation();
  const { product } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHoverDiv, setShowHoverDiv] = useState(false);

  const thumbnails = ["https://rukminim2.flixcart.com/image/850/1000/xif0q/t-shirt/x/g/e/l-mens-t-shirt-5056-chakudee-fashion-original-imagmxgycyhhb5bh.jpeg?q=90&crop=false",
    "https://veirdo.in/cdn/shop/files/imgpsh_fullsize_anim_22.jpg?v=1727329384",
"https://static.ticimax.cloud/5334/uploads/urunresimleri/thumb/madmext-erkek-beyaz-tisort-5381-381-a8.jpg"];

  useEffect(() => {
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnails.length);
    }, 2000);

    return () => clearInterval(interval); 
  }, [thumbnails.length]);

  return (
    <>
      {/* <Navbar isNavbarVisible={true} showHoverDiv={showHoverDiv} setShowHoverDiv={setShowHoverDiv} /> */}
      <div className="main-div-details">
        <div className="thumbnail-gallery">
          {thumbnails.map((thumbnail, index) => (
            <img
              style={{ width: "140px", height: "140px" }}
              key={index}
              src={thumbnail}
              alt={`thumbnail-${index}`}
              className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
        <div className="product-image">
          <CardMedia
            component="img"
            width="100%"
            height="100%"
            image={thumbnails[currentIndex]}
            alt={product?.name}
          />
        </div>

        <div className="product-details-container">
          <div className='first'>
            <h2>{product?.name}</h2>
            <div className="product-rating">
              <span className="rating-score">3.8</span>
              <StarIcon className="star-icon" />
              <span className="rating-count">125 Ratings, 54 Reviews</span>
            </div>
            <p className="delivery-info">Free Delivery</p>
            <h3>₹{product?.price.toFixed(2)}</h3>
          </div>
          <h3 style={{ marginTop: "6px" }}>Product Details</h3>
          <div className="product-description">
            <p>{product?.description}
              <br />
              Name : Standard Slim Fit Cotton Cargo Casual
              Shirt <br />Fabric : Cotton Sleeve <br />Length : Long Sleeves <br />Pattern :Printed <br />Net Quantity (N) : 1 <br />
              <h3 style={{ marginTop: "8px" }}>Sizes</h3>  S (Chest Size : 38 in, Length Size: 27 in)<br />M (Chest Size : 40 in, Length Size: 28 in) <br />L (Chest Size : 42 in, Length Size: 28 in) <br /> XL (Chest Size : 44 in, Length Size: 29 in) <br /> XXL (Chest Size : 46 in, Length Size: 30.5 in)
                solid opaque Casual shirt ,has a spread collar, button placket, 2 flap pocket, long regular sleeves, curved hem
                <br /> Country of Origin : India
            </p>
          </div>
          <div className="product-actions">
            <Button style={{backgroundColor:"#4f62fe"}} variant="contained" className="add-to-cart-btn">Add to Cart</Button>
            <Button variant="contained" color="success" className="buy-now-btn">Buy Now</Button>
          </div>
        </div>
      </div>
    </>
  );
}
