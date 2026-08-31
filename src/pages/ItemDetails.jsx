import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  
    
  useEffect(() => {
    getItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

const getItem = async () => {
  try {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );
    console.log("Item data:", data);
    setItem(data);
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
};


  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {loading ? (
              <div className="row">
                <div className="col-md-6 text-center">
                  <div className="skeleton-detail-img"></div>
                </div>

                <div className="col-md-6">
                  <div className="item_info">
                    <div className="skeleton-detail-title"></div>
                    <div className="skeleton-detail-counts"></div>
                    <div className="skeleton-detail-text"></div>
                    <div className="skeleton-detail-author"></div>
                    <div className="skeleton-detail-author"></div>
                    <div className="skeleton-detail-price"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={item.nftImage || nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={item.title}
                  />
                </div>

                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {item.title} #{item.tag}
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
                    <p>
                      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                      illo inventore veritatis et quasi architecto beatae vitae
                      dicta sunt explicabo.
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${item.ownerId}`}>
                              <img src={item.ownerImage} alt={item.ownerName} />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>
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
                            <Link to={`/author/${item.creatorId}`}>
                              <img src={item.creatorImage} alt={item.creatorName} />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item.creatorId}`}>{item.creatorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        {item.price}
                      </div>
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
