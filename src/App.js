// src/App.js
import React, { useState, useEffect } from "react";
import InstructionPage from "./components/instruction";
import SamplePage from "./components/sample_q";
import SurveyPage from "./components/survey_test";

const App = () => {
  const [page, setPage] = useState("instructions");

  // Update document title when page changes
  useEffect(() => {
    
    document.title = "Evaluate Simplified Scientific Paper Summary";
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {page === "instructions" && <InstructionPage onNext={() => setPage("sample")} />}
      {page === "sample" && <SamplePage onNext={() => setPage("survey")} onBack={() => setPage("instructions")} />}
      {page === "survey" && <SurveyPage onBack={() => setPage("sample")} />}
    </div>
  );
};

export default App;
