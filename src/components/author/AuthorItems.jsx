import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ author, setAuthor }) => {
  function likeToggle(index) {
    const updatedNftCollection = author.nftCollection.map((item, like) => {
      if (like === index) {
        return {
          ...item,
          likes: item.likes + (item.Liked ? -1 : 1),
          Liked: !item.Liked,
        };
      }
      return item;
    });

    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      nftCollection: updatedNftCollection,
    }));
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {author.nftCollection.slice(0, 8).map((authors, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={author.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a
                          href="https://www.facebook.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a
                          href="https://twitter.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="mailto:?subject=Hello David! &amp;body=is this good enough?">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${authors.nftId}`}>
                    <img
                      src={authors.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{authors.title}</h4>
                  </Link>
                  <div className="nft__item_price">{authors.price} ETH</div>
                  <div
                    className="nft__item_like"
                    onClick={() => likeToggle(index)}
                    style={{ color: authors.Liked ? "red" : "inherit" }}
                  >
                    <i
                      className={`fa ${
                        authors.Liked ? "fa-heart" : "fa-heart-o"
                      }`}
                    ></i>
                    <span>{authors.likes}</span>
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
