import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ authorId }) => {
  const [items, setItems] = useState([]);
  const [authorImage, setAuthorImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorItems = async () => {
      if (authorId) {
        try {
          const response = await fetch(
            `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
          );
          const data = await response.json();
          setItems(data.nftCollection || []);
          setAuthorImage(data.authorImage || "");
          setLoading(false);
        } catch (error) {
          console.error("Error fetching author items:", error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchAuthorItems();
  }, [authorId]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? (
            new Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                  <div className="nft__item_wrap">
                    <div
                      style={{
                        height: "300px",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "8px",
                      }}
                    ></div>
                  </div>
                  <div className="nft__item_info">
                    <div
                      style={{
                        height: "24px",
                        width: "70%",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "4px",
                        marginBottom: "10px",
                      }}
                    ></div>
                    <div
                      style={{
                        height: "20px",
                        width: "40%",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "4px",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
          ) : items.length > 0 ? (
            items.map((item, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${authorId}`}>
                      <img className="lazy" src={authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No items available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
