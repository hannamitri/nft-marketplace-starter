import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton from "../UI/Skeleton";

export default function TopSellers() {
  const [sellers, setSellers] = useState([]);
  const [skelLoad, setSkelLoad] = useState();

  async function fetchData() {
    setSkelLoad(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    console.log(data);
    setSkelLoad(false);
    setSellers(data);
  }

  useEffect(() => {
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
            {skelLoad
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="nft_skeleton">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <Skeleton
                              borderRadius={50}
                              height={50}
                              width={50}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Skeleton height={20} width={100} />
                          <span>
                            <Skeleton height={20} width={40} />
                          </span>
                        </div>
                      </div>
                    </li>
                  ))
                : sellers.map((collection, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={collection.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${collection.authorId}`}>
                          {collection.authorName}
                        </Link>
                        <span>{collection.price} ETH</span>
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
