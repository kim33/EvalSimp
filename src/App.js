// src/App.js
import React, { useState, useEffect } from "react";
import GuidelinesNavigator from "./components/GuidelinesNavigator";
import SamplePage from "./components/sample_q";
import SimplifyPage from "./components/survey_test";
import EndPage from "./components/endpage";
import SurveyParent from "./components/survey";

const App = () => {
  const [page, setPage] = useState("guidelines");

  useEffect(() => {
    document.title = "Evaluate Simplified Scientific Paper Summary";
  }, []);
  const renderPage = () => {
    switch (page) {
      case "guidelines":
        return <GuidelinesNavigator onComplete={() => setPage("sample")} />; // ⬅️ When finished, go to instructions
      case "sample":
        return (
          <SamplePage
            onNext={() => setPage("survey")}
            onBack={() => setPage("guidelines")}
          />
        );
      case "survey":
        return (
          <SurveyParent
            onComplete={() => setPage("end")} // Move to EndPage when survey finishes
          />
        );
      case "end":
        return <EndPage />;
      default:
        return null;
    }
  };


  return <div className="p-6 max-w-4xl mx-auto">{renderPage()}</div>;
};

export default App;