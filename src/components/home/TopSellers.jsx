import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function DynamicTopSellers() {
        const { data } = await axios.get(
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setTopSellers(data);
        setLoading(false);
    }

    useEffect(() => {
        DynamicTopSellers();
    }, []);
  
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
              {loading ? (Array(12).fill(null).map((_, index) => (
                <li className="skeleton" key={index}>
                  <div className="author_list_pp skeleton_circle"></div>
                  <div className="author_list_info">
                    <div className="skeleton-line short"></div>
                    <div className="skeleton-line tiny"></div>
                  </div>
                  </li>))) 
                  : 
                  topSellers.map((seller, index) => (
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
                    <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
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
