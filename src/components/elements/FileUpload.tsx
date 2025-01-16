import React, { useContext, useEffect, useState } from "react";
import './FileUpload.css';
import { AxiosContext } from "../AxiosContext";
import axios, { AxiosProgressEvent } from "axios";

type Props = {
  url: string;
  file: File;
  error?: string;
};

export const FileUpload = ({ url, file, error }: Props) => {

  const { authAxios } = useContext(AxiosContext);

  const [ upload ] = useState(file);

  const [uploadStatus, setUploadStatus] = useState('start');
  const [ progress, setProgress ] = useState(0);

  const useAxios = false;
  useEffect(() => {
    if (uploadStatus === 'start') {
      // start upload
      const formData = new FormData();
      formData.append('image', upload);
      console.log('form data: ', formData);
      console.log('file: ', upload);
      const objForm = {
        'image': upload
      };
      try {
        if (useAxios) {
          axios.post('http://localhost:3001/upload', objForm, {
            // authAxios.post(url, formData, {
              headers: {'Content-Type': 'multipart/form-data'},
              onUploadProgress: (ev: AxiosProgressEvent) => {
                const { loaded, total } = ev;
                const t = total ? total : 1;
                const percent = Math.floor((loaded * 100)/t);
                setProgress(percent);
              }
            }).then((r: any) => {
              console.log(r);
              setUploadStatus('finished');
            });
        } else {
          authAxios.post(url, objForm, {
            headers: {'Content-Type': 'multipart/form-data'},
            onUploadProgress: (ev: AxiosProgressEvent) => {
              const { loaded, total } = ev;
              const t = total ? total : 1;
              const percent = Math.floor((loaded * 100)/t);
              setProgress(percent);
            }
          }).then((r: any) => {
            console.log(r);
            setUploadStatus('finished');
          });
        }
        
        // authAxios.post('/inventory/properties/fakeimages2', formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   },
        //   onUploadProgress: (ev: ProgressEvent) => {
        //     const { loaded, total } = ev;
        //     const percent = Math.floor((loaded * 100)/total);
        //     setProgress(percent);
        //   }
        // }).then((r: any) => {
        //   console.log('finished:', r);
        //   setUploadStatus('finished');
        // });
        setUploadStatus('uploading');
      } catch (e) {
        //
        console.log('failed to axios', e);
      }
    } else {
      //
    }
  }, [uploadStatus, authAxios, upload, url, useAxios]);

  return (<>
  <div className="file-upload">
    { error ? (
      <p>Error: Failed to upload</p>
    ) : (
      <p>{file.name} - {progress}</p>
    )}
  </div>
  </>);
};