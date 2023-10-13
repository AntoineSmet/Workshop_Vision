import React, { useState } from "react";
import axios from "axios";

function Analysis() {
  const [image, setImage] = useState<File | null>(null);
  const [captions, setCaptions] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const sendImageToAzure = async () => {
    try {
      if (image) {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const binaryData = reader.result as ArrayBuffer;
            const response = await axios.post(
              "endpoint/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=denseCaptions",
              binaryData,
              {
                headers: {
                  "Ocp-Apim-Subscription-Key":
                    "key",
                  "Content-Type": "application/octet-stream",
                },
              }
            );

            response.data.denseCaptionsResult.values.forEach(
              (value: { text: string }) => {
                setCaptions((prevCaptions) => [...prevCaptions, value.text]);
              }
            );
          } catch (error) {
            console.error("Erreur lors de la requête Azure : ", error);
          }
        };

        reader.readAsArrayBuffer(image);
      } else {
        console.error("Aucune image sélectionnée.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'image à Azure : ", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={sendImageToAzure}>🔎</button>
      <ul>
        {captions.map((caption, index) => (
          <li key={index}>{caption}</li>
        ))}
      </ul>
    </div>
  );
}

export default Analysis;
