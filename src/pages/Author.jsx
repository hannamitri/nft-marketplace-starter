import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";

const Author = () => {
    const { id } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      )
      .then((response) => {
        const selectedAuthor = response.data.find(
          (seller) => seller.authorId === Number(id)
        );

        setAuthor(selectedAuthor);
      })
      .catch((error) => {
        console.error("Error fetching author:", error);
      });
  }, [id]);

  if (!author) {
  return <div>Loading...</div>;
}

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                     <img src={author.authorImage} alt={author.authorName} />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                         {author.authorName}
                          <span className="profile_username">@monicaaaa</span>
                          <span id="wallet" className="profile_wallet">
                            UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">573 followers</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                 <AuthorItems authorId={author.authorId} />
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
