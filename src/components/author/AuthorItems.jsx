import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NftItem from "../UI/NftItem";

const AuthorItems = ({
  authorId,
  authorImage,
  nftCollection,
}) => {
  const [authorItems, setAuthorItems] = useState([]);
  const [countdowns, setCountdowns] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (nftCollection) {
      // Use passed nftCollection if available
      const itemsWithAuthorImage = nftCollection.map((item) => ({
        ...item,
        authorImage: authorImage || item.authorImage,
        authorId: authorId || item.authorId,
      }));
      setAuthorItems(itemsWithAuthorImage);
      setLoading(false);
    } else if (authorId) {
      // Fallback to fetching if nftCollection not passed
      const fetchAuthorItems = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
          );
          const items = response.data.nftCollection || [];
          const itemsWithAuthorImage = items.map((item) => ({
            ...item,
            authorImage: response.data.authorImage || item.authorImage,
            authorId: authorId || item.authorId,
          }));
          setAuthorItems(itemsWithAuthorImage);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching author items:", error);
          setLoading(false);
        }
      };

      fetchAuthorItems();
    }
  }, [authorId, authorImage, nftCollection]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = {};
      authorItems.forEach((item) => {
        const now = Date.now();
        const timeLeft = item.expiryDate - now;

        if (timeLeft > 0) {
          const hours = Math.floor(timeLeft / (1000 * 60 * 60));
          const minutes = Math.floor(
            (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
          newCountdowns[item.nftId] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          newCountdowns[item.nftId] = "Expired";
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [authorItems]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? (
            <div>Loading...</div>
          ) : (
            authorItems.map((item) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={item.nftId}
              >
                <NftItem item={item} countdown={countdowns[item.nftId]} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
