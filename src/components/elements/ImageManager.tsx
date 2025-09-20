import React, { useState, useEffect, useContext } from "react";
import { MdOutlineSearch, MdCloudUpload } from "react-icons/md";
import { AxiosContext } from "../AxiosContext";
import { getUUID } from "./utils/utils";

type ImageManagerProps = {
  onSelect: (url: string) => void;
  // fetchImages: (filter: string) => Promise<string[]>; // fetch images from server
  // uploadImage: (file: File) => Promise<string>; // upload function
};

type GooseImg = {
  url: string;
  uploaded: number;
  filename: string;
}

const DEBOUNCE_DELAY = 400;
const PAGE_SIZE = 20;

export const ImageManager = ({ onSelect }: ImageManagerProps) => {
  console.log(onSelect);
  const { authAxios } = useContext(AxiosContext);
  
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [images, setImages] = useState<GooseImg[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [ loading, setLoading ] = useState(false);

  // Load images on mount & whenever filter changes
  // TODO: Fix this method!!
  useEffect(() => {
    let timer: any;
    const fetchImages = async () => {
      try {
        setLoading(true);
        // setError(null);

        const params = new URLSearchParams();
        if (filter) params.append("prefix", filter);
        params.append("limit", PAGE_SIZE.toString());

        const res = await authAxios.get(`/goosedrive/?${params.toString()}`);

        setImages(res);
        console.log(res);
      } catch (err: any) {
        // setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    // Run immediately on first mount
    if (filter === undefined) {
      fetchImages();
    } else {
      // Debounced run when filters change
      timer = setTimeout(fetchImages, DEBOUNCE_DELAY);
    }

    return () => clearTimeout(timer);
  }, [filter, authAxios]);

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

  const uploadImage = async (file: any): Promise<GooseImg> => {
    const uid = getUUID();
    try {
      setImages((prev) => [{url: '/loading-gif.gif', uploaded: 0, filename: uid}, ...prev]);
      const updates = { image: file };
      const opts = { headers: { 'Content-Type': 'multipart/form-data'}};
      const uploaded = await authAxios.post(`/goosedrive/`, updates, opts);
      console.log(uploaded);
      setImages((prev) => {
        console.log(prev);
        const updated = [...prev];
        return updated.map((i) => {
          return i.filename === uid ? { url: uploaded.url, uploaded: 0, filename: ''} : i;
        });
      });
    } catch (e) {
      setImages((prev) => {
        console.log(prev);
        const updated = [...prev];
        return updated.filter((i) => i.filename !== uid);
      });
    }
    //
    console.log(file);
    return { url: '/loading-gif.gif', uploaded: -1, filename: ''};
  };

  const handleUpload = async () => {
    if (file) {
      await uploadImage(file);
      // setImages((prev) => [url, ...prev]); // prepend new image
      setFile(null);
      setPreview(null);
    }
  };

  return (
    <div className="image-manager">
      {/* Drop and preview */}
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
          <div onClick={() => { if(img.uploaded !== -1 )onSelect(img.url)}} className="gallery-img" key={img.url}>
            <img src={img.url} alt="gallery-item" />
          </div>
        ))}
      </div>

      {/* Loading */}
      { loading && <div className="row"><img alt='loading' src='/loading-gif.gif' /></div>}



      {/* Dropzone */}
      { !preview && <div
        className="dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <MdCloudUpload size={40} />
        <p>Da click o arrastra una imagene para subir</p>
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
              Subir
            </button>
            <button className="btn-secondary" onClick={() => { setFile(null); setPreview(null); }}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};