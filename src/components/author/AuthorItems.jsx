import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const AuthorItems = () => {
  const { id } = useParams();
  const [authorItems, setAuthorItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorItems = async () => {
      try {
        if (id) {
          // Fetch from hotCollections API and filter by authorId
          const response = await fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          // Filter NFTs by authorId - data is an array of NFT objects
          const authorNFTs = data.filter(item => 
            item.authorId && item.authorId.toString() === id
          );
          
          setAuthorItems(authorNFTs);
        }
      } catch (error) {
        // Fallback data for when API is unavailable
        setAuthorItems([
          {
            nftId: "nft-001",
            title: "Cosmic Warrior #001",
            price: "2.45",
            likes: 87,
            authorId: id,
            nftImage: null,
            authorImage: null
          },
          {
            nftId: "nft-002",
            title: "Digital Dreams #042",
            price: "1.89",
            likes: 156,
            authorId: id,
            nftImage: null,
            authorImage: null
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorItems();
  }, [id]);

  if (loading) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            <div className="col-md-12 text-center">
              <p>Loading items...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (authorItems.length === 0) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            <div className="col-md-12 text-center">
              <p>No NFTs found for this author.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {authorItems.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.nftId || index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${item.authorId}`}>
                    <img className="lazy" src={item?.authorImage || AuthorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <button type="button" onClick={() => {/* Share functionality to be implemented */}}>
                          <i className="fa fa-facebook fa-lg"></i>
                        </button>
                        <button type="button" onClick={() => {/* Share functionality to be implemented */}}>
                          <i className="fa fa-twitter fa-lg"></i>
                        </button>
                        <button type="button" onClick={() => {/* Share functionality to be implemented */}}>
                          <i className="fa fa-envelope fa-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage || nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item?.title || `NFT #${item.nftId}`}</h4>
                  </Link>
                  <div className="nft__item_price">{item?.price || '2.52'} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item?.likes || 97}</span>
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
