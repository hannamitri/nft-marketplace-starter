import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

const AuthorItems = ({ authorId, item }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        const data = await response.json();

        const filteredItems = data.filter(
          (card) => String(card.authorId) === String(authorId)
        );

        console.log("filteredItems:", filteredItems);
        setItems(filteredItems);
      } catch (error) {
        console.error(error);
      }
    };

    if (authorId) {
      fetchItems();
    }
  }, [authorId]);

  const itemsToShow = items.length ? items : item ? [item] : [];

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {itemsToShow.map((card, index) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={card.nftId || card.id || index}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${card.authorId}`}>
                    <img
                      className="lazy"
                      src={card.authorImage || AuthorImage}
                      alt={card.title}
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                <div className="nft__item_wrap">
                  <Link to={`/item-details/${card.nftId}`}>
                    <img
                      src={card.nftImage}
                      className="lazy nft__item_preview"
                      alt={card.title}
                    />
                  </Link>
                </div>

                <div className="nft__item_info">
                  <Link to={`/item-details/${card.nftId}`}>
                    <h4>{card.title}</h4>
                  </Link>

                  <div className="nft__item_price">{card.price} ETH</div>

                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{card.likes}</span>
                  </div>
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