import React, { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AutoPlay from "../UI/AutoPlay";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState(3);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
        );
        setCollections(data);
      } catch (err) {
        console.error("Error fetching collections", err);
      }
      setLoading(false);
    }
    fetchCollections();
  }, []);

  useEffect(() => {
    const updateSkeletonCount = () => {
      if (window.innerWidth < 768) {
        setSkeletonCount(1);
      } else if (window.innerWidth < 1024) {
        setSkeletonCount(2);
      } else {
        setSkeletonCount(3);
      }
    };

    updateSkeletonCount();
    window.addEventListener("resize", updateSkeletonCount);
    return () => window.removeEventListener("resize", updateSkeletonCount);
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
          {loading ? (
            <div className="skeleton-container">
              {[...Array(skeletonCount)].map((_, index) => (
                <div className="skeleton-card" key={index}></div>
              ))}
            </div>
          ) : (
            <AutoPlay collections={collections} />
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
