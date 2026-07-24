import React from "react";

const AuthorSkeleton = () => {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section id="profile_banner"></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex author-skeleton-profile">
                  <div className="de-flex-col">
                   <div className="profile_avatar author-skeleton-avatar-wrapper">

                      <div className="skeleton author-skeleton-avatar"></div>
                        <i className="fa fa-check"></i>

                     <div className="author-skeleton-profile-name">
                        <div className="skeleton author-skeleton-name"></div>
                        <div className="skeleton author-skeleton-username"></div>
                        <div className="skeleton author-skeleton-wallet"></div>
                      </div>
                    </div>
                  </div>

                <div className="profile_follow de-flex author-skeleton-follow">
                    <div className="de-flex-col">
                <div className="skeleton author-skeleton-followers">
                      <div className="skeleton author-skeleton-button">
                    </div>
                  </div>
                </div>
              </div>
              </div>
              </div>

              {/* NFT skeletons */}
              <div className="col-md-12">
               <div className="de_tab tab_simple">
                <div className="row">
                  {[...Array(4)].map((_, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={index}
                    >
                      <div className="nft__item">
                        <div className="skeleton author-skeleton-card"></div>
                        <div className="skeleton author-skeleton-title"></div>
                        <div className="skeleton author-skeleton-price"></div>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthorSkeleton;
