import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import 'aos/dist/aos.css'; // You can also use <link> for styles


const TopSellers = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
     // Simulate data loading
     setTimeout(() => {
        setData({ data });
        setIsLoading(false);
     }, 2000);
  }, []);

  const [collections, setCollections] = useState([]);

  async function getData() {

    try {

      const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');

      setCollections(response.data);

    } catch (error) {

      console.error('Error fetching data:', error);

    }

  }

  useEffect(() => {

    getData();

  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div data-aos="fade-up" className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div data-aos="fade-up" className="col-md-12">
            <ol className="author_list">
            {collections && collections.map((collection, index)  => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${collection.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={collection.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div data-aos="fade-up" className="author_list_info">
                    <Link to={`/author/${collection.authorId}`}>{collection.authorName}</Link>
                    <span>{collection.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
