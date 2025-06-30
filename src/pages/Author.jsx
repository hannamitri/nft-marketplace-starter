import React from "react";
import { useLocation } from "react-router-dom";

const Author = () => {
  const { state: seller } = useLocation();

  if (!seller) {
    return <p style={{ textAlign: "center" }}>No author data found.</p>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section
          id="profile_banner"
          className="text-light"
          style={{
            background: `url(${seller.banner || "/images/author_banner.jpg"}) top center / cover no-repeat`,
          }}
        ></section>

        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={seller.authorImage} alt={seller.authorName} />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {seller.authorName}
                          <span className="profile_username">@{seller.tag || "tag"}</span>
                          <span className="profile_wallet">{seller.wallet || "N/A"}</span>
                          <button id="btn_copy">Copy</button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{seller.followers || 0} followers</div>
                      <button className="btn-main">Follow</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remove AuthorItems unless it's functional */}
              {/* <AuthorItems sellerId={seller.authorId} /> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
