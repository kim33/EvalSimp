// src/components/InstructionPage.js
import React from "react";
import "./style.css";

const InstructionPage = ({ onNext }) => {
  return (
    <div className="instruction-container">
      <h1 className="text-xl font-bold text-center">Welcome to the Survey!</h1>
      
      <p className="mt-4 text-justify">
        Thank you for your participation in this experiment.
      </p>

      <h2 className="mt-6 font-semibold">Survey Tasks:</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>
          <strong>A.</strong> Evaluate whether the passages present a clear argument with simple sentence structures and no grammatical errors.
        </li>
        <li>
          <strong>B.</strong> Identify complex sentences, phrases, or words that require simplification for better understanding.
        </li>
      </ul>
      
      <p className="mt-4 text-justify">
        You will receive <strong>10 pairs</strong> of computer science research paper summaries.
      </p>

      <h2 className="mt-6 font-semibold">Your Tasks:</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>Read both passages carefully.</li>
        <li>Identify the main argument of each summary.</li>
        <li>Analyze the different approaches used in each passage.</li>
      </ul>

      <h2 className="mt-6 font-semibold">Survey Questions:</h2>
      <ol className="list-decimal ml-6 mt-2">
        <li>Select the passage that best presents a clear argument, fluent English, and efficient sentence structure.</li>
        <li>Identify complex sentences that need to be simplified further.</li>
      </ol>

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