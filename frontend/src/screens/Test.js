import React, { useState } from "react";

const Test = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileDetails, setFileDetails] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const details = files.map((file) => ({
      name: file.name,
      extension: file.name.split(".").pop(),
    }));

    setFileDetails(details);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    // formData.append("details", JSON.stringify(fileDetails));

    try {
      const response = await fetch("http://localhost:5000/test", {
        method: "post",
        body: formData,
        mode: "cors",
      });
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <h2>Upload Multiple Images</h2>

      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default Test;
