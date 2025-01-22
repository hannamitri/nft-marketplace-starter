import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Aos from 'aos';
import 'aos/dist/aos.css';

const TopSellers = ({ width, height, borderRadius }) => {

  useEffect(() => {
        Aos.init({
          easing: 'ease-in-out',
          duration: 1500,
        });
      }, [])

  const [topSellers, setTopSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
        setTopSellers(res.data)
      }
      catch (error) {
        console.log("Error.", error)
      }
    }

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    fetchData();

    return () => clearTimeout(timer)
  }, [])
  return (
    <section id="section-popular" className="pb-5" >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos = "fade" data-aos-delay = "100" data-aot-duration = "200">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12" data-aos = "fade" data-aos-delay = "100" data-aot-duration = "200">
            <ol className="author_list">
              {topSellers.map((seller, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                    { isLoading ? (
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    ) : (
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                    )}
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    { isLoading ? (
                      <Skeleton width="80%" height="20px" borderRadius="2px" />
                    ) : (
                      <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                    )}
                    { isLoading ? (
                      <Skeleton width="25%" height="20px" borderRadius="2px" />
                    ) : (
                      <span>{seller.price} ETH</span>
                    )}
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
