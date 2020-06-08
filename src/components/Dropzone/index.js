import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { FiUpload } from 'react-icons/fi';

import './styles.css';

const  MyDropzone = ({onFileUploaded}) => {
  const [ selectedFileURL, setSelectedFileURL ] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileURL(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop
  })

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} />
      <p><FiUpload /> Drop zone</p>
    </div>
  )
}

export default MyDropzone;