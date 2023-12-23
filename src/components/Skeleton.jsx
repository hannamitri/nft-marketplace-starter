import React from 'react'

const Skeleton = () => {
  return ( new Array(4).fill(0).map((_, index) => (
    <div
    key={index}
    className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
    style={{ display: "block", backgroundSize: "cover" }}
    >
                <div className="nft__item">
                  <div className="author_list_pp">
                  <div className="skeleton-box"
                   style={{width: "50px", height: "50px", borderRadius: "50px"}}>
                  </div>
                      <i className="fa fa-check"></i>
                  </div>
  
                  <div className="nft__item_wrap">
                       <div className="skeleton-box"
                         style={{width: "100%", height: "200px", borderRadius: "10px"}}>
                       </div>
                  </div>
                  <div className="nft__item_info">
                  <div className="skeleton-box"
                   style={{width: "200px", height: "20px", borderRadius: "5px"}}>
                  </div>
                    <div className="nft__item_price">
                    <div className="skeleton-box"
                   style={{width: "100px", height: "20px", borderRadius: "5px"}}>
                  </div>
                    </div>
                    <div className="nft__item_like">
                      <div className="skeleton-box"
                   style={{width: "20px", height: "20px", borderRadius: "50px"}}>
                  </div>
                    </div>
                  </div>
                </div>
              </div>
  ))

  )
}

export default Skeleton