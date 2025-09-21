import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { nftData } from "../components/home/HotCollections"; 
import EthImage from "../images/ethereum.svg"; 

const ItemDetails = () => {
  const { id } = useParams(); 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nft = nftData.find((x) => x.nftId.toString() === id);

  if (!nft) return <div className="container"><h2>Item not found</h2></div>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top" />
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              
              <div className="col-md-6 text-center">
                <img
                  src={nft.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={nft.title}
                />
              </div>

             
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {nft.title} #{nft.token}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye" /> {nft.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart" /> {nft.likes}
                    </div>
                  </div>

                  <p>{nft.description}</p>

                 
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nft.ownerId}`}>
                            <img className="lazy" src={nft.ownerImage} alt={nft.ownerName} />
                            <i className="fa fa-check" />
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nft.ownerId}`}>{nft.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                  </div>

             
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nft.creatorId}`}>
                            <img className="lazy" src={nft.creatorImage} alt={nft.creatorName} />
                            <i className="fa fa-check" />
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nft.creatorId}`}>{nft.creatorName}</Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40" />

                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="ETH" />
                      <span>{nft.price}</span>
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

