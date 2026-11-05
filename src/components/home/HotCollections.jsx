import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
   
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState();


  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 2,
        nav: true
      
      },
      1000: {
        items: 4,
        nav: true,
        loop: false
      }
    }
  }

  async function fetchUsers() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    );
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
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



          {loading
            ? <OwlCarousel className="owl-theme" {...options} loop margin={10} nav items={4}>
              {users.map((__, index) => (
                <div key={index}>
                  <div className="nft_coll">
                    <div className="skeleton-box">
                      <Link >
                        <img
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp--skeleton">
                      <Link >
                        <img
                          className="lazy pp-coll"
                          alt=""
                        />
                      </Link>
                      <i></i>
                    </div>
                    <div className="nft_coll_info--skeleton">
                      <Link to="/explore">
                        <h4></h4>
                      </Link>
                      <span className="erc-code--skeleton"></span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          
           : users.length > 0 && (
            <OwlCarousel className="owl-theme" {...options} loop margin={10} nav items={4}>
              {users.map((user, index) => (
                <div key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${user.nftId}`}>
                        <img
                          src={user.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={user.authorImage}
                          alt=""
                        />
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
  );
};

export default HotCollections;
