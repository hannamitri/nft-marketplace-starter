import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SkeletonTopSellers from "./home-components/Skeletons/SkeletonTopSellers";

const TopSellers = () => {
  const [sellers, setSellers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  async function getSellers(){
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`)
    setSellers(data)
    setIsLoaded(true)
  }

  useEffect(() => {
    getSellers()

  },[isLoaded])

  return (
    <section id="section-popular" className="pb-5">
      <div className="container" >
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12" data-aos = "fade-in" data-aos-duration = "1000" data-aos-delay = "200" data-aos-once="true">
            <ol className="author_list">
              {
                isLoaded ? (
                  sellers.map((seller) => (
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
                        <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))
                ): (
                  <SkeletonTopSellers />
                )
              }
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
