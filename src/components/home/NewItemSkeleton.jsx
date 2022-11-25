import Skeleton from "../UI/Skeleton";

function NewItemSkeleton() {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <a href="/" data-bs-toggle="tooltip" data-bs-placement="top">
          <Skeleton width="50px" height="50px" borderRadius="50%" />
          <i className="fa fa-check"></i>
        </a>
      </div>
      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a
                href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
        <a href="/">
          <Skeleton width="100%" height="350px" />
        </a>
      </div>
      <div className="nft__item_info">
        <a href="/">
          <Skeleton width="180px" height="30px" />
        </a>
        <Skeleton width="100px" height="20px" />
      </div>
    </div>
  );
}
export default NewItemSkeleton;
