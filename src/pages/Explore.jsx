import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import axios from "axios";

const Explore = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);
  const [sort, setSort] = useState("");
  const hasMoreItems = visibleItems < items.length

  const handleLoadMore = () => {
    setVisibleItems((previousAmount) => previousAmount + 4);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setVisibleItems(8);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // FROM MAIN!! DO NOT REMOVE
  }, []);

  useEffect(() => {
    async function getItems() {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
          {
            params: {
              filter: sort,
            },
          },
        );
        console.log(response.data);
        setItems(response.data);
      } catch (error) {
        console.error("Unable to load:", error);
      } finally {
        setLoading(false);
      }
    }
    getItems();
  }, [sort]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <ExploreItems
                items={items.slice(0, visibleItems)}
                loading={loading}
                handleLoadMore={handleLoadMore}
                sort={sort}
                handleSortChange={handleSortChange}
                hasMoreItems={hasMoreItems}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
