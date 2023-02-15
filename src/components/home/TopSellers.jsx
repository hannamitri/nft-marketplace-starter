import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoadingPlaceHolder from './LoadingPlaceHolder'

const TopSellers = () => {

  const [loaded, setLoaded] = useState(undefined);
  const [data, setdata] = useState([]);

  async function getData() {
    setLoaded(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setdata(data);
    setLoaded(false);
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <section id="section-popular" className="pb-5" data-aos="fade-in" data-aos-duration="1000">
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
            {loaded
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                      <LoadingPlaceHolder extraStyles={{height:'50px', width:'50px', borderRadius:'50%'}}/>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                      <LoadingPlaceHolder extraStyles={{height:'20px', width:'70px'}}/>
                        <span>
                        <LoadingPlaceHolder extraStyles={{height:'20px', width:'30px', marginTop: '5px'}}/>
                        </span>
                      </div>
                    </li>
                  ))
                : data.map((item) => (
                    <li key={item.id}>
                      <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`} state={{ authorId: item.authorId }}>
                          <img
                            className="lazy pp-author"
                            src={item.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                      <Link to={`/author/${item.authorId}`} state={{ authorId: item.authorId }}>
                          {item.authorName}
                        </Link>
                        <span>{item.price} ETH</span>
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
