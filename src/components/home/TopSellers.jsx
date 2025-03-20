import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import topSellersData from "../../api/topSellers.json";
import authorData from "../../api/authorApi.json";
import Skeleton from "../UI/Skeleton";

const TopSellerSkeleton = () => (
  <li>
    <div className="author_list_pp">
      <Skeleton 
        type="avatar" 
        width="50px" 
        height="50px" 
        borderRadius="50%" 
        style={{ margin: "0 auto" }}
      />
    </div>
    <div className="author_list_info">
      <Skeleton 
        type="title" 
        width="80px" 
        height="16px" 
        style={{ marginBottom: "8px" }}
      />
      <Skeleton 
        type="subtitle" 
        width="60px" 
        height="14px"
      />
    </div>
  </li>
);

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const sellers = topSellersData.map(seller => {
          const authorMatch = authorData.find(author => 
            author.authorName === seller.authorName
          );
          
          return {
            ...seller,
            mappedAuthorId: authorMatch ? authorMatch.id : null
          };
        });
        
        setTopSellers(sellers);
        setLoading(false);
      } catch (error) {
        console.error("Error loading top sellers data:", error);
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, []);

  const renderSkeletonItems = () => {
    return Array(12).fill(0).map((_, index) => (
      <TopSellerSkeleton key={`skeleton-${index}`} />
    ));
  };

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
              {loading ? (
                renderSkeletonItems()
              ) : (
                topSellers.map((seller) => (
                  <li key={seller.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.mappedAuthorId || seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage || AuthorImage}
                          alt={seller.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${seller.mappedAuthorId || seller.authorId}`}>{seller.authorName}</Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
