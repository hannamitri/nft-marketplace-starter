import React, { useEffect, useState } from "react";
import Carousel from "../UI/HotCollectionsCarousel";
import axios from 'axios';

const HotCollections = () => {
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);

  const fetchCardData = async () => {
    try {
      const cardData = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)
      console.log(cardData);
      setAuthors(cardData.data)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching card data:", error);
      setLoading(false);
    }
  }

  useEffect (() => {
    fetchCardData();
  }, [])

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="hot-collections">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="hot-collections">
            <div className="hotCollections__carousel">
              <Carousel className="hotCollections__carousel" items={authors} key={authors.id} isLoading={loading}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;