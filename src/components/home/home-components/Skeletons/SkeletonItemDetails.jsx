import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonItemDetails = () => {
    return ( 
        <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <Skeleton className='skeleton_nft-big'/>
              </div>
              <div className="col-md-6">
                <div className="item_info skeleton_item_info">
                  <h2><Skeleton width={280} /></h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <Skeleton height={25}/>
                    </div>
                    <div className="item_info_like">
                      <Skeleton height={25}/>
                    </div>
                  </div>
                  <p>
                  <Skeleton height={130}/>
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author skeleton_item_author">
                        <div className="author_list_pp">                    
                            <Skeleton circle width={50} height={50}/>
                            <i className="fa fa-check"></i>
                        </div>
                        <div className="author_list_info">                      
                            <Skeleton width={120}/>   
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author skeleton_item_author">
                        <div className="author_list_pp">
                            <Skeleton circle width={50} height={50} />
                            <i className="fa fa-check"></i>
                        </div>
                        <div className="author_list_info">
                            <Skeleton width={120}/>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                        <Skeleton width={100}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
     );
}
 
export default SkeletonItemDetails;