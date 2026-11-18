import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios"; 
import "../../jquery-global";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

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
              <OwlCarousel key="loading"
                className="owl-theme" margin={10} nav responsive={responsiveSettings}>
              {new Array(3).fill(0).map((_, index) => (
              <div className="item" key={index}>
                <div className="nft_coll">
                  <Skeleton width="100%" height="200px" borderRadius="8px" />
                  <div className="nft_coll_pp">
                    <Skeleton width="60px" height="60px" borderRadius="50%" />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <div><Skeleton width="100px" height="20px" /></div>
                    <div><Skeleton width="60px" height="16px" /></div>
                  </div>
                </div>
              </div>
            ))}
            </OwlCarousel>
            ) : (
              <OwlCarousel key="loaded"
                className="owl-theme" loop margin={10} nav responsive={responsiveSettings}>
                {users.map((user) => (
                  <div className="item" key={user.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${user.nftId}`}>
                        <img src={user.nftImage} className="lazy img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${user.authorId}`}>
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
