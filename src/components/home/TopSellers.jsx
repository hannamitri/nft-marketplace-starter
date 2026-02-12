import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const TopSellers = () => {
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl =
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

    const fetchAuthors = async () => {
      try {
        const response = await axios.get(apiUrl);
        setAuthor(response.data);
      } catch (err) {
        console.error("Error fetching top sellers:", err);
        setError("Could not load top sellers");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (error) return <p>{error}</p>;

  const skeletonStyle = {
    background: "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite linear",
    borderRadius: "4px",
  };

  const skeletonCircle = {
    ...skeletonStyle,
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    flexShrink: 0,
  };

  const skeletonText = (width) => ({
    ...skeletonStyle,
    height: "12px",
    margin: "4px 0",
    width,
  });

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div data-aos="fade-up" data-aos-delay="200" className="col-lg-12 text-center">
            <h2>Top Sellers</h2>
            <div className="small-border bg-color-2"></div>
          </div>
          <div className="col-md-12">
            <ol data-aos="fade-up" data-aos-delay="200" className="author_list">
              {loading
                ? Array.from({ length: 12 }).map((_, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "15px",
                      }}
                    >
                      <div style={{ marginRight: "10px" }}>
                        <div style={skeletonCircle}></div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={skeletonText("60%")}></div>
                        <div style={skeletonText("30%")}></div>
                      </div>
                    </li>
                  ))
                : author.map((author) => (
                    <li key={author.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${author.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={author.authorImage}
                            alt={author.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${author.id}`}>
                          {author.authorName}
                        </Link>
                        <span>{author.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
    </section>
  );
};

export default TopSellers;