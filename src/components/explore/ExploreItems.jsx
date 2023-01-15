import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "../home/CountDownTimer";
import Skeleton from "../UI/Skeleton";
import { slice } from "lodash";
import LoadMoreBtn from "../UI/LoadMoreBtn";

const ExploreItems = () => {
  const baseUrl = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(8);
  const initialPosts = slice(post, 0, index);

  const handleChange = (event) => {
    event.preventDefault();
    setSelected(event.target.value);
    axios.get(`${baseUrl}?filter=${selected}`).then((res) => {
      setPost(res.data);
    });
  };

  const loadMore = () => {
    setIndex(index + 4);
    if (index >= post.length - 4) {

      setIsCompleted(true);
    }else{
      setIsCompleted(false)
    }
  };
  
  
  useEffect(() => {
    setLoading(true);
    axios.get(`${baseUrl}?filter=${selected}`).then((res) => {
      setPost(res.data);
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [selected]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${baseUrl}`).then((res) => {
      setPost(res.data);
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <Skeleton
          itemNo={8}
          className={"d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"}
        />
      ) : (
        initialPosts.map((post, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${post.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Creator: Monica Lucas"
                >
                  <img className="lazy" src={post.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {post?.expiryDate ? (
                <CountdownTimer targetDate={post.expiryDate} />
              ) : (
                ""
              )}

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

                <Link to={`/items-details/${post.nftId}`}>
                  <img
                    src={post.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/items-details/${post.nftId}`}>
                  <h4>{post.title}</h4>
                </Link>
                <div className="nft__item_price">
                  {post.price} ETH <i className="fa-brands fa-ethereum"></i>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{post.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="col-md-12 text-center">
        {!isCompleted 
        ?
          <LoadMoreBtn loadMore={loadMore}/> :
          null
        }
        
      </div>
    </>
  );
};

export default ExploreItems;