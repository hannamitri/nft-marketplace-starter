import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const AuthorItems = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState([]);
  const [nftData, setNftData] = useState([]);
  const loading = nftData.length === 0;

  async function fetchAuthor() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      setAuthorData(data);
      setNftData(data.nftCollection);
    } catch (error) {
      console.error("Error fetching api:", error);
      setAuthorData([]);
    }
  }

  useEffect(() => {
    fetchAuthor();
  }, []);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading && (
            <>
              {new Array(8).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton circle={true} height={50} />
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
                      <Skeleton
                        containerClassName="nft__item_wrap"
                        height={"65%"}
                        width={"100%"}
                      />
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>
                          <Skeleton width={"50%"} />
                        </h4>
                      </Link>
                      <div className="nft__item_price">
                        <Skeleton width={"25%"} />
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>
                          <Skeleton width={20} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {!loading && (
            <>
              {nftData.map((nftData, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <img
                          className="lazy"
                          src={authorData.authorImage}
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
                      <Link to={`/item-details/${nftData.nftId}`}>
                        <img
                          src={nftData.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{nftData.title}</h4>
                      </Link>
                      <div className="nft__item_price">{nftData.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{nftData.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
