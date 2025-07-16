import Countdown from "../UI/Countdown";
import { Link } from "react-router-dom";

const NftCard = ({ nft }) => {
  return (
    <div className="nft__item mx-2">
      <div className="author_list_pp">
        <Link
          to={`/author/${nft?.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={`Creator: ${nft?.authorName}`}
        >
          <img className="lazy" src={nft?.authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {nft?.expiryDate && (
        <div className="de_countdown">
          <Countdown expiryDate={nft?.expiryDate} />
        </div>
      )}

      <div className="nft__item_wrap">
        <Link to={`/item-details/${nft?.nftId}`}>
          <img src={nft?.nftImage} className="lazy nft__item_preview" alt="" />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to="/item-details">
          <h4>{nft?.title}</h4>
        </Link>
        <div className="nft__item_price">{`${nft?.price} ETH`}</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{nft?.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default NftCard;