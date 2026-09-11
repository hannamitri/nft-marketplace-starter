import "./AuthorSkeleton.css"

const AuthorSkeleton = () => {
  return (
    <div id="wrapper">
      <div className="skeleton-banner skeleton"></div>

      <section>
        <div className="container">
          <div className="skeleton-profile">
            <div className="skeleton-profile-left">
              <div className="skeleton-avatar skeleton"></div>

              <div className="skeleton-profile-info">
                <div className="skeleton-name skeleton"></div>
                <div className="skeleton-username skeleton"></div>
                <div className="skeleton-wallet skeleton"></div>
              </div>
            </div>

            <div className="skeleton-follow">
              <div className="skeleton-followers skeleton"></div>
              <div className="skeleton-button skeleton"></div>
            </div>
          </div>

          <div className="row">
            {new Array(4).fill(0).map((_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6"
                key={index}
              >
                <div className="skeleton-nft-card">
                  <div className="skeleton-card-image skeleton"></div>
                  <div className="skeleton-card-title skeleton"></div>
                  <div className="skeleton-card-price skeleton"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthorSkeleton;