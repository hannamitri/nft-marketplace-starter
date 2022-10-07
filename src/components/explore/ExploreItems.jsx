import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios"
import Skeleton from "../UI/Skeleton"
import Countdown from "../UI/Countdown"
import { Explore } from "@mui/icons-material";

const ExploreItems = () => {
  const [loading, setLoading] = useState(false)
  const [nfts, setNfts] = useState([])
  const [items, setItems] = useState(8)

  async function fetchExplore() {
    setLoading(true)
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`)
    setNfts(data)
    setLoading(false)
  }

  async function filter(filterValue) {
    setLoading(true)
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`)
    setNfts(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchExplore()
  }, [])

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(e) => filter(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <>
          {new Array(items).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton width="100%" height="400px" />
            </div>
          ))}
        </>
      ) : (
        <>
          {nfts.slice(0, items).map((nft, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${nft.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={nft.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {nft.expiryDate ? (
                  <Countdown expiryDate={nft.expiryDate} />
                ) : (
                  ""
                )}
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a
                          href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a
                          href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${nft.nftId}`}>
                    <img src={nft.nftImage} className="lazy nft__item_preview" alt="" />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${nft.nftId}`}>
                    <h4>{nft.title}</h4>
                  </Link>
                  <div className="nft__item_price">{nft.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{nft.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col-md-12 text-center">
            {items < 16 ? (
              <button
                onClick={() => setItems(items + 4)}
                id="loadmore"
                className="btn-main lead"
              >
                Load More
              </button>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </>
  )
};

export default ExploreItems;