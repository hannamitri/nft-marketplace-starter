import { Link } from "react-router-dom";
import axios from 'axios';
import Skeleton from '../UI/Skeleton';
import React, {useState, useEffect} from 'react';


const ItemCardSkeleton = ({ index }) => (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
        <div className="nft__item skeleton-container">
            <div className="author_list_pp">
            <Skeleton width='50px' height='50px' borderRadius='50%' />
            </div>
            <div className="nft__item_wrap">
            <Skeleton width='100%' height='200px' borderRadius='8px' />
            </div>
            <div className="nft__item_info">
            <Skeleton width='70%' height='16px' borderRadius='3px' style={{ marginBottom: '8px' }} />
                <div className="d-flex justify-content-between align-items-center">
                    <Skeleton width='40%' height='14px' borderRadius='3px' />
                    <Skeleton width='20px' height='14px' borderRadius='3px' />
                </div>
            </div>
        </div>
    </div>
);


const AuthorItems = ({ authorId, authorData }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
        const [activeTab] = useState(1); 

    useEffect(() => {
        const fetchItems = async () => {
            if (!authorId) {
            setIsLoading(false);
                return;
            }

            try {
             await new Promise(resolve => setTimeout(resolve, 1500)); 
                const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
                setItems(response.data.nftCollection || []); 
            } catch (error) {
                console.error("Error fetching author items:", error);
                setItems([]);
            } finally {
                setIsLoading(false);
            }
        };

    
        fetchItems();
    }, [authorId]); 

    const skeletonItems = new Array(8).fill(0).map((_, index) => (
        <ItemCardSkeleton key={index} index={index} />
    ));

   const loadedItems = items.map((item, index) => {
        return (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.nftId || index}>
            <div className="nft__item">
                <div className="author_list_pp" style={{ minHeight: '50px' }}>
                    <Link to={`/author/${authorId}`}>                     
                        <img 
                            className="lazy" 
                            src={authorData?.authorImage} 
                            alt={authorData?.authorName}
                            style={{ width: '50px', height: '50px', borderRadius: '50%'}}
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/50x50/cccccc/333333?text=N/A' }}/>
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
                                </a >
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
                            alt={item.title}
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/cccccc/333333?text=NFT' }} 
                        />
                    </Link>
                </div>
                <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{`${item.price} ETH`}</div>
                    <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span> 
                    </div>
                </div>
            </div>
        </div>
    );
});

    return (
        <div className="de_tab_content">
            <div className="tab-1">
                <div className="row">
                   {isLoading ? skeletonItems : loadedItems}
                </div>
            </div>
      </div>
    );
};

export default AuthorItems;
