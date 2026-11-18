import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [tpUsers, settpUsers] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchTpUsers() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
    settpUsers(data)
    setLoading(false)
  }
  useEffect(() => {
    fetchTpUsers()
  }, [])

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
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                  <div className="author_list_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%">
                      <i className="fa fa-check"></i>
                    </Skeleton>
                  </div>
                  <div className="author_list_info">
                    <div><Skeleton width="100px" height="18px" /></div>
                    <Skeleton width="50px" height="14px" />
                  </div>
                </li>
                ))  
              ) : (
              tpUsers.slice(0, 12).map((users) => 
                <li key={users.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${users.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={users.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{users.authorName}</Link>
                    <span>{users.price} ETH</span>
                  </div>
                </li>
              )
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
