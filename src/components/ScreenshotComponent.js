// import React, { useState } from "react";
// import html2canvas from "html2canvas";

// const ScreenshotComponent = () => {
//   const [screenshotCount, setScreenshotCount] = useState(1); // Counter for screenshots

//   const handleScreenshot = async () => {
//     // Hide the button before taking the screenshot
//     const buttonElement = document.getElementById("screenshot-button");
//     if (buttonElement) buttonElement.style.display = "none";

//     // Allow the button to hide properly before capturing
//     setTimeout(async () => {
//       const element = document.body; // Capture the entire page
//       const canvas = await html2canvas(element, {
//         width: window.innerWidth,
//         height: window.innerHeight,
//         scale: 1, // Capture at desktop size
//       });

//       // Convert canvas to image data
//       const imgData = canvas.toDataURL("image/png");

//       // Create a file name using the screenshot count
//       const fileName = `screenshot${screenshotCount}.png`;

//       // Trigger download
//       const link = document.createElement("a");
//       link.href = imgData;
//       link.download = fileName;
//       link.click();

//       // Increment screenshot count
//       setScreenshotCount((prevCount) => prevCount + 1);

//       // Show the button again after the screenshot is taken
//       if (buttonElement) buttonElement.style.display = "block";
//     }, 100); // Small delay to ensure the button hides before the screenshot
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         margin: 0,
//         padding: 0,
//         backgroundColor: "#f8f9fa",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <h1 style={{ marginBottom: "20px" }}>Screenshot Page</h1>
//       <p style={{ marginBottom: "20px" }}>Hi my name is Nitish kumar i am from bihar</p>
//       <button
//         id="screenshot-button"
//         onClick={handleScreenshot}
//         style={{
//           padding: "10px 20px",
//           fontSize: "16px",
//           border: "none",
//           borderRadius: "5px",
//           backgroundColor: "#007BFF",
//           color: "#fff",
//           cursor: "pointer",
//         }}
//       >
//         Take Screenshot
//       </button>
//     </div>
//   );
// };

// export default ScreenshotComponent;

//Frontend application 1.create one input field which is take any website url from user
//  2.fetching url 
// 3.taking 3-4 screenshots from fetched url 
// 4.store screenshots in any array 
// 5.create button for displaying captured screenshots

//code
import React, { useState } from "react";

const ScreenshotApp = () => {
  const [url, setUrl] = useState("");
  const [screenshots, setScreenshots] = useState([]);
  const [showScreenshots, setShowScreenshots] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const fetchScreenshots = async () => {
    if (!url) {
      alert("Please enter a valid URL");
      return;
    }
    setLoading(true);
    try {
      const API_URL = "https://api.apiflash.com/v1/urltoimage";
      const API_KEY = "553daca1853f44e2b631c74ad9d0751e";

      // Fetch a single screenshot
      const response = await fetch(
        `${API_URL}?access_key=${API_KEY}&url=${encodeURIComponent(url)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const imageUrl = response.url; // Apiflash directly returns the image URL

      // Append the new screenshot to the existing array
      setScreenshots((prevScreenshots) => [...prevScreenshots, imageUrl]);
      alert(`Screenshot ${screenshots.length + 1} captured successfully!`);
    } catch (error) {
      console.error("Error fetching screenshots:", error);
      alert("Failed to fetch screenshot. Please check the URL or API key.");
    }
    finally {
      setLoading(false); 
    }

  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Website Screenshot App</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={url}
          onChange={handleInputChange}
          placeholder="Enter website URL (e.g., https://example.com)"
          style={styles.input}
        />
       <button onClick={fetchScreenshots} style={styles.button} disabled={loading}>
          {loading ? "Capturing..." : "Capture Screenshot"}
        </button>
      </div>
      {screenshots.length > 0 && (
        <button
          onClick={() => setShowScreenshots(!showScreenshots)}
          style={styles.toggleButton}
        >
          {showScreenshots ? "Hide Screenshots" : "Show Screenshots"}
        </button>
      )}
      {showScreenshots && (
        <div style={styles.grid}>
          {screenshots.map((screenshot, index) => (
            <div key={index} style={styles.screenshotContainer}>
              <img
                src={screenshot}
                alt={`Screenshot ${index + 1}`}
                style={styles.screenshot}
              />
              <p style={styles.caption}>Screenshot {index + 1}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// CSS styles as a JavaScript object
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f7f7f7",
    minHeight: "100vh",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    width: "300px",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 15px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  toggleButton: {
    backgroundColor: "#28A745",
    color: "white",
    padding: "10px 15px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)", // 4 screenshots per row
    gap: "20px",
    marginTop: "20px",
  },
  screenshotContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    overflow: "hidden",
  },
  screenshot: {
    width: "100%",
    height: "auto",
    borderRadius: "4px",
    maxWidth: "200px",
  },
  caption: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
  },
};

export default ScreenshotApp;
