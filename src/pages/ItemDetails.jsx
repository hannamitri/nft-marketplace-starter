import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const HOT_COLLECTIONS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";
const NEW_ITEMS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const ItemDetails = ({ itemType = "collection" }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);
  const isNewItem = itemType === "new";

  useEffect(() => {
    window.scrollTo(0, 0);
    setItem(null);
    setError(null);
    setIsLoading(Boolean(id));

    if (!id) return undefined;

    const controller = new AbortController();
    const loadItem = async () => {
      try {
        const response = await fetch(
          isNewItem ? NEW_ITEMS_URL : HOT_COLLECTIONS_URL,
          {
          signal: controller.signal,
          }
        );
        if (!response.ok) {
          throw new Error(`Item details request failed (${response.status})`);
        }

        const items = await response.json();
        if (!Array.isArray(items)) {
          throw new Error("Item details response was not a list");
        }

        const selectedItem = items.find((entry) => String(entry.id) === id);
        if (!selectedItem) {
          throw new Error(`Item ${id} was not found`);
        }

        setItem(selectedItem);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
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
  }, [id, isNewItem]);

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
                      {isNewItem ? (
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
                      <h6>{item ? "Creator" : "Owner"}</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img
                              className="lazy"
                              src={item?.authorImage || AuthorImage}
                              alt={
                                item
                                  ? `${item.title} creator`
                                  : ""
                              }
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">
                            {item
                              ? `Creator #${item.authorId}`
                              : "Monica Lucas"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {isNewItem && item ? (
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
