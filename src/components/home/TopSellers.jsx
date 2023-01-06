import { Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [items, setItems] = useState([]);
  const [Loading, setLoading] = useState();

  async function fetchItems() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setItems(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchItems();
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
              {Loading
                ? new Array(12).fill(0).map((_, index) => (
                    <>
                      <li key={index}>
                        <div className="author_list_pp">
                          <div className="lazy pp-author">
                            <Skeleton
                              animation="wave"
                              variant="circular"
                              width={50}
                              height={50}
                            />
                          </div>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="author_list_info">
                          <a>
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={100}
                              height={30}
                            />
                          </a>
                          <span>
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={40}
                              height={30}
                            />
                          </span>
                        </div>
                      </li>
                    </>
                  ))
                : items.map((item) => (
                    <>
                      <li src={item.id}>
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            state={{ authorId: item.authorId }}
                          >
                            <img
                              className="lazy pp-author"
                              src={item.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link
                            to={`/author/${item.authorId}`}
                            vstate={{ authorId: item.authorId }}
                          >
                            {item.authorName}
                          </Link>
                          <span>{item.price} ETH</span>
                        </div>
                      </li>
                    </>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
