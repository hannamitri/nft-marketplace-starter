import React, { useEffect } from 'react'
import Aos from 'aos'

const ItemdetailsSkeleton = () => {
  useEffect(() => {
    Aos.init();
  },[])
  return (
    <div>
      <div id="wrapper" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <div className="skeleton-box img-fluid img-rounded mb-sm-30 nft-image"
                style={{width: "1000px", height: "600px", borderRadius: "10px"}}></div>
              </div>
              <div className="col-md-6">
                <div className="item_info">
                <div className="skeleton-box "
                style={{width: "70%", height: "30px", borderRadius: "2px"}}></div>

                    <div className="item_info_views">

                      <div className="skeleton-box "
                style={{width: "30%", height: "30px", borderRadius: "2px"}}></div>
                    </div>
                    <div className="item_info_like">
                    <div className="skeleton-box "
                style={{width: "100%", height: "200px", borderRadius: "2px"}}></div>
                    </div>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      
                      <div className="item_author">

                        <div className="author_list_pp skeleton-box "
                style={{width: "50px", height: "50px", borderRadius: "50%"}}></div>
                           
                      </div>
                    </div>

                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <div className="item_author">
                        <div className="author_list_pp skeleton-box "
                style={{width: "50px", height: "50px", borderRadius: "50%"}}></div>
                            
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <div className="nft-item-price skeleton-box"
                    style={{width: "20%", height: "30px", borderRadius: "5px"}}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </div>
  )
}

export default ItemdetailsSkeleton