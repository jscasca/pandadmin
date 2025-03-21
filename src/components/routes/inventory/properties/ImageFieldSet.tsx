import React, { useEffect, useState } from "react";
import { DropZone } from "../../../elements/DropZone";

import {
  MdDragIndicator,
  MdOutlineClose,
  MdImageSearch,
  MdCloudUpload
} from "react-icons/md";

import './ImageFieldSet.css';

type Props = {
  propertyId: string;
  data: any;
  onSaveOrder: (images: String[]) => void;
  onSaveFile: (file: File) => void;
  onSaveUrl: (url: String) => void;
};

type Preview = {
  url?: string;
  file?: File;
  id: string;
};

export const ImageFieldSet = ({ data, onSaveOrder, onSaveFile, onSaveUrl, propertyId }: Props) => {
  console.log(onSaveOrder);
  const uploadUrl = `inventory/properties/${propertyId}/fakeimages`;
  console.log(uploadUrl);

  const [ imageUrl, setImageUrl ] = useState('');

  const [ images, setImages ] = useState<string[]>([]);

  const [ previews, setPreviews ] = useState<Preview[]>([]);

  useEffect(() => {
    if (!data) return;
    if (data.pictures) {
      setImages(data.pictures);
    }
    // filter previews here (check there are not in data when included)
  }, [data]);

  const handleMouseLeave = (ev: any) => {
    console.log('leaving contaienr', ev);
  };

  const handleMouseUp = (ev: any) => {
    console.log('mouse up: ', ev);
  }

  const previewUrl = () => {
    if (imageUrl.length > 0) {
      // add url preview
      const timestamp = (Date.now()).toString(36);
      setPreviews([...previews, {url: imageUrl, id: timestamp}]);
      setImageUrl('');
    }
  };

  const deletePreview = (id: string) => {
    return () => setPreviews(previews.filter(p => p.id !== id));
  };
  // const deleteFilePreview = (i: number) => {};

  const onDrop = (file: File[]) => {
    const timestamp = (Date.now()).toString(36);
    setPreviews([...previews, {file: file[0], id: timestamp}]);
    // const nextUpload = { file: file };
  }

  return (<>
    <div className="form-edit">
      <h2>Imagenes</h2>
      <div className="container" onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp}>
        <div className="image-gallery">
          { images.map((img, i) => (<GalleryImage url={img} key={i.toString()} index={i} />))}
          { previews.map((preview) => {
            return preview.url ?
              <UrlPreview url={preview.url} key={preview.id} onSave={onSaveUrl} onDelete={deletePreview(preview.id)} /> :
              <FilePreview file={preview.file} key={preview.id} onSave={onSaveFile} onDelete={deletePreview(preview.id)} />
          })}
          <div className="image-uploader">
            <div className="input-selector">
              <div className="input-wraper">
                <input placeholder="URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} /><button onClick={previewUrl}><MdImageSearch /></button>
              </div>
            </div>
            <DropZone onDrop={onDrop} />
          </div>
        </div>
        {/* <DropZone uploadUrl={uploadUrl} /> */}
      </div>


    </div>
  </>);
};

type FilePreviewProps = {
  file: File | undefined;
  onSave: (f: File) => void;
  onDelete: () => void;
}

const FilePreview = ({ file, onSave, onDelete }: FilePreviewProps) => {

  const [ upload ] = useState(file);
  const [ preview, setPreview ] = useState<any>({});
  const [ ready, setReady ] = useState(false);

  useEffect(() => {
    if (!upload) return;
    const previewFile = (f: File) => {
      console.log('about to read: ', f);
      const reader = new FileReader();
      let error;
      if (!window.FileReader) {
        error = 'No file reader';
      }
      if (!['image/jpeg', 'image/png'].includes(f.type)) {
        error = 'No accepted type'
      }
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (f.size > maxSize) {
        error = 'File too large'
      }
      if (!(f instanceof Blob)) {
        error = 'Cant read file'
      }
      if (f instanceof Blob) {
        console.log('is a file blob');
      }
      if (!error) {
        reader.readAsDataURL(f);
        reader.onload = () => {
          const prevStyle = {
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundColor: 'black',
            backgroundImage: 'url(' + reader.result + ')'
          }
          setPreview(prevStyle);
          setReady(true);
        };
      } else {
        console.log('display error: ', error);
      }
      
    };
    previewFile(upload);
  }, [upload, setPreview]);

  const saveFile = () => {
    if (upload !== undefined)
      onSave(upload)
  };

  console.log(file)

  return (<>
    <div className="gallery-image-container">
    <div className="left-padding" />
    <div className="image-holder">
      { ready && <div className="gallery-image" style={preview}></div>}
      <div className="gallery-preview-overlay">
        { ready ? <>
          <div className="preview-save" onClick={saveFile}>
            <MdCloudUpload />
          </div>
          <div className="preview-delete" onClick={onDelete}>
            <MdOutlineClose />
          </div>
        </> : <img src="/loading-gif.gif" alt="loading..." />}
      </div>
    </div>
    <div className="right-padding"/>
    </div>
  </>);
}

type UrlPreviewProps = {
  url: string;
  onSave: (url: String) => void;
  onDelete: () => void;
};

const UrlPreview = ({ url, onSave, onDelete }: UrlPreviewProps) => {

  const divStyle = {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundColor: 'black',
    backgroundImage: 'url(' + url + ')'
  };

  return (<>
    <div className="gallery-image-container">
    <div className="left-padding" />
    <div className="image-holder">
      <div className="gallery-image" style={divStyle}></div>
      <div className="gallery-preview-overlay">
        <div className="preview-save" onClick={() => onSave(url)}>
          <MdCloudUpload />
        </div>
        <div className="preview-delete" onClick={onDelete}>
          <MdOutlineClose />
        </div>
      </div>
    </div>
    <div className="right-padding"/>
    </div>
  </>);
}

type GalleryProps = {
  url: string;
  index: number;
  onDelete?: () => void
}

const GalleryImage = ({ url, index, onDelete }: GalleryProps) => {

  const divStyle = {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundColor: 'black',
    backgroundImage: 'url(' + url + ')'
  };

  const handleMouseDown = (ev: any) => {
    console.log(ev);
    ev.preventDefault();
  };

  const handleMouseUp = (ev: any) => {
    console.log(ev);
  }

  return (<>
    <div className="gallery-image-container" key={index}>
      <div className="left-padding" onMouseUp={handleMouseUp} />
      <div className="image-holder">
        <div className="gallery-actions">
          <div className="drag" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            <MdDragIndicator />
          </div>
          <div className="delete" onClick={onDelete}>
            <MdOutlineClose />
          </div>
        </div>
        <div className="gallery-image" style={divStyle}></div>
        <div className="gallery-name"></div>
      </div>
      <div className="right-padding" onMouseUp={handleMouseUp}/>
    </div>
  </>);
};