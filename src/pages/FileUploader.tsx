import React, { useState, useRef, DragEvent } from "react";
import axios from "axios";
import Header from "@/components/Header";

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    setError("");
    setOutput("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/process-text", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setOutput(response.data.result);
    } catch (err: any) {
      setError("Failed to process file. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-lg mx-auto mt-16 p-6 border rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Upload Your Text File</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Drag and Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors duration-200 ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onClick={() => inputRef.current?.click()}
          >
            {file ? (
              <p className="text-gray-700">{file.name}</p>
            ) : (
              <p className="text-gray-500">Drag & drop a .txt file here, or click to select</p>
            )}
          </div>

          <input
            type="file"
            accept=".txt"
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {output && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h2 className="font-semibold mb-2 text-blue-700">Output:</h2>
            <pre className="whitespace-pre-wrap text-gray-800">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;

