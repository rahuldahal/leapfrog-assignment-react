import React from "react";

export default function PhotoUpload({
  fileInputState,
  handleFileInputChange,
  previewSource,
}) {
  return (
    <>
      <input
        id="fileInput"
        type="file"
        name="image"
        onChange={handleFileInputChange}
        value={fileInputState}
        className="form-input"
      />
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "100px" }} />
      )}
    </>
  );
}
