import axios from "axios";
import { slice } from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [posts, setPosts] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(8);
  const initialPosts = slice(posts, 0, index);

  async function getExplore() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setPosts(data);
  }
  useEffect(() => {
    getExplore();
  }, []);

  const loadMore = () => {
    setIndex(index + 4);
    console.log(index);
    if (index >= posts.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  async function sortItems(value) {
    setPosts([])
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`)
    setPosts(data)
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => sortItems(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {posts.length > 0
        ? initialPosts.map((post) => (
            <div
              key={post.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={post.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {post.expiryDate != null && <Countdown item={post} />}
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
                      src={post.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
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
        : new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton
                    width={"50px"}
                    height={"50px"}
                    borderRadius={"50%"}
                  />
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft__item_wrap">
                  <Skeleton
                    width={"300px"}
                    height={"225px"}
                    borderRadius={"8px"}
                  />
                </div>
                <div className="nft__item_info">
                  <Skeleton
                    width={"100px"}
                    height={"20px"}
                    borderRadius={"8px"}
                  />
                  <div className="nft__item_price">
                    <Skeleton
                      width={"60px"}
                      height={"20px"}
                      borderRadius={"8px"}
                    />
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>
                      <Skeleton
                        width={"20px"}
                        height={"20px"}
                        borderRadius={"4px"}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <div className="col-md-12 text-center">
        {isCompleted ? (
          <Link to="" id="loadmore" onClick={loadMore}></Link>
        ) : (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={loadMore}
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
