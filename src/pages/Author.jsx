import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import AuthorImage from "../images/author_thumbnail.jpg";
import { API_URLS, fetchApiList } from "../api/nftApi";

const DEFAULT_AUTHOR = {
  authorName: "Monica Lucas",
  authorImage: AuthorImage,
  authorId: 83937449,
  price: 2.1,
};

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(authorId ? null : DEFAULT_AUTHOR);
  const [loading, setLoading] = useState(Boolean(authorId));
  const [error, setError] = useState("");
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!authorId) {
      setAuthor(DEFAULT_AUTHOR);
      setLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    setLoading(true);
    setError("");

    async function fetchAuthor() {
      try {
        const [sellers, newItems, collections, exploreItems] =
          await Promise.all([
            fetchApiList(API_URLS.topSellers, controller.signal),
            fetchApiList(API_URLS.newItems, controller.signal),
            fetchApiList(API_URLS.hotCollections, controller.signal),
            fetchApiList(API_URLS.explore, controller.signal),
          ]);
        const matchingAuthor = sellers.find(
          (seller) => String(seller.authorId) === authorId
        );
        const matchingNfts = [
          ...newItems.map((item) => ({ ...item, source: "New Item" })),
          ...collections.map((item) => ({ ...item, source: "Hot Collection" })),
          ...exploreItems.map((item) => ({ ...item, source: "Explore" })),
        ].filter((item) => String(item.authorId) === authorId);
        const authorNfts = Array.from(
          new Map(
            matchingNfts.map((item) => [item.nftId || `${item.source}-${item.id}`, item])
          ).values()
        );
        if (!controller.signal.aborted) {
          setAuthor(matchingAuthor || null);
          setNfts(authorNfts);
          if (!matchingAuthor) setError("Author not found.");
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError("Unable to load this author. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchAuthor();
    return () => controller.abort();
  }, [authorId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="Author banner"
          className="text-light author-profile-banner"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="Author profile">
          <div className="container">
            {loading && <p role="status">Loading author...</p>}
            {!loading && error && (
              <p role="alert">{error} <Link to="/">View Top Sellers</Link></p>
            )}
            {!loading && !error && author && (
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt={author.authorName} />
                        <i className="fa fa-check" aria-hidden="true"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">Author ID: {author.authorId}</span>
                            <span className="profile_wallet">
                              Top seller total: {Number(author.price).toFixed(1)} ETH
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <Link to="/" className="btn-main">Back to Top Sellers</Link>
                      </div>
                    </div>
                  </div>
                </div>
                {!authorId && (
                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems />
                    </div>
                  </div>
                )}
                {authorId && (
                  <div className="col-md-12">
                    <div className="text-center">
                      <h2>{author.authorName}&apos;s NFTs</h2>
                      <div className="small-border bg-color-2"></div>
                    </div>
                    {nfts.length === 0 ? (
                      <p className="text-center">No NFTs are available for this author in the current APIs.</p>
                    ) : (
                      <div className="row">
                        {nfts.map((nft) => (
                          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={`${nft.source}-${nft.id}`}>
                            <div className="nft_coll author-nft-card">
                              <div className="nft_wrap">
                                <img src={nft.nftImage} className="img-fluid" alt={nft.title} />
                              </div>
                              <div className="nft_coll_info">
                                <h4>{nft.title}</h4>
                                <span>{nft.source}</span>
                                {nft.price != null && <div>{Number(nft.price).toFixed(2)} ETH</div>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
