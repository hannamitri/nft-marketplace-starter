import axios from "axios";
import React, { useState, useEffect } from "react";
import Skeleton from "../UI/Skeleton";
import TopSeller from "../UI/TopSeller";

import Aos from "aos";
import "aos/dist/aos.css";

const TopSellers = () => {
  Aos.init();

  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getSellers() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setSellers(data);
    setLoading(false);
  }

  useEffect(() => {
    getSellers();
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
            <ol
              data-aos="fade-in"
              data-aos-delay="100"
              data-aos-duration="1000"
              className="author_list"
            >
              {!loading
                ? sellers.map((item) => (
                    <TopSeller
                      key={item.id}
                      authImage={item.authorImage}
                      authId={item.authorId}
                      authName={item.authorName}
                      price={item.price}
                    />
                  ))
                : new Array(12).fill(0).map((_, index) => (
                    <li style={{ display: "flex" }} key={index}>
                      <div className="author_list_pp">
                        <Skeleton
                          width={"50px"}
                          height={"50px"}
                          borderRadius={"50%"}
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <Skeleton
                          width={"125px"}
                          height={"22px"}
                          borderRadius={"8px"}
                        />
                        <br />
                        <Skeleton
                          width={"72px"}
                          height={"16px"}
                          borderRadius={"8px"}
                        />
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
