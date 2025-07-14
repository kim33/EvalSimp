// src/components/InstructionPage.js
import React from "react";
import "./style.css";

const InstructionPage = ({ onNext }) => {
  return (
    <div className="instruction-container">
      <h1 className="text-xl font-bold text-center">Thank you for your contribution!</h1>
  

      <h2 className="mt-6 font-semibold">Survey Tasks:</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>Your task is to further simplify the given Annotated Summary, particularly focusing on the phrases inside [ ]. .</li>
        <li>The goal is to make the text clearer, more readable, and accessible while preserving the original meaning.</li>
        <li>This will help us create high-quality, simplified scientific text.</li>

      </ul>

      <h2 className="mt-6 font-semibold">Your Tasks:</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>1. Read the Original Summary: This is the original, complex version of the scientific text.        </li>
        <li>2. Review the Annotated Summary: This version has already simplified but may still contain complex phrases.</li>
        <li>3. Further Simplify Phrases in [ ]: Focus on the phrases inside [ ] and rewrite them in simpler terms while keeping their meaning intact. </li>
        <li>4. Ensure Readability: The final version should be clear and easy to understand for a general audience.</li>
      </ul>
      <p className="mt-4 font-semibold">
        Please Click "Next" to check the sample question.
      </p>
      
      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          className="button button-next"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default InstructionPage;