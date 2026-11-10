import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios"; 
import "../../jquery-global";
import OwlCarousel from "react-owl-carousel";

const responsiveSettings = {
  0: { items: 1 },
  576: { items: 2 },
  768: { items: 3 },
  1200: { items: 4 },
};

const HotCollections = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    setUsers(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, []);


  return (
    <>
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            {loading ? (
              new Array(3).fill(0).map((_, index) => (
              <div className="item col-12 col-sm-6 col-lg-4" key={index}>
                <div className="nft_coll">
                  <div className="skeleton-box nft_wrap"></div>
                  <div className="nft_coll_pp">
                    <div className="skeleton-circle pp-coll"></div>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <div className="skeleton-info"></div>
                    <div className="skeleton-id"></div>
                  </div>
                </div>
              </div>
            ))) : (
              <OwlCarousel 
                className="owl-theme" loop margin={10} nav responsive={responsiveSettings}>
                {users.map((user) => (
                  <div className="item" key={user.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                        <img src={user.nftImage} className="lazy img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img className="lazy pp-coll" src={user.authorImage} alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{user.title}</h4>
                      </Link>
                      <span>ERC-{user.code}</span>
                    </div>
                  </div>
                </div>
              ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HotCollections;
