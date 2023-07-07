import "./NewItems.css";
import { Link } from "react-router-dom";

function Skeliton()
{
    return (
        <div className="card">
            <div className="nft__item">
                <div className="author_list_pp">
                <div className="skeliton_face"></div>
                <i className="fa fa-check"></i>   
                </div>

                <div className="skeliton_timer"></div>
                <div className="nft__item_wrap">
                <Link to="/item-details">
                    <div className="skeliton_img"></div>
                </Link>
                </div>
                <div className="nft__item_info">
                <Link to="/item-details">
                    <div className="skeliton_name"></div>
                </Link>
                <div className="nft__item_price"></div>
                <div className="nft__item_like">
                    <div className="skeliton_price"></div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Skeliton;