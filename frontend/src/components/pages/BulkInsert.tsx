import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FormFeedback } from "reactstrap";
import { fetchDataFromAPI } from "../../utils";

export default function CsvDropzone() {
  const [error, setError] = useState("");
  async function onDropHandler(acceptedFiles: File[]) {
    if (acceptedFiles.some((file) => !file.name.endsWith("csv"))) {
      setError("Only CSV files are allowed");
      return;
    } else {
      const [file] = acceptedFiles;
      const formData = new FormData();
      formData.append("file", file);
      await fetchDataFromAPI({
        endpoint: "course/bulkInsertCSV",
        configurationOpt: { method: "POST", body: formData },
      });
    }
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropHandler,
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone px-8 ${isDragActive ? "active" : ""}`}
    >
      <input {...getInputProps()} />
      <p>Drag & drop a CSV file here, or click to select one.</p>
      <FormFeedback>{error}</FormFeedback>
    </div>
  );
}
