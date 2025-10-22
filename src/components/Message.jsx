// src/components/Message.jsx
const Message = ({ title, text, actionLabel, onAction }) => {
  return (
    <section id="section-message" className="no-bottom">
      <div className="container">
        <div className="text-center">
          {title && (
            <>
              <h2>{title}</h2>
              <div className="small-border bg-color-2"></div>
            </>
          )}
          {text && <p className="mt-3">{text}</p>}

          {actionLabel && onAction && (
            <button type="button" className="btn-main mt-3" onClick={onAction}>
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Message;
