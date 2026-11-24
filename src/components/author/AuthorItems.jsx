import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const AuthorItems = ({ authorId }) => {
  const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  let active = true;

  async function fetchAuthorItems() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch author NFTs");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected API response");
      }

      const authorNFTs = data.filter(
        (item) => String(item.authorId) === String(authorId)
      );

      if (active) setItems(authorNFTs);
    } catch (error) {
      if (active) setError(error.message);
    } finally {
      if (active) setLoading(false);
    }
  }

  if (authorId) {
    fetchAuthorItems();
  } else {
    setLoading(false);
    setItems([]);
  }

  return () => {
    active = false;
  };
}, [authorId]);

if (loading) return <p>Loading creator NFTs...</p>
if (error) return <p>{error}</p>;
if (items.length === 0) { return <p>No NFTs found for this creator.</p>; }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
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
                  <Link to="/item-details">
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.id}`}>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
