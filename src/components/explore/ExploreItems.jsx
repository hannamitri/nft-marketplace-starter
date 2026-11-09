import { Link } from "react-router-dom";

const ExploreItems = ({ items, loading, visibleCount, setVisibleCount, now, filter, setFilter, handleFilterChange }) => {

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      { loading ? (
        new Array(16).fill(0).map((_, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        ></div>
        ))
      ) : (
        items.slice(0, visibleCount).map((item, index) => {

          const remainingTime = Math.max(0, item.expiryDate - now);
          const seconds = Math.floor((remainingTime / 1000) % 60);
          const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
          const hours = Math.floor((remainingTime / 1000 / 60 / 60) % 24);
          const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

          return (
            <div
           className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
           key={item.nftId}
          >
          <div className="nft__item" key={index}>
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            {remainingTime > 0 && (
              <div className="de_countdown">{days}d {hours}h {minutes}m {seconds}s</div>
            )}
          

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${item.nftId}`}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">{item.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
        )})
      )}
            <div className="col-md-12 text-center">
        {!loading && visibleCount < Math.min(items.length, 16) && (
          <button
            className="btn-main lead"
            onClick={() =>
              setVisibleCount(prev => Math.min(prev + 4, 16))
            }
          >
            Load More
          </button>
        )}
      </div>
          </>
        );
      };

export default ExploreItems;
