

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

      const response = await fetch(
        `${API_URL}?access_key=${API_KEY}&url=${encodeURIComponent(url)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const imageUrl = response.url; // Apiflash directly returns the image URL

      setScreenshots((prevScreenshots) => [...prevScreenshots, imageUrl]);
      alert(`Screenshot ${screenshots.length + 1} captured successfully!`);
    } catch (error) {
      console.error("Error fetching screenshots:", error);
      alert("Failed to fetch screenshot. Please check the URL or API key.");
    } finally {
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
        <div style={styles.scrollableContainer}>
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
  scrollableContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: "20px",
    overflowY: "400px",
    maxHeight: "auto", // Maximum height to ensure scroll
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
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
    width: "100%",
    minWidth: "200px", // Minimum width for each screenshot
  },
  screenshot: {
    width: "100%",
    height: "auto",
    borderRadius: "4px",
  },
  caption: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
  },
};

export default ScreenshotApp;
