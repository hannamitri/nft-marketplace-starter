import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = () => {
    const { nftId } = useParams();
    console.log("Route nftId:", nftId);

    const [nft, setNft] = useState(null);
    const [loading, setLoading] = useState(true);

  
   useEffect(() => {
    const fetchNFT = async () => {
      try {
        const hotResponse = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );

        const newResponse = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );

        const hotData = await hotResponse.json();
        const newData = await newResponse.json();

        const allNFTs = [...hotData, ...newData];

        console.log("Route nftID:", nftId);
        console.log("All NFTs:", allNFTs);

        const selectedNFT = allNFTs.find(
          (item) => String(item.nftId) === String(nftId)
        );
        console.log("Selected NFT:", JSON.stringify(selectedNFT, null, 2));

        console.log("Route nftId:", nftId);
        console.log("Matching NFT:", allNFTs.find(item => String(item.nftId) === String(nftId))
      );

        setNft(selectedNFT);
      } catch (error) {
        console.error("Error fetching NFT details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFT();
  }, [nftId]);

  if (loading) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <Skeleton height={500} />
        </div>

        <div className="col-md-6">
          <Skeleton height={50} width={300} />
          <br />
          <Skeleton height={20} width={150} />
          <br />
          <Skeleton count={4} />
          <br />
          <Skeleton height={40} width={120} />
        </div>
      </div>
    </div>
  );
}
 

  if (!nft) {
    return <h2>NFT not found</h2>;
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
                  src={nft.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={nft.title}
                />
              </div>

              <div className="col-md-6">
                <div className="item_info">

                  <h2>{nft.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nft.likes}
                    </div>
                  </div>

                  <p>
                    NFT ID: {nft.nftId}
                  </p>

                  <div className="d-flex flex-row">
                    <div className="mr40">

                      <h6>Owner</h6>

                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img
                              src={nft.authorImage}
                              alt={nft.title}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="author_list_info">
                          <Link to="/author">
                            Author #{nft.authorId}
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
                          <Link to={`/author/${nft.authorId}`}>
                            <img
                              src={nft.authorImage}
                              alt={nft.title}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="author_list_info">
                          <Link to={`/author/${nft.authorId}`}>
                            Author #{nft.authorId}
                          </Link>
                        </div>
                      </div>

                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>

                    <div className="nft-item-price">
                      <img src={EthImage} alt="ETH" />
                      <span>{nft.price || "0.00"}</span>
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
