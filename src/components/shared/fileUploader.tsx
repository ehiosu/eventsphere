import React, { Dispatch, SetStateAction } from 'react'
type fileUploaderProps={
    imageUrl:string,
    onFieldChange:(value:string)=>void,
    setFiles:Dispatch<SetStateAction<File[]>>
}
const FileUploader = ({imageUrl,onFieldChange,setFiles}:fileUploaderProps) => {
  return (
    <div>

    </div>
  )
}

export default FileUploader