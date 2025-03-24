import AuthorSection from "../item-details/AuthorSection";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonItemDetails = () => (
  <div id="wrapper">
    <div className="no-bottom no-top" id="content">
      <section aria-label="section" className="mt90 sm-mt-0">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center">
              <Skeleton 
                className="img-fluid img-rounded mb-sm-30 nft-image"
                style={{
                  height: '350px',
                  maxWidth: '100%',
                  '@media (max-width: 768px)': {
                    height: '250px'
                  }
                }}
              />
            </div>
            <div className="col-md-6">
              <div className="item_info">
                <h2>
                  <Skeleton 
                    style={{
                      maxWidth: '80%',
                      '@media (max-width: 768px)': {
                        maxWidth: '100%'
                      }
                    }}
                  />
                </h2>

                <div className="item_info_counts">
                  <div style={{ background: "none" }}>
                    <Skeleton
                      width={75}
                      height={30}
                      style={{ 
                        marginRight: "-8px",
                        '@media (max-width: 768px)': {
                          width: '60px',
                          height: '25px'
                        }
                      }}
                    />
                  </div>
                  <div style={{ background: "none" }}>
                    <Skeleton
                      width={75}
                      height={30}
                      style={{ 
                        marginLeft: "-8px",
                        '@media (max-width: 768px)': {
                          width: '60px',
                          height: '25px'
                        }
                      }}
                    />
                    </div>
                </div>
                <p>
                  <Skeleton count={3} />
                </p>
                <AuthorSection title={<Skeleton width={50} />} />
                <div className="de_tab tab_simple">
                  <div className="de_tab_content">
                    <AuthorSection title={<Skeleton width={60} />} />
                  </div>
                  <div className="spacer-40"></div>
                  <Skeleton width={44} />
                  <div style={{ display: "flex" }}>
                    <Skeleton width={25} height={25} />
                    <span style={{ padding: "4px" }} />
                    <Skeleton width={60} height={25} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default SkeletonItemDetails;
