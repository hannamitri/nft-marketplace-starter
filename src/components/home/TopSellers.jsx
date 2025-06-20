import React from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const { data: sellers = [], isLoading } = useSWR(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
  );
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
            {isLoading && (
              <ol className="author_list">
              {Array(12).fill().map((_, i) => (
                <li key={i}>
                  <div style={{position: "relative"}} className="author_list_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                    <i className="fa fa-check"></i>
                  </div>
                  <div style={{display: "inline-block", paddingLeft: "20px"}} className="author_list_info">
                    <Skeleton width="120px" /> <br />
                    <Skeleton width="80px" />
                  </div>
                </li>
              ))}
            </ol>
            )}
            {!isLoading && (
              <ol className="author_list">
                {sellers.map((seller) => (
                  <li key={seller.id}>
                    <div className="author_list_pp">
                      <Link to={"/author/" + seller.authorId}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={"/author/" + seller.authorId}>
                        {seller.authorName}
                      </Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
