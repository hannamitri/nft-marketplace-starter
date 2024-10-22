import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const TopSellers = () => {
  const [nft, setNft] = useState([]);
  const [img, setImg] = useState([]);

  useEffect(() => {
    async function fetchNfts() {
      setImg(false);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setNft(data);
      setImg(true);
    }
    fetchNfts();
  }, []);

  return (
    <section
      id="section-popular"
      className="pb-5"
      data-aos="fade-in"
      data-aos-delay="300"
      data-aos-duration="500"
      data-aos-easing="ease-in"
    >
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
              {img
                ? nft.map((nft) => (
                    <li key={nft.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${nft.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={nft.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${nft.authorId}`}>
                          {nft.authorName}
                        </Link>
                        <span>{nft.price} ETH</span>
                      </div>
                    </li>
                  ))
                : new Array(12).fill(0).map((_, index) => (
                    <li key={index} className="skelegroup">
                      <div className="author_list_pp skeleton-box skellyimg">
                        <div className=""></div>
                      </div>
                      <div className="author_list_info">
                        <Link
                          to="/author"
                          className="skeleton-box skellyauthor"
                        ></Link>
                        <span className="skeleton-box skellyprice">
                          2.1 ETH
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
