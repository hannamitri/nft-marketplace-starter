import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const AuthorPage = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
      .then((res) => res.json())
      .then((data) => {
        const items = data.filter(item => item.authorId === authorId);
        if (items.length > 0) {
          setAuthor({
            id: authorId,
            name: items[0].authorName,
            image: items[0].authorImage,
            items,
          });
        } else {
          setAuthor(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading author data:', err);
        setLoading(false);
      });
  }, [authorId]);

  if (loading) return <p>Loading...</p>;

  if (!author) return <p>Author not found.</p>;

  return (
    <div>
      <h1>{author.name}</h1>
      <img src={author.image} alt={author.name} width={150} />
      <h2>NFTs by {author.name}</h2>
      {author.items.map(item => (
        <div key={item.id} style={{ marginBottom: '2rem' }}>
          <h3>{item.title}</h3>
          <img src={item.nftImage} alt={item.title} width={200} />
          <p>Price: {item.price} ETH</p>
          <p>Likes: {item.likes}</p>
          <p>Expires on: {item.expiryDate}</p>
        </div>
      ))}
      <Link to="/">← Back to Home</Link>
    </div>
  );
};

export default AuthorPage;