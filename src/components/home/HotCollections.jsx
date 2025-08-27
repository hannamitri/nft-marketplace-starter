import React from "react";
import NFTCarousel from "../NFTCarousel"; // yo uso el carrusel reutilizable

export default function HotCollections() {
  return (
    <section id="section-collections" className="no-bottom" style={{ padding: "24px 0" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        <NFTCarousel /> {/* yo dejo que el carrusel se encargue de los datos */}
      </div>
    </section>
  );
}
