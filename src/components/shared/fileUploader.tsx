import { UploadDropzone } from "@/lib/uploadthing";
import { useDropzone } from "@uploadthing/react";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
type fileUploaderProps = {
    imageSrc:string,
  onFieldChange: (value: string) => void;
  setImageSrc: Dispatch<SetStateAction<string>>;
};

const FileUploader = ({
    imageSrc,
  onFieldChange,    
    setImageSrc,
}: fileUploaderProps) => {
return(
    <>
    <UploadDropzone
    
    endpoint="imageUploader"
    onClientUploadComplete={(res) => {
      // Do something with the response
      console.log("Files: ", res);
      onFieldChange(res[0].url)
      setImageSrc(res[0].url)
    }}
    onUploadError={(error: Error) => {
      // Do something with the error.
      alert(`ERROR! ${error.message}`);
    }}
    
    /></>
)
};

export default FileUploader;
