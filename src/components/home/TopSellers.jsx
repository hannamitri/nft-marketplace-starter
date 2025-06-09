import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import TopSellersSkeleton from "../Animations/TopSellerSkeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSellers() {
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setSellers(res.data);
      } catch (err) {
        console.log("Failed to fetch seller data...", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSellers();
  }, []);

  return (
    <>
      {loading ? (
        <TopSellersSkeleton />
      ) : (
        <section id="section-popular" className="pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <h2>Top Sellers</h2>
                  <div className="small-border bg-color-2"></div>
                </div>
              </div>
              <div className="col-md-12">
                <ol className="author_list">
                  {sellers.map((item, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={item.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.authorId}`}>
                          {item.authorName}
                        </Link>
                        <span>{item.price} ETH</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TopSellers;
