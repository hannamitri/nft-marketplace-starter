import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ITEM_DETAILS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";

const MIN_LOADING_MS = 800;

const mapItemDetails = (data) => ({
  nftId: data.nftId,
  title: data.title,
  tag: data.tag,
  image: data.nftImage,
  description: data.description,
  views: data.views,
  likes: data.likes,
  price: data.price,

  owner: {
    id: data.ownerId,
    name: data.ownerName,
    image: data.ownerImage,
  },

  creator: {
    id: data.creatorId,
    name: data.creatorName,
    image: data.creatorImage,
  },
});

const ItemDetailsStyles = () => (
  <style>{`
    /* Loaded item details */

    .item-details-page .nft-image {
      display: block;
      width: 100%;
      height: auto;
      border-radius: 4px;
    }

    .item-details-page .item_info h2 {
      margin: 0 0 16px;
      font-size: 32px;
      font-weight: 700;
      line-height: 1.25;
    }

    .item-details-page .item_info_counts {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }

    .item-details-page .item_info_counts > div {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-width: 72px;
      margin: 0;
      padding: 6px 12px;
      border-radius: 3px;
      background: #f5f0fc;
      color: #777;
      font-size: 14px;
      line-height: 1.2;
    }

    .item-details-page .item_info > p {
      margin-bottom: 22px;
      color: #777;
      font-size: 15px;
      line-height: 1.7;
    }

    .item-details-page .item_info h6 {
      margin: 0 0 12px;
      font-size: 13px;
      font-weight: 700;
    }

    .item-details-page .item_author {
      display: flex;
      align-items: center;
      gap: 16px;
      min-height: 50px;
      margin-bottom: 18px;
    }

    .item-details-page .item_author .author_list_pp {
      position: relative;
      top: auto;
      left: auto;
      float: none;
      width: 46px;
      height: 46px;
      margin: 0;
      flex-shrink: 0;
    }

    .item-details-page .item_author .author_list_pp img {
      display: block;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      object-fit: cover;
    }

    .item-details-page .item_author .author_list_info {
      margin: 0;
      padding: 0;
      font-size: 15px;
      font-weight: 600;
    }

    .item-details-page .item_author .author_list_info a {
      color: #111;
      text-decoration: none;
    }

    .item-details-page .de_tab {
      margin-top: 0;
    }

    .item-details-page .de_tab_content {
      padding: 0;
    }

    .item-details-page .id-price-spacer {
      height: 8px;
    }

    .item-details-page .nft-item-price {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #111;
      font-size: 26px;
      font-weight: 700;
    }

    .item-details-page .nft-item-price img {
      width: 22px;
      height: 22px;
      margin: 0;
    }

    /* Skeleton loading */

    .item-details-page .id-sk-shimmer {
      background: linear-gradient(
        90deg,
        #e2e2e7 25%,
        #f5f5f8 50%,
        #e2e2e7 75%
      );
      background-size: 200% 100%;
      animation: id-sk-shine 1.5s ease-in-out infinite;
    }

    .item-details-page .id-sk-image {
      width: 100%;
      aspect-ratio: 1 / 1;
      border-radius: 4px;
    }

    .item-details-page .id-sk-title {
      width: 75%;
      height: 36px;
      margin-bottom: 16px;
      border-radius: 6px;
    }

    .item-details-page .id-sk-counts {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .item-details-page .id-sk-count {
      width: 72px;
      height: 30px;
      border-radius: 3px;
    }

    .item-details-page .id-sk-description {
      margin-bottom: 22px;
    }

    .item-details-page .id-sk-line {
      width: 100%;
      height: 14px;
      margin-bottom: 10px;
      border-radius: 4px;
    }

    .item-details-page .id-sk-line-short {
      width: 65%;
    }

    .item-details-page .id-sk-label {
      width: 65px;
      height: 14px;
      margin-bottom: 12px;
      border-radius: 4px;
    }

    .item-details-page .id-sk-person {
      display: flex;
      align-items: center;
      gap: 16px;
      min-height: 50px;
      margin-bottom: 18px;
    }

    .item-details-page .id-sk-avatar {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .item-details-page .id-sk-name {
      width: 140px;
      height: 16px;
      border-radius: 4px;
    }

    .item-details-page .id-sk-price {
      width: 110px;
      height: 32px;
      border-radius: 6px;
    }

    @keyframes id-sk-shine {
      from {
        background-position: -200% 0;
      }
      to {
        background-position: 200% 0;
      }
    }

    @media (max-width: 767px) {
      .item-details-page .nft-image,
      .item-details-page .id-sk-image {
        margin-bottom: 30px;
      }

      .item-details-page .item_info h2 {
        font-size: 28px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .item-details-page .id-sk-shimmer {
        animation: none;
      }
    }
  `}</style>
);

