import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NFTList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('Error fetching NFTs:', err));
  }, []);

  return (
    <div>
      <h1>NFT Collection</h1>
      {items.map(item => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <Link to={`/author/${item.authorId}`}>
            <img src={item.authorImage} alt="Author" />
          </Link>
          <img src={item.nftImage} alt={item.title} />
          <p>Price: {item.price} ETH</p>
          <p>Likes: {item.likes}</p>
          <p>Expires: {item.expiryDate}</p>
        </div>
      ))}
    </div>
  );
};

export default NFTList;

