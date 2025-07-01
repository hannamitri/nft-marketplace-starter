import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Author = () => {
  const { authorId } = useParams(); // gets authorId from URL
  const [seller, setSeller] = useState(null); // author info
  const [items, setItems] = useState([]); // author’s NFTs
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(""); // error message

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authorItems?author=${authorId}`
        );
        const data = await res.json();
  
        const firstItem = data[0];
  
        if (firstItem && firstItem.authorName) {
          setSeller({
            authorName: firstItem.authorName,
            authorImage: firstItem.authorImage,
            banner: firstItem.banner || "/images/author_banner.jpg",
            tag: firstItem.tag,
            wallet: firstItem.wallet,
            followers: firstItem.followers,
          });
        } else {
          setSeller({
            authorName: "Monica Lucas",
            authorImage: "https://example.com/monica.jpg",
            banner: "/images/author_banner.jpg",
            tag: "monicaNFTs",
            wallet: "0x1234...5678",
            followers: 312,
          });
        }
  
        setItems(data);
      } catch (err) {
        console.error("❌ Error fetching author:", err);
        setError("Could not load items for this author.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchAuthorData();
  }, [authorId]);
  
  

  if (loading) return <p style={{ textAlign: "center" }}>Loading author info…</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section
          id="profile_banner"
          className="text-light"
          style={{
            background: `url(${seller.banner}) top center / cover no-repeat`,
          }}
        ></section>

        <section>
          <div className="container">
            <div className="row">
              {/* Author Profile Info */}
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={seller.authorImage} alt={seller.authorName} />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {seller.authorName}
                          <span className="profile_username">@{seller.tag}</span>
                          <span className="profile_wallet">{seller.wallet}</span>
                          <button id="btn_copy">Copy</button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{seller.followers} followers</div>
                      <button className="btn-main">Follow</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* NFT Items */}
              <div className="col-md-12">
                <div className="row">
                  {items.length > 0 ? (
                    items.map((item, index) => (
                      <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                        <div className="nft__item">
                          <div className="author_list_pp">
                            <img src={item.authorImage} alt={item.authorName} />
                          </div>
                          <div className="nft__item_wrap">
                            <img
                              src={item.nftImage}
                              alt={item.nftName}
                              className="lazy nft__item_preview"
                            />
                          </div>
                          <div className="nft__item_info">
                            <h4>{item.nftName}</h4>
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
                    <p style={{ textAlign: "center" }}>No items found for this author.</p>
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

export default  Author;
