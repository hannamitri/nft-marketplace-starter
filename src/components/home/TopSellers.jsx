import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'aos/dist/aos.css';

const TopSellers = ({ fethURL }) => {
  const [cards, setCards] = useState([]);
  const [Loading, setLoading] = useState(true);

  const base_url =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

  useEffect(() => {
    async function topSellers() {
      try {
        const { data } = await axios.get(base_url);
        setCards(data);
        setTimeout(() => {
          setLoading(false);
        }, 4000);
      } catch (error) {
        console.log("Error fetching top sellers:", error);
        setLoading(false);
      } finally {
      }
    }

    topSellers();
  }, []);

  if (!cards.length) return <div>No collections found.</div>;

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
          {Loading ? (
            <>
              <div className="col-md-12">                
                <ol className="author_list">
                  {new Array(12).fill(0).map((__, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <img className="lazy pp-author" src="#" alt="" />
                          <Skeleton width={50} height={50} borderRadius={99} />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">
                          <Skeleton height={20} width="70%" />
                        </Link>
                        <span>
                          <Skeleton height={20} width="30%" />
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          ) : (
            <div className="col-md-12">
              <ol className="author_list"
                data-aos="fade-in"
                data-aos-offset="10"
                data-aos-delay="100"
                data-aos-duration="2000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
                >
                {cards.map((item) => (
                  <li key={item.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={item.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">{item.authorName}</Link>
                      <span>{item.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
