import React, { useState } from "react";
import ChecklistModal from "./checklist";
import './style.css'; 

const passageTextA = `Recent advancements in machine learning have led to significant improvements in natural language processing (NLP).  
In this study, researchers introduce a novel deep learning architecture that integrates convolutional neural networks with recurrent neural networks to enhance text understanding. 
Experimental results on benchmark datasets show that the proposed model achieves a 15% improvement in accuracy over traditional methods. 
Additionally, the model demonstrates robust performance in handling noisy data and long-range dependencies within text. 
The authors discuss potential applications in sentiment analysis, machine translation, and information extraction, while also outlining future work to further optimize the model’s efficiency and scalability.`;

const passageTextB = `Recent advances in machine learning have greatly improved natural language processing (NLP). 
In this study, researchers present a new deep learning model that combines [convolutional] and [recurrent] neural networks to better understand text. 
Tests on standard datasets show that this model improves accuracy by 15% compared to traditional methods. 
The model also performs well with noisy data and long-range text dependencies. 
The authors highlight potential uses in [sentiment analysis], machine translation, and information extraction, and they plan to continue improving the model’s efficiency and scalability.`;

export default function SamplePage({ onNext, onBack }) {
  const [summary, setSummary] = useState("");
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);

  const handleNext = () => {
    setShowChecklist(true);
  };

  const confirmNext = () => {
    setShowChecklist(false);
    onNext(); // Proceed to next page
  };

  const cancelNext = () => {
    setShowChecklist(false); // Let user edit more
  };


  return (
    <div
      className="flex justify-center bg-gray-50 p-6"
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          📝 Sample Task: Simplify the Annotated Summary
        </h1>

        {/* Instructions and Textarea */}
        <section className="bg-white p-4 rounded shadow space-y-3">
          <h2 className="text-xl font-semibold mb-2">🎯 Your Task</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              Rewrite the <strong>Annotated Simplified Summary</strong> to make it easier to
              understand while keeping the scientific meaning.
            </li>
            <li>
              Focus on simplifying or explaining the phrases <mark className="bg-yellow-300">inside brackets [ ]</mark>.
            </li>
            <li><strong>Keep key technical terms</strong>  but feel free to add brief explanations if needed.</li>
            <li><strong>Use clear, concise language</strong>  suitable for a general audience with some science background.</li>
            <li>Write your final summary as <strong> one coherent paragraph.</strong> </li>
          </ul>
          
        </section>
        {/* Original Summary */}
        <section className="passage-box">
          <h2 className="text-xl font-semibold mb-2">📚 Original, Complex Summary</h2>
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{passageTextA}</p>
        </section>

        {/* Annotated Simplified Summary */}
        <section className="passage-box">
          <h2 className="text-xl font-semibold mb-2">🔍 Phase 1 : AI Simplified Summary</h2>
          <p className="text-blue-900 leading-relaxed whitespace-pre-wrap">
          {passageTextB.split(/(\[[^\]]+\])/).map((part, i) => {
            const trimmed = part.trim();
            return trimmed.startsWith("[") && trimmed.endsWith("]") ? (
              <mark
                key={i}
                className="bg-yellow-300 font-semibold px-1 rounded cursor-help"
                title="Simplify this phrase or explain it clearly"
              >
                {part}
              </mark>
            ) : (
              <span key={i}>{part}</span>
            );
          })}
          </p>
        </section>
        <section className="passage-box">
          <h2 className="text-xl font-semibold mb-2">🏅 Your Gold Simplified Summary</h2>
          <textarea
              placeholder="This paper introduces a new deep learning model that combines convolutional neural networks and recurrent neural networks to improve understanding of text. Tests on standard datasets show that this model increases accuracy by 15% compared to traditional approaches. It also handles noisy data and long-range dependencies effectively. The authors suggest this model can be used in sentiment analysis (detecting opinions), machine translation, and information extraction, and they aim to further enhance its efficiency and scalability."
              className="textarea-input"
              rows={6}
              style={{ width: "95%", marginTop: "10px" }}
              onChange={(e) => setSummary(e.target.value)}
          />
        </section>
        
        {/* Navigation Buttons */}
        <div className="button-container">
          <button
            onClick={onBack}
            className="button button-back"
          >
            ← Back
          </button>
          <button
            onClick={handleNext}
            className="button button-next"
          >
            Start Survey →
          </button>
          {showChecklist && (
            <ChecklistModal onConfirm={confirmNext} onCancel={cancelNext} />
          )}
        </div>
      </div>
      {/* Modal Overlay */}
    </div>
  );
}
