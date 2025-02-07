"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [personImageUrl, setPersonImageUrl] = useState("");
  const [garmentImageUrl, setGarmentImageUrl] = useState("");
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTryOn = async () => {
    if (!personImageUrl || !garmentImageUrl) {
      setError("Please provide both person and garment image URLs.");
      return;
    }

    setLoading(true);
    setError("");
    setResultImage(null);

    const data = {
      person_image_url: personImageUrl,
      garment_image_url: garmentImageUrl,
    };

    try {
      const response = await axios.post("/api/try-on", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResultImage(response.data.result_url);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Virtual Try-On</h1>
        <p className="text-gray-600 text-center mt-2">Provide URLs for person and garment images.</p>

        {/* Person Image URL */}
        <label className="text-gray-600">Person Image URL</label>
        <input
          type="text"
          placeholder="Enter person image URL"
          value={personImageUrl}
          onChange={(e) => setPersonImageUrl(e.target.value)}
          className="w-full my-4 p-2 border text-black border-gray-300 rounded-md"
        />
        {personImageUrl && (
          <div className="mt-2">
            <h3 className="text-gray-700">Person Image Preview</h3>
            <img
              src={personImageUrl}
              alt="Person Preview"
              className="mt-2 w-full h-auto max-h-64 object-contain rounded-md shadow-md"
            />
          </div>
        )}

        {/* Garment Image URL */}
        <label className="text-gray-600">Garment Image URL</label>
        <input
          type="text"
          placeholder="Enter garment image URL"
          value={garmentImageUrl}
          onChange={(e) => setGarmentImageUrl(e.target.value)}
          className="w-full mt-3 p-2 border text-black border-gray-300 rounded-md"
        />
        {garmentImageUrl && (
          <div className="mt-2">
            <h3 className="text-gray-700">Garment Image Preview</h3>
            <img
              src={garmentImageUrl}
              alt="Garment Preview"
              className="mt-2 w-full h-auto max-h-64 object-contain rounded-md shadow-md"
            />
          </div>
        )}

        {/* Try On Button */}
        <button
          onClick={handleTryOn}
          disabled={loading}
          className="w-full mt-4 p-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          {loading ? "Processing..." : "Try On"}
        </button>

        {/* Error Handling */}
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        {/* Result Image */}
        {resultImage && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800 text-center">Result</h2>
            <img src={resultImage} alt="Result" className="mt-2 w-full rounded-md shadow" />
          </div>
        )}
      </div>
    </main>
  );
}
