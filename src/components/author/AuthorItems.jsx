import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import ItemSkeleton from "../UI/ItemSkeleton";
import Counter from "../Counter";
import ItemCard from "../ItemCard";

const AuthorItems = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const authorId = queryParams.get("author");

  const [loading, setLoading] = useState(true);
  const [authorNft, setAuthorNft] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  const fetchAuthorNft = async (id) => {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Author NFTs", error);
      return null;
    }
  };

  useEffect(() => {
    const loadAuthorNft = async () => {
      setLoading(true);
      const data = await fetchAuthorNft(authorId);
      if (data && data.nftCollection) {
        const enrichedItems = data.nftCollection.map((item) => ({
          ...item,
          authorImage: data.authorImage,
          authorID: data.authorId,
          // expiryDate: item.expiryDate || new Date(Date.now() +3600 * 1000).toISOString(), *NOT INCLUDED IN AUTHOR API*
        }));
        setAuthorNft(enrichedItems);
      }
      setLoading(false);
    };
    loadAuthorNft();
  }, [authorId]);

  return (
    <div className="row">
      {loading
        ? Array(16)
            .fill(0)
            .map((_, i) => <ItemSkeleton key={i} />)
        : authorNft
            .slice(0, visibleCount)
            .map((item, index) => <ItemCard key={index} item={item} />)}
    </div>
  );
};

export default AuthorItems;
