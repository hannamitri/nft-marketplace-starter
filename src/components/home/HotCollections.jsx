import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from "../UI/Skeleton";


const HotCollections = () => {

const [collections, setCollections] = useState([]);

const [loading, setLoading] = useState(true);

useEffect(function () {
  fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    setTimeout(function () {
      setCollections(data);
      setLoading(false);
    }, 2000);
  });
}, []);

console.log("Collections in state:", collections);

      return (            <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
{loading ? (
  <div className="row">
    {new Array(4).fill(0).map((_, index) => (
      < div className="col-lg-3 col-md-6 col-sm-6" key={index}>
        <div className="nft_coll">
    <Skeleton width="100%" height="180px" borderRadius="8px" />

    <div style={{ marginTop: "12px" }}>
        <Skeleton width="40px" height="40px" borderRadius="50%" />
    </div>

    <div style={{ marginTop: "12px" }}>
        <Skeleton width="70%" height="20px" borderRadius="4px" />
    </div>

    <div style={{ marginTop: "8px" }}>
        <Skeleton width="40%" height="14px" borderRadius="4px" />
    </div>
</div>
        </div>        
    ))}
  </div>
) : (
          <OwlCarousel
    className="owl-theme"
    loop
    margin={10}
    nav
    responsive={{
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 4 }
    }}
>
          {collections.map((collection) => (
            <div className="item" key={collection.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{collection.title}</h4>
                  </Link>
                  <span>ERC-{collection.code}</span>
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
