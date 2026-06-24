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

  return (
    <div id="wrapper">
      <section id="section-item-details" className="no-bottom">
        <div className="container">
          <div className="row" style={{ paddingTop: "40px" }}>
            <div className="col-md-6 text-center">
              {loading ? (
                <div style={{ width: "100%", height: "400px", backgroundColor: "#f0f0f0", borderRadius: "10px" }}></div>
              ) : (
                <img src={item.nftImage} className="img-fluid img-rounded mb-sm-30" alt={item.title} />
              )}
            </div>

            <div className="col-md-6">
              <div className="item_details_info">
                <h2>{loading ? <div style={{ width: "60%", height: "30px", backgroundColor: "#f0f0f0" }}></div> : item.title}</h2>

                <div className="item_info_counts" style={{ margin: "20px 0" }}>
                  <div className="item_info_views" style={{ marginRight: "15px", display: "inline-block" }}>
                    <i className="fa fa-eye"></i> {loading ? <div style={{ display: "inline-block", width: "40px", height: "15px", backgroundColor: "#f0f0f0" }}></div> : item.views}
                  </div>
                  <div className="item_info_likes" style={{ display: "inline-block" }}>
                    <i className="fa fa-heart"></i> {loading ? <div style={{ display: "inline-block", width: "40px", height: "15px", backgroundColor: "#f0f0f0" }}></div> : item.likes}
                  </div>
                </div>

                <p>{loading ? <div style={{ width: "100%", height: "60px", backgroundColor: "#f0f0f0" }}></div> : item.description}</p>

                <h6>Price</h6>
                <div className="nft-item-price" style={{ marginBottom: "30px" }}>
                  <h3>{loading ? <div style={{ width: "80px", height: "30px", backgroundColor: "#f0f0f0" }}></div> : `${item.price} ETH`}</h3>
                </div>

                <div className="item_author_wrap" style={{ display: "flex", borderTop: "1px solid #eee", paddingTop: "20px" }}>
                  <div className="item_author" style={{ flex: 1, display: "flex", alignItems: "center" }}>
                    <div className="author_list_pp">
                      {loading ? <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#f0f0f0" }}></div> : (
                        <Link to={`/author/${item.ownerId}`}>
                          <img className="lazy" src={item.ownerImage} alt={item.ownerName} />
                          <i className="fa fa-check"></i>
                        </Link>
                      )}
                    </div>
                    <div className="author_list_info" style={{ marginLeft: "15px" }}>
                      <span>Owner</span><br />
                      {loading ? <div style={{ width: "100px", height: "15px", backgroundColor: "#f0f0f0" }}></div> : <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>}
                    </div>
                  </div>

                  <div className="item_author" style={{ flex: 1, display: "flex", alignItems: "center" }}>
                    <div className="author_list_pp">
                      {loading ? <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#f0f0f0" }}></div> : (
                        <Link to={`/author/${item.creatorId}`}>
                          <img className="lazy" src={item.creatorImage} alt={item.creatorName} />
                          <i className="fa fa-check"></i>
                        </Link>
                      )}
                    </div>
                    <div className="author_list_info" style={{ marginLeft: "15px" }}>
                      <span>Creator</span><br />
                      {loading ? <div style={{ width: "100px", height: "15px", backgroundColor: "#f0f0f0" }}></div> : <Link to={`/author/${item.creatorId}`}>{item.creatorName}</Link>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItemDetails;