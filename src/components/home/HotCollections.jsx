import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AOS from "aos";

const HotCollections = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
       setTimeout(()=>{
    const fetchData = async () => {
   
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setUserData(data);
          setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      
      }
    };
    fetchData();
  },5000)
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const responsiveSettings = {
    0: { items: 1 },
    600: { items: 2 },
    1000: { items: 3 },
    1200: { items: 4 },
  };

  const renderSkeletonCard = (key) => (
    <div className="nft_coll" key={key}>
      <div className="nft_wrap">
        <Skeleton height={200} />
      </div>

      <div className="nft_coll_pp">
        <Skeleton circle={true} height={50} width={50} />
        <i className="fa fa-check"></i>
      </div>
      <div className="nft_coll_info">
        <h4><Skeleton width={100} /></h4>
        <span><Skeleton width={60} /></span>
      </div>
    </div>
  );


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <OwlCarousel
            className="owl-theme"
            responsive={responsiveSettings}
            loop
            margin={10}
            nav
            items={4}
          >
            {userData.length<=0?
               Array.from({ length: 4 }).map((_, index) => (
                  <div key={index}>{renderSkeletonCard(index)}</div>
                ))
              : userData.map((HotColl) => (
                  <div key={HotColl.id} id={HotColl.id}>
                    <div className="nft_coll" data-aos="fade-up">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${HotColl.nftId}`}>
                          <img
                            src={HotColl.nftImage}
                            className="lazy img-fluid"
                            loading="lazy"
                            alt={HotColl.title}
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${HotColl.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={HotColl.authorImage}
                            loading="lazy"
                            alt={HotColl.authorName || "Author"}
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{HotColl.title}</h4>
                        </Link>
                        <span>ERC-{HotColl.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;