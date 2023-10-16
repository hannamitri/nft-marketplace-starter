import React, { useEffect, useState } from "react";
import axios from "axios";
import Seller from "../UI/Seller";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  async function fetchSellers() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
      );
      setSellers(data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching items:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  }

  useEffect(() => {
    fetchSellers();
  });

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
              {loading ? (
                <>
                  {new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton width={50} height={50} borderRadius={100} />
                      </div>
                      <div className="author_list_info">
                        <div
                          style={{
                            height: "21px",
                            display: "block",
                          }}
                        >
                          <Skeleton height={21} width={87} />
                        </div>
                        <Skeleton height={16.797} width={50} />
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {sellers.map((seller) => (
                    <Seller seller={seller} key={seller.id} />
                  ))}
                </>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
