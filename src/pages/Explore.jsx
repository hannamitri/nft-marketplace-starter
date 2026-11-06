import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = ({ loading: propLoading = false }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (error) return <p>Error: {error}</p>;

  const skeletonItems = Array.from({ length: 4 });

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {propLoading || isLoading ? (
          skeletonItems.map((_, index) => (
            <div className="center-y relative text center" key={index}>
              <div className="container">
                <div className="row">
                  <div className="coll-md-12 text-center">
                    <Skeleton width="100%" height="180px" borderRadius="12px" />
                  </div>
                  <div className="clearfix">
                    <Skeleton width="60px" height="60px" borderRadius="50%" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <section
              id="subheader"
              className="text-light"
              style={{ background: `url("${SubHeader}") top` }}
            >
              <div className="center-y relative text-center">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <h1>Explore</h1>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
            </section>

            <section aria-label="section">
              <div className="container">
                <div className="row">
                  <ExploreItems />
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
