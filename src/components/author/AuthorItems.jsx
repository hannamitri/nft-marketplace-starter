import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const AuthorItems = () => {
  const [data, setData] = useState([]);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  async function fetchData() {
    setLoading(true);
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
    console.log(data);
    setAuthor(data);
    setData(data.nftCollection);
    setLoading(false);
  }

  useEffect(() =>{
    fetchData();
  }, [])

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? (
              new Array(8).fill().map((_, index) => (
                 <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp placeholder-glow">
                        <span className="placeholder w-100 h-100"></span>
                      </div>
                      <div className="nft__item_wrap placeholder-glow">
                        <span className="placeholder w-100 h-100"></span>
                       </div>
                      <div className="nft__item_info">
                        <span className="placeholder w-100 h-20 mb-2"></span>
                        <span className="placeholder w-50 h-20"></span>
                      </div>
                    </div>
                  </div>
              ))
          ) : (
              data.map((item, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${author?.authorId}`}>
                      <img className="lazy" src={author?.authorImage} alt="" />
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
                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
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
            ))
            )}
          </div>
        </div>
      </div>
  );
};

export default AuthorItems;
