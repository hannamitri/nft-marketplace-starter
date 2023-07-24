import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
const TopSellers = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const displaycount = Array(12).fill(null);
  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        const fetchData = response.data;
        setFetchedData(fetchData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchCollections();
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
              {loading &&
                displaycount.map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Skeleton width={50} height={50} borderRadius={99} />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info">
                      <h4>
                        <Skeleton width={130} height={21} />
                      </h4>

                      <span>
                        <Skeleton width={40} height={15} />
                      </span>
                    </div>
                  </li>
                ))}

              {fetchedData.map((user) => (
                <li key={user.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${user.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={user.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${user.authorId}`}>
                      {user.authorName}
                    </Link>
                    <span>{user.price} ETH</span>
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
