import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css"; // Assuming this is the correct path to your CSS file
import EndPage from './endpage'

const SurveyPage = ({ onBack }) => {
  const [userId, setUserId] = useState("");
  const [surveySetId, setSurveySetId] = useState(null);
  const [endpage, setEndPage] = useState(false);
  const [passage, setPassage] = useState(null);
  const [swapPosition, setSwapPosition] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false); 
  const [hoveredSentenceA, setHoveredSentenceA] = useState(null); 
  const [hoveredSentenceB, setHoveredSentenceB] = useState(null); 
  const [answers, setAnswers] = useState({
    understanding: "",
    naturalness: "",
    simplicity: "",
  });
  const [comments, setComments] = useState({
    understanding_comment: "",
    naturalness_comment: "",
    simplicity_comment: "",
    complex_a: "",
    complex_b: "",
  });

  const [topic, setTopic] = useState("")

  const [selectedSentencesA, setSelectedSentencesA] = useState([]);
  const [selectedSentencesB, setSelectedSentencesB] = useState([]);

  const [isStartClicked, setIsStartClicked] = useState(false);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value); // Update state as user types
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
      const res = await axios.get(`http://localhost:5004/get-passage/${numericUserId}` );
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
    // Clear text inputs (responses)
  setAnswers({
    understanding: "",
    naturalness: "",
    simplicity: "",
  });  // Clear dropdown answers
  setComments({
    understanding_comment: "",
    naturalness_comment: "",
    simplicity_comment: "",
    complex_a: "",
    complex_b: "",
  });  // Clear comments
  setSelectedSentencesA([]);
  setSelectedSentencesB([]);
};

// Fetch new passage and reset form
const fetchPassage = async (userId) => {
  try {
    console.log("Fetching passage for userId:", userId);
    const res = await axios.get(`http://localhost:5004/get-passage/${userId}`);
    if (res.status === 200) {
      setPassage(res.data);
      resetForm(); // Reset the form if passage is fetched
    } else {
      alert("No new passages available.");
      setEndPage(true); // Set state to display EndPage
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      alert("No new passages available.");
      setEndPage(true); // Set state to display EndPage
    } else {
      console.error("Error fetching passage:", error);
    }
  }
};

