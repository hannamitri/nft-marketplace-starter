import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton from "../UI/Skeleton";
import authorData from "../../api/authorApi.json";

const AuthorItemSkeleton = () => (
  <div className="nft__item">
    <div className="author_list_pp">
      <Skeleton
        type="avatar"
        width="50px"
        height="50px"
        borderRadius="50%"
        style={{ margin: "0 auto" }}
      />
    </div>
    <div className="nft__item_wrap">
      <Skeleton
        type="image"
        height="230px"
        style={{ marginTop: "20px", borderRadius: "8px" }}
      />
    </div>
    <div className="nft__item_info" style={{ padding: "10px 0" }}>
      <Skeleton
        type="title"
        style={{ marginTop: "10px", marginBottom: "8px" }}
      />
      <Skeleton type="price" style={{ marginBottom: "8px" }} />
      <Skeleton type="subtitle" width="80px" />
    </div>
  </div>
);

const AuthorItems = () => {
  const [nftItems, setNftItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorInfo, setAuthorInfo] = useState(null);
  const { authorId } = useParams();
  
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      try {
        const targetAuthorId = authorId ? Number(authorId) : 1;
        
        const author = authorData.find(author => author.id === targetAuthorId);
        
        if (author) {
          const { nftCollection, ...authorDetails } = author;
          setAuthorInfo(authorDetails);
          setNftItems(nftCollection || []);
        } else {
          console.error(`Author with ID ${targetAuthorId} not found`);
          setAuthorInfo({});
          setNftItems([]);
        }
      } catch (error) {
        console.error("Error loading author data:", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [authorId]);

  const renderSkeletonItems = () => {
    return Array(8)
      .fill(0)
      .map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
        >
          <AuthorItemSkeleton />
        </div>
      ));
  };

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? renderSkeletonItems()
            : nftItems.map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.id}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to={`/author/${authorInfo?.id}`}>
                        <img
                          className="lazy"
                          src={authorInfo?.authorImage || AuthorImage}
                          alt={authorInfo?.authorName || "Author"}
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
                          alt={item.title}
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
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
