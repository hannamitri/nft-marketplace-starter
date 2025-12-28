const SkeletonHC = () => (
  <div className="item-container col-lg-3 col-md-6 col-sm-6 col-xs-12">
    <div className="nft_coll">
      <div className="nft_wrap skeleton-wrap">
      </div>
      <div className="nft_coll_pp">
        <div className="lazy pp-coll skeleton-img"></div>
        <i className="fa fa-check"></i>
      </div>
      <div className="nft_coll_info">
          <h4 className="skeleton-title">Placeholder</h4><br/>
          <h4 className="skeleton-title">PHolder</h4>
      </div>
    </div>
  </div>
);


const SkeletonNI = () => (
  <div className="item-container col-lg-3 col-md-6 col-sm-6 col-xs-12">
    <div className="nft__item">
      <div className="author_list_pp">
          <div className="lazy pp-coll skeleton-img"></div>
          <i className="fa fa-check"></i>
      </div>

      <div className="nft__item_wrap">
        <div className="lazy pp-coll skeleton-wrap taller-skeleton"></div>
      </div>
      <div className="nft__item_info">
        <h3 className="skeleton-title">Big Placeholder</h3><br/>
        <h4 className="skeleton-title nft__price-skeleton">PHolder</h4>
        <h4 className="nft__item_like skeleton-title nft__likes-skeleton">hold</h4>
      </div>
    </div>
  </div>
);

const SkeletonTS = () => (
  <li>
    <div className="author_list_pp">
        <div className="lazy pp-author skeleton-img"></div>
        <i className="fa fa-check"></i>
    </div>
    <div className="author_list_info">
      <h4 className="skeleton-title top__seller--title">Placeholder</h4><br/>
      <h4 className="skeleton-title top__seller--title">hold</h4>
    </div>
  </li>
);

const SkeletonExplore = () => (
  <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
    style={{ display: "block", backgroundSize: "cover" }}>
      <div className="skeleton-wrap skeleton__explore nft__item">

      </div>
  </div>
);

const SkeletonAuthor = () => (
  <div className="d_profile de-flex skeleton-margin">
    <div className="de-flex-col">
      <div className="profile_avatar">
        <div className="skeleton-img skeleton-profile-img"></div>
        <i className="fa fa-check"></i>
        <div className="author__skeleton--container">
          <h4 className="skeleton-title skeleton-authorname">Its Placeholder Text  </h4><br />
          <h4 className="skeleton-title skeleton-tag">Placeholder text here</h4><br />
          <h4 className="skeleton-title skeleton-authorname skeleton-thinner">Its   Placeholder   Text   here</h4>
        </div>
      </div>
    </div>
    <div className="profile_follow de-flex">
      <div className="de-flex-col">
          <h4 className="skeleton-title skeleton-padded">Placeholder text</h4>
      </div>
    </div>
  </div>
)

const SkeletonDetails = () => (
  <>
    <div className="col-md-6 text-center skeleton">
    </div>
    <div className="col-md-6">
      <div className="item_info skeleton-margin">
        <h3 className="skeleton-title skeleton-padded">A lot of Placeholder Text is here</h3>

        <div className="item_info_counts">
          <div className="item_info_views icon-shimmer">
             
          </div>
          <div className="item_info_like icon-shimmer">
          </div>
        </div>
        <p className="skeleton skeleton-padded">
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
          illo inventore veritatis et quasi architecto beatae vitae
          dicta sunt explicabo.
        </p>
        <div className="d-flex flex-row ">
          <div className="mr40">
            <h6>Owner</h6>
            <div className="item_author">
              <div className="author_list_pp">
                  <div className="skeleton-img skeleton__profilepic"></div>
                  <i className="fa fa-check"></i>
              </div>
              <h4 className="author_list_info skeleton-title"> 
              </h4>
            </div>
          </div>
          <div></div>
        </div>
        <div className="de_tab tab_simple">
          <div className="de_tab_content">
            <h6>Creator</h6>
            <div className="item_author">
              <div className="author_list_pp">
                  <div className="skeleton-img skeleton__profilepic"></div>
                  <i className="fa fa-check"></i>
              </div>
              <h4 className="author_list_info skeleton-title"> 
              </h4>
            </div>
          </div>
          <div className="spacer-40"></div>
          <h6>Price</h6>
          <div className="nft-item-price">
            <h4 className="author_list_info skeleton-title"> 
            </h4>
          </div>
        </div>
      </div>
    </div>
  </>
)

export { SkeletonHC, SkeletonNI, SkeletonTS, SkeletonExplore, SkeletonAuthor, SkeletonDetails }