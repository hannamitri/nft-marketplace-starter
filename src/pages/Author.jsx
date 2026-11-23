import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const { authorId } = useParams();

  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchAuthor() {
      setLoading(true);
      setError("");
      setSelectedAuthor(null);

      try {
        const baseUrl =
          "https://us-central1-nft-cloud-functions.cloudfunctions.net";

        const sellersResponse = await fetch(
          `${baseUrl}/topSellers`
        );

        if (!sellersResponse.ok) {
          throw new Error("Failed to fetch sellers");
        }

        const sellers = await sellersResponse.json();

        let author = sellers.find(
          (seller) =>
            String(seller.authorId) === String(authorId)
        );

        if (!author) {
          const itemsResponse = await fetch(
            `${baseUrl}/newItems`
          );

          if (!itemsResponse.ok) {
            throw new Error("Failed to fetch creators");
          }

          const items = await itemsResponse.json();

          const item = items.find(
            (item) =>
              String(item.authorId) === String(authorId)
          );

          if (item) {
            author = {
              authorId: item.authorId,
              authorImage: item.authorImage,
              authorName: `Creator #${item.authorId}`,
            };
          }
        }

        if (active) {
          setSelectedAuthor(author || null);
        }
      } catch (err) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchAuthor();

    return () => {
      active = false;
    };
  }, [authorId]);

  if (loading) {
    return <div className="container mt-5">Loading author...</div>;
  }

  if (error) {
    return <div className="container mt-5">Error: {error}</div>;
  }

  if (!selectedAuthor) {
    return <div className="container mt-5">Author not found.</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{
            background: `url(${AuthorBanner}) top`,
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={selectedAuthor.authorImage}
                        alt={selectedAuthor.authorName}
                      />

                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {selectedAuthor.authorName}

                          <span className="profile_username">
                            Creator #{selectedAuthor.authorId}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <Link to="/explore" className="btn-main">
                        Explore NFTs
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={authorId} />
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