import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css"; // Assuming this is the correct path to your CSS file

const API_URL = "https://evalsimp-db4vgo7hf-kyuri-ims-projects.vercel.app";

const SurveyPage = ({ onBack }) => {
  const [userId, setUserId] = useState("");
  const [surveySetId, setSurveySetId] = useState(null);
  const [passage, setPassage] = useState(null);
  const [passageAInput, setPassageAInput] = useState("");
  const [passageBInput, setPassageBInput] = useState("");
  const [responses, setResponses] = useState({
    passageA_first_two: "",
    passageB_last_two: "",
  });
  const [answers, setAnswers] = useState({
    understanding: "",
    naturalness: "",
    simplicity: "",
    fake_complex: "",  // Radio button for fake_complex question
  });
  const [comments, setComments] = useState({
    understanding_comment: "",
    naturalness_comment: "",
    simplicity_comment: "",
    improvement_suggestions: "",
  });

  const [isStartClicked, setIsStartClicked] = useState(false);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };
  const handleUserIdSubmit = async () => {
    console.log("Current userId before API call:", userId);
  
    // Validate user input
    if (!userId || isNaN(userId)) {
      alert("Please enter a valid numeric User ID.");
      return;
    }
  
    try {
      const numericUserId = parseInt(userId, 10); // Ensure the ID is an integer
      console.log("Converted numericUserId:", numericUserId); // Debugging
  
      // Fetch the passage once the user submits the ID
      const res = await axios.get(`${API_URL}/api/get-passage/${numericUserId}`, {timeout:10000});
      console.log("Received passage:", res.data);
      setPassage(res.data);
      setIsStartClicked(true);  
      resetForm(); // Clear the form state after receiving the passage
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error response:", error.response);
        alert(`Error fetching passage: ${error.response.data.message || "Unknown error"}`);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received:", error.request);
        alert("No response from the server. Please try again later.");
      } else {
        // Something else happened in setting up the request
        console.error("Error message:", error.message);
        alert("Error setting up the request.");
      }
    }
  };
  // Function to reset the form states
const resetForm = () => {
  setPassageAInput("");  // Clear Passage A input
  setPassageBInput("");
  setResponses({
    passageA_first_two: "",
    passageB_last_two: ""
  });      // Clear text inputs (responses)
  setAnswers({
    understanding: "",
    naturalness: "",
    simplicity: "",
  });  // Clear dropdown answers
  setComments({
    understanding_comment: "",
    naturalness_comment: "",
    simplicity_comment: "",
    improvement_suggestions: "",
  });  // Clear comments
};

