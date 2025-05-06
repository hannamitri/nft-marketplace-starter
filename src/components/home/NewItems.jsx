import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from '../Carousel';
import SkeletonCard from '../SkeletonCard';
import Countdown from '../Countdown';

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
    .then((res) => {
      if (mounted) {
        setItems(res.data);
        setLoading(false)
      }
    })
    .catch((err) => {
      console.error('Error fetching data', err)
      setLoading(false)
    });

    return () => (mounted = false);
  }, [])

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12">
            <Carousel>
              {loading 
                ? new Array(4).fill(0).map((_, i) => <SkeletonCard key={i} /> )
                : items.map((item, index) => (
            <div className="nft__item" key={index}>
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Creator: Monica Lucas"
                  >
                  <img className="lazy" src={item.authorImage} alt='author' />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <Countdown expiryDate={item.expiryDate} />

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt='nft'
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
          </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
