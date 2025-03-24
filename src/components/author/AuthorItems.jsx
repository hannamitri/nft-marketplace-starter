import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AuthorItems = ({ authorId }) => {
  const [nftItems, setNftItems] = useState([]);
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    if (authorId) {
      fetchAuthorNFTs();
    }
  }, [authorId]);

  async function fetchAuthorNFTs() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );

    setAuthorData(data);
    setNftItems(data.nftCollection);
  }

  return (
    <div className="row">
      {nftItems.map((nft) => (
        <div
          key={nft.nftId}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img
                  className="lazy"
                  src={authorData.authorImage}
                  alt={authorData.authorName}
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            <div className="nft__item_wrap">
              <Link to={`/item-details/${nft.nftId}`}>
                <img
                  src={nft.nftImage}
                  className="lazy nft__item_preview"
                  alt={nft.title}
                  style={{ width: "100%", height: "100%" }}
                />
              </Link>
            </div>

            <div className="nft__item_info">
              <Link to={`/item-details/${nft.nftId}`}>
                <h4>{nft.title}</h4>
              </Link>
              <div className="nft__item_price">{nft.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{nft.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuthorItems;
