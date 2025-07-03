import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import CountdownTimer from "../GetTimer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const NewItems = () => {
  const [usedata, setUsedata] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      const fetchdata = async () => {
        try {
          const { data } = await axios.get(
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
          );
          setUsedata(data);
          setLoading(false);
        } catch (error) {
          console.log("error fetching data:", error);
        }
      };
      fetchdata();
    }, 5000);
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
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <div className="col-12">
            <OwlCarousel
              className="owl-theme"
              responsive={responsiveSettings}
              margin={10}
              nav
              loop
            >
              {usedata.length<=0?
                 Array.from({ length: 4 }).map((_, index) =>
                    renderSkeletonCard(index)
                  )
                : usedata.map((item) => (
                    <div className="nft__item" key={item.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      <CountdownTimer expiryDate={item.expiryDate} />

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="#"><i className="fa fa-facebook fa-lg"></i></a>
                              <a href="#"><i className="fa fa-twitter fa-lg"></i></a>
                              <a href="#"><i className="fa fa-envelope fa-lg"></i></a>
                            </div>
                          </div>
                        </div>
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt={item.title}
                          />
                        </Link>
                      </div>

                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;