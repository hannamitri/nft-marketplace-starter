import React from "react";

const Skeleton = () => {
  return (
    <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ display: "block", marginBottom: "20px" }}>
      <div className="nft__item" style={{ border: "1px solid #ddd", padding: "10px" }}>
        <div className="author_list_pp">
          <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#e0e0e0" }}></div>
        </div>
        <div className="nft__item_wrap" style={{ marginTop: "10px" }}>
          <div style={{ width: "100%", height: "200px", background: "#e0e0e0" }}></div>
        </div>
        <div className="nft__item_info" style={{ marginTop: "10px" }}>
          <div style={{ width: "60%", height: "20px", background: "#e0e0e0", marginBottom: "10px" }}></div>
          <div style={{ width: "30%", height: "20px", background: "#e0e0e0" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;