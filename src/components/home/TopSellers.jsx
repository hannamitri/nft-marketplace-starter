import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [userData, setUserData] = useState([]);
  const [skeleton, setSkeleton] = useState(true);

  async function fetchUsers() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setUserData(data);
    setSkeleton(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const skeletonArray = Array.from({ length: 12 }).fill(null);

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
              {skeleton
                ? skeletonArray.map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton width={50} height={50} borderRadius={50} />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <Skeleton width={100} height={20} borderRadius={4} />
                        <Skeleton width={80} height={20} borderRadius={4} />
                      </div>
                    </li>
                  ))
                : userData.map((userProfile, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${userProfile.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={userProfile.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${userProfile.authorId}`}>
                          {userProfile.authorName}
                        </Link>
                        <span>{userProfile.price} ETH</span>
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
