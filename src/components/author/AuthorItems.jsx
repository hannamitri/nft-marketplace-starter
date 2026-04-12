import React, { useEffect, useState } from "react";
import axios from "axios";
import NftCard, { NftCardSkeleton } from "../NftCard";

const AuthorItems = ({ authorId }) => {
  const [author, setAuthor] = useState(null);         // Stores the full author object from the API
  const [loading, setLoading] = useState(true);       // Controls skeleton visibility

  useEffect(() => {
    if (!authorId) return;                            // Don't fetch if authorId is undefined

    const fetchAuthorNfts = async () => {
      try {
        const { data } = await axios.get(            // Fetch author data from API
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthor(data);                             // Store full response — includes authorImage and nftCollection
      } catch (error) {
        console.error("Failed to fetch author NFTs:", error); // Log any errors
      } finally {
        setLoading(false);                           // Hide skeletons regardless of success or failure
      }
    };

    fetchAuthorNfts();                               // Invoke the async function
  }, [authorId]);                                    // Re-runs if user navigates to a different author

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8).fill(0).map((_, index) => (  // Show 8 skeleton cards while loading
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <NftCardSkeleton />
                </div>
              ))
            : author?.nftCollection.map((nft) => (      // Map over author's NFT collection
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.nftId}>
                  <NftCard
                    {...nft}                             // Spread all nft fields as props
                    authorId={authorId}                  // Pass authorId from URL param
                    authorImage={author?.authorImage}    // Pass authorImage from top-level API response
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;