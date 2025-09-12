import React, { useState, useEffect } from "react";
import { MdOutlineSearch, MdCloudUpload, MdOutlineClose } from "react-icons/md";

type ImageManagerProps = {
  fetchImages: (filter: string) => Promise<string[]>; // fetch images from server
  uploadImage: (file: File) => Promise<string>; // upload function
};

export const ImageManager = ({ fetchImages, uploadImage }: ImageManagerProps) => {
  const [filter, setFilter] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Load images on mount & whenever filter changes
  useEffect(() => {
    fetchImages(filter).then(setImages);
  }, [filter]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleUpload = async () => {
    if (file) {
      const url = await uploadImage(file);
      setImages((prev) => [url, ...prev]); // prepend new image
      setFile(null);
      setPreview(null);
    }
  };

  return (
    <div className="image-manager">
      {/* Drop and preview */}

      {/* Dropzone */}
      { !preview && <div
        className="dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <MdCloudUpload size={40} />
        <p>Click or drag an image here to upload</p>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>}

      {/* Preview before upload */}
      {preview && (
        <div className="preview">
          <img src={preview} alt="preview" />
          <div className="preview-actions">
            <button className="btn-primary" onClick={handleUpload}>
              Upload
            </button>
            <button className="btn-secondary" onClick={() => { setFile(null); setPreview(null); }}>
              <MdOutlineClose /> Discard
            </button>
          </div>
        </div>
      )}
      {/* Filter and Gallery */}
      {/* Search bar */}
      <div className="controls">
        <div className="input-with-icon">
          <input
            type="text"
            placeholder="Search images..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button><MdOutlineSearch /></button>
        </div>
        
      </div>

      {/* Gallery */}
      <div className="gallery">
        {images.map((img) => (
          <div className="gallery-img" key={img}>
            <img src={img} alt="gallery-item" />
          </div>
        ))}
      </div>
    </div>
  );
};