import React, { useState } from "react";
import axios from "axios";

function Ocr() {
  //Get the file
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  //Check file
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  //Send the file to Azure
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
        //gestion de la réponse
        if (response.data.regions.length === 0) {
          setAlertVisible(true); 
          setText(""); 
        } else {
          setAlertVisible(false); 
          setText(""); 
        }
        //response
        setText(
          response.data.regions
            .map((region: any) =>
              region.lines
                .map((line: any) => line.words.map((word: any) => word.text))
                .join(" ")
            )
            .join(" ")
            .replace(/,/g, " ")
        );
      } else {
        console.error("Aucune image sélectionnée.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'image à Azure : ", error);
    }
  };

  return (
    <div>
      <h2>OCR</h2>
      <input type="file" onChange={handleImageChange} />
      <button onClick={sendImageToAzure}>🔎</button>
      {alertVisible && <div>La réponse de l'API est vide.</div>}
      <div>{text}</div>
    </div>
  );
}

export default Ocr;
