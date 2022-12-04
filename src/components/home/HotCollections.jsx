import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function HotCollections() {
  const [users, setUsers] = useState([]);

  async function fetchHotCollections() {
    const { data } = await axios.get(
      " https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );

    setUsers(data);
  }
  useEffect(() => {
    fetchHotCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
       
            {users?.map((item) => (
              <div
                key={item.id}
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              >
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img
                        src={item.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={item.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>Pinky Ocean</h4>
                    </Link>
                    <span>ERC-192</span>
                  </div>
                </div>
              </div>
            ))}
   
        </div>
      </div>
    </section>
  );
}
