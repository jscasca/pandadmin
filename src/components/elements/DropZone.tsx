import React, { /*useCallback, useState,*/ useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { MdFileDownload } from "react-icons/md";

import './DropZone.css';
// import { FileUpload } from "./FileUpload";

type Props = {
  onDrop: (f: any) => void;
};

export const DropZone = ({ onDrop }: Props) => {

  const { getRootProps, getInputProps, isDragActive /*, acceptedFiles */ } = useDropzone({ onDrop });
  useEffect(() => {},[]);

  // const upload = (file: any, onUploadProgress: any) => {
  //   const formData = new FormData();
  //   formData.append('image', file);
  //   try {
  //     authAxios.post('/inventory/properties/fakeimages', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }, 
  //       onUploadProgress
  //     });
  //   } catch (e) {
  //     //
  //   }
  // };

  return (<>
    <div {...getRootProps({ className: 'drop-zone'})} >
      <input className="input-zone" {...getInputProps()} />
      <div className="text-center">
        { isDragActive ? (
          <><MdFileDownload /><p>Release to upload</p></>
        ) : (
          <><MdFileDownload /><p>Click or drop a file</p>
          </>
        )}
      </div>
    </div>
    <div className="drop-queue">
      {/* {files} */}
      {/* { uploads.map((u) => (<FileUpload file={u.file} url={uploadUrl} />))} */}
    </div>
  </>);
};