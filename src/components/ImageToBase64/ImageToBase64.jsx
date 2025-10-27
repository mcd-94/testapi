import React, { useState } from "react";

export default function ImageToBase64() {
  const [imageBase64, setImageBase64] = useState(null);

  // Función que convierte un archivo en Base64
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImageBase64(reader.result);
    };

    reader.readAsDataURL(file); // Convierte la imagen a Base64
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center" }}>
      <h2>Subir imagen y convertir a Base64</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {imageBase64 && (
        <div style={{ marginTop: "1rem" }}>
          <p>
            <strong>Vista previa:</strong>
          </p>
          <img
            src={imageBase64}
            alt="Vista previa"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <p style={{ marginTop: "1rem", wordWrap: "break-word" }}>
            <strong>Base64:</strong>
            <br />
            <small>{imageBase64}</small>
          </p>
        </div>
      )}
    </div>
  );
}
