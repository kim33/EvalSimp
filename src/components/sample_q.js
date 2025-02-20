import React, { useState } from "react";
import "./style.css";

const SamplePage = ({ onNext, onBack }) => {
  const [passageAInput, setPassageAInput] = useState("");
  const [passageBInput, setPassageBInput] = useState("");

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "passageA_first_two") {
      setPassageAInput(value);
    } else if (name === "passageB_last_two") {
      setPassageBInput(value);
    }
  };

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

  return (
    <div className="evaluation-container">
      <h2 className="evaluation-title">Sample Passages</h2>

      <div className="passages-container">
        <div className="passage-box">
          <h3 className="passage-title">Passage A</h3>
          <p className="instruction-text">
          Please read Passage A carefully.<br /> While reading the passage, try to catch the main argument of the passage.
          </p>
          <p className="passage-text">
          Recent advancements in machine learning have led to significant improvements in natural language processing (NLP). 
          In this study, researchers introduce a novel deep learning architecture that integrates convolutional neural networks with recurrent neural networks to enhance text understanding. 
          Experimental results on benchmark datasets show that the proposed model achieves a 15% improvement in accuracy over traditional methods. 
          Additionally, the model demonstrates robust performance in handling noisy data and long-range dependencies within text. 
          The authors discuss potential applications in sentiment analysis, machine translation, and information extraction, 
          while also outlining future work to further optimize the model’s efficiency and scalability.
          </p>
          <textarea
            name="passageA_first_two"
            value={passageAInput}
            onChange={handleChange}
            className="textarea-input"
            placeholder="Type the first two sentences of Passage A..."
            required
          />
        </div>

        <div className="passage-box">
          <h3 className="passage-title">Passage B</h3>
          <p className="instruction-text">
          Please read Passage B carefully.<br /> While reading, try to compare if Passage B contains necessary information from Passage A.
          </p>
          <p className="passage-text">
          Recent advances in machine learning have greatly improved natural language processing (NLP). 
          In this study, researchers present a new deep learning model that combines convolutional and recurrent neural networks to better understand text. 
          Tests on standard datasets show that this model improves accuracy by 15% compared to traditional methods. 
          The model also performs well with noisy data and long-range text dependencies. 
          The authors highlight potential uses in sentiment analysis, machine translation, and information extraction, and they plan to continue improving the model’s efficiency and scalability.
          </p>
          <textarea
            name="passageB_last_two"
            value={passageBInput}
            onChange={handleChange}
            className="textarea-input"
            placeholder="Type the last two sentences of Passage B..."
            required
          />
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
          <option value="Passage A">Passage A</option>
          <option value="Passage B">Passage B</option>
          <option value="Passage B">Other</option>
        </select>
        <textarea name="understanding" value={comments.understanding} onChange={handleCommentChange} className="comment-box" placeholder="Add Comment" required minLength={30}/>
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
          <option value="Passage A">Passage A</option>
          <option value="Passage B">Passage B</option>
          <option value="Passage B">Other</option>
        </select>
        <textarea name="naturalness" value={comments.naturalness} onChange={handleCommentChange} className="comment-box" placeholder="Add Comment" required minLength={30}/>
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
          <option value="Passage A">Passage A</option>
          <option value="Passage B">Passage B</option>
          <option value="Passage B">Other</option>
        </select>
        <textarea name="simplicity" value={comments.simplicity} onChange={handleCommentChange} className="comment-box" placeholder="Add Comment" required minLength={30}/>
      </div>

      <div className="evaluation-container">
      <h3>Please Read the below paragraph and answer the following 2 questions</h3>
      <p className="passage-text">
        Recent advances in machine learning have greatly improved natural language processing (NLP). 
        In this study, researchers present a new deep learning model that combines convolutional and recurrent neural networks to better understand text. 
        Tests on standard datasets show that this model improves accuracy by 15% compared to traditional methods. 
        The model also performs well with noisy data and long-range text dependencies. 
        The authors highlight potential uses in sentiment analysis, machine translation, and information extraction, and they plan to continue improving the model’s efficiency and scalability.
      </p>
      </div>
      
      <div className="evaluation-container">
        <label className="question-label">
          In your opinion, does this phrase "convolutional and recurrent neural networks" bother to understand the overall context of the above paragraph?
        </label>

        {/* Radio Buttons */}
        <div className="radio-buttons" required>
          <label className="radio-button-container">
            <span className="radio-label">Yes</span>
            <input
              type="radio"
              name="understanding_bother"
              value="Yes"
              onChange={handleRadioChange}
              className="radio-button"
            />
          </label>

          <label className="radio-button-container">
            <span className="radio-label">No</span>
            <input
              type="radio"
              name="understanding_bother"
              value="No"
              onChange={handleRadioChange}
              className="radio-button"
            />
          </label>
        </div>
      </div>

    <div className="evaluation-container comment-container">
      <label className="question-label">
          Based on your response, please provide any sentences or phrases that need to be improved from the above paragraph. 
          <span className="question-description">
            Please consider: <br />
            Which words or phrases hinder understanding the main argument of the paragraph? <br />
            Which sentence sounds unnatural? <br />
            Which words or phrases are too complicated or require expert knowledge to understand the main content?
            </span>
        </label>
      <textarea
        name="improvement_suggestions"
        value={comments.improvement_suggestions}
        onChange={handleCommentChange}
        className="evaluation-comment"
        placeholder="Provide your feedback here..."
        rows="5"
        style={{ width: '100%', marginTop: '10px'}}
        minLength={30}  // Enforces a minimum character length
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
