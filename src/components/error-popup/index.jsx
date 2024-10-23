import React from "react";
import "./style.css";

const ErrorPopup = ({ errorMessage, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Error</h2>
        <p>{errorMessage}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ErrorPopup;
