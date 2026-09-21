import React from "react";

const SectionTitle = ({ children, animation = "fade-up" }) => (
  <div className="col-lg-12">
    <div className="text-center" data-aos={animation || undefined}>
      <h2>{children}</h2>
      <div className="small-border bg-color-2"></div>
    </div>
  </div>
);

export default SectionTitle;
