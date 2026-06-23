import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const AuthorItems = () => {
  const { authorId = "73855012" } = useParams();
  const [authorItems, setAuthorItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function getAuthorItems() {
      try {
        setHasError(false);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
        );
        const authorData = response.data;
        const collection = Array.isArray(authorData?.nftCollection)
          ? authorData.nftCollection.map((item) => ({
              ...item,
              authorId: authorData.authorId,
              authorName: authorData.authorName,
              authorImage: authorData.authorImage,
            }))
          : [];

        setAuthorItems(collection);
      } catch (error) {
        console.error("Failed to load hot authorItems:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getAuthorItems();
  }, [authorId]);

  const visibleAuthorItems =
    isLoading || hasError ? new Array(8).fill(null) : authorItems;
  const hasNoAuthorItems =
    !isLoading && !hasError && visibleAuthorItems.length === 0;

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {hasError && (
            <div className="col-md-12 text-center">
              <p>We couldn&apos;t load the author items right now.</p>
            </div>
          )}

          {hasNoAuthorItems && (
            <div className="col-md-12 text-center">
              <p>No author items are available from this API right now.</p>
            </div>
          )}

          {visibleAuthorItems.map((authorItem, index) => (
            <div
              key={authorItem?.id || index}
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              data-aos="fade-up"
            >
              <div className="nft__item" data-aos="fade-up">
                <div className="author_list_pp">
                  {authorItem ? (
                    <Link
                      to={`/author/${authorItem.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={`Creator ID: ${authorItem.authorId}`}
                    >
                      <img
                        className="lazy"
                        src={authorItem.authorImage}
                        alt={authorItem.title}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  ) : (
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                  )}
                </div>

                {!authorItem && (
                  <div className="de_countdown">
                    <Skeleton width="70px" height="16px" borderRadius="12px" />
                  </div>
                )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra"></div>

                  {authorItem ? (
                    <Link to={`/item-details/${authorItem.nftId}`}>
                      <img
                        src={authorItem.nftImage}
                        className="lazy nft__item_preview"
                        alt={authorItem.title}
                      />
                    </Link>
                  ) : (
                    <Skeleton width="100%" height="230px" borderRadius="8px" />
                  )}
                </div>
                <div className="nft__item_info">
                  {authorItem ? (
                    <>
                      <Link to={`/item-details/${authorItem.nftId}`}>
                        <h4>{authorItem.title}</h4>
                      </Link>
                      <div className="nft__item_price">
                        {authorItem.price} ETH
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{authorItem.likes}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Skeleton width="55%" height="18px" borderRadius="4px" />
                      <div style={{ marginTop: "10px" }}>
                        <Skeleton
                          width="35%"
                          height="16px"
                          borderRadius="4px"
                        />
                      </div>
                    </>
                  )}
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
