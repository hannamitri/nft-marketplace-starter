import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const skeletonStyles = `
  .skeleton {
    background: linear-gradient(
      90deg,
      #f0f0f0 25%,
      #e0e0e0 37%,
      #f0f0f0 64%
    );
    background-size: 400% 100%;
    animation: shimmer 1.2s infinite linear;
    border-radius: 8px;
  }
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .skeleton.skeleton-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-bottom: 6px;
    display: inline-block;
  }
  .skeleton.skeleton-text {
    width: 80px;
    height: 18px;
    margin-bottom: 4px;
  }
  .skeleton.skeleton-span {
    width: 39px;
    height: 16px;
  }
`;

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    )
      .then((res) => res.json())
      .then((data) => {
        setSellers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const handleLoad = () => {
      AOS.refresh();
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <>
      <style>{skeletonStyles}</style>
      <section id="section-popular" className="pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="text-center"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <h2>Top Sellers</h2>
                <div
                  className="small-border bg-color-2"
                  data-aos="fade-right"
                  data-aos-delay="800"
                ></div>
              </div>
            </div>
            <div
              className="col-md-12"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <ol className="author_list">
                {loading
                  ? new Array(12).fill(0).map((_, index) => (
                      <li key={index}>
                        <div className="author_list_pp">
                          <span className="skeleton skeleton-avatar" />
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="author_list_info">
                          <span className="skeleton skeleton-text" />
                          <span className="skeleton skeleton-span" />
                        </div>
                      </li>
                    ))
                  : sellers.map((seller) => (
                      <li key={seller.id}>
                        <div className="author_list_pp">
                          <Link to={`/author/${seller.authorId}`}>
                            <img
                              className="lazy pp-author"
                              src={seller.authorImage}
                              alt={seller.authorName}
                              style={{
                                width: 45,
                                height: 45,
                                borderRadius: "50%",
                              }}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${seller.authorId}`}>
                            {seller.authorName}
                          </Link>
                          <span>{seller.price} ETH</span>
                        </div>
                      </li>
                    ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopSellers;
//this is what i had but i like semi merged it, it wouldnt let me commit
// without merging their way, if the component looks jacked up just use my code below
/* 
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const skeletonStyles = `
  .skeleton {
    background: linear-gradient(
      90deg,
      #f0f0f0 25%,
      #e0e0e0 37%,
      #f0f0f0 64%
    );
    background-size: 400% 100%;
    animation: shimmer 1.2s infinite linear;
    border-radius: 8px;
  }
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .skeleton.skeleton-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-bottom: 6px;
    display: inline-block;
  }
  .skeleton.skeleton-text {
    width: 80px;
    height: 18px;
    margin-bottom: 4px;
  }
  .skeleton.skeleton-span {
    width: 39px;
    height: 16px;
  }
`;

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    )
      .then((res) => res.json())
      .then((data) => {
        setSellers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const handleLoad = () => {
      AOS.refresh();
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <>
      <style>{skeletonStyles}</style>
      <section id="section-popular" className="pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="text-center"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <h2>Top Sellers</h2>
                <div
                  className="small-border bg-color-2"
                  data-aos="fade-right"
                  data-aos-delay="800"
                ></div>
              </div>
            </div>
            <div
              className="col-md-12"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <ol className="author_list">
                {loading
                  ? new Array(12).fill(0).map((_, index) => (
                      <li key={index}>
                        <div className="author_list_pp">
                          <span className="skeleton skeleton-avatar" />
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="author_list_info">
                          <span className="skeleton skeleton-text" />
                          <span className="skeleton skeleton-span" />
                        </div>
                      </li>
                    ))
                  : sellers.map((seller) => (
                      <li key={seller.id}>
                        <div className="author_list_pp">
                          <Link to={`/author/${seller.authorId}`}>
                            <img
                              className="lazy pp-author"
                              src={seller.authorImage}
                              alt={seller.authorName}
                              style={{
                                width: 45,
                                height: 45,
                                borderRadius: "50%",
                              }}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${seller.authorId}`}>
                            {seller.authorName}
                          </Link>
                          <span>{seller.price} ETH</span>
                        </div>
                      </li>
                    ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopSellers; */
