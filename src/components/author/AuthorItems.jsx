import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const AuthorItems = () => {
  const { id } = useParams();
  const [getAuthorItems, setGetAuthorItems] = useState([]);
  const [loadingSkeleton, setLoadingSkeleton] = useState();
  const [imageAuthor, setImageAuthor] = useState();

  async function authorItems() {
    setLoadingSkeleton(true);
    const {
      data: { nftCollection, authorImage },
    } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setGetAuthorItems(nftCollection);
    setImageAuthor(authorImage);
    setLoadingSkeleton(false);
  }

  useLayoutEffect(() => {
    setLoadingSkeleton(false);
  }, []);

  useEffect(() => {
    authorItems();
  }, []);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {getAuthorItems?.map((author) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={author.id}
            >
              <div className="nft__item">
                {loadingSkeleton ? (
                  <Skeleton
                    width={"100%"}
                    maxWidth={"50px"}
                    height={"50px"}
                    borderRadius={"100%"}
                  />
                ) : (
                  <div className="author_list_pp">
                    <Link to={`/author/${id}`}>
                      <img className="lazy" src={imageAuthor} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                )}
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
                  {loadingSkeleton ? (
                    <>
                      <Skeleton width={"100%"} height={"120px"} />
                    </>
                  ) : (
                    <Link to={`/item-details/${author.nftId}`}>
                      <img
                        src={author.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  )}
                </div>

                <div className="nft__item_info">
                  <Link to={`/item-details/${id}`}>
                    {loadingSkeleton ? (
                      <>
                        <Skeleton
                          width={"80px"}
                          height={"15px"}
                          display={"flex"}
                        />
                      </>
                    ) : (
                      <>
                        <h4>{author.title}</h4>
                      </>
                    )}
                  </Link>
                  {loadingSkeleton ? (
                    <Skeleton width={"50px"} height={"15px"} />
                  ) : (
                    <div className="nft__item_price">{author.price}</div>
                  )}
                  {loadingSkeleton ? (
                    <Skeleton
                      width={"100%"}
                      maxWidth={"20px"}
                      height={"20px"}
                      margin={"0 0 0 240px"}
                      borderRadius={"24px"}
                    />
                  ) : (
                    <div className="nft__item_like">
                      <span>{author.likes}</span>
                    </div>
                  )}
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
