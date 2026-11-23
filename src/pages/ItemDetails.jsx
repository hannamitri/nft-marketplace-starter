import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import { fetchExploreItems } from "../services/exploreItems";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(Boolean(nftId));
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!nftId) {
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError("");
    setItem(null);

    fetchExploreItems()
      .then((items) => {
        const matchingItem = items.find(
          (exploreItem) => String(exploreItem.nftId) === nftId
        );

        if (isMounted) {
          setItem(matchingItem || null);
          setError(matchingItem ? "" : "This item could not be found.");
          setLoading(false);
        }
      })
      .catch((fetchError) => {
        console.error("Error fetching item details:", fetchError.message);
        if (isMounted) {
          setError("Unable to load this item.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [nftId]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="container" role="status">
          Loading item details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="wrapper">
        <div className="container" role="alert">
          {error}
        </div>
      </div>
    );
  }

  const title = item ? item.title : "Rainbow Style #194";
  const image = item ? item.nftImage : nftImage;
  const authorImage = item ? item.authorImage : AuthorImage;
  const authorUrl = item ? `/author/${item.authorId}` : "/author";
  const authorName = item ? `Creator ${item.authorId}` : "Monica Lucas";
  const likes = item ? item.likes : 74;
  const price = item ? item.price : 1.85;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={image}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      100
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {likes}
                    </div>
                  </div>
                  {!item && (
                    <p>
                      doloremque laudantium, totam rem aperiam, eaque ipsa quae
                      ab illo inventore veritatis et quasi architecto beatae
                      vitae dicta sunt explicabo.
                    </p>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={authorUrl}>
                            <img
                              className="lazy"
                              src={authorImage}
                              alt={authorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={authorUrl}>{authorName}</Link>
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
                          <Link to={authorUrl}>
                            <img
                              className="lazy"
                              src={authorImage}
                              alt={authorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={authorUrl}>{authorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
