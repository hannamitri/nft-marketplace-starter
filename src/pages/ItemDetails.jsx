import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import EthImage from "../images/ethereum.svg";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchItem = async () => {
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        const data = await res.json();
        setItem(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch item details:", err);
        setLoading(false);
      }
    };

    fetchItem();
  }, [nftId]);

  console.log(item)

  const renderSkeleton = () => (
    <div className="container">
      <div className="row animate-pulse">
        <div className="col-md-6 mb-4">
          <div className="w-full h-96 bg-gray-300 rounded-lg"></div>
        </div>
        <div className="col-md-6">
          <div className="h-8 w-3/4 bg-gray-300 mb-3 rounded"></div>
          <div className="flex gap-4 mb-4">
            <div className="h-6 w-20 bg-gray-300 rounded"></div>
            <div className="h-6 w-20 bg-gray-300 rounded"></div>
          </div>
          <div className="h-4 w-full bg-gray-300 mb-2 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-300 mb-4 rounded"></div>

          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
          </div>

          <div className="h-4 w-1/4 bg-gray-300 mb-3 rounded"></div>
          <div className="h-6 w-28 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            {renderSkeleton()}
          </section>
        </div>
      </div>
    );
  }

  if (!item) {
    return <div className="text-center mt-5 text-red-500">Item not found</div>;
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
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title} #{item.tag}</h2>

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
                    {item.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId}`}>
                            <img className="lazy" src={item.ownerImage} alt={item.ownerName} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/{$item.ownerId}`}>{item.ownerName}</Link>
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
                            <img className="lazy" src={item.creatorImage} alt={item.creatorName} />
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
                      <span>{item.price}</span>
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
