import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    axios
      .get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
        setLoading(false);
      });
  }, [nftId]);

  if (loading) {
    return (
      <div className="container text-center" style={{ padding: "100px 0" }}>
        <h3>Loading Item Details...</h3>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <section id="section-item-details" className="no-bottom">
        <div className="container">
          <div className="row" style={{ paddingTop: "40px" }}>
            <div className="col-md-6 text-center">
              <img
                src={item.nftImage}
                className="img-fluid img-rounded mb-sm-30"
                alt={item.title}
              />
            </div>

            <div className="col-md-6">
              <div className="item_details_info">
                <h2>{item.title}</h2>
                <div className="item_info_counts">
                  <div className="item_info_views" style={{ marginRight: "15px", display: "inline-block" }}>
                    <i className="fa fa-eye" style={{ marginRight: "5px" }}></i>
                    {item.views}
                  </div>
                  <div className="item_info_likes" style={{ display: "inline-block" }}>
                    <i className="fa fa-heart" style={{ marginRight: "5px" }}></i>
                    {item.likes}
                  </div>
                </div>
                <p style={{ marginTop: "20px" }}>{item.description}</p>
                <h6>Price</h6>
                <div className="nft-item-price">
                  <h3>{item.price} ETH</h3>
                </div>
                <Link to="/" className="btn-main" style={{ marginTop: "20px", display: "inline-block" }}>
                  Back to Marketplace
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItemDetails;