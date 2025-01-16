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
  onSave: () => void;
};

type Preview = {
  url?: string;
  file?: File;
};

export const ImageFieldSet = ({ data, onSave, propertyId }: Props) => {
  console.log(onSave);
  const uploadUrl = `inventory/properties/${propertyId}/fakeimages`;

  const [ imageUrl, setImageUrl ] = useState('');

  const images = [
    'https://www.cronyxdigital.com/hubfs/Blog%20Images/Cronyx%20blog%20post%20images%20-%202.png',
    'https://www.cronyxdigital.com/hubfs/Blog%20Images/Cronyx%20blog%20post%20images%20-%202.png',
    'https://www.cronyxdigital.com/hubfs/Blog%20Images/Cronyx%20blog%20post%20images%20-%202.png'
  ];

  const [ previews, setPreviews ] = useState<Preview[]>([]);

  useEffect(() => {
    console.log('load data', data);
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
      setPreviews([...previews, {url: imageUrl}]);
      setImageUrl('');
    }
  };

  const saveUrl = () => {};
  const saveFile = () => {};
  const deleteUrlPreview = () => {};
  const deleteFilePreview = () => {};

  const onDrop = (file: File) => {
    
  }

  return (<>
    <div className="form-edit">
      <h2>Imagenes</h2>
      <div className="container" onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp}>
        <div className="image-gallery">
          { images.map((img, i) => (<GalleryImage url={img} key={i.toString()} index={i} />))}
          { previews.map((preview, i) => {
            return preview.url ?
              <UrlPreview url={preview.url} key={preview.url + i} onSave={saveUrl} onDelete={deleteUrlPreview} /> :
              <FilePreview file={preview.file} key={i} onSave={saveFile} onDelete={deleteFilePreview} />
          })}
          <div className="image-uploader">
            <div className="input-selector">
              <div className="input-wraper">
                <input placeholder="URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} /><button onClick={previewUrl}><MdImageSearch /></button>
              </div>
            </div>
            <DropZone uploadUrl={uploadUrl} />
          </div>
        </div>
        {/* <DropZone uploadUrl={uploadUrl} /> */}
      </div>


    </div>
  </>);
};

type FilePreviewProps = {
  file: File | undefined;
  onSave: () => void;
  onDelete: () => void;
}

const FilePreview = ({ file }: FilePreviewProps) => {

  console.log(file)

  return (<>
    <div className="gallery-image-container">
      <p>File upload here</p>
    </div>
  </>);
}

type UrlPreviewProps = {
  url: string;
  onSave: () => void;
  onDelete: () => void;
};

const UrlPreview = ({ url, onSave, onDelete }: UrlPreviewProps) => {

  const divStyle = {
    backgroundSize: 'cover',
    backgroundImage: 'url(' + url + ')'
  };

  return (<>
    <div className="gallery-image-container">
    <div className="left-padding" />
    <div className="image-holder">
      <div className="gallery-image" style={divStyle}></div>
      <div className="gallery-preview-overlay">
        <div className="preview-save" onClick={onSave}>
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
    backgroundSize: 'cover',
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