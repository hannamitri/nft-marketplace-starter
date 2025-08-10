import React, { useEffect } from 'react';

const Toast = ({ message, type = 'error', onClose, show = false }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000); // Auto-hide after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>&times;</button>
    </div>
  );
};

export default Toast;
