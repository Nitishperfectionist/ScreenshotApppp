import React, { useState } from "react";
import html2canvas from "html2canvas";

const ScreenshotComponent = () => {
  const [screenshotCount, setScreenshotCount] = useState(1); // Counter for screenshots

  const handleScreenshot = async () => {
    // Hide the button before taking the screenshot
    const buttonElement = document.getElementById("screenshot-button");
    if (buttonElement) buttonElement.style.display = "none";

    // Allow the button to hide properly before capturing
    setTimeout(async () => {
      const element = document.body; // Capture the entire page
      const canvas = await html2canvas(element, {
        width: window.innerWidth,
        height: window.innerHeight,
        scale: 1, // Capture at desktop size
      });

      // Convert canvas to image data
      const imgData = canvas.toDataURL("image/png");

      // Create a file name using the screenshot count
      const fileName = `screenshot${screenshotCount}.png`;

      // Trigger download
      const link = document.createElement("a");
      link.href = imgData;
      link.download = fileName;
      link.click();

      // Increment screenshot count
      setScreenshotCount((prevCount) => prevCount + 1);

      // Show the button again after the screenshot is taken
      if (buttonElement) buttonElement.style.display = "block";
    }, 100); // Small delay to ensure the button hides before the screenshot
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
        padding: 0,
        backgroundColor: "#f8f9fa",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Screenshot Page</h1>
      <p style={{ marginBottom: "20px" }}>Hi my name is Nitish kumar i am from bihar</p>
      <button
        id="screenshot-button"
        onClick={handleScreenshot}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "#007BFF",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Take Screenshot
      </button>
    </div>
  );
};

export default ScreenshotComponent;
