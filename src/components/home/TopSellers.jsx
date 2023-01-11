import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TopSellers = () => {

  const [topNfts, setTopNfts] = useState([]);
  const [loading, setLoading] = useState();

  async function topSellersData() {
    setLoading(true)
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    )
    setLoading(false)
    setTopNfts(data)
  }

  useEffect(() => {
    topSellersData()
  }, [])


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
              {topNfts.length > 0
              ? topNfts.map((data) => (
                <li key={data.id}>
                <div className="author_list_pp">
                  <Link to={`/author/${data.authorId}`}>
                    <img
                      className="lazy pp-author"
                      src={data.authorImage}
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="author_list_info">
                  <Link to="/author">{data.authorName}</Link>
                  <span>{data.price} ETH</span>
                </div>
              </li>
              )) :
              new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Skeleton height={50} width={50} borderRadius={50} />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="author_list_info">
                    <Skeleton width={95} borderRadius={5} />
                    <span>
                      <Skeleton width={50} borderRadius={5} />
                    </span>
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
