"use client";

import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import QRCodeStyling from "qr-code-styling";


interface InfoField {
  label: string;
  value: string;
}

export default function Home() {
  const [fields, setFields] = useState<InfoField[]>([
    { label: "Name", value: "" },
    { label: "Website", value: "" },
  ]);
  const [logo, setLogo] = useState<string | null>(null);

  // Customization
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [animation, setAnimation] = useState("animate-pulse");

  const qrRef = useRef<HTMLDivElement>(null);

  // Use Website if provided, else text
  const websiteField = fields.find(
    (f) => f.label.toLowerCase() === "website" && f.value.trim() !== ""
  );
  const qrValue =
    websiteField?.value.trim() ||
    fields.map((f) => `${f.label}: ${f.value}`).join("\n");

  // Update field
  const handleFieldChange = (
    index: number,
    key: keyof InfoField,
    newValue: string
  ) => {
    const updated = [...fields];
    updated[index][key] = newValue;
    setFields(updated);
  };

  const addField = () => setFields([...fields, { label: "", value: "" }]);

  // Upload logo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ✅ Download QR as PNG
  const downloadQR = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      // If logo exists → overlay in center
      if (logo) {
        const logoImg = new Image();
        logoImg.onload = () => {
          const size = canvas.width * 0.25; // logo covers 25%
          ctx?.drawImage(
            logoImg,
            (canvas.width - size) / 2,
            (canvas.height - size) / 2,
            size,
            size
          );
          triggerDownload(canvas);
        };
        logoImg.src = logo;
      } else {
        triggerDownload(canvas);
      }
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const triggerDownload = (canvas: HTMLCanvasElement) => {
    const pngFile = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = pngFile;
    link.download = "custom-qr.png";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl flex flex-col md:flex-row gap-8">
        {/* Left Panel: Form */}
        <div className="flex-1 flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left">
            🎨 Custom QR Code Generator
          </h1>
          <p className="text-gray-600 text-sm text-center md:text-left">
            Add your details, upload a logo, customize colors, and generate an
            animated QR code.
          </p>

          {/* Dynamic fields */}
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Label"
                  value={field.label}
                  onChange={(e) =>
                    handleFieldChange(index, "label", e.target.value)
                  }
                  className="border p-2 rounded w-1/3"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={field.value}
                  onChange={(e) =>
                    handleFieldChange(index, "value", e.target.value)
                  }
                  className="border p-2 rounded flex-1"
                />
              </div>
            ))}
            <button
              onClick={addField}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              ➕ Add Field
            </button>
          </div>

          


          
<div>
  <label className="block text-gray-700 font-medium mb-2">
    Upload Logo/Image
  </label>

  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition relative overflow-hidden">
    {!logo ? (
      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
        <svg
          aria-hidden="true"
          className="w-10 h-10 mb-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16V4m0 0L3 8m4-4l4 4m6 12V12m0 0l-4 4m4-4l4 4"
          />
        </svg>
        <p className="text-sm">Click or drag & drop</p>
        <p className="text-xs text-gray-400">PNG, JPG, JPEG</p>
      </div>
    ) : (
      <img
        src={logo}
        alt="Uploaded Logo"
        className="absolute inset-0 w-full h-full object-contain p-2"
      />
    )}
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />
  </label>
</div>


          {/* Color pickers */}
          <div className="flex gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Foreground</label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-16 h-10 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Background</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-16 h-10 border rounded"
              />
            </div>
          </div>

          {/* Animation */}
          <div>
            <label className="block text-gray-700 font-medium">Animation</label>
            <select
              value={animation}
              onChange={(e) => setAnimation(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="animate-none">None</option>
              <option value="animate-pulse">Pulse</option>
              <option value="animate-bounce">Bounce</option>
              <option value="animate-spin-slow">Slow Spin</option>
            </select>
          </div>

          {/* Download Button */}
          <button
            onClick={downloadQR}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-4"
          >
            ⬇️ Download QR
          </button>
        </div>

        {/* Right Panel: QR Preview */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div
            ref={qrRef}
            className={`relative p-4 rounded-xl shadow-xl bg-white ${animation}`}
          >
            <QRCode
              value={qrValue || "https://example.com"}
              size={240}
              fgColor={fgColor}
              bgColor={bgColor}
            />
            

            {logo && (
              <img
                src={logo}
                alt="User Logo"
                className="absolute inset-0 m-auto w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg"
              />
            )}
          </div>
          <p className="text-sm text-gray-600">
            📱 Scan with your phone to open the website/info
          </p>
        </div>
      </div>
    </div>
  );
}
