import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const res = await fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/author?author=${authorId}`);
        const contentType = res.headers.get("content-type");

        if (!res.ok || !contentType?.includes("application/json")) {
          throw new Error("Bad or non-JSON response");
        }

        const data = await res.json();
        setAuthorData(data);
      } catch (err) {
        console.error("Failed to fetch author data:", err);
        setError(true);
      }
    };

    fetchAuthorData();
  }, [authorId]);

  if (error) return <div className="text-center py-5">🚫 Author not found or unavailable.</div>;
  if (!authorData) return <div className="text-center py-5 animate-pulse">Loading author...</div>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{
            backgroundImage: `url(${authorData.authorBanner})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage} alt={authorData.authorName} />
                      <i className="fa fa-check" />
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">{authorData.tag}</span>
                        </h4>
                        <span>{authorData.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="de-flex-col">
                    <div className="profile_follower">
                      <h6>Followers</h6>
                      <span>{authorData.followers}</span>
                    </div>
                    <button className="btn-main">Follow</button>
                  </div>
                </div>
              </div>

              <AuthorItems authorId={authorId} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
