import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { itemId } = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`)
      .then(response => response.json())
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching item details:", error);
        setLoading(false);
      });
  }, [itemId]);

  console.log(item);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading ? 
                (
                  <>
                <div className="col-md-6 text-center">
                <div
                  className="img-fluid img-rounded mb-sm-30 nft-image skeleton skeleton-image"
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2 className="skeleton skeleton-text">Item Title</h2>
                  <p className="skeleton skeleton-text">accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                  <div className="item_info_counts">
                    <div className="item_info_views skeleton skeleton-button">
                      <i className="fa fa-eye"></i>
                      <span className="skeleton skeleton-text"/>
                    </div>
                    <div className="item_info_like skeleton skeleton-button">
                      <i className="fa fa-heart"></i>
                      <span className="skeleton skeleton-text"/>
                    </div>
                  </div>
                  <p>
                    <span className="skeleton skeleton-text"/>
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6 className="skeleton skeleton-text">Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <div>
                            <div className="lazy skeleton skeleton-avatar"/>
                            <i className="fa fa-check"></i>
                          </div>
                        </div>
                        <div className="author_list_info">
                          <div className="skeleton skeleton-text"/>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6 className="skeleton skeleton-text">Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <div>
                            <div className="lazy skeleton skeleton-avatar" />
                            <i className="fa fa-check"></i>
                          </div>
                        </div>
                        <div className="author_list_info">
                          <div className="skeleton skeleton-text"/>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6 className="skeleton skeleton-text">Price</h6>
                    <div className="nft-item-price">
                      <div className="skeleton skeleton-img" />
                      <span className="skeleton skeleton-text"></span>
                    </div>
                  </div>
                </div>
              </div>
            </>
                ) : (
                <>
                <div className="col-md-6 text-center">
                <img
                  src={item.nftImage ?? nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title + ' #' + item.tag}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
                    </div>
                  </div>
                  <p>
                    {item.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId ?? "authorId"}`}>
                            <img className="lazy" src={item.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.ownerId ?? "authorId"}`}>{item.ownerName}</Link>
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
                          <Link to={`/author/${item.creatorId ?? "authorId"}`}>
                            <img className="lazy" src={item.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.creatorId}`}>{item.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price} </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
