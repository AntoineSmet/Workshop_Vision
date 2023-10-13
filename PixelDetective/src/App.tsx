import "./App.css";
import OCR from "./components/Ocr";
import Analysis from "./components/Analysis";
import { useState } from "react";

function App() {
  const [isOcrVisible, setIsOcrVisible] = useState(false);
  const [isAnalysisVisible, setIsAnalysisVisible] = useState(false);

  const handleOcrClick = () => {
    setIsOcrVisible(!isOcrVisible);
  };
  const handleAnalysisClick = () => {
    setIsAnalysisVisible(!isAnalysisVisible);
  };

  return (
    <>
      <div>
        <img src="/icon-detective.svg" alt="icon detective" width={200} />
      </div>
      <h1>Detective Pixel</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
          marginBottom: "4rem",
        }}
      >
        <div style={{ marginRight: "1rem" }}>
          <img
            src="/icon-book.svg"
            alt="icon book"
            width={100}
            onClick={handleOcrClick}
          />
        </div>
        <div>
          <img
            src="/icon-pictures.svg"
            alt="icon pictures"
            width={95}
            onClick={handleAnalysisClick}
          />
        </div>
      </div>
      {isOcrVisible && <OCR />}
      {isAnalysisVisible && <Analysis />}
    </>
  );
}

export default App;
