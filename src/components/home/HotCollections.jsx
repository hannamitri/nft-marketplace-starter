import React, { useState, useEffect } from "react";
import NFTSkeleton from "./NFTSkeleton.jsx";
import axios from "axios";
import SimpleSlider from "./slider.jsx";
import CustomArrows from "./HotCollectionsCarousel.jsx";

async function getNFTs() {
  try {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    );
    return response.data;
    // Data is already parsed and ready inside response.data
  } catch (error) {
    console.error("Request failed:", error.message);
  }
}

function HotCollections() {
  const [NFTCollections, setNFTCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getNFTs().then(setNFTCollections);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoading ? (
            <div style={{ display: "flex", gap: 16 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ flex: "1 1 0", minWidth: 0 }}>
                  <NFTSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <CustomArrows items={NFTCollections} />
          )}
        </div>
      </div>
    </section>
  );
}

export default HotCollections;
