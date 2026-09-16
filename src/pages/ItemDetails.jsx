import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";

const NEW_ITEMS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return undefined;

    const controller = new AbortController();
    setLoading(true);
    setError("");

    async function fetchItem() {
      try {
        const { data } = await axios.get(NEW_ITEMS_URL, {
          signal: controller.signal,
          timeout: 15000,
        });
        if (!Array.isArray(data)) throw new Error("Unexpected new items response");

        const matchingItem = data.find((entry) => String(entry.id) === id);
        if (!controller.signal.aborted) {
          setItem(matchingItem || null);
          if (!matchingItem) setError("Item not found.");
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError("Unable to load this item. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchItem();
    return () => controller.abort();
  }, [id]);

  const selectedItem = item && String(item.id) === id ? item : null;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="Item details" className="mt90 sm-mt-0">
          <div className="container">
            {!id && <p>Select a New Item to see its details. <Link to="/">View New Items</Link></p>}
            {id && loading && <p role="status">Loading item details...</p>}
            {id && !loading && error && <p role="alert">{error} <Link to="/">View New Items</Link></p>}
            {id && !loading && !error && selectedItem && (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={selectedItem.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={selectedItem.title}
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{selectedItem.title}</h2>
                    <div className="item_info_counts">
                      <div className="item_info_like">
                        <i className="fa fa-heart" aria-hidden="true"></i>
                        {selectedItem.likes} likes
                      </div>
                    </div>
                    <p>Item ID: {selectedItem.nftId}</p>
                    <div className="item_author">
                      <h6>Creator</h6>
                      <div className="author_list_pp">
                        <img
                          className="lazy"
                          src={selectedItem.authorImage}
                          alt={`Creator of ${selectedItem.title}`}
                        />
                      </div>
                      <div className="author_list_info">Creator ID: {selectedItem.authorId}</div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{Number(selectedItem.price).toFixed(2)} ETH</span>
                    </div>
                    <p>
                      {selectedItem.expiryDate == null
                        ? "No expiry date"
                        : `Expires: ${new Date(Number(selectedItem.expiryDate)).toLocaleString()}`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
