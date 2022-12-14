import axios from "axios";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {

  const [loading, setLoading] = useState(true)
  const [sellers, setSellers] = useState([])


  async function getSellers () {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
    setSellers(data)
    setLoading(false)
  }

  useEffect(() => {
    getSellers()
  },[])


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
              { 
                loading ? (
                  new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to="">
                          <div
                            className="skeleton header__img"
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <div className="skeleton skeleton__text--title"></div>
                        <div className="skeleton skeleton__text"></div>
                      </div>
                    </li>
                  ))
                ) : (
                  sellers.map((seller, index) => (
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
                  ))
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
