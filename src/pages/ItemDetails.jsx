import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import ItemDetailsSkeleton from "./ItemDetailsSkeleton"; 
import './ItemDetailsSkeleton.css';

const ItemDetails = () => {
  const [nftData, setNftData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { nftId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!nftId) {
       setError(new Error("NFT ID not found in URL parameters."));
       setIsLoading(false);
       return;
    }

    const fetchNftDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setNftData(null);

        const apiUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
           if (response.status === 400) {
              throw new Error(`NFT with ID ${nftId} not found.`);
           }
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
        }

        const data = await response.json();
        setNftData(data);

      } catch (error) {
        console.error("Fetching NFT details failed:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNftDetails();

  }, [nftId]);

  // ** UPDATED: Render the skeleton component when loading **
  if (isLoading) {
    return <ItemDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h2>Error loading NFT details:</h2>
                <p>{error.message}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

   if (!nftData) {
       return (
           <div className="no-bottom no-top" id="content">
               <div id="top"></div>
               <section aria-label="section" className="mt90 sm-mt-0">
                   <div className="container">
                       <div className="row">
                           <div className="col-md-12 text-center">
                               <h2>NFT not found or data is missing.</h2>
                           </div>
                       </div>
                   </div>
               </section>
           </div>
       );
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
                  src={nftData.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={nftData.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{nftData.title}</h2>

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
                            <img className="lazy" src={nftData.ownerImage || EthImage} alt={nftData.ownerName} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nftData.ownerId}`}>{nftData.ownerName}</Link>
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
                          <Link to={`/author/${nftData.creatorId}`}>
                             <img className="lazy" src={nftData.creatorImage || EthImage} alt={nftData.creatorName} />
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
                      <img src={EthImage} alt="Ethereum icon" />
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
