import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from '../UI/Skeleton'

const TopSellers = () => {
  const [data, setData] = useState();

  useEffect(() => {
  async function fetchData() {
      try {
          const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers')
          setData(response.data)
          console.log(response.data)
        } catch(error) {
          if (error.response) {
            console.log('Error response:' + error.response.data)
          } else if (error.request) {
            console.log('Error request:' + error.request)
          } else {
            console.log('Error message:' + error.message)
          }
      }
  }
      
    fetchData();
  }, []);
    
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
              {data && data.length ? (
                data.map((item, index) => (
                  <li key={index}>
                  <div className="author_list_pp">
                  <Link to=``>
                  <img
                  className="lazy pp-author"
                  src={item.authorImage}
                  alt=""
                  />
                      <i className="fa fa-check"></i>
                      </Link>
                      </div>
                      <div className="author_list_info">
                      <Link to="/author">{item.authorName}</Link>
                      <span>{item.price} ETH</span>
                      </div>
                      </li>
                    ))
                  ) : (
                    new Array(12).fill(0).map((_, index) => {
                      console.log('hello')
                      return (

                        <li key={index}>
                    <div className="author_list_pp">
                        <Skeleton width='50px' height='50px' borderRadius='50%'/>
                        <i className="fa fa-check"></i>
                      
                        </div>
                        <div className="author_list_info">
                        <Link to="/author">
                        <Skeleton width='70%' height='20px'/>
                        </Link>
                        <span>
                          <Skeleton height='18px' width='30%'/>
                        </span>
                        </div>
                    </li>
                  )
                    }))
                  }
                  </ol>
                  </div>
                  </div>
                  </div>
                  </section>
  );
};

export default TopSellers;
