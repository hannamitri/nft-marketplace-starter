import { Link } from "react-router-dom";
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import'../../css/styles/HotCollection.css';
import Skeleton from '../UI/Skeleton.jsx';


const TopSellers = () => {
  const[sellers, setSellers] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchSellers= async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
        setSellers(response.data);
      } catch (error) {
                console.error("Error fetching top sellers:", error);
                setSellers(new Array(12).fill({}));
            } finally {
                setIsLoading(false);
            }
        };

        fetchSellers();
    }, []);

    const skeletonItems = new Array(12).fill(0).map((_,index) => (
      <li key={index} className="skeleton-item-layout">
        <div className="author_list_pp">
          <Skeleton />
           </div>
          <div className="author_list_info">
          <Skeleton width='120px' height='14px' borderRadius='3px' />
          <Skeleton width='60px' height='12px' borderRadius='3px' style={{ marginTop: '5px' }} />
            </div>
        </li>
    ));

    const loadedItems = sellers.map((seller, index) => (
        <li key={seller.id || index}> 
            <div className="author_list_pp">
                <Link to={`/author/${seller.authorId}`}>
                                     <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt={seller.authorName}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/cccccc/333333?text=N/A' }} 
                    />
                    <i className="fa fa-check"></i>
                </Link>
            </div>
            <div className="author_list_info">
                <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                
                <span>{`${seller.price} ETH` }</span>
            </div>
        </li>
    ));


  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
               {isLoading ? skeletonItems : loadedItems}

        
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
