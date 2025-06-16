import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Carousel from "../UI/Carousel";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "../../css/styles/style.css";
import Time from "../UI/Time.jsx";
import 'aos/dist/aos.css';

function NewItems({ fetchUrl }) {
  const [cards, setCards] = useState([]);
  const [Loading, setLoading] = useState(true);
  
  
  const base_url =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

  useEffect(() => {
    async function newItems() {
      try {
        const { data } = await axios.get(base_url);
        setCards(data);
        setTimeout(() => {
          setLoading(false);
        }, 4000);             
        } catch (error) {
          console.log("Error fetching new items:", error);
          setLoading(false);
        } finally {
        }
      }
      
    newItems();
  }, []);

  if (!cards.length) return <div>No collections found.</div>;
  
 return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row"
        data-aos="fade-in"
                data-aos-offset="10"
                data-aos-delay="100"
                data-aos-duration="2000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
                data-aos-anchor-placement="center">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {Loading  ? (
            <>
            <Carousel>
            {new Array(4).fill(0).map((__, index) => (
            <div className="">
               <div className="nft__item" key={index}>
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                    >
                    <img className="lazy"  />
                    <Skeleton width={50} height={50} borderRadius={99} />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <Skeleton height={20} width="100%" />
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to="/item-details">
                    <img className="lazy nft__item_preview"/>
                    <Skeleton width={282} height={270} />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details/">
                    <h4></h4>
                  </Link>
                  <div className="nft__item_price"><Skeleton height={20} width="40%" /></div>
                    <Skeleton height={20} width="100%" />
                  <div className="nft__item_like">                    
                  </div>
                </div>
              </div>
            </div>            
            ))}
            </Carousel>
            </>

          ):(            
          <Carousel>
          {cards.map((item) => (
            <div className="">
              <div className="nft__item" key={item.id}>
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                    >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <Time nft={ item } />
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
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
            </div>
          ))}
          </Carousel>
        )}
           </div>
      </div>
    </section>
  );
};

export default NewItems;
