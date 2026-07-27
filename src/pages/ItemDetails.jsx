import React, { useEffect, useMemo, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { findAuthorById, findItemById } from "../data/marketplaceData";
import { fetchAuthorProfile, fetchItemDetails } from "../data/marketplaceApi";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [apiItem, setApiItem] = useState(null);
  const [ownerProfile, setOwnerProfile] = useState(null);
  const [creatorProfile, setCreatorProfile] = useState(null);
  const item = useMemo(() => apiItem || findItemById(itemId), [apiItem, itemId]);
  const owner = {
    ...findAuthorById(item.ownerId),
    ...(ownerProfile || {}),
  };
  const creator = {
    ...findAuthorById(item.creatorId),
    ...(creatorProfile || {}),
  };

  useEffect(() => {
    let isMounted = true;

    const loadItem = async () => {
      try {
        const loadedItem = await fetchItemDetails(itemId);
        if (isMounted) {
          setApiItem(loadedItem);
        }
      } catch (error) {
        if (isMounted) {
          setApiItem(null);
        }
      }
    };

    loadItem();

    return () => {
      isMounted = false;
    };
  }, [itemId]);

  useEffect(() => {
    let isMounted = true;

    const loadProfiles = async () => {
      try {
        const [loadedOwnerProfile, loadedCreatorProfile] = await Promise.all([
          fetchAuthorProfile(item.ownerId),
          fetchAuthorProfile(item.creatorId),
        ]);

        if (isMounted) {
          setOwnerProfile(loadedOwnerProfile);
          setCreatorProfile(loadedCreatorProfile);
        }
      } catch (error) {
        if (isMounted) {
          setOwnerProfile(null);
          setCreatorProfile(null);
        }
      }
    };

    loadProfiles();

    return () => {
      isMounted = false;
    };
  }, [item.ownerId, item.creatorId]);

  const ownerImage = item.authorImage || owner.image;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [item.id]);

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
                  alt={item.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{`${item.title} #${item.serialNumber}`}</h2>

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
                          <Link to={`/author/${owner.id}`}>
                            <img className="lazy" src={ownerImage} alt={owner.name} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${owner.id}`}>{owner.name}</Link>
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
                          <Link to={`/author/${creator.id}`}>
                            <img className="lazy" src={creator.image} alt={creator.name} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${creator.id}`}>{creator.name}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{Number(item.price).toFixed(2)}</span>
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
