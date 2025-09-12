import React, { useEffect, useState } from "react";
import { MdCloudUpload, MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineClose, MdOutlineSearch } from "react-icons/md";
import { DropZone } from "../DropZone";
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

  const [ manager ] = useState(false);

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

  const filterSearch = async (filter: string) => {
    console.log(filter)
    return [];
  };

  const uploadFile = async (file: File): Promise<string> => {
    console.log(file)
    return ''
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

    { manager && <ImageManager2 /> }

    { !widget && <div className="row centered">
      <button onClick={() => setWidget(true)}><MdCloudUpload /></button>
    </div>}

    { widget && <ImageManager fetchImages={filterSearch} uploadImage={uploadFile}/>}

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

const GalleryImage = ({ url, caption, bumpUp, remove, bumpDown, onSave }: GalleryProps) => {

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

const ImageManager2 = () => {

  const [ filter, setFilter ] = useState('');

  // fetch first
  const [ images, setImages ] = useState(['https://iili.io/Kxs6B2V.jpg','https://iili.io/2NUqSoX.jpg', 'https://iili.io/2GtvoPe.png']);

  const [ preview, setPreview ] = useState<any>(null);

  const search = () => {
    setImages([]);
  }

  const onDrop = (file: File[]) => {
    console.log(file);
    console.log(file[0]);
    setPreview(file[0]);
    // setPreview(file[0]);
  }

  const uploadFile = () => {
    console.log('uploading file: ', preview);
  };

  return (<>
  <div className="image-drive">
    <div className="controls">
      <div className="icon-field">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={search}><MdOutlineSearch /><MdCloudUpload /></button>
      </div>
      <div className=""><DropZone onDrop={onDrop} /></div>
    </div>
    <div className="preview">
    { preview && <PreviewImage file={preview} onSave={uploadFile} onRemove={() => setPreview(null)} />}
    </div>
    <div className="gallery">
    {images.map((img: any) => (
      <div className="gallery-img"><img src={img} alt={'some'} /></div>
    )) }
    </div>

  </div>
  </>);
};

type PreviewProps = {
  file: File | undefined;
  onSave: (f: File) => void;
  onRemove: () => void;
};

const PreviewImage = ({ file, onSave, onRemove }: PreviewProps) => {

  console.log('preview: ' , file)
  const [ upload ] = useState(file);
  const [ preview, setPreview ] = useState({});
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
    if (upload !== undefined) {
      onSave(upload);
    }
  };

  return (<>
  <div className="gallery-card">
    <div className="image-holder">
      { ready ? <div className="preview-actions">
        <div className="bumpup">
          <button onClick={saveFile}><MdKeyboardArrowUp /></button>
        </div>
        <div className="delete">
          <button onClick={onRemove}><MdOutlineClose /></button>
        </div>
      </div> : <img src="/loading-gif.gif" alt="loading..." />}
      { ready && <div className="gallery-image" style={preview}></div>}
      {/* <div className="image" style={imgStyle}></div> */}
    </div>
  </div>
  </>);
};