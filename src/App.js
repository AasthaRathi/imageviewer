import React, { useState } from "react";

const App = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);

  const handleImageChange = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const newImages = Array.from(files).map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });
      });

      Promise.all(newImages).then((imageDataArray) => {
        setImages(imageDataArray);
        setCurrentImage(imageDataArray[0]);
      });
    }
  };

  const handleThumbnailClick = (image) => {
    setCurrentImage(image);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    if (currentImage === images[index]) {
      setCurrentImage(updatedImages[0] || null);
    }
  };

  return (
    <div
      style={{
        background: "#2c3e50",
        textAlign: "center",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      <div style={{ marginBottom: "20px", position: "absolute" }}>
        <label
          htmlFor="imageInput"
          style={{
            display: "inline-block",
            border: "2px dashed #fff",
            color: "#fff",
            padding: "2rem 4rem",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "2rem",
          }}
        >
          Choose Images
        </label>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          style={{ display: "none" }}
        />
      </div>
      <div
        style={{
          width: "80%",
          height: "60vh",
          objectFit: "contain",
          background: "rgba(255, 255, 255,0.2)",
          borderRadius: "6px",
          boxShadow: "0 0 4px rgba(52,73,94,1)",
        }}
      >
        {currentImage && (
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <span
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                cursor: "pointer",
                color: "white",
                fontSize: "18px",
                background: "rgba(0, 0, 0, 0.8)",
                padding: "5px",
                borderRadius: "50%",
              }}
              onClick={() => handleRemoveImage(images.indexOf(currentImage))}
            >
              &#x2715;
            </span>
            <img
              src={currentImage}
              alt="Current"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "10px",
          maxWidth: "100%",
          overflowX: "scroll",
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              border:
                currentImage === image
                  ? "2px solid #4CAF50"
                  : "2px solid transparent",
              borderRadius: "5px",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                cursor: "pointer",
                color: "white",
                fontSize: "14px",
                background: "rgba(0, 0, 0, 0.5)",
                padding: "3px",
                borderRadius: "50%",
              }}
              onClick={() => handleRemoveImage(index)}
            >
              &#x2715;
            </span>
            <img
              src={image}
              alt={`Thumbnail ${index}`}
              style={{
                width: "100px",
                height: "100px",
                margin: "0 5px",
                cursor: "pointer",
              }}
              onClick={() => handleThumbnailClick(image)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
