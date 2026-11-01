import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchItemData = async () => {
    try {
      const response = await fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const itemData = await response.json();
      setData(itemData);
    } catch (error) {
      console.error("Error fetching item data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchItemData();
  }, []);
  console.log(data)

  if (loading) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Item Details</h2>
                <div className="small-border bg-color-2"></div>
              </div>

              <div className="skeleton--container">
                <div className="skeleton-box"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data || typeof data !== "object") {
    return <div className="container">Item not found.</div>;
  }
console.log(data);
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={data.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={data.name || "NFT"}
                />
              </div>

              <div className="col-md-6">
                <div className="item_info">
                  <h2>{data.title || "Untitled NFT"}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {data.views ?? 100}
                    </div>

                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {data.likes ?? 74}
                    </div>
                  </div>

                  <p>{data.description || "No description available."}</p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>

                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${data.authorId}`}>
                            <img
                              className="lazy"
                              src={data.ownerImage || AuthorImage}
                              alt="Owner"
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="author_list_info">
                          <Link to={`/author/${data.authorId}`}>
                            {data.ownerName || "Monica Lucas"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>

                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${data.authorId}`}>
                            <img
                              className="lazy"
                              src={data.creatorImage || AuthorImage}
                              alt="Creator"
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="author_list_info">
                          <Link to={`/author/${data.authorId}`}>
                            {data.creatorName || "Monica Lucas"}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>

                    <div className="nft-item-price">
                      <img src={EthImage} alt="Ethereum" />
                      <span>{data.price ?? "1.85"}</span>
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