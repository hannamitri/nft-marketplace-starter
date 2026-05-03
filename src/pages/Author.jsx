import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
// import AuthorImage from "../images/author_thumbnail.jpg";

const Author = () => {
  const { id } = useParams();

  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`,
        );
        const result = await response.json();

        // API returns array → take first item
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load author");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div id="wrapper">
      {/* shimmer animation */}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -400px 0; }
            100% { background-position: 400px 0; }
          }
        `}
      </style>

      <div className="no-bottom no-top" id="content">
        <section
          id="profile_banner"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {/* ===== PROFILE ===== */}
                {loading ? (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 20 }}
                  >
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(90deg,#eee 25%,#ddd 37%,#eee 63%)",
                        backgroundSize: "400% 100%",
                        animation: "shimmer 1.4s infinite",
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          width: "30%",
                          height: 14,
                          marginBottom: 10,
                          borderRadius: 4,
                          background:
                            "linear-gradient(90deg,#eee 25%,#ddd 37%,#eee 63%)",
                          backgroundSize: "400% 100%",
                          animation: "shimmer 1.4s infinite",
                        }}
                      />
                      <div
                        style={{
                          width: "50%",
                          height: 12,
                          borderRadius: 4,
                          background:
                            "linear-gradient(90deg,#eee 25%,#ddd 37%,#eee 63%)",
                          backgroundSize: "400% 100%",
                          animation: "shimmer 1.4s infinite",
                        }}
                      />
                    </div>
                  </div>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={data.authorImage} alt={data.authorName} />
                        <i className="fa fa-check"></i>

                        <div className="profile_name">
                          <h4>
                            {data.authorName}
                            <span className="profile_username">
                              @{data.tag}
                            </span>

                            <span className="profile_wallet">
                              {data.address}
                            </span>

                            <button>Copy</button>
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {data.followers} followers
                        </div>
                        <Link to="#" className="btn-main">
                          Follow
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ===== NFT ITEMS ===== */}
              <div className="col-md-12">
                <AuthorItems
                  author={data}
                  items={data?.nftCollection || []}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;