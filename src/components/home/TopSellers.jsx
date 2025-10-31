import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SkeletonAll from "../UI/SkeletonAll"; // ✅ Import adaptive skeleton

const TopSellers = () => {
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true); // skeleton state

  async function FecthTopSellers() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`);
    console.log(data);
    setAuthor(data);
    setTimeout(() => setLoading(false),2000);

  }

  useEffect(() => {
    FecthTopSellers();
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

              {loading ?

                Array(12).fill(0).map((_, index) => (
                 
                   <SkeletonAll type="author" key={index}  />
                  
                  )) 
             
              :
              
               author.map((item, index) => (
                <li key={index}>
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
              ))

              }

            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;

