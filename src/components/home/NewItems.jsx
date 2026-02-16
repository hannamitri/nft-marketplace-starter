import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Card from "../UI/Card";
import AOS from "aos";
import "aos/dist/aos.css";

const NewItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
      );
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, []);
  
  useEffect(() => {
  AOS.init({
    once: true,
  });
}, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      576: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-down" data-aos-easing="ease-in-out" data-aos-duration="500">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <OwlCarousel className="owl-theme" {...options} nav>
              {new Array(4).fill(0).map((_, index) => (
                <div key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={"/author"}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <Skeleton width='50px' height='50px' borderRadius='50%' />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                          </div>
                        </div>
                      </div>

                      <Link to="/item-details">
                        <Skeleton width='100%' height='350px' />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                      <Skeleton width='100px' height='30px' />
                      </Link>
                      <Skeleton width='100px' height='20px' />
                      <div className="nft__item_like flex">
                        <Skeleton width='30px' height='15px' />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel className="owl-theme" {...options} nav>
              {data.map((item) => (
                <div key={item.id}>
                  <Card item={item}/>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
