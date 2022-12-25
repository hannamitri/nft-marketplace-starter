import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {

  const [authorData, setAuthorData] = useState([])

  async function fetchData() {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
    setAuthorData(data)
  }

  useEffect(() => {
    fetchData()
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
              {
              authorData.length > 0
              ?
              authorData.map((author) => (
                <li key={author.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${author.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={author.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${author.authorId}`}>
                      {author.authorName}
                    </Link>
                    <span>{`${author.price} ETH`}</span>
                  </div>
                </li>
              ))
              :
              new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                <div className="author_list_pp">
                  <Skeleton height={"50px"} width={"50px"} borderRadius={"50%"}/>
                  <i className="fa fa-check"></i>
                </div>
                <div className="author_list_info">
                  <Skeleton width={"125px"} height={"20px"} borderRadius={"8px"}/>
                  <span><Skeleton width={"70px"} height={"20px"} borderRadius={"8px"}/></span>
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
