import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/Skeleton";

const Author = () => {
  const { authorId } = useParams();

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);

      try {
        let foundAuthor = null;

        try {
          const res = await axios.get(
            `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?id=${authorId}`
          );

          const authors = Array.isArray(res.data) ? res.data : [res.data];

          foundAuthor =
            authors.find(
              (entry) => String(entry?.authorId) === String(authorId)
            ) || null;
        } catch (err) {
          console.log("authors endpoint failed, using fallback");
        }

        const [exploreRes, newItemsRes, topSellersRes] =
          await Promise.allSettled([
            axios.get(
              "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
            ),
            axios.get(
              "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
            ),
            axios.get(
              "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
            ),
          ]);

        const exploreItems =
          exploreRes.status === "fulfilled" &&
          Array.isArray(exploreRes.value.data)
            ? exploreRes.value.data
            : [];

        const newItems =
          newItemsRes.status === "fulfilled" &&
          Array.isArray(newItemsRes.value.data)
            ? newItemsRes.value.data
            : [];

        const topSellers =
          topSellersRes.status === "fulfilled" &&
          Array.isArray(topSellersRes.value.data)
            ? topSellersRes.value.data
            : [];

        const allItems = [...exploreItems, ...newItems];

        const rawAuthorItems = allItems.filter((item) => {
          return (
            String(item.authorId) === String(authorId) ||
            String(item.creatorId) === String(authorId) ||
            String(item.ownerId) === String(authorId)
          );
        });

        const uniqueAuthorItems = Array.from(
          new Map(
            rawAuthorItems.map((item) => [
              String(item.nftId),
              { ...item },
            ])
          ).values()
        );

        const firstMatch = uniqueAuthorItems[0] || null;

        const sellerMatch =
          topSellers.find(
            (seller) =>
              String(seller.authorId) === String(authorId) ||
              String(seller.creatorId) === String(authorId) ||
              String(seller.ownerId) === String(authorId)
          ) || null;

        if (!foundAuthor && (firstMatch || sellerMatch)) {
          foundAuthor = {
            authorId: Number(authorId),
            authorName:
              sellerMatch?.authorName ||
              firstMatch?.authorName ||
              firstMatch?.creatorName ||
              firstMatch?.ownerName ||
              "Unknown Author",
            tag:
              sellerMatch?.authorName
                ? sellerMatch.authorName.toLowerCase().replace(/\s+/g, "")
                : firstMatch?.authorName
                ? firstMatch.authorName.toLowerCase().replace(/\s+/g, "")
                : firstMatch?.creatorName
                ? firstMatch.creatorName.toLowerCase().replace(/\s+/g, "")
                : firstMatch?.ownerName
                ? firstMatch.ownerName.toLowerCase().replace(/\s+/g, "")
                : `author${authorId}`,
            address:
              sellerMatch?.address ||
              firstMatch?.address ||
              "",
            authorImage:
              sellerMatch?.authorImage ||
              firstMatch?.authorImage ||
              firstMatch?.creatorImage ||
              firstMatch?.ownerImage ||
              "",
            bannerImage:
              sellerMatch?.bannerImage ||
              firstMatch?.bannerImage ||
              firstMatch?.nftImage ||
              sellerMatch?.authorImage ||
              firstMatch?.authorImage ||
              "",
            followers: sellerMatch?.followers || 0,
            nftCollection: uniqueAuthorItems,
          };
        }

        if (foundAuthor) {
          foundAuthor = {
            ...foundAuthor,
            nftCollection: uniqueAuthorItems,
            bannerImage:
              foundAuthor.bannerImage ||
              foundAuthor.authorImage ||
              AuthorBanner,
          };
        }

        setAuthor(foundAuthor);
        setFollowers(foundAuthor?.followers || 0);
      } catch (err) {
        console.error("Error fetching author:", err);
        setAuthor(null);
      } finally {
        setLoading(false);
      }
    };

    if (authorId) {
      fetchAuthor();
    }
  }, [authorId]);

  const handleFollowToggle = () => {
    setFollowers((prev) => (isFollowing ? Math.max(prev - 1, 0) : prev + 1));
    setIsFollowing((prev) => !prev);
  };

  const copyWallet = () => {
    if (author?.address) {
      navigator.clipboard.writeText(author.address);
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          className="text-light"
          style={{
            backgroundImage: `url(${author?.bannerImage || AuthorBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        ></section>

        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div
                          className="skeleton skeleton-circle"
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                          }}
                        ></div>

                        <div className="profile_name" style={{ marginTop: "20px" }}>
                          <div
                            className="skeleton skeleton-text short"
                            style={{
                              width: "220px",
                              height: "24px",
                              marginBottom: "12px",
                            }}
                          ></div>
                          <div
                            className="skeleton skeleton-text"
                            style={{
                              width: "180px",
                              height: "18px",
                              marginBottom: "10px",
                            }}
                          ></div>
                          <div
                            className="skeleton skeleton-text"
                            style={{
                              width: "320px",
                              height: "18px",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : author ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            overflow: "hidden",
                          }}
                        >
                          <Skeleton
                            src={author.authorImage}
                            alt={author.authorName}
                            wrapperStyle={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "50%",
                            }}
                          />
                        </div>

                        <i className="fa fa-check"></i>

                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">@{author.tag}</span>

                            {author.address && (
                              <>
                                <span id="wallet" className="profile_wallet">
                                  {author.address}
                                </span>
                                <button
                                  id="btn_copy"
                                  title="Copy Text"
                                  onClick={copyWallet}
                                >
                                  Copy
                                </button>
                              </>
                            )}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">{followers} followers</div>
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={(e) => {
                            e.preventDefault();
                            handleFollowToggle();
                          }}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <h3>Author not found.</h3>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={author?.nftCollection || []}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;