import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setColors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/upload/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setColors(response.data.colors || []);
    } catch (error) {
      console.error("Error uploading image:", error);
      setColors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="image-generator">
        <h1 className="header">Image Generator</h1>

        <form className="upload-image-form" onSubmit={handleSubmit}>
          <h2 className="form-header">Upload your image</h2>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <button
            className="submit-image-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>

        {previewUrl && (
          <div className="preview-container">
            <h3 className="form-header">Preview</h3>
            <img className="preview-image" src={previewUrl} alt="Preview" />
          </div>
        )}

        {colors.length > 0 && (
          <div className="color-results">
            <h3 className="form-header">Top Colors</h3>
            <div className="color-swatches">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="color-swatch"
                  style={{ backgroundColor: color }}
                  title={color}
                >
                  {color}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
