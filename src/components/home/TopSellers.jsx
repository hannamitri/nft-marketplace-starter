import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const TopSellers = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // 2. Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation speed
      once: true,     // Animate only once while scrolling down
    });
  }, []);

  // 3. Refresh AOS calculations when loading is complete
  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [loading]);

  useEffect(() => {
    async function fetchTopSellers() {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers?userId=${id}`,
      );
      setPosts(response.data);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
    fetchTopSellers();
  }, [id]);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          {/* 4. Added AOS fade-up to the section header */}
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          
          {/* 5. Added AOS fade-up properties to the main list container wrapper */}
          <div className="col-md-12" data-aos="fade-up" data-aos-delay="150">
            <ol className="author_list">
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={`skeleton-${index}`}>
                      <div className="author_list_pp">
                        <div
                          className="lazy pp-author skeleton-loading"
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            backgroundColor: "#eee",
                          }}
                        ></div>
                      </div>
                      <div className="author_list_info">
                        <div
                          className="skeleton-loading"
                          style={{
                            width: 100,
                            height: 15,
                            backgroundColor: "#eee",
                            marginBottom: 5,
                          }}
                        ></div>
                        <div
                          className="skeleton-loading"
                          style={{
                            width: 50,
                            height: 12,
                            backgroundColor: "#eee",
                          }}
                        ></div>
                      </div>
                    </li>
                  ))
                : posts.map((post) => (
                    <li key={post.id || post.authorId}>
                      <div className="author_list_pp">
                        <Link to={`/author/${post.authorId || id}`}>
                          <img
                            className="lazy pp-author"
                            src={post.authorImage || AuthorImage}
                            alt={post.authorName || "Author"}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${post.authorId || id}`}>
                          {post.authorName || "Monica Lucas"}
                        </Link>
                        <span>{post.price} ETH</span>
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


