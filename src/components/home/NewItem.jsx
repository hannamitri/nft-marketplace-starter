import React from "react";
import { Link } from "react-router-dom";
function NewItem({ authorImage, expiryDate, nftImage, title, price, likes, nftLink }) {
  const [remainingTime, setRemainingTime] = React.useState("");
  React.useEffect(() => {
    const interval = setInterval(() => {
      const time = expiryDate - Date.now();
      if (time <= 0) {
        setRemainingTime("EXPIRED");
        clearInterval(interval);
        return;
      }
      setRemainingTime(
        `${Math.floor((time / (1000 * 60 * 60)) % 24)}h ${Math.floor(
          (time / 1000 / 60) % 60
        )}m ${Math.floor((time / 1000) % 60)}s`
      );
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to="/author"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Creator: Monica Lucas"
        >
          <img className="lazy" src={authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      <div className={`${expiryDate ? "de_countdown " : " "}`}>
        {expiryDate ? remainingTime : ""}
      </div>
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
        <Link to={`/item-details/${nftLink}`}>
          <img src={nftImage} className="lazy nft__item_preview" alt="" />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to="/item-details">
          <h4>{title}</h4>
        </Link>
        <div className="nft__item_price">{price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
}

export default NewItem;
