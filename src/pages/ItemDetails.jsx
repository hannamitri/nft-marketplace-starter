import axios from "axios";
import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useLocation, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const selectedItem = location.state?.collection || location.state?.item;
  const [item, setItem] = useState(selectedItem);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function getItemDetails() {
      if (selectedItem) {
        setItem(selectedItem);
        return;
      }

      if (!id) {
        return;
      }

      try {
        const [newItemsResponse, hotCollectionsResponse] = await Promise.all([
          axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"),
          axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"),
        ]);

        const allItems = [
          ...newItemsResponse.data,
          ...hotCollectionsResponse.data,
        ];
        const matchedItem = allItems.find(item => String(item.id) === id);

        setItem(matchedItem);
      } catch (error) {
        console.error("Item details API error:", error);
      }
    }

    getItemDetails();
  }, [id, selectedItem]);

  const itemImage = item?.nftImage || nftImage;
  const itemTitle = item?.title || "Rainbow Style #194";
  const itemAuthorImage = item?.authorImage || AuthorImage;
  const itemAuthor = item?.authorName || (item?.authorId ? `Author #${item.authorId}` : "Monica Lucas");
  const itemCode = item?.code || "192";
  const itemPrice = item?.price || "1.85";
  const itemLikes = item?.likes || 74;
  const authorPath = item
    ? `/author/${item.authorId || item.id}`
    : "/author";

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={itemImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{itemTitle}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      100
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemLikes}
                    </div>
                  </div>
                  <p>
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                    illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo.
                  </p>
                  <p>ERC-{itemCode}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={authorPath} state={{ author: item }}>
                            <img className="lazy" src={itemAuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={authorPath} state={{ author: item }}>{itemAuthor}</Link>
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
                          <Link to={authorPath} state={{ author: item }}>
                            <img className="lazy" src={itemAuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={authorPath} state={{ author: item }}>{itemAuthor}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemPrice}</span>
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
