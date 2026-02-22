import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';

const Compressor = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState("");
  const [maxSizeMB, setMaxSizeMB] = useState(1);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [history, setHistory] = useState([]);

  // Clean up blob URLs on change
  const prevPreviewUrl = useRef(null);
  const prevCompressedUrl = useRef(null);

  useEffect(() => {
    if (prevPreviewUrl.current && prevPreviewUrl.current !== previewUrl) {
      URL.revokeObjectURL(prevPreviewUrl.current);
    }
    prevPreviewUrl.current = previewUrl;
  }, [previewUrl]);

  useEffect(() => {
    if (prevCompressedUrl.current && prevCompressedUrl.current !== compressedUrl) {
      const inHistory = history.some(h => h.blobUrl === prevCompressedUrl.current);
      if (!inHistory) {
        URL.revokeObjectURL(prevCompressedUrl.current);
      }
    }
    prevCompressedUrl.current = compressedUrl;
  }, [compressedUrl, history]);

  // Push in-feed ad when history changes
  useEffect(() => {
    if (history.length > 0) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // AdSense not loaded
      }
    }
  }, [history.length]);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      setError("Please upload a valid image file (JPEG, PNG, WEBP).");
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    setOriginalFile(file);
    setCompressedFile(null);
    setCompressedUrl(null);
    setProgress(0);
    setError("");
    setPreviewUrl(URL.createObjectURL(file));
  }, []);

  const handleCompress = async () => {
    if (!originalFile) return;

    setIsCompressing(true);
    setProgress(0);
    setError("");

    const options = {
      maxSizeMB: maxSizeMB,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      onProgress: (p) => setProgress(p),
    };

    try {
      const compressed = await imageCompression(originalFile, options);
      const blobUrl = URL.createObjectURL(compressed);
      setCompressedFile(compressed);
      setCompressedUrl(blobUrl);

      setHistory(prev => [
        {
          id: Date.now(),
          name: originalFile.name,
          originalSize: originalFile.size,
          compressedSize: compressed.size,
          savings: Math.round((1 - compressed.size / originalFile.size) * 100),
          blobUrl: blobUrl,
          timestamp: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    } catch (err) {
      console.error("Compression Error:", err);
      setError("An error occurred while compressing your image. Please try again.");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleReset = () => {
    setOriginalFile(null);
    setCompressedFile(null);
    setCompressedUrl(null);
    setPreviewUrl(null);
    setProgress(0);
    setError("");
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

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
    <>
      <article className="compressor-wrapper">
        {/* Dropzone */}
        {!originalFile && (
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? 'active' : ''}`}
            role="button"
            aria-label="Upload image for compression"
          >
            <input {...getInputProps()} />
            <span className="dropzone-icon" aria-hidden="true">📁</span>
            <p className="dropzone-text">
              {isDragActive
                ? "Drop your image right here!"
                : "Drag & drop an image here, or click to browse"}
            </p>
          </div>
        )}

        {/* File loaded — show preview + controls */}
        {originalFile && !compressedFile && !isCompressing && (
          <>
            {previewUrl && (
              <div className="preview-section">
                <div className="preview-box">
                  <div className="preview-box-label">Selected Image</div>
                  <img src={previewUrl} alt={`Preview of ${originalFile.name}`} className="preview-img" />
                </div>
              </div>
            )}

            <div className="slider-section">
              <div className="slider-header">
                <label htmlFor="quality-slider" className="slider-label">Max File Size</label>
                <span className="slider-value">{maxSizeMB} MB</span>
              </div>
              <input
                id="quality-slider"
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={maxSizeMB}
                onChange={(e) => setMaxSizeMB(parseFloat(e.target.value))}
                className="quality-slider"
                aria-label={`Maximum file size: ${maxSizeMB} megabytes`}
              />
            </div>

            <button onClick={handleCompress} className="compress-btn">
              🚀 Compress Image
            </button>
          </>
        )}

        {/* Compressing — show progress */}
        {isCompressing && (
          <div className="progress-section" role="status" aria-live="polite">
            {previewUrl && (
              <div className="preview-section">
                <div className="preview-box">
                  <div className="preview-box-label">Compressing...</div>
                  <img src={previewUrl} alt="Image being compressed" className="preview-img" />
                </div>
              </div>
            )}
            <div className="progress-label">Compressing... {progress}%</div>
            <div className="progress-bar-track" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Results */}
        {compressedFile && !isCompressing && (
          <section className="results-container" aria-label="Compression results">
            <div className="results-title">Compression Complete! 🎉</div>

            <div className="preview-section">
              <div className="preview-box">
                <div className="preview-box-label">Before</div>
                <img src={previewUrl} alt="Original image" className="preview-img" />
              </div>
              <div className="preview-box">
                <div className="preview-box-label">After</div>
                <img src={compressedUrl} alt="Compressed image" className="preview-img" />
              </div>
            </div>

            <div className="stats">
              <div className="stat-box">
                <div className="stat-label">Original</div>
                <div className="stat-value">{formatSize(originalFile.size)}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Compressed</div>
                <div className="stat-value">{formatSize(compressedFile.size)}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Saved</div>
                <div className="stat-value saved">
                  {Math.round((1 - compressedFile.size / originalFile.size) * 100)}%
                </div>
              </div>
            </div>

            <div className="btn-group">
              <a
                href={compressedUrl}
                download={`min-${originalFile.name}`}
                className="download-btn"
              >
                ⬇ Download
              </a>
              <button onClick={handleReset} className="reset-btn">
                🔄 Compress Another
              </button>
            </div>
          </section>
        )}

        {error && <div className="error-message" role="alert">{error}</div>}
      </article>

      {/* In-feed Ad between compressor and history */}
      {history.length > 0 && (
        <div className="ad-container ad-infeed">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="fluid"
            data-ad-layout-key="-6t+ed+2i-1n-4w"
          />
        </div>
      )}

      {/* Compression History */}
      {history.length > 0 && (
        <section className="history-section" aria-label="Compression history">
          <h2 className="history-title">📋 Compression History</h2>
          <div className="history-list">
            {history.map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-info">
                  <div className="history-name">{item.name}</div>
                  <div className="history-meta">
                    <span>{formatSize(item.originalSize)} → {formatSize(item.compressedSize)}</span>
                    <span className="history-saved">-{item.savings}%</span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>
                <a
                  href={item.blobUrl}
                  download={`min-${item.name}`}
                  className="history-download-btn"
                >
                  ⬇ Download
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Compressor;