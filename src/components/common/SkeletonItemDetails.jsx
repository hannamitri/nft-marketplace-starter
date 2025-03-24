import React from 'react';
import './SkeletonItemDetails.css';


const SkeletonItemDetails = () => {
  return (
    <div className="wrapper">
      <div className="content">
        <section className="section">
          <div className="container">
            <div className="row">
              {/* Left Column (Main NFT Image) */}
              <div className="col-md-6 text-center">
                <div className="nftImage shimmer" style={{ height: '400px', width: '100%', borderRadius: '12px' }}></div>
              </div>

              {/* Right Column (Details) */}
              <div className="col-md-6">
                <div className="itemInfo">
                  <div className="title shimmer" style={{ height: '30px', width: '60%', marginBottom: '20px' }}></div>

                  <div className="itemInfoCounts">
                    <div className="views shimmer" style={{ height: '20px', width: '80px' }}></div>
                    <div className="likes shimmer" style={{ height: '20px', width: '80px' }}></div>
                  </div>

                  <div className="description shimmer" style={{ height: '60px', width: '100%', margin: '20px 0' }}></div>

                  {/* Owner Block */}
                  <div className="ownerSection">
                    <h6>Owner</h6>
                    <div className="authorBlock">
                      <div className="authorImage">
                        <div className="shimmer" style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
                      </div>
                      <div className="authorInfo">
                        <div className="shimmer" style={{ width: '100px', height: '16px' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Creator Block */}
                  <div className="creatorSection">
                    <h6>Creator</h6>
                    <div className="authorBlock">
                      <div className="authorImage">
                        <div className="shimmer" style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
                      </div>
                      <div className="authorInfo">
                        <div className="shimmer" style={{ width: '100px', height: '16px' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Price Section */}
                  <h6>Price</h6>
                  <div className="nftPrice">
                    <div className="shimmer" style={{ width: '60px', height: '20px' }}></div>
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

export default SkeletonItemDetails;
