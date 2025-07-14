// ChecklistModal.jsx
import React from "react";import './style.css'; 

const ChecklistModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="text-xl font-semibold mb-2">✅ Quick Checklist</h2>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          <li>I preserved the core contribution and technical terms</li>
          <li>I explained complex ideas clearly</li>
          <li>I didn’t copy GPT’s version but improved it</li>
          <li>My summary is fluent and understandable to CS undergrads</li>
        </ul>
        <p className="mb-4 font-medium">Please check before you move on.</p>
        <div className="button-container">
          <button className="button button-back" onClick={onCancel}>
            ⬅ Go Back
          </button>
          <button className="button button-next" onClick={onConfirm}>
            ✅ Continue
          </button>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 50;
        }
        .modal-box {
          background: white;
          border-radius: 8px;
          padding: 20px;
          width: 90%;
          max-width: 450px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ChecklistModal;
