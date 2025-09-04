import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {

  useEffect(() => {
    fetchApi();
  }, []);

  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchApi() {
    
    const { data } = 
    
    await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setApi(data);
    setLoading(false)
  }
  return (

    
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row" data-aos="fade-up"
         data-aos-easing="ease-in-out"
              data-aos-duration="800">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
             { loading
             ?
                new Array(12).fill(0).map((element, index) => (
                  <li key={index}>
                  <div className="author_list_pp">
                    
                      <img
                        className="lazy pp-author"
                        src={api.authorImage}
                        alt=""
                      />
                      <div className=".pp-skelly"><div className="skelton-pp"></div></div>
                      <i className="fa fa-check"></i>
                  
                  </div>
                  <div className="author_list_info">
                    <div className="skelton-top_title"></div>
                    <div className="skelton-top_price"></div>
                    
                  </div>
                </li>
              ))
             :  api.map((api, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${api.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={api.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${api.authorId}`}>{api.authorName}</Link>
                    <span>{api.price} ETH</span>
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
