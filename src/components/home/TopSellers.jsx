import React from "react";
import { Link, useParams } from "react-router-dom";


const TopSellers = ({loading, topSellers}) => {
  const {id} = useParams()
  
  const skeletonItems = Array(12).fill(0);
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
                <>
                {skeletonItems.map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <div className="skeleton-box" style={{width:50, height: 50, borderRadius:'50%'}}></div>
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <div className="skeleton-box" style={{width: '140px', height:20}}></div>
                      <div className="skeleton-box" style={{width:'93px', height:16}}></div>
                    </div>
                  </li>
                ))}
                </>
              ): ( 
                <>
                {topSellers.map((item)=> (
                  <li key={item.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={item.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
                      <span>{item.price} ETH</span>
                    </div>
                  </li>
                ))}
                </>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
