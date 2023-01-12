import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

export default function ItemCard({
  creatorId,
  creatorImg,
  creatorName,
  desc,
  likes,
  nftImg,
  ownerId,
  ownerImg,
  ownerName,
  price,
  tag,
  title,
  views,
  ethImage,
  loading,
}) {
  return (
    <section aria-label="section" className="mt90 sm-mt-0">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center">
            {!loading ? (
              <img
                src={nftImg}
                className="img-fluid img-rounded mb-sm-30 nft-image"
                alt=""
              />
            ) : (
              <Skeleton height={"636px"} width={"636px"} borderRadius={"8px"} />
            )}
          </div>
          <div className="col-md-6">
            <div className="item_info">
              {!loading ? (
                <h2>{`${title} #${tag}`}</h2>
              ) : (
                <Skeleton
                  height={"46px"}
                  width={"616px"}
                  borderRadius={"8px"}
                />
              )}

              <div className="item_info_counts">
                {!loading ? (
                  <div className="item_info_views">
                    <i className="fa fa-eye"></i>
                    {views}
                  </div>
                ) : (
                  <Skeleton
                    height={"30px"}
                    width={"80px"}
                    borderRadius={"8px"}
                  />
                )}
                {!loading ? (
                  <div className="item_info_like">
                    <i className="fa fa-heart"></i>
                    {likes}
                  </div>
                ) : (
                  <Skeleton
                    height={"30px"}
                    width={"80px"}
                    borderRadius={"8px"}
                  />
                )}
              </div>
              {!loading ? (
                <p>{desc}</p>
              ) : (
                <Skeleton
                  width={"616px"}
                  height={"64px"}
                  borderRadius={"8px"}
                />
              )}
              <div className="d-flex flex-row">
                <div className="mr40">
                  <h6>Owner</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <Link to={`/author/${ownerId}`}>
                        {!loading ? (
                          <img className="lazy" src={ownerImg} alt="" />
                        ) : (
                          <Skeleton
                            width={"50px"}
                            height={"50px"}
                            borderRadius={"50%"}
                          />
                        )}
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${ownerId}`}>
                        {!loading ? (
                          <div>{ownerName}</div>
                        ) : (
                          <Skeleton
                            width={"128px"}
                            height={"28px"}
                            borderRadius={"8px"}
                          />
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
              <div className="de_tab tab_simple">
                <div className="de_tab_content">
                  <h6>Creator</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <Link to={`/author/${creatorId}`}>
                        {!loading ? (
                          <img className="lazy" src={creatorImg} alt="" />
                        ) : (
                          <Skeleton
                            width={"50px"}
                            height={"50px"}
                            borderRadius={"50%"}
                          />
                        )}
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${creatorId}`}>
                        {!loading ? (
                          <div>{creatorName}</div>
                        ) : (
                          <Skeleton
                            width={"128px"}
                            height={"28px"}
                            borderRadius={"8px"}
                          />
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="spacer-40"></div>
                <h6>Price</h6>
                <div className="nft-item-price">
                  {!loading ? (
                    <div>
                      <img src={ethImage} alt="" />
                      <span>{price}</span>
                    </div>
                  ) : (
                    <Skeleton
                      width={"100px"}
                      height={"38px"}
                      borderRadius={"8px"}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
