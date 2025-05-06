import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AuthorList = () => {
  const [authorsMap, setAuthorsMap] = useState({});

  useEffect(() => {
    fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
      .then(res => res.json())
      .then(data => {
        const grouped = data.reduce((acc, item) => {
          if (!acc[item.authorId]) {
            acc[item.authorId] = {
              id: item.authorId,
              name: item.authorName,
              image: item.authorImage,
              items: []
            };
          }
          acc[item.authorId].items.push(item);
          return acc;
        }, {});
        setAuthorsMap(grouped);
      })
      .catch(err => console.error('Error fetching authors:', err));
  }, []);

  return (
    <div>
      <h1>Authors</h1>
      {Object.values(authorsMap).map(author => (
        <div key={author.id}>
          <Link to={`/author/${author.id}`}>
            <h2>{author.name}</h2>
            <img src={author.image} alt={author.name} />
          </Link>
          <p>Total NFTs: {author.items.length}</p>
        </div>
      ))}
    </div>
  );
};

export default AuthorList;

