import React, {useEffect, useState }from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const AuthorItems = ({ author }) => {
  const { authorImage, authorId, authorName } = author
  const [items, setItems] = useState([])
  const [visibleCount, setVisibleCount] = useState(8)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setItems(data.nftCollection || []);
      } catch (error) {
        console.error("Failed to fetch author items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [authorId]);
  console.log(items)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  if (loading) {
    return (
      <div className="row">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={i}>
            <div className="skeleton-box h-80 w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!items.length) {
    return <p className="text-center mt-5">No NFTs found in this collection.</p>;
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.slice(0, visibleCount).map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${item.authorId}`}>
                    <img className="lazy" src={authorImage} alt={authorName} />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;