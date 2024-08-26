import { Link } from "react-router-dom";
import ExpireTimer from "./Timer/ExpireTimer";


const NewItemsCard = ({nft, authorImg}) => {
    return ( 
        <div className="nft__item">
            <div className="author_list_pp">
            <Link
                to={`/author/${nft.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Creator: Monica Lucas"
            >{
                nft.authorImage ? (
                    <img className="lazy" src={nft.authorImage} alt="" />
                ) : (
                    <img className="lazy" src={authorImg} alt="" />
                )
            }
                <i className="fa fa-check"></i>
            </Link>
            </div>
            <div className="de_countdown">
            <ExpireTimer nft = {nft}/>
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

            <Link to={`/item-details/${nft.nftId}`}>
                <img
                src={nft.nftImage}
                className="lazy nft__item_preview"
                alt=""
                />
            </Link>
            </div>
            <div className="nft__item_info">
            <Link to={`/item-details/${nft.nftId}`}>
                <h4>{nft.title}</h4>
            </Link>
            <div className="nft__item_price">{nft.price} ETH</div>
            <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{nft.likes}</span>
            </div>
            </div>
        </div> 
      );
}
 
export default NewItemsCard;