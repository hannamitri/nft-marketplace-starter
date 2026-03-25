import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        const data = await response.json();
        console.log("NEW ITEMS DATA:", data);
        setItems(data);
      } catch (error) {
        console.log("ERROR FETCHING NEW ITEMS:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="row">
        {new Array(4).fill(0).map((_, index) => (
          <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
            <div
              style={{
                background: "#eee",
                height: "250px",
                borderRadius: "8px",
                margin: "10px",
              }}
            ></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      {items.slice(0, 4).map((item) => (
        <div
          key={item.id}
          className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
        >
          <div className="nft__item">
            {/* AUTHOR */}
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`Creator: ${item.title}`}
              >
                <img
                  className="lazy"
                  src={item.authorImage}
                  alt={item.title}
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            {/* COUNTDOWN */}
            <div className="de_countdown">2h 21m 51s</div>

            {/* IMAGE */}
            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="/" onClick={(e) => e.preventDefault()}>
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="/" onClick={(e) => e.preventDefault()}>
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="/" onClick={(e) => e.preventDefault()}>
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>

              <Link to={`/item-details/new/${item.id}`}>
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt={item.title}
                />
              </Link>
            </div>

            {/* INFO */}
            <div className="nft__item_info">
              <Link to={`/item-details/new/${item.id}`}>
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">
                {item.price} ETH
              </div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewItems;