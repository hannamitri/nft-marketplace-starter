import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({  }) => {

  const { authorId } = useParams(); 
  const [nft, setNft] = useState([]);
  const [author, setAuthor] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nftRes = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
          setNft(nftRes.data.nftCollection)

        const authorRes = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
        setAuthor(authorRes.data)

        setTimeout(() => {
          setIsLoading(false)
        }, 1000);
      }
      catch (error) {
        console.log("Error", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [authorId])
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nft.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                  { isLoading ? (
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                  ) : (
                    <img className="lazy" src={author.authorImage}  author={author} alt="" />
                  )}
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
                  { isLoading ?  (
                    <Skeleton width="250px" height="220px" borderRadius="2px" />
                  ): (
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  )} 
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                  { isLoading ? (
                    <Skeleton width="100px" height="20px" borderRadius="2px" />
                  ) : (
                    <h4>{item.title}</h4>
                  )}
                  </Link>
                  { isLoading ? (
                    null
                  ) : (
                    <div className="nft__item_price">{item.price} ETH</div>
                  )}
                  { isLoading ? (
                    null 
                  ): (
                    <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                  )}
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
