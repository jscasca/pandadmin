import React, { useState } from "react";
import { MdCloudUpload, MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineClose } from "react-icons/md";
import { ImageManager } from "../ImageManager";

type Props = {
  initialData: any;
  onComplete: (data: any) => void;
};

// pictures [{url, caption}]
export const ImageStep = ({ initialData, onComplete }: Props) => {

  const [ pictures, setPictures ] = useState(initialData.pictures || []);

  const [ url, setUrl ] = useState('');
  const [ caption, setCaption ] = useState('');

  const [ preview, setPreview ] = useState(false);

  const [ widget, setWidget ] = useState(false);

  const addPicture = () => {
    console.log('adding pciture url: ', url);
    if (url === '') {
      // mark error and return
    } else {
      setPictures((prev: any[]) => [...prev, {url, caption}]);
      setUrl('');
      setCaption('');
      setPreview(false);
    }
   
  };

  const bumpUp = (i: number) => {
    if (i > 0) {
      setPictures((prev: any[]) => {
        const updated = [...prev];
        [updated[i - 1], updated[i]] = [updated[i], updated[i - 1]];
        return updated;
      });
    }
  };
  const bumpDown = (i: number) => {
    if (i < pictures.length - 1) {
      setPictures((prev: any[]) => {
        const updated = [...prev];
        [updated[i], updated[i + 1]] = [updated[i + 1], updated[i]];
        return updated;
      });
    }
  };
  const removePic = (i: number) => {
    setPictures((prev: any[]) => prev.filter((_, index) => index !== i));
  };

  const checkUrl = (e: any) => {
    setUrl(e.target.value);
    // set deferred call here
  };

  const previewUrl = () => {
    if (url !== '') {
      setPreview(true);
    } else {
      setPreview(false);
    }
  }

  const validate = () => {
    // check pictures array
    return true;
  };

  const handleNext = () => {
    if (validate()) {
      const imageData = {
        pictures
      }
      onComplete(imageData);
    }
  }

  const onSelect = async (url: string) => {
    console.log(url)
    // return [];
  };

  return (<>
  <div className="appform">
    <div className="row">
      <div className="notifications">{}</div>
      <button style={{marginLeft: 'auto', marginRight: '2.5rem'}} className="btn-primary" type='button' onClick={handleNext}>Siguiente</button>
    </div>

    {/* Gallery with drag and drop for re-ordering */}
    <div className="gallery aligned-column">
      {pictures.map((p: any, i: number) => (<div key={p.url} className="img-card">
        <GalleryImage
          url={p.url}
          caption={p.caption}
          remove={() => removePic(i)}
          bumpUp={i === 0 ? undefined : () => bumpUp(i)}
          bumpDown={i === pictures.length - 1 ? undefined : () => bumpDown(i)}
        />
      </div>))}
    </div>

    {/* Add next */}
    <div className="row">
      <div className="field">
        <input
          type='text'
          value={url}
          placeholder="URL"
          onChange={checkUrl}
          onBlur={previewUrl}
        />
      </div>
      <div className="field">
        <input
          type='text'
          value={caption}
          placeholder="caption"
          onChange={(e: any) => setCaption(e.target.value)}
        />
      </div>
    </div>
    { preview && <div className="aligned-column">
      <GalleryImage url={url} caption={caption} remove={() => {setPreview(false); setCaption(''); setUrl('');}} onSave={addPicture} />
    </div>}

    { !widget && <div className="row centered">
      <button onClick={() => setWidget(true)}><MdCloudUpload /></button>
    </div>}

    { widget && <ImageManager onSelect={onSelect} />}

    {/* { widget && <ImageManager fetchImages={filterSearch} uploadImage={uploadFile}/>} */}

  </div>
  </>);
};

type GalleryProps = {
  url: string;
  caption: string;
  bumpUp?: () => void;
  remove: () => void;
  bumpDown?: () => void;
  onSave?: () => void;
}

export const GalleryImage = ({ url, caption, bumpUp, remove, bumpDown, onSave }: GalleryProps) => {

  const imgStyle = {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundImage: 'url(' + url + ')'
  };

  return (<>
  <div className="gallery-card" key={url}>
    <div className="image-holder">
      <div className="gallery-actions">
        { onSave && <div className="">
          <button className="btn-primary" onClick={onSave}>Save</button>
        </div>}
        { bumpUp && <div className="bumpup">
          <button onClick={bumpUp}><MdKeyboardArrowUp /></button>
        </div>}
        <div className="delete">
          <button onClick={remove}><MdOutlineClose /></button>
        </div>
        { bumpDown && <div className="bumpdown">
          <button onClick={bumpDown}><MdKeyboardArrowDown /></button>
        </div>}
      </div>
      <div className="image" style={imgStyle}></div>
      <div className="caption">{caption}</div>
    </div>
  </div>
  </>);
};