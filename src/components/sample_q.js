import React, { useState } from "react";
import "./style.css";

const SamplePage = ({ onNext, onBack }) => {
  const [hoveredSentenceA, setHoveredSentenceA] = useState(null); 
  const [hoveredSentenceB, setHoveredSentenceB] = useState(null); 
  const [selectedSentencesA, setSelectedSentencesA] = useState([]);
  const [selectedSentencesB, setSelectedSentencesB] = useState([]);
  const [answers, setAnswers] = useState({
    understanding: "",
    naturalness: "",
    simplicity: "",
  });

  const [comments, setComments] = useState({
    understanding: "",
    naturalness: "",
    simplicity: "",
  });

  const handleCommentChange = (event) => {
    const { name, value } = event.target;
    setComments((prevComments) => ({
      ...prevComments,
      [name]: value,
    }));
  };
  const handleDropdownChange = (event) => {
    const { name, value } = event.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const passageTextA = 'Recent advancements in machine learning have led to significant improvements in natural language processing (NLP).  In this study, researchers introduce a novel deep learning architecture that integrates convolutional neural networks with recurrent neural networks to enhance text understanding. Experimental results on benchmark datasets show that the proposed model achieves a 15% improvement in accuracy over traditional methods. Additionally, the model demonstrates robust performance in handling noisy data and long-range dependencies within text. The authors discuss potential applications in sentiment analysis, machine translation, and information extraction, while also outlining future work to further optimize the model’s efficiency and scalability.';

  const passageTextB = `Recent advances in machine learning have greatly improved natural language processing (NLP). 
  In this study, researchers present a new deep learning model that combines convolutional and recurrent neural networks to better understand text. 
  Tests on standard datasets show that this model improves accuracy by 15% compared to traditional methods. 
  The model also performs well with noisy data and long-range text dependencies. 
  The authors highlight potential uses in sentiment analysis, machine translation, and information extraction, and they plan to continue improving the model’s efficiency and scalability.`;

  const handleSentenceClick = (sentence, passageChoice) => {
    if (passageChoice === "A") {
      setSelectedSentencesA((prevSelected) => {
        let updatedSentences;
        if (prevSelected.includes(sentence)) {
          // If already selected, remove it
          updatedSentences = prevSelected.filter((s) => s !== sentence);
        } else {
          // Otherwise, add it
          updatedSentences = [...prevSelected, sentence];
        }
        
        // Update textarea with selected sentences
        setComments((prevComments) => ({
          ...prevComments,
          complex_a: updatedSentences.join(",\n "),
        }));
  
        return updatedSentences;
      });
    } else if (passageChoice === "B") {
      setSelectedSentencesB((prevSelected) => {
        let updatedSentences;
        if (prevSelected.includes(sentence)) {
          // If already selected, remove it
          updatedSentences = prevSelected.filter((s) => s !== sentence);
        } else {
          // Otherwise, add it
          updatedSentences = [...prevSelected, sentence];
        }
        
        // Update textarea with selected sentences
        setComments((prevComments) => ({
          ...prevComments,
          complex_b: updatedSentences.join(",\n "),
        }));
  
        return updatedSentences;
      });
    }

  };
  return (
    <div className="evaluation-container">
      <h2 className="evaluation-title">Sample Passages</h2>
        <p className="instruction-text">
          Following is the sample question for the survey. You DO NOT NEEED TO ANSWER. </p>
         <p className="instruction-text"> 
          Throughout the survey, you will be asked to read two passages and evaluate them regarding with clear argument, English grammar, and level of simplicity. 
        </p>
        <p className="instruction-text">
          Please read Passage 1 and Passage 2 carefully. While reading, please select complex sentences from each passage.
          <br /> Possible complex sentence : sentence with more than 20 words or sentences containing "although", "while", "whereas", etc.
        </p>
      <div className="passages-container">
        <div className="passage-box">
          <h3 className="passage-title">Passage 1</h3>
          <p className="passage-text">
          {passageTextA.split(/(?<=[.!?])\s+/).map((sentence, index) => (
          <span
            key={index}
            className={`clickable-sentence 
              ${selectedSentencesA.includes(sentence) ? "selected" : ""} 
              ${hoveredSentenceA === sentence ? "hovered" : ""}`}
            onClick={() => handleSentenceClick(sentence, "A")}
            onMouseEnter={() => setHoveredSentenceA(sentence)}
            onMouseLeave={() => setHoveredSentenceA(null)}
          >
            {sentence}{" "}
          </span>
        ))}
          </p>
        </div>

        <div className="passage-box">
          <h3 className="passage-title">Passage 2</h3>
          <p className="passage-text">
          {passageTextB.split(/(?<=[.!?])\s+/).map((sentence, index) => (
          <span
            key={index}
            className={`clickable-sentence 
              ${selectedSentencesB.includes(sentence) ? "selected" : ""} 
              ${hoveredSentenceB === sentence ? "hovered" : ""}`}
            onClick={() => handleSentenceClick(sentence, "B")}
            onMouseEnter={() => setHoveredSentenceB(sentence)}
            onMouseLeave={() => setHoveredSentenceB(null)}
          >
            {sentence}{" "}
          </span>
        ))}
          </p>
        </div>
      </div>

      <h2 className="evaluation-title">Evaluation</h2>

      <div className="question-container">
        <label className="question-label">
          Which one is easier to understand the main objective of the paper?
          <span className="question-description">
            Consider: Easier words, clear phrases, no ambiguity.
          </span>
        </label>
        <select name="understanding" onChange={handleDropdownChange} className="select-box" required>
          <option value="">Select</option>
          <option value="Passage A">Passage 1</option>
          <option value="Passage B">Passage 2</option>
          <option value="No Difference">No Difference</option>
        </select>
        <textarea name="understanding" value={comments.understanding} onChange={handleCommentChange} className="comment-box" placeholder="Please explain your choice with short justification" required minLength={30}/>
      </div>

      <div className="question-container">
        <label className="question-label">
          Which one sounds more natural in English?
          <span className="question-description">
          Please consider: <br />
          No grammatical error in the phrase or sentence. <br />
          Natural and fluent English expressions.
          </span>
        </label>
        <select name="naturalness" onChange={handleDropdownChange} className="select-box" required>
          <option value="">Select</option>
          <option value="Passage A">Passage 1</option>
          <option value="Passage B">Passage 2</option>
          <option value="No Difference">No Difference</option>
        </select>
        <textarea name="naturalness" value={comments.naturalness} onChange={handleCommentChange} className="comment-box" placeholder="Please explain your choice with short justification" required minLength={30}/>
      </div>

      <div className="question-container">
        <label className="question-label">
          Which one uses simple sentence structure?
          <span className="question-description">
          Please consider: <br />
          Sentences completed within 2 rows. <br />
          Catch the main content without reading the whole paragraph.
          </span>
        </label>
        <select name="simplicity" onChange={handleDropdownChange} className="select-box" required>
          <option value="">Select</option>
          <option value="Passage A">Passage 1</option>
          <option value="Passage B">Passage 2</option>
          <option value="No Difference">No Difference</option>
        </select>
        <textarea name="simplicity" value={comments.simplicity} onChange={handleCommentChange} className="comment-box" placeholder="Please explain your choice with short justification" required minLength={30}/>
      </div>

      <div className="evaluation-container comment-container">
        <label className="question-label">
        <h3>Please review selected sentences from Passage 1. <br /> If there are certain complex phrases in the selected sentence, please mark them with [ ] in the textbox below</h3>
        </label>
        <span className="instructiont-text">
                  <p>Please consider : Is certain phrase too technical? Does it require additioanl explanation?</p>
                  <p>Example : "The authors highlight potential uses in [sentiment analysis], machine translation, and information extraction, and they plan to continue improving the model’s efficiency and scalability".</p>
                </span>
        <textarea
          name="improvement_suggestions"
          value={selectedSentencesA.join(",\n ")}
          onChange={handleCommentChange}
          className="textarea-input"
          placeholder="Please select complex sentences that need to be improved."
          rows="5"
          style={{ width: "100%", marginTop: "10px" }}
          minLength={30}
          required
        />
      </div>

      <div className="evaluation-container comment-container">
        <label className="question-label">
        <h3>Please review selected sentences from Passage 1. <br /> If there are certain complex phrases in the selected sentence, please mark them with [ ] in the textbox below</h3>
        </label>
        <span className="instructiont-text">
                  <p>Please consider : Is certain phrase too technical? Does it require additioanl explanation?</p>
                  <p>Example : "The authors highlight potential uses in [sentiment analysis], machine translation, and information extraction, and they plan to continue improving the model’s efficiency and scalability".</p>
                </span>
        <textarea
          name="improvement_suggestions"
          value={selectedSentencesB.join(",\n ")}
          onChange={handleCommentChange}
          className="textarea-input"
          placeholder="Please select complex sentences that need to be improved."
          rows="5"
          style={{ width: "100%", marginTop: "10px" }}
          minLength={30}
          required
        />
      </div>

      <div className="button-container">
        <button onClick={onBack} className="button button-back">
          ← Back
        </button>
        <button onClick={onNext} className="button button-next">
          Start Survey →
        </button>
      </div>
    </div>
  );
};

export default SamplePage;
