import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CollectionDetails = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/collectionDetails?id=${id}`
        );
        setCollection(response.data);
      } catch (error) {
        console.error("Error fetching collection details:", error);
      }
    };
    fetchCollection();
  }, [id]);

  if (!collection) {
    return <div>Loading collection details...</div>;
  }

  return (
    <div className="collection-details">
      <h2>{collection.title}</h2>
      <p>{collection.description}</p>
      <div className="collection-items">
        {collection.items && collection.items.length > 0 ? (
          collection.items.map((item) => (
            <div key={item.nftId} className="collection-item">
              <Link to={`/item-details/${item.nftId}`}>
                <img src={item.nftImage} alt={item.title} />
                <h4>{item.title}</h4>
              </Link>
            </div>
          ))
        ) : (
          <p>No items found in this collection.</p>
        )}
      </div>
    </div>
  );
};

export default CollectionDetails;
