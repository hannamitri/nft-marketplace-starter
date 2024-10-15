import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import SkeletonTopSell from "../UI/SkeletonTopSell";

const TopSellers = () => {

  const [topSeller, setTopSeller] = useState([])
  const [loading, setLoading] = useState(false)




  async function TopSell() {
    setLoading(true)
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
  
    setTopSeller(data)
    setLoading(false)
    
  }

  useEffect(() => {
    TopSell()
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
              {loading ? <SkeletonTopSell/> : topSeller.map((topSell, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${topSell.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={topSell.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${topSell.authorId}`}>{topSell.authorName}</Link>
                    <span>{topSell.price} ETH</span>
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
