import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton.jsx";
import axios from "axios";

const TopSellers = () => {
  const [loadSellers, setLoadingSellers] = useState([]);
  const [loadingSkeleton, setLoadingSkeleton] = useState();

  async function fetchTopSellers() {
    setLoadingSkeleton(true);
    const apiUrl =
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";
    const { data } = await axios.get(apiUrl);

    setLoadingSellers(data);
    setLoadingSkeleton(false);
  }

  useEffect(() => {
    fetchTopSellers();
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
              {loadSellers.map((sellers) => (
                <li key={sellers.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${sellers.authorId}`}>
                      {loadingSkeleton ? (
                        <Skeleton
                          width={"100%"}
                          height={"50px"}
                          borderRadius={"24px"}
                        />
                      ) : (
                        <img
                          className="lazy pp-author"
                          src={sellers.authorImage}
                          alt=""
                        />
                      )}
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <div className="author_list_info">
                    {loadingSkeleton ? (
                      <Skeleton
                        width={"50%"}
                        display={"flex"}
                        borderRadius={"5px"}
                      />
                    ) : (
                      <Link to={`/author/${sellers.authorId}`}>
                        {sellers.authorName}
                      </Link>
                    )}
                    {loadingSkeleton ? (
                      <Skeleton width={"20%"} borderRadius={"5px"} />
                    ) : (
                      <span>{sellers.price}</span>
                    )}
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
