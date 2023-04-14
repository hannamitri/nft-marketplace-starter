import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

import '../../css/TopSellers.css'

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const TopSellers = () => {

  const [sellers, setSellers] = useState([])
  const [loading, setLoading] = useState(true)

  async function Sellersdata() {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
    setSellers(data)
    setLoading(true)
  }

  useEffect(() => {
    Sellersdata()
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
            {
              loading ? (
                new Array(12).fill(0).map((_, index) => (
                        <div className="all" key={index}>
                          <div className="nft_coll_pp loading">
                              <div className="lazy pp-coll "  alt="" />
                            <i className="fa fa-check "></i>
                          </div>
                          <div className="nft_coll_info ">
                              <h4 className="titleLoading"></h4>
                            <span className="spanLoading">ERC-</span>
                            </div>
                        </div>
                ))
                )
              :
                sellers.map(seller => (
                  new Array(1).fill(0).map((_, index) => (
                    <li key={index}>
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
                    <span>{seller.price}ETH</span>
                    </div>
                    </li>
                    ))
                ))
              }
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
