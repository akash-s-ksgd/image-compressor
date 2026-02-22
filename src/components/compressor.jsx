import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';

const Compressor = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback(async (acceptedFiles, fileRejections) => {
    // Handle invalid file types gracefully
    if (fileRejections.length > 0) {
      setError("Please upload a valid image file (JPEG, PNG, WEBP).");
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    setOriginalFile(file);
    setCompressedFile(null);
    setIsCompressing(true);
    setError("");

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressed = await imageCompression(file, options);
      setCompressedFile(compressed);
    } catch (err) {
      console.error("Compression Error:", err);
      setError("An error occurred while compressing your image. Please try again.");
    } finally {
      setIsCompressing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []
    },
    maxFiles: 1
  });

  return (
    <div className="compressor-wrapper">
      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        <p className="dropzone-text">
          {isDragActive 
            ? "Drop your image right here!" 
            : "Drag & drop an image here, or click to browse"}
        </p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {isCompressing && (
        <div style={{ marginTop: '20px', color: '#3b82f6', fontWeight: '500' }}>
          ⏳ Squishing your image...
        </div>
      )}
      
      {compressedFile && !isCompressing && (
        <div className="results-container">
          <h3>Compression Complete! 🎉</h3>
          
          <div className="stats">
            <div className="stat-box">
              <div className="stat-label">Original</div>
              <div className="stat-value">{(originalFile.size / 1024 / 1024).toFixed(2)} MB</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Compressed</div>
              <div className="stat-value">{(compressedFile.size / 1024 / 1024).toFixed(2)} MB</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Saved</div>
              <div className="stat-value" style={{ color: '#166534' }}>
                {Math.round((1 - compressedFile.size / originalFile.size) * 100)}%
              </div>
            </div>
          </div>
          
          <a 
            href={URL.createObjectURL(compressedFile)} 
            download={`min-${originalFile.name}`}
            className="download-btn"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
};

export default Compressor;