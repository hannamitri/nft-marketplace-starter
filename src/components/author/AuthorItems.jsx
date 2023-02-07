import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Skeleton from "../UI/Skeleton";


const AuthorItems = ({authorData, loading}) => {
  

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
        {loading ? (
            <>
              {new Array(8).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="nft__item_wrap">
                      <Skeleton width="100%" height="95%" />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton width="75%" height="30px" />
                      <Skeleton width="40%" height="20px" />
                    </div>
                    <div className="nft__item_like">
                      <Skeleton width="40px" height="20px" />
                    </div>
                  </div>
                </div>
                 ))}
                 </>
               ) : (
                 <>
                   {authorData.nftCollection?.map((authorNFT, index) => (
                     <div
                       className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                       key={index}
                     >
                       <div className="nft__item">
                         <div className="author_list_pp">
                           <Link to="">
                             <img className="lazy" src={authorData.authorImage} alt="" />
                             <i className="fa fa-check"></i>
                           </Link>
                         </div>
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
                           <Link to={`/item-details/${authorNFT.nftId}`}>
                             <img
                               src={authorNFT.nftImage}
                               className="lazy nft__item_preview"
                               alt=""
                             />
                           </Link>
                         </div>
                         <div className="nft__item_info">
                           <Link to={`/item-details/${authorNFT.nftId}`}>
                             <h4>{authorNFT.title}</h4>
                           </Link>
                           <div className="nft__item_price">{authorNFT.price} ETH</div>
                           <div className="nft__item_like">
                             <i className="fa fa-heart"></i>
                             <span>{authorNFT.likes}</span>
                           </div>
                         </div>
              </div>
            </div>
          ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
