import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import { EXPLORE_URL, HOT_COLLECTIONS_URL, NEW_ITEMS_URL } from "../components/home/marketplaceApi";
import { fetchAuthor } from "../components/author/authorApi";

const ItemDetails = ({ itemType = "collection" }) => {
  const { id, authorId } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);
  const isPricedItem = itemType === "new" || itemType === "explore" || itemType === "author";
  const itemUrl = itemType === "explore"
    ? EXPLORE_URL
    : itemType === "new" ? NEW_ITEMS_URL : HOT_COLLECTIONS_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
    setItem(null);
    setError(null);
    setIsLoading(Boolean(id));

    if (!id) return undefined;

    const controller = new AbortController();
    const loadItem = async () => {
      try {
        let selectedItem;
        if (itemType === "author") {
          const author = await fetchAuthor(authorId, controller.signal);
          const work = author?.nftCollection.find((entry) => String(entry.id) === id);
          if (work) selectedItem = { ...work, authorId: author.authorId, authorImage: author.authorImage, authorName: author.authorName };
        } else {
          const response = await fetch(itemUrl, { signal: controller.signal });
          if (!response.ok) throw new Error(`Item details request failed (${response.status})`);
          const items = await response.json();
          if (!Array.isArray(items)) throw new Error("Item details response was not a list");
          selectedItem = items.find((entry) => String(entry.id) === id);
        }
        if (!selectedItem) {
          throw new Error(`Item ${id} was not found`);
        }

        if (!controller.signal.aborted) setItem(selectedItem);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          console.error("Failed to load item details:", requestError);
          setError("Item details could not be loaded.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadItem();
    return () => controller.abort();
  }, [id, itemUrl, itemType, authorId]);

  if (isLoading) {
    return (
      <main id="wrapper">
        <section className="mt90 sm-mt-0" aria-label="Collection details">
          <div className="container" role="status">
            Loading item details...
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main id="wrapper">
        <section className="mt90 sm-mt-0" aria-label="Item details">
          <div className="container" role="alert">
            {error}
          </div>
        </section>
      </main>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="Item details" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item?.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item?.title || "Rainbow Style #194"}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item?.title || "Rainbow Style #194"}</h2>

                  {item ? (
                    <div className="item_info_counts">
                      <div>NFT ID: {item.nftId}</div>
                      {isPricedItem ? (
                        <div>
                          <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                          {item.likes}
                        </div>
                      ) : (
                        <div>ERC-{item.code}</div>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          100
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          74
                        </div>
                      </div>
                      <p>
                        doloremque laudantium, totam rem aperiam, eaque ipsa
                        quae ab illo inventore veritatis et quasi architecto
                        beatae vitae dicta sunt explicabo.
                      </p>
                    </>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>{itemType === "author" ? "Collection owner" : item ? "Creator" : "Owner"}</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={item ? `/author/${item.authorId}` : "/author"}>
                            <img
                              className="lazy"
                              src={item?.authorImage || AuthorImage}
                              alt={
                                item
                                  ? `${item.title} ${itemType === "author" ? "collection owner" : "creator"}`
                                  : ""
                              }
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={item ? `/author/${item.authorId}` : "/author"}>
                            {item
                              ? item.authorName || `Creator #${item.authorId}`
                              : "Monica Lucas"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {isPricedItem && item ? (
                    <div className="de_tab tab_simple">
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{item.price}</span>
                      </div>
                    </div>
                  ) : !item && (
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to="/author">
                              <img className="lazy" src={AuthorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to="/author">Monica Lucas</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>1.85</span>
                      </div>
                    </div>
                  )}
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
