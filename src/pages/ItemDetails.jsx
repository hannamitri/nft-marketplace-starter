import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import AuthorImage from "../images/author_thumbnail.jpg";

const ItemDetails = () => {
  const { id } = useParams(); // Grabbing the 'id' from the URL
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on every change

    const fetchNFT = async () => {
      try {
        // Fetch the data from the same API, but ensure it's dynamic based on 'id'
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=73855012` // You can adjust this API call if needed
        );
        const data = await res.json();
        const nftCollection = data.nftCollection || [];
        
        // Find the NFT in the collection that matches the URL 'id'
        const foundNFT = nftCollection.find((n) => n.id === parseInt(id));
        
        setNft(foundNFT);  // Set the NFT for details
        setLoading(false); // Set loading to false after fetching the NFT
      } catch (err) {
        console.error("Error fetching NFT details:", err);
      }
    };

    fetchNFT(); // Call the fetch function

  }, [id]); // The effect will re-run every time 'id' changes

  if (loading) return <p>Loading NFT details...</p>; // Display loading text while fetching
  if (!nft) return <p>No NFT found.</p>; // Display if the NFT is not found

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={nft.nftImage} // Display the NFT image
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={nft.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{nft.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nft.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nft.likes}
                    </div>
                  </div>
                  <p>{nft.description}</p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nft.authorId}`}>
                            <img className="lazy" src={nft.authorImage || AuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nft.authorId}`}>{nft.authorName}</Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nft.authorId}`}>
                            <img className="lazy" src={nft.authorImage || AuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nft.authorId}`}>{nft.authorName}</Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="Ethereum" />
                      <span>{nft.price} ETH</span>
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
