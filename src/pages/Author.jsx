import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import NftCardSkeleton from "../components/UI/NftCardSkeleton";
import Skeleton from "../components/UI/Skeleton";

const API_BASE =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net";

const AuthorPageSkeleton = () => (
  <div id="wrapper">
    <div className="no-bottom no-top" id="content">
      <div id="top"></div>
      <section className="author-skeleton-banner" aria-hidden="true">
        <Skeleton width="100%" height="100%" borderRadius="0" />
      </section>
      <section aria-label="Loading author" role="status" aria-live="polite">
        <span className="sr-only">Loading author...</span>
        <div className="container">
          <div className="author-skeleton-profile">
            <Skeleton width="150px" height="150px" borderRadius="50%" />
            <div>
              <Skeleton width="190px" height="24px" borderRadius="2px" />
              <Skeleton width="130px" height="16px" borderRadius="2px" />
            </div>
          </div>
          <div className="row">
            {Array.from({ length: 8 }, (_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={index}
              >
                <NftCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </div>
);

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!authorId) {
      setError("No author was selected.");
      setLoading(false);
      return;
    }

    const fetchAuthor = async () => {
      try {
        const [{ data: newItems }, { data: hotCollections }] =
          await Promise.all([
            axios.get(`${API_BASE}/newItems`),
            axios.get(`${API_BASE}/hotCollections`),
          ]);

        const matchingItems = [...newItems, ...hotCollections].filter(
          (item) => String(item.authorId) === String(authorId)
        );
        const uniqueItems = Array.from(
          new Map(matchingItems.map((item) => [item.nftId, item])).values()
        );

        if (uniqueItems.length === 0) {
          throw new Error("Author not found");
        }

        const itemDetails = (
          await Promise.all(
            uniqueItems.map(({ nftId }) =>
              axios
                .get(`${API_BASE}/itemDetails`, { params: { nftId } })
                .then(({ data }) => data)
                .catch(() => null)
            )
          )
        ).filter(Boolean);

        if (itemDetails.length === 0) {
          throw new Error("Author items not found");
        }

        const authorIdNumber = Number(authorId);
        const profileItem = itemDetails.find(
          (item) =>
            item.ownerId === authorIdNumber || item.creatorId === authorIdNumber
        );

        if (!profileItem) {
          throw new Error("Author profile not found");
        }

        const isOwner = profileItem.ownerId === authorIdNumber;
        const profile = {
          id: authorIdNumber,
          name: isOwner ? profileItem.ownerName : profileItem.creatorName,
          image: isOwner ? profileItem.ownerImage : profileItem.creatorImage,
        };

        setAuthor(profile);
        setItems(
          itemDetails.map((item) => ({
            ...item,
            authorId: profile.id,
            authorImage: profile.image,
          }))
        );
      } catch (requestError) {
        console.error("Unable to fetch author:", requestError);
        setError("Unable to load this author. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [authorId]);

  if (loading) return <AuthorPageSkeleton />;

  if (error) {
    return (
      <section aria-label="section" className="mt90 sm-mt-0">
        <div className="container text-center" role="alert">
          <h2>{error}</h2>
          <Link className="btn-main" to="/">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top / cover` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.image} alt={author.name} />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>{author.name}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={items} />
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
