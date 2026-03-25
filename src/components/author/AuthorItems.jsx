import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Author = () => {
  const { id } = useParams();
  const [authorItems, setAuthorItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchAuthorItems = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        const data = await response.json();

        const filteredItems = data.filter(
          (item) => String(item.authorId) === String(id)
        );

        setAuthorItems(filteredItems);
      } catch (error) {
        console.log("AUTHOR PAGE ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorItems();
  }, [id]);

  if (loading) {
    return <div className="container pt-5 mt-5">Loading...</div>;
  }

  if (!authorItems.length) {
    return <div className="container pt-5 mt-5">Author not found.</div>;
  }

  const author = authorItems[0];
  const followerCount =
    [573, 421, 812, 299, 654, 387, 902, 478, 525, 610, 734, 455][
      Number(id) - 1
    ] || 573;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{
            backgroundImage: `url(${author.nftImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt={author.title} />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.title}
                          <span className="profile_username">@{author.title.toLowerCase().replace(/\s+/g, "")}</span>
                          <span id="wallet" className="profile_wallet">
                            UDHUHWudhwd78wdt7e...
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follower">
                    {followerCount} followers
                  </div>

                  <div className="de-flex-col">
                    <div className="profile_follow">
                      <button className="btn-main">Follow</button>
                    </div>
                  </div>
                </div>
              </div>

              {authorItems.map((item) => (
                <div
                  key={item.id}
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy"
                          src={item.authorImage}
                          alt={item.title}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

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

                      <Link to={`/item-details/explore/${item.id}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link to={`/item-details/explore/${item.id}`}>
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
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;