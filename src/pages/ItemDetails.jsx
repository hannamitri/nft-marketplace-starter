import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftid } = useParams();
  const [nftData, setNftData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  async function FetchNftDetails(nftid) {
    setLoading(true);

    const response = await fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftid}`
    );

    const data = await response.json();
    setNftData(data);
    setLoading(false);
  }

  useEffect(() => {
    FetchNftDetails(nftid);
    window.scrollTo(0, 0);
  }, [nftid]);

  useEffect(() => {
    if (!loading) {
      AOS.refresh(); // Reinitialize AOS after loading is complete
    }
  }, [loading]);

  if (loading) {
    return (
      <div data-aos="fade-up" id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton width="100%" height="300px" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="60%" height="30px" />
                    <Skeleton width="80%" height="20px" />
                    <Skeleton width="80%" height="20px" />
                    <Skeleton width="80%" height="20px" />
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>
                          <Skeleton width="100px" height="20px" />
                        </h6>
                        <div className="item_author">
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                          <Skeleton width="100px" height="20px" />
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>
                      <Skeleton width="100px" height="20px" />
                    </h6>
                    <Skeleton width="100px" height="20px" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div data-aos="fade-up" data-aos-duration="3000" id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={nftData.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt="NFT"
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{nftData.title} #{nftData.tag}</h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nftData.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nftData.likes}
                    </div>
                  </div>
                  <p>{nftData.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nftData.ownerId}`}>
                            <img className="lazy" src={nftData.ownerImage} alt="Owner" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nftData.ownerId}`}>{nftData.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nftData.creatorId}`}>
                            <img className="lazy" src={nftData.creatorImage} alt="Creator" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nftData.creatorId}`}>{nftData.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="Ethereum" />
                      <span>{nftData.price}</span>
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