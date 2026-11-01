import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react"; 

import Aos from "aos";
import 'aos/dist/aos.css'; 

const AuthorItems = ({ authors, loading}) => {
  const { authorId } = useParams();
  const [likedNfts, setLikedNfts] = useState([]);
  const author = authors;
  const nfts = authors?.nftCollection ?? [];

      const showPlaceholders = loading;
      
      const toggleLike = (nftId) => {
        setLikedNfts(prevLikedNfts =>
          prevLikedNfts.includes(nftId)
            ? prevLikedNfts.filter(id => id !== nftId)
            : [...prevLikedNfts, nftId]
        );
      };
  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    if (!loading) {
      requestAnimationFrame(() => {
        Aos.refreshHard();
      });
    }
  }, [loading]);

  function animateIndex(index) {
      if (index % 4 === 0) {
        return "fade-right";
      } else if (index % 4 === 1) {
        return "fade-up";
      } else if (index % 4 === 2) {
        return "fade-down";
      } else {
        return "fade-left";
      }
    }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {showPlaceholders ? (
            Array.from({ length: 8 }, (_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={index}
                data-aos={animateIndex(index)}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div className="skeleton skeleton-avatar"></div>
                  </div>

                  <div className="nft__item_wrap">
                    <div className="skeleton skeleton-image"></div>
                  </div>

                  <div className="nft__item_info">
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-subtitle"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            nfts.map((nft, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={index}
                data-aos={animateIndex(index)}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${authors?.authorId}`}>
                      <img
                        className="lazy"
                        src={authors?.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${nft.nftId}`}>
                      <img
                        src={nft.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link to={`/item-details/${nft.nftId}`}>
                      <h4>{nft.title}</h4>
                    </Link>

                    <div className="nft__item_price">
                      {nft.price} ETH
                    </div>

                    <div
                      className={`nft__item_like ${
                        likedNfts.includes(nft.nftId) ? "liked" : ""
                      }`}
                      onClick={() => toggleLike(nft.nftId)}
                    >
                      <i className="fa fa-heart"></i>
                      <span>
                        {(nft.likes ?? 0) +
                          (likedNfts.includes(nft.nftId) ? 1 : 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
