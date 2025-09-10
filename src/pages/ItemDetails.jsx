import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useLocation } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = () => {
  const location = useLocation();
  const collectionData = location.state?.collectionData;
  const itemData = location.state?.itemData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle both collection data (from Hot Collections) and item data (from New Items)
  const displayData = {
    title: collectionData?.title || itemData?.title || "Rainbow Style #194",
    nftImage: collectionData?.nftImage || itemData?.nftImage || nftImage,
    authorImage: collectionData?.authorImage || itemData?.authorImage || AuthorImage,
    authorId: collectionData?.authorId || itemData?.authorId || "default",
    price: collectionData ? 
      `${collectionData.code / 100}` : // Convert code to ETH price for collections
      itemData ? 
        `${itemData.price}` : // Use price directly for items
        "1.85", // Default price
    nftId: collectionData?.nftId || itemData?.nftId || "default",
    likes: itemData?.likes || Math.floor(Math.random() * 100) + 25,
    views: Math.floor(Math.random() * 200) + 50
  };

  const hasData = collectionData || itemData;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={displayData.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={displayData.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{displayData.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {displayData.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {displayData.likes}
                    </div>
                  </div>
                  <p>
                    {hasData ? 
                      `This unique NFT "${displayData.title}" is part of an exclusive ${itemData ? 'New Items' : 'Hot Collections'} collection featuring distinctive digital artwork. Each piece represents the creative vision and artistic excellence that defines this collection.` :
                      "doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
                    }
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${displayData.authorId}`}>
                            <img className="lazy" src={displayData.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${displayData.authorId}`}>
                            {hasData ? `Owner ${displayData.authorId.toString().slice(-4)}` : "Monica Lucas"}
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
                          <Link to={`/author/${displayData.authorId}`}>
                            <img className="lazy" src={displayData.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${displayData.authorId}`}>
                            {collectionData ? `Artist ${displayData.authorId.toString().slice(-4)}` : "Monica Lucas"}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{displayData.price}</span>
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
