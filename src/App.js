// src/App.js
import React, { useState } from "react";
import InstructionPage from "./components/instruction";
import SamplePage from "./components/sample_q";
import SurveyPage from "./components/survey";

const App = () => {
  const [page, setPage] = useState("instructions");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {page === "instructions" && <InstructionPage onNext={() => setPage("sample")} />}
      {page === "sample" && <SamplePage onNext={() => setPage("survey")} onBack={() => setPage("instructions")} />}
      {page === "survey" && <SurveyPage onBack={() => setPage("sample")} />}
    </div>
  );
};

export default App;
