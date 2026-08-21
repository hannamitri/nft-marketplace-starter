import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import EthImage from "../images/ethereum.svg";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import { getItemDetails } from "../api/nft";

/**
 * Small helper so Owner and Creator render identically.
 * `id` may be missing, in which case we degrade gracefully instead of
 * rendering a link to /author/undefined.
 */
const AuthorBlock = ({ label, id, name, image }) => (
  <div className="de_tab_content">
    <h6>{label}</h6>

    <div className="item_author">
      <div className="author_list_pp">
        {id ? (
          <Link to={`/author/${id}`}>
            <img className="lazy" src={image || AuthorImage} alt={name} />
            <i className="fa fa-check"></i>
          </Link>
        ) : (
          <img className="lazy" src={AuthorImage} alt={`${label} unavailable`} />
        )}
      </div>

      <div className="author_list_info">
        {id ? (
          <Link to={`/author/${id}`}>{name}</Link>
        ) : (
          <span>{label} unavailable</span>
        )}
      </div>
    </div>
  </div>
);

const ItemDetails = () => {
  const { nftId } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchItem = async () => {
      setLoading(true);

      try {
        const data = await getItemDetails(nftId);

        if (!cancelled) {
          // The API answers 200 with an empty body for unknown ids.
          setItem(data && data.nftId ? data : null);
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
        if (!cancelled) setItem(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchItem();

    return () => {
      cancelled = true;
    };
  }, [nftId]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="skeleton skeleton-nft-details-image"></div>
                </div>

                <div className="col-md-6">
                  <div className="skeleton skeleton-details-title"></div>

                  <div className="skeleton-details-counts">
                    <div className="skeleton skeleton-details-count"></div>
                    <div className="skeleton skeleton-details-count"></div>
                  </div>

                  <div className="skeleton skeleton-details-text"></div>
                  <div className="skeleton skeleton-details-text"></div>
                  <div className="skeleton skeleton-details-text short"></div>

                  {new Array(2).fill(0).map((_, index) => (
                    <div className="skeleton-details-author" key={index}>
                      <div className="skeleton skeleton-details-author-image"></div>

                      <div className="skeleton-details-author-info">
                        <div className="skeleton skeleton-details-label"></div>
                        <div className="skeleton skeleton-details-author-name"></div>
                      </div>
                    </div>
                  ))}

                  <div className="skeleton skeleton-details-price"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container text-center">
              <h2>NFT Not Found</h2>
              <p>We couldn't find an NFT with ID {nftId}.</p>

              <Link to="/explore" className="btn-main">
                Back to Explore
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {/* NFT IMAGE */}
              <div className="col-md-6 text-center" data-aos="fade-right">
                <img
                  src={item.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title || "NFT"}
                />
              </div>

              {/* NFT INFORMATION */}
              <div className="col-md-6" data-aos="fade-left">
                <div className="item_info">
                  <h2>{item.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views ?? 0}
                    </div>

                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes ?? 0}
                    </div>
                  </div>

                  <p>{item.description}</p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <AuthorBlock
                        label="Owner"
                        id={item.ownerId}
                        name={item.ownerName}
                        image={item.ownerImage}
                      />
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <AuthorBlock
                      label="Creator"
                      id={item.creatorId}
                      name={item.creatorName}
                      image={item.creatorImage}
                    />

                    <div className="spacer-40"></div>

                    <h6>Price</h6>

                    <div className="nft-item-price">
                      <img src={EthImage} alt="Ethereum" />
                      <span>{item.price} ETH</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
