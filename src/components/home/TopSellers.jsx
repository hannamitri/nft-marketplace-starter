import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TopSellers = () => {
  const [topSellers, setTopsellers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function FeachTopseller(){
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`);
      setTopsellers(data);
      setLoading(false);
      console.log(data);
    } 
    FeachTopseller();
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
              { loading
                 ? new Array(12).fill(0).map((_, index) => (
                   <div style={{ padding: "10px", textAlign: "center", display:"flex" }} key={index}>
                     <Skeleton circle height={50} width={50} style={{ margin: "auto", marginBottom: 10 }} />
                     <i className="fa fa-check"></i>
                     <div style={{displa:"flex" }}>
                        <Skeleton width={100} height={20} style={{ marginBottom: 5 }}  />
                        <Skeleton width={60} height={15}  />
                      </div>
                   </div>
                 ))
                : topSellers.map(topSeller => (
                  <li key={topSeller.id}>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-author"
                          src={topSeller.authorImage}
                          alt=""
                        />
                       <i className="fa fa-check"></i>
                     </Link>
                   </div>
                   <div className="author_list_info">
                      <Link to="/author">{topSeller.authorName}</Link>
                      <span>{topSeller.price} ETH</span>
                   </div>
                  </li>
                ))
              }
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
