const ItemDetailsSkeleton = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mb-3">
          <div style={{ width: "100%", height: "400px", backgroundColor: "#eee", borderRadius: "12px" }}></div>
        </div>
        <div className="col-md-6">
          <div style={{ width: "60%", height: "32px", backgroundColor: "#ddd", marginBottom: "16px", borderRadius: "6px" }}></div>
          <div style={{ width: "100%", height: "80px", backgroundColor: "#eee", marginBottom: "12px", borderRadius: "8px" }}></div>
          <div className="d-flex mb-3">
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#ddd" }}></div>
            <div style={{ marginLeft: "12px", width: "120px", height: "16px", backgroundColor: "#ddd", borderRadius: "4px" }}></div>
          </div>
          <div style={{ width: "40%", height: "24px", backgroundColor: "#ddd", borderRadius: "4px" }}></div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsSkeleton;
