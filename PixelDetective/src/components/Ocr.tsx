import React, { useState } from "react";
import axios from "axios";

function Ocr() {
 //1. Get the file
 const [image, setImage] = useState<File | null>(null);

 //check file 
const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

//2. Send the file to Azure
  const sendImageToAzure = async () => {
    try {
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const response = await axios.post(
          "endpoint/vision/v3.2/ocr",
          formData,
          {
            headers: {
              "Ocp-Apim-Subscription-Key": "key",
              "Content-Type": "multipart/form-data",
            },
          }
        );
          //response
          console.log(response.data);
      } else {
        console.error("Aucune image sélectionnée.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'image à Azure : ", error);
    }
  };


  return <div>
    <h2>OCR</h2>
     <input type="file" onChange={handleImageChange} />
     <button onClick={sendImageToAzure}>🔎</button>
  </div>;
}

export default Ocr;
