import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import CarouselNewItems from "./CarouselNewItems";

const NewItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
      .then(response => {
        setData(response.data)
        setLoading(false);
      })
      .catch(error => {
        console.error(`the error is ${error}`);
      });
    }, [])

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
      <CarouselNewItems></CarouselNewItems>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
