import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Skeleton from "../UI/Skeleton"

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchTopSellers() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
    setTopSellers(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchTopSellers()
  }, [])

  console.log(topSellers)
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
              {loading ?
                 new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to="/author/:id">
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Skeleton width="100px" height="20px" borderRadius="5px" />
                    </div>
                  </li>

                )) 
                :              
                topSellers.map((data) => (
                  <li key={data.id}>
                    <div className="author_list_pp">
                      <Link to="/author/:id">
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
                ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