if (endpage) {
  return <EndPage />;
}

  const handleDropdownChange = (name, selectedValue) => {
    console.log("Selected dropdown value: ", selectedValue)  
    let actualValue;
    if (selectedValue === "Passage 1" || selectedValue === "Passage 2") {
    actualValue = selectedValue === "Passage 1"
      ? (swapPosition ? "Passage B" : "Passage A")
      : (swapPosition ? "Passage A" : "Passage B");
  } else {
    actualValue = "No Difference";
  }

  console.log("Mapped actual value:", actualValue);
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: selectedValue,
    }));
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setComments((prevComments) => ({
      ...prevComments,
      [name]: value,
    }));
  };
  
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
      !dataToSubmit.complex_a ||
      !dataToSubmit.complex_b
    ) {
      alert("Please fill in all required fields.");
      return; // Prevent form submission if required fields are missing
    }

    try {
      // Send the data to the backend for saving
      console.log(dataToSubmit)
      await axios.post(`http://localhost:5004/submit`, dataToSubmit);
      alert("Response submitted!");
      resetForm(); 
      fetchPassage(userId); // Optionally fetch a new passage after submission
      setSwapPosition(prev => !prev);
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
            <h3>
              Please read Passage 1 and Passage 2 carefully. While reading, please select complex sentences.
            </h3>
            <p>Possible complex sentence : sentence with more than 20 words or sentences containing "although", "while", "whereas", etc.</p>
            <div className="passages-container">

              {swapPosition ? (
                <>
                  {/* Passage 1 : Passage B and Passage 2 : Passage A*/}
                  <div className="passage-box">
                    <h2 className="passage-title">Passage 1</h2>
                    <p className="passage-text">
                    {passage.passage_b.split(/(?<=[.!?])\s+/).map((sentence, index) => (
                    <span
                      key={index}
                      className={`clickable-sentence 
                        ${selectedSentencesB.includes(sentence) ? "selected" : ""} 
                        ${hoveredSentenceB === sentence ? "hovered" : ""}`}
                      onClick={() => handleSentenceClick(sentence, "B")}
                      onMouseEnter={() => setHoveredSentenceB(sentence)} // Track hovered sentence
                      onMouseLeave={() => setHoveredSentenceB(null)} // Reset when mouse leaves
                    >
                      {sentence}{" "}
                    </span>
                    ))}
                    </p>
                  </div>
                  <div className="passage-box">
                    <h2 className="passage-title">Passage 2</h2>
                    <p className="passage-text">
                    {passage.passage_a.split(/(?<=[.!?])\s+/).map((sentence, index) => (
                    <span
                      key={index}
                      className={`clickable-sentence 
                        ${selectedSentencesA.includes(sentence) ? "selected" : ""} 
                        ${hoveredSentenceA === sentence ? "hovered" : ""}`}
                      onClick={() => handleSentenceClick(sentence, "A")}
                      onMouseEnter={() => setHoveredSentenceA(sentence)} // Track hovered sentence
                      onMouseLeave={() => setHoveredSentenceA(null)} // Reset when mouse leaves
                    >
                      {sentence}{" "}
                    </span>
                    ))}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="passage-box">
                    <h2 className="passage-title">Passage 1</h2>
                    <p className="passage-text">
                    {passage.passage_a.split(/(?<=[.!?])\s+/).map((sentence, index) => (
                    <span
                      key={index}
                      className={`clickable-sentence 
                        ${selectedSentencesA.includes(sentence) ? "selected" : ""} 
                        ${hoveredSentenceA === sentence ? "hovered" : ""}`}
                      onClick={() => handleSentenceClick(sentence, "A")}
                      onMouseEnter={() => setHoveredSentenceA(sentence)} // Track hovered sentence
                      onMouseLeave={() => setHoveredSentenceA(null)} // Reset when mouse leaves
                    >
                      {sentence}{" "}
                    </span>
                    ))}
                    </p>
                  </div>
                  <div className="passage-box">
                    <h2 className="passage-title">Passage 2</h2>
                    <p className="passage-text">
                    {passage.passage_b.split(/(?<=[.!?])\s+/).map((sentence, index) => (
                    <span
                      key={index}
                      className={`clickable-sentence 
                        ${selectedSentencesB.includes(sentence) ? "selected" : ""} 
                        ${hoveredSentenceB === sentence ? "hovered" : ""}`}
                      onClick={() => handleSentenceClick(sentence, "B")}
                      onMouseEnter={() => setHoveredSentenceB(sentence)} // Track hovered sentence
                      onMouseLeave={() => setHoveredSentenceB(null)} // Reset when mouse leaves
                    >
                      {sentence}{" "}
                    </span>
                    ))}
                    </p>
                  </div>
                </>

              )}
              

              
            </div>
          </div>
          <div className="evaluation-container comment-container">
              <div className="rephrase-container">
                <h3>Please provide the main argument of Passage 1 and Passage 2 in a single sentence </h3>
                <textarea
                  name = "topic"
                  value={topic}
                  onChange={handleTopicChange}
                  className="textarea-input"
                  placeholder="Please provide a main argument of the given passages."
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
                value={answers.understanding} 
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  console.log("Selected dropdown value:", selectedValue); // Debugging
                  handleDropdownChange("understanding", selectedValue)
                }}
                className="select-box"
                required
              >
                <option value="">Select</option>
                <option value="Passage 1">Passage 1</option>
                <option value="Passage 2">Passage 2</option>
                <option value="No Difference">No Difference</option>
              </select>
              <textarea
                name="understanding_comment"
                value={comments.understanding_comment}
                onChange={handleCommentChange}
                className="comment-box"
                placeholder="Please explain your choice with short justification"
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
                value={answers.naturalness}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  console.log("Selected dropdown value:", selectedValue); // Debugging
                  handleDropdownChange("naturalness", selectedValue)
                }}
                className="select-box"
                required
              >
                <option value="">Select</option>
                <option value="Passage 1">Passage 1</option>
                <option value="Passage 2">Passage 2</option>
                <option value="No Difference">No Difference</option>
              </select>
              <textarea
                name="naturalness_comment"
                value={comments.naturalness_comment}
                onChange={handleCommentChange}
                className="comment-box"
                placeholder="Please explain your choice with short justification"
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
                value={answers.simplicity}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  console.log("Selected dropdown value:", selectedValue); // Debugging
                  handleDropdownChange("simplicity", selectedValue)
                }}
                className="select-box"
                required
              >
                <option value="">Select</option>
                <option value="Passage 1">Passage 1</option>
                <option value="Passage 2">Passage 2</option>
                <option value="No Difference">No Difference</option>
              </select>
              <textarea
                name="simplicity_comment"
                value={comments.simplicity_comment}
                onChange={handleCommentChange}
                className="comment-box"
                placeholder="Please explain your choice with short justification"
                required
                minLength={30}
              />
            </div>
            <div className="evaluation-container comment-container">
              <div className="rephrase-container">
                <h3>Please review selected sentences from Passage 1.</h3>
                <h3>If there are certain complex phrases in the selected sentence, please mark them with [ ] in the textbox below.</h3>
                <span className="instructiont-text">
                  <p>Please consider : Is certain phrase too technical? Does it require additional explanation?</p>
                  <p>Example : "The authors highlight potential uses in [sentiment analysis], machine translation, and information extraction, and they plan to continue improving the model’s efficiency and scalability".</p>
                </span>
                <textarea
                  name = "complex_a"
                  value={comments.complex_a}
                  onChange={handleCommentChange}
                  className="textarea-input"
                  placeholder="Please select complex sentences that need to be simplified."
                  required
                />
              </div>
            </div>
            <div className="evaluation-container comment-container">
              <div className="rephrase-container">
                <h3>Please select complex sentences from Passage 2.</h3>
                <h3>If there are certain complex phrases in the selected sentence, please mark them with [ ] in the textbox below.</h3>
                <span className="instructiont-text">
                  <p>Please consider : Is certain phrase too technical? Does it require additional explanation?</p>
                  <p>For example, "The authors highlight potential uses in [sentiment analysis], machine translation, and information extraction, and they plan to continue improving the model’s efficiency and scalability".</p>
                </span>
                <textarea
                  name = "complex_b"
                  value={comments.complex_b}
                  onChange={handleCommentChange}
                  className="textarea-input"
                  placeholder="Please select complex sentences that need to be simplified."
                  required
                />
              </div>
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