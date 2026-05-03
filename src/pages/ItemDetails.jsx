import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ItemDetailsSkeleton from "../components/UI/ItemDetailsSkeleton";
import ethereumIcon from "../images/ethereum.svg";

const getImageSrc = (image) => {
  if (!image) return "";

  if (image.startsWith("http")) {
    return image;
  }

  if (image.startsWith("data:image")) {
    return image;
  }

  return `data:image/jpeg;base64,${image}`;
};

const ItemDetails = () => {
  const { id: nftId } = useParams();
  const [itemdetails, setItemdetails] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    async function fetchItemDetails() {
      setLoading(true);

      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );

        setItemdetails(data);
      } catch (error) {
        setItemdetails(null);
      } finally {
        setLoading(false);
      }
    }

    fetchItemDetails();
    window.scrollTo(0, 0);
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {loading ? (
          <ItemDetailsSkeleton />
        ) : (
          itemdetails && (
            <section aria-label="section" className="mt90 sm-mt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text-center">                    
                      <img
                        src={getImageSrc(itemdetails.nftImage)}
                        className="img-fluid img-rounded mb-sm-30 nft-image"
                        alt={itemdetails.title}
                      />               
                  </div>

                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{itemdetails.title} #{nftId}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {itemdetails.views}
                        </div>

                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {itemdetails.likes}
                        </div>
                      </div>

                      <p>{itemdetails.description}</p>

                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>

                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${itemdetails.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={getImageSrc(itemdetails.ownerImage)}
                                  alt={itemdetails.ownerName}
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>

                            <div className="author_list_info">
                              <Link to={`/author/${itemdetails.ownerId}`}>
                                {itemdetails.ownerName}
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
                              <Link to={`/author/${itemdetails.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={getImageSrc(itemdetails.creatorImage)}
                                  alt={itemdetails.creatorName}
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>

                            <div className="author_list_info">
                              <Link to={`/author/${itemdetails.creatorId}`}>
                                {itemdetails.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="spacer-40"></div>

                        <h6>Price</h6>

                        <div className="nft-item-price">                          
                            <img src={ethereumIcon} alt="ETH" />
                            <span>{itemdetails.price}</span>                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
