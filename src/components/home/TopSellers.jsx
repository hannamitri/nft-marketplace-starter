import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import "aos/dist/aos.css";

const TopSellers = () => {

  const [sellers, setSellets] = useState([])

  async function getSellers() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
    setSellets(data)
  }

  useEffect(() => {
    getSellers()
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
              {sellers.length 
              ? (
                  sellers.map((seller, index) => (
                  <li key={index}
                  data-aos="fade-left"
                  data-aos-delay="250">
                    <div className="author_list_pp">
                      <Link to={`/author/${seller?.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller?.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${seller?.authorId}`}>
                        {seller?.authorName}
                      </Link>
                      <span>{seller?.price} ETH</span>
                    </div>
                  </li>
                  ))
                )
              : (
                  new Array(12).fill(0).map((_, index) => (
                    <li key={index} 
                    data-aos="fade-left"
                    data-aos-delay="250">
                      <div className="author_list_pp">
                        <Link to={`/author/`}>
                          <Skeleton width={"50px"} height={"50px"} borderRadius={"50%"}/>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/`}>
                          <Skeleton width={"110px"} height={"15px"} borderRadius={"4px"}/>
                        </Link>
                        <span>
                          <Skeleton width={"45px"} height={"15px"} borderRadius={"4px"}/>
                        </span>
                      </div>
                    </li>
                  ))
                )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