const SkeletonDetails = () => (
  <div className="row" aria-hidden="true">
    <div className="col-md-6 text-center">
      <div className="id-sk-image id-sk-shimmer" />
    </div>

    <div className="col-md-6">
      <div className="item_info">
        <div className="id-sk-title id-sk-shimmer" />

        <div className="id-sk-counts">
          <div className="id-sk-count id-sk-shimmer" />
          <div className="id-sk-count id-sk-shimmer" />
        </div>

        <div className="id-sk-description">
          <div className="id-sk-line id-sk-shimmer" />
          <div className="id-sk-line id-sk-shimmer" />
          <div className="id-sk-line id-sk-line-short id-sk-shimmer" />
        </div>

        <div className="id-sk-label id-sk-shimmer" />

        <div className="id-sk-person">
          <div className="id-sk-avatar id-sk-shimmer" />
          <div className="id-sk-name id-sk-shimmer" />
        </div>

        <div className="id-sk-label id-sk-shimmer" />

        <div className="id-sk-person">
          <div className="id-sk-avatar id-sk-shimmer" />
          <div className="id-sk-name id-sk-shimmer" />
        </div>

        <div className="id-price-spacer"></div>

        <div className="id-sk-label id-sk-shimmer" />
        <div className="id-sk-price id-sk-shimmer" />
      </div>
    </div>
  </div>
);

const AuthorInfo = ({ person }) => {
  const hasAuthorId =
    person.id !== undefined &&
    person.id !== null &&
    person.id !== "";

  const image = (
    <img
      className="lazy"
      src={person.image || AuthorImage}
      alt={person.name || "Author"}
    />
  );

  return (
    <div className="item_author">
      <div className="author_list_pp">
        {hasAuthorId ? (
          <Link to={`/author/${person.id}`}>
            {image}
          </Link>
        ) : (
          image
        )}
      </div>

      <div className="author_list_info">
        {hasAuthorId ? (
          <Link to={`/author/${person.id}`}>
            {person.name || "View author"}
          </Link>
        ) : (
          <span>{person.name || "Not available"}</span>
        )}
      </div>
    </div>
  );
};

const ItemDetailsContent = ({ nftId }) => {
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    window.scrollTo(0, 0);

    const load = async () => {
      setStatus("loading");
      setItem(null);

      if (
        !nftId ||
        nftId === "undefined" ||
        nftId === "null"
      ) {
        setStatus("error");
        return;
      }

      try {
        const minDelay = new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_MS)
        );

        const [{ data }] = await Promise.all([
          axios.get(ITEM_DETAILS_URL, {
            params: {
              nftId,
            },
          }),
          minDelay,
        ]);

        if (cancelled) return;

        if (
          !data ||
          typeof data !== "object" ||
          Array.isArray(data) ||
          String(data.nftId) !== String(nftId)
        ) {
          throw new Error(
            "The API did not return the requested NFT."
          );
        }

        const mappedItem = mapItemDetails(data);

        if (!mappedItem.title || !mappedItem.image) {
          throw new Error(
            "The NFT response is missing its title or image."
          );
        }

        setItem(mappedItem);
        setStatus("ready");
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load item details:", err);
          setStatus("error");
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [nftId]);

  if (status === "loading") {
    return (
      <div
        aria-busy="true"
        aria-label="Loading NFT details"
      >
        <SkeletonDetails />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="row">
        <div className="col-12 text-center" role="alert">
          <p>
            Couldn't load this NFT. Please check the link or
            try refreshing the page.
          </p>

          <Link to="/explore" className="btn-main">
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-6 text-center">
        <img
          src={item.image}
          className="img-fluid img-rounded nft-image"
          alt={item.title}
        />
      </div>

      <div className="col-md-6">
        <div className="item_info">
          <h2>
            {item.title}
            {item.tag != null && ` #${item.tag}`}
          </h2>

          <div className="item_info_counts">
            {item.views != null && (
              <div className="item_info_views">
                <i
                  className="fa fa-eye"
                  aria-hidden="true"
                ></i>
                <span>{item.views}</span>
              </div>
            )}

            {item.likes != null && (
              <div className="item_info_like">
                <i
                  className="fa fa-heart"
                  aria-hidden="true"
                ></i>
                <span>{item.likes}</span>
              </div>
            )}
          </div>

          {item.description && (
            <p>{item.description}</p>
          )}

          <div className="d-flex flex-row">
            <div className="mr40">
              <h6>Owner</h6>
              <AuthorInfo person={item.owner} />
            </div>
          </div>

          <div className="de_tab tab_simple">
            <div className="de_tab_content">
              <h6>Creator</h6>
              <AuthorInfo person={item.creator} />
            </div>

            <div className="id-price-spacer"></div>

            <h6>Price</h6>

            {item.price != null ? (
              <div className="nft-item-price">
                <img
                  src={EthImage}
                  alt="Ethereum"
                />
                <span>{item.price}</span>
              </div>
            ) : (
              <p>Not available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemDetails = () => {
  const { id } = useParams();

  return (
    <div
      id="wrapper"
      className="item-details-page"
    >
      <ItemDetailsStyles />

      <div
        className="no-bottom no-top"
        id="content"
      >
        <div id="top"></div>

        <section
          aria-label="NFT details"
          className="mt90 sm-mt-0"
        >
          <div className="container">
            <ItemDetailsContent
              key={id}
              nftId={id}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