// Fetch new passage and reset form
const fetchPassage = async (userId) => {
  try {
    console.log("Fetching passage for userId:", userId);
    const res = await axios.get(`${API_URL}/api/get-passage/${userId}`);
    setPassage(res.data);
    resetForm();
  } catch (error) {
    console.error("Error fetching passage:", error);
  }
};
  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    setResponses((prevResponses) => ({
      ...prevResponses,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setComments((prevComments) => ({
      ...prevComments,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send
    const dataToSubmit = {
      userId,
      surveySetId,
      ...answers,
      ...comments,
      passageId: passage.id, // Include passageId from the database
    };

    // Validation: Make sure required fields are filled out
    if (
      !dataToSubmit.understanding ||
      !dataToSubmit.naturalness ||
      !dataToSubmit.simplicity ||
      !dataToSubmit.improvement_suggestions ||
      !dataToSubmit.fake_complex
    ) {
      alert("Please fill in all required fields.");
      return; // Prevent form submission if required fields are missing
    }

    try {
      // Send the data to the backend for saving
      await axios.post(`${API_URL}/api/submit`, dataToSubmit);
      alert("Response submitted!");
      fetchPassage(userId); // Optionally fetch a new passage after submission
    } catch (error) {
      console.error("Error submitting response:", error);
      alert("Error submitting response. Please try again.");
    }
  };

  return (
    <div className="evaluation-container">
      <h1 className="evaluation-title">Survey: Evaluation of Simplified Summary</h1>
      {/* User ID Input */}
      {!isStartClicked  ? (
        <div className="user-id-container">
          <label className="question-label">Enter your User ID:</label>
          <input type="text" value={userId} onChange={handleUserIdChange} className="input-box" />
          <button onClick={handleUserIdSubmit} className="button button-next">Start Survey</button>
        </div>
      ) : (
        <>
      {passage ? (
        <div>
          <div>
            <div className="passages-container">
              <div className="passage-box">
                <h2 className="passage-title">Passage A</h2>
                <p className="passage-text">{passage.passage_a}</p>
              </div>

              <div className="passage-box">
                <h2 className="passage-title">Passage B</h2>
                <p className="passage-text">{passage.passage_b}</p>
              </div>
            </div>

            {/* Question for Passage A */}
            <div className="evaluation-container">
              <label className="question-label">
                Please type the first two sentences of Passage A:
              </label>
              <textarea
                name="passageA_first_two"
                value={responses.passageA_first_two}
                onChange={handleTextInputChange}
                className="textarea-input"
                placeholder="Type the first two sentences of Passage A..."
                required
              />
            </div>

            {/* Question for Passage B */}
            <div className="evaluation-container">
              <label className="question-label">
                Please type the last two sentences of Passage B:
              </label>
              <textarea
                name="passageB_last_two"
                value={responses.passageB_last_two}
                onChange={handleTextInputChange}
                className="textarea-input"
                placeholder="Type the last two sentences of Passage B..."
                required
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="evaluation-form">
            {/* Question for Understanding */}
            <div className="question-container">
              <label className="question-label">
                Which one is easier to understand the main objective of the paper?
                <span className="question-description">
                  Consider: Easier words, clear phrases, no ambiguity.
                </span>
              </label>
              <select
                name="understanding"
                value={answers.understanding}
                onChange={handleDropdownChange}
                className="select-box"
                required
              >
                <option value="">Select</option>
                <option value="Passage A">Passage A</option>
                <option value="Passage B">Passage B</option>
                <option value="No Difference">No Difference</option>
              </select>
              <textarea
                name="understanding_comment"
                value={comments.understanding}
                onChange={handleCommentChange}
                className="comment-box"
                placeholder="Add Comment"
                required
                minLength={30}
              />
            </div>

            {/* Question for Naturalness */}
            <div className="question-container">
              <label className="question-label">
                Which one sounds more natural in English?
                <span className="question-description">
                  Please consider: No grammatical errors, natural and fluent English expressions.
                </span>
              </label>
              <select
                name="naturalness"
                value={answers.naturalness}
                onChange={handleDropdownChange}
                className="select-box"
                required
              >
                <option value="">Select</option>
                <option value="Passage A">Passage A</option>
                <option value="Passage B">Passage B</option>
                <option value="No Difference">No Difference</option>
              </select>
              <textarea
                name="naturalness_comment"
                value={comments.naturalness}
                onChange={handleCommentChange}
                className="comment-box"
                placeholder="Add Comment"
                required
                minLength={30}
              />
            </div>

            {/* Question for Simplicity */}
            <div className="question-container">
              <label className="question-label">
                Which one uses simpler sentence structure?
                <span className="question-description">
                  Consider: Shorter sentences, easily understandable.
                </span>
              </label>
              <select
                name="simplicity"
                value={answers.simplicity}
                onChange={handleDropdownChange}
                className="select-box"
                required
              >
                <option value="">Select</option>
                <option value="Passage A">Passage A</option>
                <option value="Passage B">Passage B</option>
                <option value="No Difference">No Difference</option>
              </select>
              <textarea
                name="simplicity_comment"
                value={comments.simplicity}
                onChange={handleCommentChange}
                className="comment-box"
                placeholder="Add Comment"
                required
                minLength={30}
              />
            </div>

            {/* Question for Fake Complex Phrase */}
            <div className="evaluation-container">
              <label className="question-label">
                Does this phrase "{passage.fake_complex}" make it harder to understand the paragraph?
              </label>
              <div className="radio-buttons">
                <label className="radio-button-container">
                  <span className="radio-label">Yes</span>
                  <input
                    type="radio"
                    name="fake_complex"
                    value="Yes"
                    onChange={handleRadioChange}
                    className="radio-button"
                    required
                  />
                </label>

                <label className="radio-button-container">
                  <span className="radio-label">No</span>
                  <input
                    type="radio"
                    name="fake_complex"
                    value="No"
                    onChange={handleRadioChange}
                    className="radio-button"
                    required
                  />
                </label>
              </div>
            </div>

            {/* Question for Improvement Suggestions */}
            <div className="evaluation-container comment-container">
              <label className="question-label">What improvements would you suggest?</label>
              <textarea
                name="improvement_suggestions"
                value={comments.improvement_suggestions}
                onChange={handleCommentChange}
                className="textarea-input"
                placeholder="Your suggestions..."
                required
              />
            </div>

            <div className="button-container">
              <button
                onClick={onBack}
                type="button"
                className="button button-back"
              >
                ← Back
              </button>
              <button type="submit" className="button button-next" onClick={async () => await fetchPassage(userId)} >
                Submit & Next
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p>Loading passage...</p>
      )}
      </>
      )}
    </div>
  );
};

export default SurveyPage;