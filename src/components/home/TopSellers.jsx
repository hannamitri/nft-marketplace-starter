import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TopSellers.css";

const TopSellers = () => {

  const [sellers, setSllers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTopSellers()  
  {
    const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
    setSllers(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchTopSellers(); 
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
              {
                loading ? (
                  <>
                    {
                      new Array(12).fill(0).map((_, index) => {
                        return (
                          <li className="skeleton_body" key={index}>
                            <div className="author_list_pp">
                              <div>
                                <div className="skeleton_face"></div>
                                <i className="fa fa-check"></i>
                              </div>
                            </div>
                            <div className="author_list_info">
                              <div className="skeleton_name"></div>
                              <div className="skeleton_price"></div>
                            </div>
                          </li>
                        )
                      })
                    }
                  </>
                ) : (
                  <>  
                    {sellers.map((seller, index) => (
                      <li key={index}>
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
                          <span>{seller.price} ETH</span>
                        </div>
                      </li>
                    ))}
                  </>
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
