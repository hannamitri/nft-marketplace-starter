import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = ({ topSellers, loadingtopSellers}) => {
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
              {loadingtopSellers
                ? new Array(12).fill(0).map((_,index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <Skeleton width={50} height={50} borderRadius={999} />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Skeleton width={100} height={20} borderRadius={0} />
                        <br />
                        <Skeleton width={40} height={20} borderRadius={0} />
                      </div>
                    </li>
                  ))
                : topSellers.map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
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
                        <span>{seller.price} ETH</span>
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
