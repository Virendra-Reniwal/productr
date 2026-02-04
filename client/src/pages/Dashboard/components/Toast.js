import React from "react";
import "./Toast.css";

export default function Toast({ message, onClose }) {
  return (
    <div className="toast-wrapper">
      <div className="toast">
        <div className="toast-icon">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M6.5 11.2L3.8 8.5L2.8 9.5L6.5 13.2L13.5 6.2L12.5 5.2L6.5 11.2Z"
              fill="white"
            />
          </svg>
        </div>

        <span className="toast-text">{message}</span>

        <button className="toast-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}
