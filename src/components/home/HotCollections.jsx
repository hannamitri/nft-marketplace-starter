import React, { useEffect, useState } from "react";
import axios from "axios";
import Collection from "../UI/Collection";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  async function fetchCollections() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
      );
      setCollections(data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching items:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <>
              {new Array(4).fill(0).map((_, index) => (
                <div className="nft_col--skeleton" style={{
                  width: "315px"
                }}>
                  <Skeleton width={313} height={176.312} />
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                    className="nft_col-pfp--skeleton"
                  >
                    <Skeleton width={60} height={60} borderRadius={100} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "2px",
                    }}
                  >
                    <Skeleton width={70} height={19.188} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton width={55} height={18} />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <OwlCarousel
              items={4}
              nav
              margin={12}
              loop
              responsive={{
                0: {
                  items: 1,
                },
                500: {
                  items: 1,
                },
                600: {
                  items: 2,
                },
                1000: {
                  items: 4,
                },
              }}
            >
              {collections.map((collection) => (
                <Collection
                  collection={collection}
                  key={collection.id}
                ></Collection>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
