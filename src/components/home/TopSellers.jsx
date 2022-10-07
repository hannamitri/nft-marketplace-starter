import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios"
import Skeleton from "../UI/Skeleton"

const TopSellers = () => {
  const [sellers, setSellers] = useState([])
  const [loading, setLoading] = useState(false)

  async function fetchSellers(){
    setLoading(true)
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`)
    setSellers(data)
    setLoading(false)
  }

  useEffect(() => {
     fetchSellers()
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
          {loading? (
          <ol className="author_list">
              {new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="">
                      <Skeleton
                        width="50px"
                        height="50px"
                        borderRadius="50%"
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Skeleton width="50%" height="18px" />
                    <br />
                    <Skeleton width="50%" height="18px" />
                  </div>
                </li>
              ))}
            </ol> 
            ) : (
            <ol className="author_list">
              {sellers.map((seller, index) => (
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
