import React from 'react'
import Skeleton from '../UI/Skeleton'

function ItemDetailsLoadingState() {
  return (
    <div className="row">
      <div className="col-md-6 text-center">
        <Skeleton width={"100%"} height={"100%"}/>
      </div>
      <div className="col-md-6">
        <div className="item_info">
          <h2>
            <Skeleton width={"50%"} height={45}/>
          </h2>

          <div className="item_info_counts">
            <Skeleton width={"25%"} height={30}/>
          </div>
          <p><Skeleton width={"100%"} height={70}/></p>
          <div className="d-flex flex-row">
            <div className="mr40">
              <div className="item_author">
                <div className="author_list_pp">
                  <Skeleton width={50} height={50} borderRadius={"100%"}/>
                </div>
                <div className="author_list_info">
                  <Skeleton width={100} height={20}/>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="de_tab tab_simple">
            <div className="de_tab_content">
            <Skeleton/>
              <div className="item_author">
                <div className="author_list_pp">
                <Skeleton width={50} height={50} borderRadius={"100%"}/>
                </div>
                <div className="author_list_info">
                  <Skeleton width={100} height={20}/>
                </div>
              </div>
            </div>
            <div className="spacer-40"></div>
            <Skeleton/>
            <div className="nft-item-price">
              <Skeleton height={30} width={"20%"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetailsLoadingState
