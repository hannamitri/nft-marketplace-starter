import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {


    const [sell , setSell] = useState()


    useEffect(() => {
      const sellData =  axios.get(`${`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`}`).then((response) => {
        setSell(response.data)
      })

    },[])

    console.log()

    
    
    
    





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
              {/* {new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-author"
                        src={AuthorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">Monica Lucas</Link>
                    <span>2.1 ETH</span>
                  </div>
                </li>
              ))} */}


  

              {sell?.map((sells) => (
                <li key={sells?.id}>
                <div className="author_list_pp">
                <Link to={`/author/${sells.authorId}`}>
                <img
                className="lazy pp-author"
                src={sells?.authorImage}
                alt=""
                />
                <i className="fa fa-check"></i>
                </Link>
                </div>
                <div className="author_list_info">
                <Link to= {`/author/${sells.authorId}`} >{sells?.authorName}</Link>
                <span>{sells?.price} ETH</span>
                </div>
                    </li>
                    ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
