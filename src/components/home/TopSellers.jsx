import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {
  const [loading, setLoading] = useState(true);
  const [sellers, setSellers] = useState([]);

  async function loadSellers() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
    );
    setSellers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadSellers();
  }, []);

  return (
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
              {loading
                ? sellers.map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Skeleton
                          variant="circular"
                          animation="wave"
                          width={60}
                          height={60}
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          width="60%"
                          height={20}
                          style={{ marginBottom: "5px", marginLeft: "5px" }}
                        />
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          width="20%"
                          height={20}
                          style={{ marginLeft: "5px" }}
                        />
                      </div>
                    </li>
                  ))
                : sellers.map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">{seller.authorName}</Link>
                        <span>{`${seller.price} ETH`}</span>
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
