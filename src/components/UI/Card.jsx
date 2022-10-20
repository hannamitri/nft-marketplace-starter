import React from 'react'
import { Link } from 'react-router-dom'
import Countdown from './Countdown'

const Card = ({ item, responsiveClass, authorId, authorImage }) => {
  return (
    <div
          key={item.id}
          className={`d-item ${responsiveClass}`}
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId || authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                state={{ authorId: item.authorId || authorId }}
              >
                <img className="lazy" src={item.authorImage || authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            {item.expiryDate && (
              <div className="de_countdown">
                <Countdown expiryDate={item.expiryDate} />
              </div>
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
              <Link to={`/item-details/${item.nftId}`} state={{ itemId: item.nftId }}>
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`} state={{ itemId: item.nftId }}>
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
}

export default Card
