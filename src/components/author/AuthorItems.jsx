import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CardSkeleton from "../UI/CardSkeleton";

const AuthorItems = () => {
  const { authorId } = useParams();

  const [authorDetails, setAuthorDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthorDetails(authorId);
  }, [authorId]);

  async function fetchAuthorDetails(authorId) {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      setAuthorDetails(data);
    } catch (error) {
      console.error("There was an error fetching the author's nfts", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8)
                .fill(0)
                .map((_, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={index}
                  >
                    <CardSkeleton />
                  </div>
                ))
            : authorDetails.nftCollection?.map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.id}
                  data-aos="fade-in" data-aos-delay="100" data-aos-duration="1000"
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                           <Link to={`/author/${authorId}`}>
                        <img
                          className="lazy"
                          src={authorDetails.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <button type="button">
                              <i className="fa fa-facebook fa-lg"></i>
                            </button>
                            <button type="button">
                              <i className="fa fa-twitter fa-lg"></i>
                            </button>
                            <button type="button">
                              <i className="fa fa-envelope fa-lg"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;

