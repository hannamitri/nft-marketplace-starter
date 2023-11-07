import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [nftArray, setNftArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setNftArray(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

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
          <div
            className="col-md-12"
            data-aos="fade-in"
            data-aos-duration="1000"
          >
            <ol className="author_list">
              {nftArray.length > 0
                ? nftArray.map((nft) => (
                    <li key={nft?.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${nft?.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={nft?.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${nft?.authorId}`}>
                          {nft?.authorName}
                        </Link>
                        <span>{nft?.price}</span>
                      </div>
                    </li>
                  ))
                : Array.from({ length: 12 }).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton
                          height={"50px"}
                          width={"50px"}
                          borderRadius={"25px"}
                        />
                      </div>
                      <div className="author_list_info">
                        <Skeleton height={"18px"} width={"100px"} />
                        <span>
                          <Skeleton height={"16px"} width={"40px"} />
                        </span>
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
