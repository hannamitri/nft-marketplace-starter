import {Link} from "react-router-dom";
import React, {useState, useEffect} from 'react';


const calculateTimeRemaining = (expiryTime) => {

  if (!expiryTime) {
        return ""; 
    }

    const total = expiryTime - new Date().getTime(); 
    
    if (total <= 0) {
        return "ENDED";
    }

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
    };

    export const NewItemCardSkeleton = ({ className }) => {
      return (
      <div className={className}> 
            <div className="d-item" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="nft__item">
                   <div className="author_list_pp">
                        <div className="skeleton skeleton-avatar"></div>
                    </div>
                                        
                    <div className="de_countdown">
                         <div className="skeleton skeleton-text" style={{ width: '80%', height: '14px' }}></div>
                    </div>

                    <div className="nft__item_wrap">
                       
                        <div className="skeleton skeleton-img"></div>
                    </div>

                    <div className="nft__item_info">
                       
                        <div className="skeleton skeleton-text" style={{ width: '90%' }}></div>
                        <div className="nft__item_price">
                            <div className="skeleton skeleton-text" style={{ width: '50%', height: '14px' }}></div>
                        </div>
                        <div className="nft__item_like" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="skeleton skeleton-text" style={{ width: '20px', height: '14px', marginRight: '5px' }}></div>
                            <div className="skeleton skeleton-text" style={{ width: '30px', height: '14px' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



const NewItemCard = ({ itemData, className }) => {    
const [timeRemaining, setTimeRemaining] = useState("Loading..."); 
const [expiryTime] = useState(itemData.expiryDate); 

const {
    nftImage,
    nftId,
    title,
    views,
    likes,
    description,
    ownerImage,
    ownerName,
    ownerId,
    creatorImage,
    creatorName,
    creatorId,
    price,
  } = itemData; 

useEffect(() => {    
setTimeRemaining(calculateTimeRemaining(expiryTime));
const timerInterval = setInterval(() => {
const timeString = calculateTimeRemaining(expiryTime);
    setTimeRemaining(timeString);
    if (timeString === "ENDED") {
        clearInterval(timerInterval);
    }
}, 1000); 

return () => clearInterval(timerInterval);
}, [expiryTime]);

  

return (
<div className={className}> 
    <div className="nft__item">
      <div className="author_list_pp">
         <Link
         to={`/author/${itemData.authorId}`} 
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={`Creator: ${itemData.authorName}`}>
        <img className="lazy" src={itemData.authorImage} alt="author image" />
        <i className="fa fa-check"></i>
        </Link>
        </div>
        
        {timeRemaining && timeRemaining !== 'ENDED' && <div className="de_countdown">{timeRemaining}</div>}
        {timeRemaining === 'ENDED' && <div className="de_countdown">ENDED</div>}
        
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

                  
                  <Link to={`/item-details/${nftId}`}> 
                    <img
                      src={nftImage}
                      className="lazy nft__item_preview"
                      alt="nft image"
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${nftId}`}>
                    <h4>{title}</h4>
                  </Link>
                  <div className="nft__item_price">{`${price} ETH`}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{likes}</span>
                  </div>
                </div>
              </div>
            </div>
);
}
          
export default NewItemCard;