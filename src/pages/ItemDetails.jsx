import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";

const ItemDetails = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const { nftId } = useParams();

  async function fetchItemDetails() {
    setLoading(true);

    const response = await fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId || 17914494}`
    );

    const data = await response.json();

    setTimeout(() => {
      setItem(data);
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItemDetails();
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>

                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {item.title} <span>#{item.tag}</span>
                    </h2>

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
                            <Link to="/author">
                              <img className="lazy" src={item.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to="/author">{item.ownerName}</Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
