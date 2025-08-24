export function NextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="custom-arrow next"
      style={{
        position: "absolute",
        top: "50%",
        right: "0",
        transform: "translateY(-50%)",
        zIndex: 2,
        width: 40,
        height: 40,
        background: "#fff",
        borderRadius: "50%",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <i className="fa fa-chevron-right" style={{ fontSize: 16 }} />
    </div>
  );
}

export function PrevArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="custom-arrow prev"
      style={{
        position: "absolute",
        top: "50%",
        left: "0",
        transform: "translateY(-50%)",
        zIndex: 2,
        width: 40,
        height: 40,
        background: "#fff",
        borderRadius: "50%",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <i className="fa fa-chevron-left" style={{ fontSize: 16 }} />
    </div>
  );
}
