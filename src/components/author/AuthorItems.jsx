import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

const AuthorItems = () => {
const [posts, setPosts] = useState([])
const [loading, setLoading] = useState(true)
const { id } = useParams()


  useEffect(() => {
    async function fetchAuthorItems() {
        const response = await axios.get(
       `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
        );
        setPosts(response.data ); 
        setTimeout(() => {
          setLoading(false);
        }, 2000);
    }
      fetchAuthorItems();
  }, [id]); 

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? (
            /* LOADING STATE PLACEHOLDER */
            new Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div 
                  className="nft_item_skeleton" 
                  style={{ 
                    height: '350px', 
                    background: '#ddd', 
                    marginBottom: '25px', 
                    borderRadius: '8px' 
                  }}
                />
              </div>
            ))
          ) : (
            posts.map((post, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={post.id || index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${id}`}>
                      <img 
                        className="lazy" 
                        src={post.authorImage || AuthorImage } 
                        alt="" 
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="/author" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="/author" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="/author">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link to={`/item-details/${post.nftId}`}>
                      <img
                        src={post.nftImage || nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${post.nftId}`}>
                      <h4>{post.title}</h4>
                    </Link>
                    <div className="nft__item_price">{post.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{post.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
