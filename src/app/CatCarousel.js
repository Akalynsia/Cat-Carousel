"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const CatCarousel = () => {
  // Use States
  const [catImages, setCatImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  // Fetching API
  const fetchCatImages = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?limit=10"
      );
      setCatImages(response.data);
    } catch (error) {
      console.error("Error fetching cat images:", error);
    }
  };

  useEffect(() => {
    fetchCatImages();
  }, []); // Fetch images on component mount

  // Next Button
  const handleNextImage = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === catImages.length - 1 ? 0 : prevIndex + 1
      );
      setFadeIn(true);
    }, 500); // Wait for 500ms (same duration as the CSS transition) before updating the image
  };

  // Previous Button
  const handlePreviousImage = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? catImages.length - 1 : prevIndex - 1
      );
      setFadeIn(true);
    }, 500); // Wait for 500ms (same duration as the CSS transition) before updating the image
  };

  return (
    <div className="cat-carousel-container">
      <h2>Cat Carousel</h2>
      {catImages.length > 0 && (
        <div className="cat-image-container">
          {catImages.map((cat, index) => (
            <img
              key={index}
              src={cat.url}
              alt={`Cat ${index + 1}`}
              className={`cat-image ${
                fadeIn && currentImageIndex === index ? "fade-in" : "fade-out"
              }`}
              style={{
                display: currentImageIndex === index ? "block" : "none",
              }}
            />
          ))}
        </div>
      )}
      <div className="button-container">
        <button onClick={handlePreviousImage} className="nav-button">
          Previous Cat
        </button>
        <button onClick={handleNextImage} className="nav-button">
          Next Cat
        </button>
      </div>
    </div>
  );
};

export default CatCarousel;
