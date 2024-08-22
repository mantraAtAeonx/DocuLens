import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { apiConnector } from "@/services/apiConnector";

const FileUpload = ({ refreshList }) => {
  const [files, setFiles] = useState([]);

  const uploadToS3 = async () => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });

    const apiCall = apiConnector("POST", "/upload-invoice", formData);
    toast.promise(apiCall, {
      loading: "Uploading...",
      success: "Uploaded successfully!",
      error: (err) => err.response?.data?.detail || "Upload failed!",
    });
    apiCall
      .then((res) => {
        setFiles([]);
        refreshList();
      })
      .catch((error) => {
        console.error("Upload error: ", error);
      });
  };
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleUpload = async () => {
    if (files.length > 0) {
      uploadToS3();
    } else {
      toast.error("No files selected.");
    }
  };

  return (
    <div className="w-full bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Upload Files</h2>
      <div
        className="w-full h-32 border-2 border-dashed border-blue-700 flex flex-col justify-center items-center text-gray-500 rounded-lg cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p>Drag and drop files here, or click to select files</p>
        <input
          type="file"
          multiple
          className="hidden"
          id="fileInput"
          onChange={handleFileChange}
        />
        <label htmlFor="fileInput" className="mt-2">
          <Button variant="outlined" color="blue" className="relative">
            Choose Files
            <input
              type="file"
              multiple
              className="opacity-0 top-0 bottom-0 right-0 left-0 absolute cursor-pointer"
              onChange={handleFileChange}
            />
          </Button>
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-700 mb-2">Selected Files:</h3>
          <div className="flex gap-4">
            {files.map((file, index) => (
              <span
                key={index}
                onClick={() => {
                  setFiles(files.filter((_, idx) => idx !== index));
                }}
                className="py-1 px-4 bg-amber-400 rounded-full cursor-pointer select-none hover:bg-gray-400"
              >
                {file.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <Button variant="gradient" color="green" onClick={handleUpload}>
          Upload Files
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
