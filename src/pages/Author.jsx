import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { getAuthorById } from "../API/nftAPI";
import AOS from "aos";


const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [authorId]);

  useEffect(() => {
    const loadAuthor = async () => {
      try {
        const data = await getAuthorById(authorId);
        setAuthor(data);
        AOS.refresh();
      } catch (err) {
        console.error(err);
      }
    };

    loadAuthor();
  }, [authorId]);

  if (!author) return <div style={{ padding: 80 }}>Loading...</div>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">

        <section
          id="profile_banner"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        />

        <section>
          <div className="container">

            <div className="row align-items-center mb-4 text-center text-md-start"
            data-aos="fade-up">

              <div className="col-12 col-md-2 text-center mb-3 mb-md-0">
  <div style={{ position: "relative", display: "inline-block" }}>
    <img
      src={author.authorImage}
      alt={author.authorName}
      className="img-fluid rounded-circle"
      style={{
        width: "150px",
        height: "150px",
        objectFit: "cover"
      }}
    />

    <span
      style={{
        position: "absolute",
        bottom: "8px",
        right: "8px",
        background: "#8364e2",
        color: "#fff",
        width: "26px",
        height: "26px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px"
      }}
    >
      ✓
    </span>
  </div>
</div>

              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <h2>{author.authorName}</h2>

                <p style={{ color: "#8364e2", fontWeight: "500", marginBottom: "10px" }}>
                 @{author.tag || author.authorName?.toLowerCase()}
                </p>

                <div className="d-flex justify-content-center justify-content-md-start align-items-center gap-2 flex-wrap"
                style={{ flexWrap: "nowrap"}}>

                  <span className="text-muted">
                    {author.address
                      ? `${author.address.slice(0, 6)}...${author.address.slice(-4)}`
                      : ""}
                  </span>

                  <button 
                    className="btn-sm"
                    style={{ backgroundColor: "#a8a8a9ff", color: "#090909ff", padding: "4px 12px", border: "none", borderRadius: "4px" }}
                    onClick={() =>
                      navigator.clipboard.writeText(author.address)
                    }
                  >
                    Copy
                  </button>

                </div>
              </div>

<div className="col-12 col-md-4 text-md-end d-flex flex-column flex-md-row justify-content-md-end align-items-center gap-3">  <h5 style={{ margin: 0 }}>{author.followers} Followers</h5>
  <button className="btn-main">Follow</button>
</div>
            </div>

            <div className="row">
              <AuthorItems
  items={author.nftCollection}
  authorImage={author.authorImage}
/>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Author;