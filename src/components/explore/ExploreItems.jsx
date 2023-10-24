import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Timer from "../UI/Timer";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [items, setitems] = useState(null)
  const [select, setselect] = useState(null)
  const [click, setclicks] = useState(8)
  async function getitems() {
    await axios.get(
      select === "likes_high_to_low" ?
        'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low' :
        select === "price_low_to_high" ? 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high' :
          select === "price_high_to_low" ? 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low' :
            'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore '
    )
      .then((response) => {
        setTimeout(() => {

          setitems(response.data)
        }, 300);
      })
  }
  useEffect(() => {
    getitems()
    setitems(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select])



  return (
    <>
      <div>
        <select onChange={(e) => { setselect(e.target.value) }} id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {items ? items.slice(0, click).map((item) => {


        return (

          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {item.expiryDate &&

                <Timer expiryDate={item.expiryDate} />
              }



              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="/" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="/" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="/">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to={`/item-details/${item.nftId}`}>
                  <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
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
        )
      })




        :




        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <Skeleton width={"100%"} height={400}></Skeleton>
          </div>
        ))}
      {click < items?.length ?

        <div className="col-md-12 text-center">
          <Link to="" onClick={() => { setclicks(click + 4) }} id="loadmore" className="btn-main lead">
            Load more
          </Link>
        </div>
        : null}
    </>
  );
};

export default ExploreItems;
