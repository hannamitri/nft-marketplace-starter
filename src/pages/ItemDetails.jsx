import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getHotCollections } from "../api/api";

const API_URL = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections';
const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const fetchedItem = await getHotCollections(id);
        console.log("Fetched item:", fetchedItem);

        if (fetchedItem) {
          setItem(fetchedItem);
        } else {
          setError("Item not found");
        }
      } catch (err) {
        console.error("Error fetching item:", err); 
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.image}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
                    </div>
                  </div>
                  <p>{item.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                        {item.owner && item.owner.image && (
                          <Link to="/author">
                            <img
                              className="lazy"
                              src={item.owner.image}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        )}
                        </div>
                        <div className="author_list_info">
                        {item.creator && (
                          <Link to="/author">{item.owner.name}</Link>
                        )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                        {item.creator && item.creator.image && (
                          <Link to="/author">
                            <img
                              className="lazy"
                              src={item.creator.image}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        )}
                        </div>
                        <div className="author_list_info">
                        {item.creator && item.creator.name && (
                          <Link to="/author">{item.creator.name}</Link>
                        )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      {item.currencyImage && (
                      <img src={item.currencyImage} alt="" />
                      )}
                      <span>{item.price || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
